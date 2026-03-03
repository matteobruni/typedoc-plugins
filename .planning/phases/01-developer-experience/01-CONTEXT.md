# Phase 1: Developer Experience - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

## Phase Boundary

Make it easy to contribute and create new TypeDoc plugins. This phase covers onboarding docs, a plugin scaffold/template, and demo app examples that show how to use plugin options. It includes improving developer tooling and configs that directly affect contributor experience (linting, TypeScript settings, build scripts). It does NOT include publishing automation or major feature additions — those are deferred.

## Implementation Decisions

### Dependency and config updates

- Bump and align devDependencies across the workspace for: `typescript`, `eslint`, `@typescript-eslint/*`, `prettier`, and `typedoc` to compatible, recent stable releases. Use `pnpm` workspace upgrades (e.g. `pnpm -w up typescript@latest eslint@latest @typescript-eslint/* prettier@latest typedoc@latest`) and test builds after each bump.
- Prefer `workspace:^` notation in `plugins/*/package.json` for internal plugin packages; keep external versions explicit in root devDependencies where appropriate.
- Run upgrades in a single dedicated branch and CI job that runs `pnpm -w -s build` and `pnpm -w -s lint` to detect regressions before merging.

### TypeScript configuration

- Add a root `tsconfig.base.json` with shared compilerOptions (target: `ES2022`, module: `ESNext`, `strict: true`, `skipLibCheck: true`) and have package-level `tsconfig.json` extend the base. Keep per-package `tsconfig` to control `outDir` and package-specific settings.
- Keep `types` and `declaration` generation only where packages need them (plugins should emit d.ts in `dist/`), avoid enabling composite builds unless publishing requires it.

### Linting and formatting

- Standardize on ESLint + Prettier integration with `@typescript-eslint` parser. Create a root `.eslintrc.js` that extends plugin-level configs; per-package overrides for browser vs node contexts if needed.
- Add root scripts:
  - `lint`: `pnpm -w eslint "**/*.{ts,tsx,js,jsx}" --fix`
  - `format`: `pnpm -w prettier --write "**/*.{ts,tsx,js,json,md}"`

### Plugin scaffold / template

- Provide a minimal plugin template that includes:
  - `package.json` with `name`, `version`, `main` → `dist/index.js`, `types` → `dist/index.d.ts`, `scripts`: `build`, `lint`, `test`
  - `tsconfig.json` extending root base
  - example `src/index.tsx` exporting `load(app: Application)` (with option declaration example)
  - `README.md` with example `typedoc` CLI usage showing how to pass options (e.g., `--clarityId=...`)
  - example unit test (vitest) demonstrating a small pure function or build smoke test

### Demo app integration

- `apps/demo` will include one or two example pages (or docs) that show plugin usage with example `typedoc.json` configurations. Provide a `scripts/demo:build` and `scripts/demo:start` to build and serve docs.

### Claude's Discretion

- Exact selection of target versions (minor/major) when multiple compatible releases exist — planner may pick specific versions and run compatibility checks.
- Exact lint rule set and rule strictness — planner can propose rules and produce a short migration plan for rule fixes.

## Specifics / Rationale

- Rationale: Aligning TypeScript and ESLint versions reduces noisy errors and onboarding friction; a shared `tsconfig.base.json` and root lint config reduce duplication and cognitive load for new contributors.
- Risk: Major upgrades to `typedoc` or `@typescript-eslint` may surface breaking changes in plugins' code; plan to run build & smoke tests per package and address breakages iteratively.

## Existing Code Insights

### Reusable Assets

- Root `package.json` — contains workspace config and devDependencies (TypeScript, linting tools) — location: `package.json`
- Per-plugin `tsconfig.json`, `.eslintrc.js`, and `README.md` exist under `plugins/*/`.
- `apps/demo/typedoc.json` and `apps/demo/src/index.ts` — demo entrypoint and typedoc config for example usage.

### Established Patterns

- Plugins follow a pattern: `src/index.tsx` exports `load(app: Application)` and declare options via `app.options.addDeclaration(...)` (see `plugins/*/src/*.tsx`).
- Build artifacts are placed in `dist/` directories for plugins and demo app.
- Lerna is used for running workspace builds (`lerna run build`) and pnpm is the package manager (`pnpm-lock.yaml`).

### Integration Points

- New plugin template should match existing plugin layout so TypeDoc `--plugin` flags and demo build scripts work without modification.
- CI/lint/hooks: `.husky/` exists — pre-commit or commit-msg hooks are present; ensure new lint scripts are wired to hooks as desired.

## Deferred Ideas

- Automated dependency upgrade bot (e.g., Renovate/Dependabot) — add to backlog (separate phase).
- Full publishing automation (release pipelines) — out of scope for this phase.

---

_Phase: 01-developer-experience_
_Context gathered: 2026-03-03_
