import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(1),
  fileUrl: z.string().optional(),
});

export type InferredMessageSchema = z.infer<typeof messageSchema>;

export const createMessageSchema = messageSchema.extend({
  serverId: z.string().min(1),
  channelId: z.string().min(1),
});

export const updateMessageSchema = createMessageSchema.partial().extend({
  id: z.string().min(1),
});
