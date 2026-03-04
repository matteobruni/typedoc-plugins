// Flat config for ESLint v9: centralize rules and use ESLint's flat config API.
import path from "path";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const tsPluginRecommended =
  (tsPlugin && tsPlugin.configs && tsPlugin.configs.recommended) || {};
const tsPluginRecommendedRules = tsPluginRecommended.rules || {};

export default [
  // Global ignores
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },

  // TypeScript files in packages and apps
  {
    files: [
      "plugins/**/*.ts",
      "plugins/**/*.tsx",
      "apps/**/*.ts",
      "apps/**/*.tsx",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    // Merge the plugin's recommended rules and add workspace-specific
    // overrides. This avoids using `extends` in the flat config while
    // still getting the plugin's baseline rule set.
    rules: Object.assign({}, tsPluginRecommendedRules, {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "no-public" },
      ],
    }),
  },

  // JS/JSX files (build scripts, configs)
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    // No `extends` in flat config; keep minimal rules and rely on
    // workspace conventions. If you want eslint:recommended behavior,
    // import its rules explicitly here.
    rules: {},
  },
];
