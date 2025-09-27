import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack';
import { AuthUIProviderTanstack } from '@daveyplate/better-auth-ui/tanstack';
import { createRouter, Link } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { authClient } from '@/lib/auth/client';
import * as TanstackQuery from '@/lib/query/root-provider';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          <AuthQueryProvider>
            <AuthUIProviderTanstack
              authClient={authClient}
              organization={{ pathMode: 'slug', basePath: '/organization' }}
              navigate={(href) => router.navigate({ href })}
              replace={(href) => router.navigate({ href, replace: true })}
              Link={({ href, ...props }) => <Link to={href} {...props} />}
            >
              {props.children}
            </AuthUIProviderTanstack>
          </AuthQueryProvider>
        </TanstackQuery.Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
