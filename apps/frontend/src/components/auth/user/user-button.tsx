"use client";

import type { MultiSessionAuthClient } from "@better-auth-ui/react";
import {
  useAuth,
  useSession,
  useSetActiveSession,
} from "@better-auth-ui/react";
import {
  ChevronsUpDown,
  LogIn,
  LogOut,
  Settings,
  UserPlus2,
} from "lucide-react";

import { Button } from "@siplist/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@siplist/ui/components/dropdown-menu";
import { cn } from "@siplist/ui/lib/utils";

import { UserAvatar } from "./user-avatar";
import { UserView } from "./user-view";

export interface UserButtonProps {
  className?: string;
  align?: "center" | "end" | "start" | undefined;
  sideOffset?: number;
  size?: "default" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
}

/**
 * Render a user dropdown button that shows user info, settings, theme controls, and authentication actions.
 *
 * Includes user profile, settings link, optional multi-session account switching, theme picker,
 * and sign-in/sign-up/sign-out actions depending on authentication state.
 *
 * @param className - Additional CSS classes applied to the button trigger
 * @param align - Alignment of the dropdown menu relative to the trigger
 * @param sideOffset - Offset between the trigger and the dropdown menu
 * @param size - "icon" renders only the avatar; "default" renders a full button with label and chevron
 * @param variant - Visual variant of the trigger button
 * @returns The dropdown menu component with user actions
 */
export function UserButton({
  className,
  align,
  sideOffset,
  size = "default",
  variant = "ghost",
}: UserButtonProps) {
  const { authClient, basePaths, viewPaths, localization, plugins, Link } =
    useAuth();

  const { isPending: settingActiveSession } = useSetActiveSession(
    authClient as MultiSessionAuthClient,
  );
  const { data: session, isPending: sessionPending } = useSession(authClient);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          size === "icon" && "rounded-full",
          size === "icon" && className,
        )}
        render={
          size === "icon" ? (
            <UserAvatar />
          ) : (
            <Button
              variant={variant}
              className={cn("h-auto py-2.5 font-normal", className)}
              size="lg"
            >
              {session || sessionPending || settingActiveSession ? (
                <UserView isPending={!!settingActiveSession} />
              ) : (
                <>
                  <UserAvatar />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {localization.auth.account}
                  </div>
                </>
              )}

              <ChevronsUpDown className="ml-auto" />
            </Button>
          )
        }
      />

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] max-w-[48svw] min-w-40 md:min-w-56"
        sideOffset={sideOffset}
        align={align}
        // onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {session && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-sm font-normal">
                <UserView />
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        {session ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link
                    href={`${basePaths.settings}/${viewPaths.settings.account}`}
                  />
                }
              >
                <Settings className="text-muted-foreground" />
                {localization.settings.settings}
              </DropdownMenuItem>

              {plugins.flatMap((plugin) =>
                plugin.userMenuItems?.map((Item, index) => (
                  <Item key={`${plugin.id}-${index.toString()}`} />
                )),
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link href={`${basePaths.auth}/${viewPaths.auth.signOut}`} />
                }
              >
                <LogOut className="text-muted-foreground" />
                {localization.auth.signOut}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link href={`${basePaths.auth}/${viewPaths.auth.signIn}`} />
              }
            >
              <LogIn className="text-muted-foreground" />
              {localization.auth.signIn}
            </DropdownMenuItem>

            <DropdownMenuItem
              render={
                <Link href={`${basePaths.auth}/${viewPaths.auth.signUp}`} />
              }
            >
              <UserPlus2 className="text-muted-foreground" />
              {localization.auth.signUp}
            </DropdownMenuItem>

            {plugins.flatMap((plugin) =>
              plugin.userMenuItems?.map((Item, index) => (
                <Item key={`${plugin.id}-${index.toString()}`} />
              )),
            )}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
