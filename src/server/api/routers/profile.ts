import { currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const profileRouter = createTRPCRouter({
  initialProfile: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await currentUser();
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Chưa đăng nhập" });
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await db.profile.create({
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
