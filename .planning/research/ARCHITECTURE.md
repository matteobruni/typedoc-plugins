ARCHITECTURE research — structure implications for developer experience

Goals

- Keep plugin layout consistent so demo and TypeDoc CLI usage remain predictable.
- Centralize shared dev configuration (`tsconfig.base.json`, root `.eslintrc.js`) to lower onboarding friction.

Recommendations

- Add `tsconfig.base.json` at repo root and have `plugins/*/tsconfig.json` extend it.
- Root `.eslintrc.js` with overrides for `plugins/*` and `apps/*` to handle node vs browser contexts.
- Maintain `dist/` output per package for plugin consumers.

Integration points

- `apps/demo` uses `typedoc` with plugin flags — ensure scaffolded plugin exposes `main` and `types` fields to point to `dist` outputs.
- CI should run `pnpm -w build` to ensure `dist/` artifacts compile for all packages.
