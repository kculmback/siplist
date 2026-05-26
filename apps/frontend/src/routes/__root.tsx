/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type * as React from "react";
import { useEffect } from "react";
import { authClient } from "@/auth/client";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Navigation } from "@/components/navigation/navigation";
import { themePlugin } from "@/lib/auth/theme-plugin";
import appCss from "@/styles.css?url";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { AppRouter } from "@siplist/api";
import type { ThemeMode } from "@siplist/ui/components/theme";
import { Toaster } from "@siplist/ui/components/sonner";
import {
  ThemeProvider,
  useTheme as useBaseTheme,
} from "@siplist/ui/components/theme";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<AppRouter>;
}>()({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data: sessionData } = authClient.useSession();
  const { refetch: refetchOrg } = authClient.useActiveOrganization();

  // Better Auth only toggles $activeOrgSignal for /organization/* paths. After signup
  // or login the session refreshes (via $sessionSignal) with activeOrganizationId set,
  // but useActiveOrganization never re-fetches. Manually refetch when the ID appears.
  useEffect(() => {
    if (sessionData?.session.activeOrganizationId) {
      void refetchOrg();
    }
  }, [sessionData?.session.activeOrganizationId, refetchOrg]);

  return (
    <ThemeProvider>
      <AuthProvider
        authClient={authClient}
        redirectTo="/settings/account"
        navigate={navigate}
        plugins={[
          //   deleteUserPlugin(),
          //   multiSessionPlugin(),
          themePlugin({ useTheme }),
          //   usernamePlugin({ isUsernameAvailable: true })
        ]}
        Link={Link}
      >
        <html lang="en" suppressHydrationWarning>
          <head>
            <HeadContent />
          </head>
          <body className="bg-background text-foreground min-h-screen font-sans antialiased">
            <Navigation />

            {children}

            <Toaster />
            <TanStackRouterDevtools position="bottom-right" />
            <Scripts />
          </body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}

function useTheme() {
  const baseTheme = useBaseTheme();
  return {
    ...baseTheme,
    setTheme: (theme: string) => baseTheme.setTheme(theme as ThemeMode),
  };
}
