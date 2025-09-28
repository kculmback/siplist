import { OrganizationView } from '@daveyplate/better-auth-ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/organization/$slug/$organizationView')({
  component: RouteComponent,
});

function RouteComponent() {
  const { organizationView, slug } = Route.useParams();
  return (
    <main className="container mx-auto p-4 md:p-6">
      <OrganizationView slug={slug} pathname={organizationView} />
    </main>
  );
}
