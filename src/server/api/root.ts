import { channelRouter } from "~/server/api/routers/channel";
import { conversationRouter } from "~/server/api/routers/conversation";
import { direactMessageRouter } from "~/server/api/routers/direct-message";
import { memberRouter } from "~/server/api/routers/member";
import { messageRouter } from "~/server/api/routers/message";
import { profileRouter } from "~/server/api/routers/profile";
import { serverRouter } from "~/server/api/routers/server";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  server: serverRouter,
  profile: profileRouter,
  member: memberRouter,
  channel: channelRouter,
  message: messageRouter,
  conversation: conversationRouter,
  directMessage: direactMessageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
