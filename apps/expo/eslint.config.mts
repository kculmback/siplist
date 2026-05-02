import { defineConfig } from "eslint/config";

import { baseConfig } from "@siplist/eslint-config/base";
import { reactConfig } from "@siplist/eslint-config/react";

export default defineConfig(
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  baseConfig,
  reactConfig,
);
