import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createMessageSchema } from "~/components/schemas/message.schema";
import { pusherServer } from "~/lib/pusher";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type Message } from "~/types";

export const messageRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        channelId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let messages: Message[] = [];

      if (input.cursor) {
        messages = await ctx.db.message.findMany({
          take: 15,
          skip: 1,
          cursor: {
            id: input.cursor,
          },
          where: {
            channelId: input.channelId,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        messages = await ctx.db.message.findMany({
          take: 15,
          where: {
            channelId: input.channelId,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      let nextCursor = null;

      if (messages.length === 15) {
        nextCursor = messages[15 - 1]!.id;
      }

      return {
        nextCursor,
        messages,
      };
    }),

  sendMessage: protectedProcedure
    .input(createMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const server = await ctx.db.server.findFirst({
        where: {
          id: input.serverId,
          members: {
            some: {
              profileId: ctx.profile!.id,
            },
          },
        },
        include: {
          members: true,
        },
      });

      if (!server) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const channel = await ctx.db.channel.findFirst({
        where: {
          id: input.channelId,
          serverId: server.id,
        },
      });

      if (!channel) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const member = server.members.find(
        (member) => member.profileId === ctx.profile!.id,
      );

      if (!member) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const message = await ctx.db.message.create({
        data: {
          content: input.content,
          fileUrl: input.fileUrl,
          channelId: input.channelId,
          memberId: member.id,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });

      void pusherServer.trigger(input.channelId, "sendMessage", message);

      return message;
    }),
});
