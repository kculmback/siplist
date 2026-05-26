import { getBackendUrl } from "@/lib/url";
import { passkeyClient } from "@better-auth/passkey/client";
import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: getBackendUrl(),
  fetchOptions: { credentials: "include" },
  plugins: [passkeyClient(), organizationClient()],
});
