import { getAuth } from "@clerk/nextjs/server";
import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";

export const createAuthContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  return { auth: getAuth(opts.req) };
};

export type Context = trpc.inferAsyncReturnType<typeof createAuthContext>;
