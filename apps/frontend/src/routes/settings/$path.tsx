import { authClient } from "@/auth/client";
import { Settings } from "@/components/auth/settings/settings";
import { viewPaths } from "@better-auth-ui/core";
import { ensureSession as ensureSessionFn } from "@better-auth-ui/react";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const Route = createFileRoute("/settings/$path")({
  async beforeLoad({ params: { path }, context: { queryClient }, location }) {
    if (!Object.values(viewPaths.settings).includes(path)) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw notFound();
    }

    const ensureSession = createIsomorphicFn()
      .server(() =>
        ensureSessionFn(queryClient, authClient, {
          fetchOptions: { headers: getRequestHeaders() },
        }),
      )
      .client(() => ensureSessionFn(queryClient, authClient));

    const session = await ensureSession();

    if (!session) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/auth/$path",
        params: { path: "sign-in" },
        search: { redirectTo: location.href },
      });
    }

    return { session };
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { path } = Route.useParams();

  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
      <Settings path={path} />
    </div>
  );
}
