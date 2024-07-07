import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  getCurrentMember: protectedProcedure.query(({ ctx }) => {
    return ctx.db.member.findFirst({
      where: {
        profileId: ctx.profile!.id,
      },
    });
  }),
});
