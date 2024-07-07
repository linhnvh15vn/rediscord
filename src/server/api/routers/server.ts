import { v4 } from "uuid";
import { z } from "zod";

import {
  serverSchema,
  updateServerSchema,
} from "~/components/schemas/server.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const serverRouter = createTRPCRouter({
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

  create: protectedProcedure.input(serverSchema).mutation(({ ctx, input }) => {
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

  update: protectedProcedure
    .input(updateServerSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.server.update({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.server.delete({
        where: {
          id: input.id,
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

  leave: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.server.update({
        data: {
          members: {
            deleteMany: {
              profileId: ctx.profile!.id,
            },
          },
        },
        where: {
          id: input.id,
          profileId: {
            not: ctx.profile!.id,
          },
          members: {
            some: {
              profileId: ctx.profile!.id,
            },
          },
        },
      });
    }),
});
