import { authRouter } from "./router/auth";
import { barRouter } from "./router/bar";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  bar: barRouter,
  // post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
