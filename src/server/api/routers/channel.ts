import { z } from "zod";

import {
  channelSchema,
  createChannelSchema,
  updateChannelSchema,
} from "~/components/schemas/channel.schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const channelRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.channel.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(createChannelSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.channel.create({
        data: {
          name: input.name,
          type: input.type,
          serverId: input.serverId,
          profileId: ctx.profile!.id,
        },
      });
    }),

  update: protectedProcedure
    .input(updateChannelSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.channel.update({
        data: {
          name: input.name,
          type: input.type,
        },
        where: {
          id: input.channelId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.channel.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
