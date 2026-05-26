import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const barRouter = {
  leave: protectedProcedure
    .input(z.object({ barId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const orgs = await ctx.authApi.listOrganizations({
        headers: ctx.headers,
      });
      if (orgs.length <= 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must belong to at least one bar.",
        });
      }
      await ctx.authApi.leaveOrganization({
        headers: ctx.headers,
        body: { organizationId: input.barId },
      });
    }),
} satisfies TRPCRouterRecord;
