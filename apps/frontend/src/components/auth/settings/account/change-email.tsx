"use client";

import type { SyntheticEvent } from "react";
import { useState } from "react";
import { useAuth, useChangeEmail, useSession } from "@better-auth-ui/react";
import { toast } from "sonner";

import { Button } from "@siplist/ui/components/button";
import { Card, CardContent, CardFooter } from "@siplist/ui/components/card";
import { Field, FieldError } from "@siplist/ui/components/field";
import { Input } from "@siplist/ui/components/input";
import { Label } from "@siplist/ui/components/label";
import { Skeleton } from "@siplist/ui/components/skeleton";
import { Spinner } from "@siplist/ui/components/spinner";
import { cn } from "@siplist/ui/lib/utils";

export interface ChangeEmailProps {
  className?: string;
}

/**
 * Render a card containing a form to view and update the authenticated user's email.
 *
 * Shows a loading skeleton until session data is available, displays the current
 * email as the form's default value, and sends a verification email to the
 * new address upon successful submission.
 *
 * @returns A JSX element rendering the change-email card and form
 */
export function ChangeEmail({ className }: ChangeEmailProps) {
  const { authClient, baseURL, localization, viewPaths } = useAuth();
  const { data: session } = useSession(authClient);

  const { mutate: changeEmail, isPending } = useChangeEmail(authClient, {
    onSuccess: () => toast.success(localization.settings.changeEmailSuccess),
  });

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
  }>({});

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    changeEmail({
      newEmail: formData.get("email") as string,
      callbackURL: `${baseURL}/${viewPaths.settings.account}`,
    });
  }

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold">
        {localization.settings.changeEmail}
      </h2>

      <form onSubmit={handleSubmit}>
        <Card className={cn(className)}>
          <CardContent className="flex flex-col gap-6">
            <Field data-invalid={!!fieldErrors.email}>
              <Label htmlFor="email">{localization.auth.email}</Label>

              {session ? (
                <Input
                  key={session.user.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={session.user.email}
                  placeholder={localization.auth.emailPlaceholder}
                  disabled={isPending}
                  required
                  onChange={() => {
                    setFieldErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setFieldErrors((prev) => ({
                      ...prev,
                      email: (e.target as HTMLInputElement).validationMessage,
                    }));
                  }}
                  aria-invalid={!!fieldErrors.email}
                />
              ) : (
                <Skeleton>
                  <Input className="invisible" />
                </Skeleton>
              )}

              <FieldError>{fieldErrors.email}</FieldError>
            </Field>
          </CardContent>

          <CardFooter>
            <Button type="submit" size="sm" disabled={isPending || !session}>
              {isPending && <Spinner />}

              {localization.settings.updateEmail}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
