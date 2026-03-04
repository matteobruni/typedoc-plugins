// Compatibility flat config for ESLint v9 that delegates to legacy per-package
// .eslintrc.* files using FlatCompat. This preserves existing per-package
// configurations while satisfying ESLint's need for an eslint.config.* entry.
const { FlatCompat } = require("@eslint/eslintrc");
const compat = new FlatCompat({ resolvePluginsRelativeTo: __dirname });

module.exports = [
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  // Translate legacy eslintrc files to a flat config
  ...compat.extends(),
];
