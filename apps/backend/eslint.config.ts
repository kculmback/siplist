import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@siplist/eslint-config/base";

export default defineConfig(
  {
    ignores: [".wrangler/**", "worker-configuration.d.ts"],
  },
  baseConfig,
  restrictEnvAccess,
);
