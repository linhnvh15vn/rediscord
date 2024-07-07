import { v4 } from "uuid";
import { z } from "zod";

import { schema } from "~/components/schemas/server.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const serverRouter = createTRPCRouter({
  getFirst: protectedProcedure.query(({ ctx }) => {
    return ctx.db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: ctx.profile?.id,
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        include: z.any(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.server.findUnique({
        where: {
          id: input.id,
        },
        include: input.include,
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.server.findMany({
      where: {
        members: {
          some: {
            profileId: ctx.profile!.id,
          },
        },
      },
    });
  }),

  create: protectedProcedure.input(schema).mutation(({ ctx, input }) => {
    return ctx.db.server.create({
      data: {
        name: input.name,
        imageUrl: input.imageUrl,
        profileId: ctx.profile!.id,
        channels: {
          create: {
            name: "general",
            profileId: ctx.profile!.id,
          },
        },
        members: {
          create: {
            profileId: ctx.profile!.id,
            role: "ADMIN",
          },
        },
      },
    });
  }),

  generateInviteUrl: protectedProcedure
    .input(z.object({ serverId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.server.update({
        data: {
          inviteCode: v4(),
        },
        where: {
          id: input.serverId,
          profileId: ctx.profile!.id,
        },
        include: {
          members: {
            include: {
              profile: true,
            },
          },
        },
      });
    }),
});
