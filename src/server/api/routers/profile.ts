import { auth, currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getCurrent: publicProcedure.query(({ ctx }) => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.profile.findUnique({
      where: {
        userId,
      },
    });
  }),

  initialProfile: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await currentUser();
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Chưa đăng nhập" });
    }

    const profile = await ctx.db.profile.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await ctx.db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]!.emailAddress,
      },
    });

    return newProfile;
  }),
});
