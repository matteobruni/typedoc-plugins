Coding Conventions

Style and linting

- ESLint + Prettier conventions are present in plugin packages (`plugins/*/.eslintrc.js`, `.prettierrc`). Root packages use TypeScript and follow typical TS rules via `@typescript-eslint`.

TypeScript practices

- Source files are in `src/` and compiled to `dist/` artifacts (see `plugins/*/dist`).
- Most plugin files are implemented as small modules that export a `load` function: `export function load(app: Application): void { ... }`.

Patterns and naming

- Plugins declare CLI options through `app.options.addDeclaration({ name: "<option>", type: ParameterType.String, help: "..." })` and then read them via `ctx.options.getValue("<option>")`.
- Renderer hooks insert JSX elements (TypeDoc's renderer JSX) at lifecycle points such as `head.begin`, `head.end`, `body.end`, `pageSidebar.begin`.

Error handling and logging

- Plugins generally assume the renderer context is present and do minimal defensive checks; they do not introduce heavy runtime error handling. Consider adding guard clauses where necessary (e.g., validating option shapes before use).

Formatting and CI

- No repository-level pre-commit hooks visible here beyond `.husky` (present). Ensure `pnpm -w build` passes and format using Prettier where needed.

Examples / snippets

- Option declaration (example): `plugins/clarity/src/index.tsx`

```ts
app.options.addDeclaration({
  name: "clarityId",
  type: ParameterType.String,
  help: "Clarity ID",
});
```

Recommendations

- Add a root-level `CONTRIBUTING.md` that documents how to run the demo and how to develop plugins.
- Standardize on a single test runner and add a root `jest.config.js` or `vitest.config.ts` if cross-package tests are desired.
