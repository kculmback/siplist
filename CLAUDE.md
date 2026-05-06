# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Skill loading

Before substantial work, follow the skill-loading workflow in [`AGENTS.md`](./AGENTS.md) (managed by `@tanstack/intent`). That block is regenerated in place — don't duplicate it here.

## Stack

T3-Turbo monorepo (Turborepo + pnpm workspaces). Apps share a tRPC v11 router, Drizzle/Postgres schema, and a Better Auth setup. Engines: Node `^22.21.0`, pnpm `^10.19.0` (enforced in `package.json`).

`@siplist/*` is the workspace scope. Packages reference each other as `workspace:*`.

## Commands

Run from the repo root unless noted. Turborepo handles cross-package ordering; prefer the root scripts over running things package-by-package.

- `pnpm dev` — run all apps' dev servers in parallel (`turbo watch dev --continue`).
- `pnpm dev:backend` / `pnpm dev:frontend` — scope dev to one app and its deps (`-F @siplist/backend...`).
- `pnpm build`, `pnpm lint`, `pnpm format`, `pnpm typecheck` — Turbo-orchestrated, cached. Use `format:fix` / `lint:fix` to auto-write.
- `pnpm db:push` — push the Drizzle schema in `packages/db` to Postgres. `pnpm db:studio` opens Drizzle Studio.
- `pnpm auth:generate` (alias for `pnpm -F @siplist/auth generate`) — regenerates `packages/db/src/auth-schema.ts` from the Better Auth config at `packages/auth/script/auth-cli.ts`. Run this whenever the auth config changes; the CLI config lives in `script/` (not `src/`) so it can't be imported by app code.
- `pnpm ui-add` — interactive shadcn add into `packages/ui`.
- `pnpm turbo gen init` — scaffold a new workspace package with tooling wired up.
- Single-package focus: `pnpm -F @siplist/<name> <script>` (e.g. `pnpm -F @siplist/api typecheck`).

Per-app dev specifics:

- `apps/expo` — `pnpm -F @siplist/expo dev:ios` / `dev:android` to pick a simulator (the default `dev` just runs `expo start`).
- `apps/backend` — Cloudflare Worker via `wrangler dev`; deploy with `pnpm -F @siplist/backend deploy`. Regenerate Worker types with `pnpm -F @siplist/backend cf-typegen`.
- `apps/frontend` — TanStack Start (Vite). Routes are file-based under `src/routes/` with a generated `routeTree.gen.ts`.

Env: a single `.env` at the repo root is loaded via `dotenv -e ../../.env --` (see each app's `with-env` script). Required vars are declared per-package using `@t3-oss/env-core` (`packages/auth/env.ts`, `apps/frontend/src/env.ts`, etc.) — add new vars there, not just to `.env.example`.

## Architecture

### tRPC boundary (`packages/api`)

- `packages/api/src/root.ts` composes the `appRouter` from sub-routers in `src/router/`. The exported `AppRouter` _type_ is what clients import — `@siplist/api` is a **devDependency** for client apps so backend code never ships to the bundle.
- `src/trpc.ts` defines `createTRPCContext` — the caller injects `db` and `auth` per request, since Workers don't support module-level singletons that read env. The context exposes `db`, `authApi`, and the resolved `session`. `publicProcedure` and `protectedProcedure` use `superjson` and surface Zod errors via `errorFormatter`. There is a dev-only timing middleware that adds 100–500ms artificial latency — keep it in mind when debugging "slow" local requests.
- New routers go in `packages/api/src/router/<name>.ts`, are typed with `TRPCRouterRecord`, and are registered in `root.ts`.

### tRPC handlers and clients

The Hono backend (`apps/backend`) is the **only** place the tRPC server runs. Both web and Expo clients call it over HTTP.

- **`apps/backend/src/index.ts`** mounts `/api/auth/*` (Better Auth's fetch handler) and `/api/trpc/*` (`@hono/trpc-server`). Per-request, it builds a `db` (`createDb(c.env.POSTGRES_URL)`) and an `auth` instance via `buildAuth(c.env, db, baseUrl)` from `apps/backend/src/auth.ts`. CORS allows `c.env.FRONTEND_URL` with `credentials: true`.
- **Frontend client** (`apps/frontend/src/lib/trpc.ts`) uses `httpBatchStreamLink` against `${getBackendUrl()}/api/trpc` for both browser and SSR. SSR forwards the incoming `cookie` header via `getRequestHeaders()` so server-rendered queries authenticate as the current user. `credentials: "include"` is set on every fetch.
- **Expo client** (`apps/expo/src/utils/api.tsx`) uses `httpBatchLink` and forwards cookies from `authClient.getCookie()` (since Expo doesn't have a browser cookie jar).
- Local dev: backend runs on `:8787` (Wrangler default), frontend on `:3001`. The Expo helper at `apps/expo/src/utils/base-url.ts` resolves the LAN IP and appends `:8787` to match.

### Auth (`packages/auth`)

- `initAuth(...)` in `src/index.ts` is a factory — the backend constructs a per-request instance (since `c.env` is per-request on Workers). The factory takes `db`, `baseUrl`, `productionUrl`, `frontendUrl`, `secret`, and Discord creds; `expo()` and `oAuthProxy()` are always added.
- The OAuth proxy plugin (`oAuthProxy`) lets non-prod URLs share an OAuth app — Discord/etc. providers should use the production callback and let the proxy redirect.
- Schema: `packages/db/src/auth-schema.ts` is **generated**; do not hand-edit. Edit `packages/auth/src/index.ts` or `packages/auth/script/auth-cli.ts`, then run `pnpm auth:generate` and `pnpm db:push`.

### Database (`packages/db`)

- Drizzle ORM over `@neondatabase/serverless` (Workers-native, no `nodejs_compat` needed). The connection string must be Neon-compatible.
- Exported as a `createDb(connectionString)` factory — there is no module-level singleton. Each consumer (the backend Worker, the auth CLI) constructs its own instance.
- `casing: "snake_case"` is set on both the client and `drizzle.config.ts`, so define columns in camelCase in TS and they map to snake_case in Postgres.

### Validators (`packages/validators`) and UI (`packages/ui`)

- Use `@siplist/validators` for Zod schemas shared between client and server. Project uses **Zod v4** — note imports use `zod/v4`.
- `@siplist/ui` is shadcn-based; each component is a separate subpath export (e.g. `@siplist/ui/button`). Add new ones via `pnpm ui-add`.

### Tooling packages

`tooling/eslint`, `tooling/prettier`, `tooling/tailwind`, `tooling/typescript` are the shared configs every package extends. The pnpm `catalog:` mechanism (see `pnpm-workspace.yaml`) pins shared dep versions — prefer `"some-pkg": "catalog:"` in package.json over hardcoding versions for anything already in the catalog.

## Conventions worth knowing

- The `api` package is a **devDependency** in client apps (Expo, frontend) and a regular dependency only where it's actually served. Preserve this split — adding it as a runtime dep on a client leaks server code into the bundle.
- ESLint is invoked with `--flag unstable_native_nodejs_ts_config` across packages because configs are `.ts`.
- `pnpm postinstall` runs `sherif` to lint the workspace for version drift; `pnpm lint:ws` runs it manually.
- Turbo `lint`/`typecheck` depend on `^topo` and `^build`, so internal `dist/` outputs (e.g. `packages/api/dist`) need to be present — use the root scripts rather than running tsc directly in a package that depends on another workspace package.
