import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Hãy đặt tên máy chủ"),
  imageUrl: z.string().min(1, "Hãy đặt biểu tượng máy chủ"),
});
