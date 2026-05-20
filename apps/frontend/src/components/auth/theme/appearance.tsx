"use client";

import { useEffect, useState } from "react";
import { themePlugin } from "@/lib/auth/theme-plugin";
import {
  ThemePreviewDark,
  ThemePreviewLight,
  ThemePreviewSystem,
  useAuthPlugin,
} from "@better-auth-ui/react";
import { Monitor, Moon, Sun } from "lucide-react";

import { Card, CardContent } from "@siplist/ui/components/card";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@siplist/ui/components/field";
import { Label } from "@siplist/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@siplist/ui/components/radio-group";
import { cn } from "@siplist/ui/lib/utils";

export interface AppearanceProps {
  className?: string;
}

/**
 * Renders a theme selector card with visual theme previews.
 *
 * Displays a card containing radio buttons for selecting between system, light,
 * and dark themes. Each option shows a visual preview of the theme.
 *
 * @param className - Optional additional CSS class names for the card container.
 * @returns A JSX element containing the theme selector card.
 */
export function Appearance({ className }: AppearanceProps) {
  const { useTheme, localization } = useAuthPlugin(themePlugin);
  const { theme, setTheme, themes = [] } = useTheme();

  console.log(themes);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold">{localization.appearance}</h2>

      <Card className={cn(className)}>
        <CardContent>
          <Field>
            <Label>{localization.theme}</Label>

            <RadioGroup
              value={isMounted ? theme : ""}
              onValueChange={setTheme}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              disabled={!isMounted || !theme}
            >
              {themes.includes("auto") && (
                <FieldLabel htmlFor="auto">
                  <Field orientation="horizontal">
                    <FieldContent className="gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <FieldTitle>
                          <Monitor className="text-muted-foreground size-4" />

                          {localization.system}
                        </FieldTitle>

                        <RadioGroupItem value="auto" id="auto" />
                      </div>

                      <ThemePreviewSystem className="w-full" />
                    </FieldContent>
                  </Field>
                </FieldLabel>
              )}

              {themes.includes("light") && (
                <FieldLabel htmlFor="light">
                  <Field orientation="horizontal">
                    <FieldContent className="gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <FieldTitle>
                          <Sun className="text-muted-foreground size-4" />

                          {localization.light}
                        </FieldTitle>

                        <RadioGroupItem value="light" id="light" />
                      </div>

                      <ThemePreviewLight className="w-full" />
                    </FieldContent>
                  </Field>
                </FieldLabel>
              )}

              {themes.includes("dark") && (
                <FieldLabel htmlFor="dark">
                  <Field orientation="horizontal">
                    <FieldContent className="gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <FieldTitle>
                          <Moon className="text-muted-foreground size-4" />

                          {localization.dark}
                        </FieldTitle>

                        <RadioGroupItem value="dark" id="dark" />
                      </div>

                      <ThemePreviewDark className="w-full" />
                    </FieldContent>
                  </Field>
                </FieldLabel>
              )}
            </RadioGroup>
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}
