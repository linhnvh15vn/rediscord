import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const conversationRouter = createTRPCRouter({
  find: protectedProcedure
    .input(
      z.object({
        memberOneId: z.string().min(1),
        memberTwoId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.conversation.findFirst({
        where: {
          AND: [
            { memberOneId: input.memberOneId },
            { memberTwoId: input.memberTwoId },
          ],
        },
        include: {
          memberOne: {
            include: {
              profile: true,
            },
          },
          memberTwo: {
            include: {
              profile: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        memberOneId: z.string().min(1),
        memberTwoId: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.conversation.create({
        data: {
          memberOneId: input.memberOneId,
          memberTwoId: input.memberTwoId,
        },
        include: {
          memberOne: {
            include: {
              profile: true,
            },
          },
          memberTwo: {
            include: {
              profile: true,
            },
          },
        },
      });
    }),
});
