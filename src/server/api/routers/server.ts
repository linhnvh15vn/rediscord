import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const serverRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.server.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
