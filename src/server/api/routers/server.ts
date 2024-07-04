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
});
