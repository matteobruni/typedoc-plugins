// Flat config for ESLint v9: centralize rules and use ESLint's flat config API.
import path from "path";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

// Provide eslint builtin configs to FlatCompat (required when using "eslint:recommended").
const compat = new FlatCompat({
  baseDirectory: path.resolve("."),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Bring in eslint:recommended, plugin:@typescript-eslint/recommended and prettier
// without using legacy .eslintrc files by converting them to flat config entries.
const compatConfigs = compat.extends(
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "prettier",
);

const tsPluginRecommended =
  (tsPlugin && tsPlugin.configs && tsPlugin.configs["flat/recommended"]) || {};
const tsPluginRecommendedRules = tsPluginRecommended.rules || {};

export default [
  ...compatConfigs,

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
    rules: {},
  },
];
