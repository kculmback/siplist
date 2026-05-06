import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { cors } from "hono/cors";

import type { Auth } from "@siplist/auth";
import type { Db } from "@siplist/db/client";
import { appRouter, createTRPCContext } from "@siplist/api";
import { createDb } from "@siplist/db/client";

import { buildAuth } from "./auth";

interface Variables {
  db: Db;
  auth: Auth;
}

const app = new Hono<{ Bindings: CloudflareBindings; Variables: Variables }>();

app.use(
  "*",
  cors({
    origin: (_origin, c) => (c.env as CloudflareBindings).FRONTEND_URL,
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const db = createDb(c.env.POSTGRES_URL);
  const baseUrl = new URL(c.req.url).origin;
  const auth = buildAuth(c.env, db, baseUrl);
  c.set("db", db);
  c.set("auth", auth);
  await next();
});

app.on(["GET", "POST"], "/api/auth/*", (c) => c.get("auth").handler(c.req.raw));

app.all("/api/trpc/*", (c) => {
  // Clone so the body stream is independent of c.req.raw — something in the
  // Hono/Workers/better-auth chain consumes the original before tRPC can read it.
  const req = c.req.raw.clone();
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        auth: c.get("auth"),
        db: c.get("db"),
        headers: req.headers,
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });
});

export default app;
