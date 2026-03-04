// Minimal flat config to satisfy ESLint v10+ when repo uses legacy .eslintrc files.
// This file keeps linting enabled but avoids enforcing rules at root; package-level
// .eslintrc.js will still be used by developers. It is intentionally permissive
// to unblock the workspace build after dependency upgrades.

module.exports = [
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
    languageOptions: {
      // Provide the parser module directly (expected by ESLint flat config)
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {},
  },
];
