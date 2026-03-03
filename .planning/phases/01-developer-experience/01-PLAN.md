# Phase 1: Developer Experience — Plan

**Created:** 2026-03-03
**Status:** Ready for execution

Phase goal: Make it easy to contribute and create new TypeDoc plugins. Deliver onboarding docs, a plugin scaffold/template, demo examples, and align dev tooling/configs.

Mapped requirements: DEV-01, DEV-02, DEV-03, TEST-01, TEST-02

Tasks

1. Documentation: `CONTRIBUTING.md` and `DEVELOPER_SETUP.md`
   - Description: Write clear setup steps (pnpm install, pnpm -w build), how to run `apps/demo`, PR process, how to publish locally for testing.
   - Owner: Docs/maintainer
   - Estimate: 0.5 day
   - Requirements covered: DEV-01, DOC-01
   - Success criteria:
     - `.github/` PR template or checklist included
     - Instructions reproducible by following steps on a fresh clone

2. Plugin scaffold/template
   - Description: Add a canonical plugin template under `templates/plugin/` (or `scripts/`) including `package.json`, `tsconfig.json` (extends root), `src/index.tsx` example `load(app)`, `README.md`, and a sample vitest test.
   - Owner: Core dev
   - Estimate: 1.5 days
   - Requirements covered: DEV-02, DEV-03
   - Success criteria:
     - Scaffold builds (`pnpm -w -s build`) and can be consumed by `apps/demo` via `--plugin` when linked
     - README contains clear CLI example showing how to pass plugin options

3. Example README updates for plugins
   - Description: Add usage examples to `plugins/*/README.md` showing option names and CLI flags (e.g., `--clarityId`, `--googleAdsId`).
   - Owner: Docs/maintainer
   - Estimate: 0.5 day
   - Requirements covered: DEV-03
   - Success criteria:
     - Each plugin README has a minimal usage block and example of how to pass options to TypeDoc

4. Add testing baseline (vitest) and example unit test
   - Description: Add `vitest` to root devDeps, create a basic test config, and add an example unit test in `plugins/keywords` (or scaffold template) that runs and passes.
   - Owner: Test engineer
   - Estimate: 1 day
   - Requirements covered: TEST-01
   - Success criteria:
     - `pnpm -w -s test` runs and passes the example test
     - Documentation includes how to run tests locally

5. Integration smoke test: TypeDoc build for `apps/demo`
   - Description: Create a simple integration test that runs `typedoc` for `apps/demo` with the example plugin and asserts that expected snippets (e.g., carbon ads script, clarity script) appear in generated HTML.
   - Owner: Test engineer
   - Estimate: 1 day
   - Requirements covered: TEST-02
   - Success criteria:
     - Integration test executes in CI or locally and asserts expected plugin output

6. Shared config: `tsconfig.base.json` and root ESLint/Prettier
   - Description: Add `tsconfig.base.json`, root `.eslintrc.js`, and scripts `lint`/`format` in root package.json. Per-package `tsconfig.json` to extend base.
   - Owner: Core dev
   - Estimate: 1 day
   - Requirements covered: DEV-01, DEV-02
   - Success criteria:
     - `pnpm -w -s build` and `pnpm -w -s lint` (with `--fix`) run without overwhelming errors; issues are converted into follow-up tasks as needed

7. Dev dependency upgrade smoke run
   - Description: On a feature branch, run workspace upgrades for TS/ESLint/etc and execute build/lint/tests to identify regressions.
   - Owner: Core dev
   - Estimate: 0.5-1 day (investigation + fixes)
   - Requirements covered: (supports all)
   - Success criteria:
     - CI job passes build and lint on branch; remaining failures are documented with PR guidance

Traceability (mapped)

| Requirement | Task  |
| ----------- | ----- |
| DEV-01      | 1,6,7 |
| DEV-02      | 2,6   |
| DEV-03      | 2,3   |
| TEST-01     | 4     |
| TEST-02     | 5     |

Dependencies and order

- Start with Task 6 (shared config) and Task 7 (dependency upgrade smoke run) in parallel with Task 1 (docs) to reduce churn.
- Create the plugin scaffold (Task 2) after base configs exist so scaffold extends shared configs.
- Add tests (Task 4,5) once scaffold and demo integration are in place.

Invariant / Scope guardrails

- Do not add publishing automation or major new features during this phase — those are deferred.

Next actions

1. Kick off Task 6 + Task 7 + Task 1 (parallel).
2. Create branch `feature/phase1-dev-experience` and open PR with initial docs + configs.
3. After PR CI passes, iterate on scaffold and tests.

---

Generated from: `.planning/REQUIREMENTS.md`, `.planning/PROJECT.md`, `.planning/phases/01-developer-experience/01-CONTEXT.md`, and research outputs.
