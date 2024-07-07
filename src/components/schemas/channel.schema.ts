import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const channelSchema = z.object({
  name: z
    .string()
    .min(1, "Hãy đặt tên kênh")
    .refine((name) => name !== "general", {
      message: "Tên kênh không thể là 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export type InferredChannelSchema = z.infer<typeof channelSchema>;

export const createChannelSchema = channelSchema.extend({
  serverId: z.string(),
});

export const updateChannelSchema = channelSchema.partial().extend({
  channelId: z.string(),
});
