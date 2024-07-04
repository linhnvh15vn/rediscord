import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/trpc/server";

export const serverRouter = createTRPCRouter({
  getFirst: publicProcedure.query(async ({ ctx }) => {
    const profile = await api.profile.initialProfile();

    return ctx.db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: "1",
          },
        },
      },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.server.findMany({
      where: {
        members: {
          some: {},
        },
      },
    });
  }),
});
