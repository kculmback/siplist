import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { kebabCase } from 'lodash-es';
import { Info } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppForm } from '@/components/ui/form';
import { authClient } from '@/lib/auth/client';

export const Route = createFileRoute('/account/onboarding')({
  component: RouteComponent,
});

// TODO: Handle non-unique slugs

function RouteComponent() {
  const navigate = useNavigate();

  const { mutateAsync, error } = useMutation({
    mutationFn: async (
      values: Parameters<typeof authClient.organization.create>[0],
    ) => {
      const response = await authClient.organization.create(values);

      if (response.error) {
        throw new Error(
          `${response.error.code ?? ''} ${response.error.message ?? response.error.statusText}`.trim(),
        );
      }

      return response.data;
    },
  });

  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      name: '',
    },
    async onSubmit({ value }) {
      await mutateAsync({
        name: value.name,
        slug: kebabCase(value.name),
        keepCurrentActiveOrganization: false,
      });

      toast.success('Successfully created household');

      navigate({
        to: '/',
      });
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );

  return (
    <main className="container p-4 md:p-6 mx-auto">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Siplist</CardTitle>
          <CardDescription>Tell us about your household</CardDescription>
        </CardHeader>

        <CardContent>
          <form.AppForm>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Household Name"
                    description="This is the household's public display name."
                  />
                )}
              </form.AppField>

              {!!error && (
                <Alert variant="destructive">
                  <Info />
                  <AlertTitle>Whoops!</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              )}

              <form.SubmitButton>Submit</form.SubmitButton>
            </form>
          </form.AppForm>
        </CardContent>
      </Card>
    </main>
  );
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Household name must be at least 2 characters.',
  }),
});
