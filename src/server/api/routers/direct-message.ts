import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type DirectMessage } from "~/types";

export const direactMessageRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        conversationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let directMessages: DirectMessage[] = [];

      if (input.cursor) {
        directMessages = await ctx.db.directMessage.findMany({
          take: 15,
          skip: 1,
          cursor: {
            id: input.cursor,
          },
          where: {
            conversationId: input.conversationId,
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
        directMessages = await ctx.db.directMessage.findMany({
          take: 15,
          where: {
            conversationId: input.conversationId,
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

      if (directMessages.length === 15) {
        nextCursor = directMessages[15 - 1]!.id;
      }

      return {
        nextCursor,
        items: directMessages,
      };
    }),
});
