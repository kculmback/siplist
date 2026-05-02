import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@siplist/eslint-config/base";
import { reactConfig } from "@siplist/eslint-config/react";

export default defineConfig(
  {
    ignores: [".nitro/**", ".output/**", ".tanstack/**"],
  },
  baseConfig,
  reactConfig,
  restrictEnvAccess,
);
