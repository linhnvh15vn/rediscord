import { z } from "zod";

export const serverSchema = z.object({
  name: z.string().min(1, "Hãy đặt tên máy chủ"),
  imageUrl: z.string().min(1, "Hãy đặt biểu tượng máy chủ"),
});

export type InferredServerSchema = z.infer<typeof serverSchema>;

export const updateServerSchema = serverSchema.partial().extend({
  id: z.string(),
});
