import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy, organization } from "better-auth/plugins";

import type { Db } from "@siplist/db/client";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function shortId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

export function initAuth(options: {
  db: Db;
  baseUrl: string;
  productionUrl: string;
  frontendUrl: string;
  secret: string | undefined;
}) {
  const config = {
    database: drizzleAdapter(options.db, {
      provider: "pg",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      oAuthProxy({
        productionURL: options.productionUrl,
      }),
      expo(),
      organization({
        allowUserToCreateOrganization: true,
      }),
    ],
    socialProviders: {},
    trustedOrigins: ["expo://", options.frontendUrl],
    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            if (session.activeOrganizationId) {
              return { data: session };
            }

            const membership = await options.db.query.member.findFirst({
              where: (t, { eq }) => eq(t.userId, session.userId),
              orderBy: (t, { asc }) => [asc(t.createdAt)],
            });
            if (membership) {
              return {
                data: { ...session, activeOrganizationId: membership.organizationId },
              };
            }

            // New user — create their default bar org before the session row is written
            const userRecord = await options.db.query.user.findFirst({
              where: (t, { eq }) => eq(t.id, session.userId),
            });
            const displayName = userRecord?.name || "My";
            const slug = `${slugify(displayName) || "bar"}-${shortId()}`;
            await auth.api.createOrganization({
              body: { name: `${displayName}'s Bar`, slug, userId: session.userId },
            });

            const newMembership = await options.db.query.member.findFirst({
              where: (t, { eq }) => eq(t.userId, session.userId),
              orderBy: (t, { asc }) => [asc(t.createdAt)],
            });
            return {
              data: { ...session, activeOrganizationId: newMembership?.organizationId ?? null },
            };
          },
        },
      },
    },
    onAPIError: {
      onError(error, ctx) {
        console.error("BETTER AUTH API ERROR", error, ctx);
      },
    },
  } satisfies BetterAuthOptions;

  const auth = betterAuth(config);
  return auth;
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
