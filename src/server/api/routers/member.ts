import { MemberRole } from "@prisma/client";
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

  updateRole: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        memberId: z.string(),
        role: z.nativeEnum(MemberRole),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.server.update({
        where: {
          id: input.serverId,
          profileId: ctx.profile!.id,
        },
        data: {
          members: {
            update: {
              where: {
                id: input.memberId,
                profileId: {
                  not: ctx.profile!.id,
                },
              },
              data: {
                role: input.role,
              },
            },
          },
        },
        include: {
          members: {
            include: {
              profile: true,
            },
            orderBy: {
              role: "asc",
            },
          },
        },
      });
    }),

  kick: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        memberId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.server.update({
        where: {
          id: input.serverId,
          profileId: ctx.profile!.id,
        },
        data: {
          members: {
            delete: {
              id: input.memberId,
              profileId: {
                not: ctx.profile!.id,
              },
            },
          },
        },
        include: {
          members: {
            include: {
              profile: true,
            },
            orderBy: {
              role: "asc",
            },
          },
        },
      });
    }),
});
