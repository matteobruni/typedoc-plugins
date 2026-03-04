// Flat config for ESLint v9: centralize per-package rules while keeping
// behavior equivalent to existing .eslintrc.js files.
const path = require("path");

const tsParser = require.resolve("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
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
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/ban-types": "warn",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "no-public" },
      ],
    },
  },

  // JS/JSX files (build scripts, configs)
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    extends: ["eslint:recommended", "prettier"],
    rules: {},
  },
];
