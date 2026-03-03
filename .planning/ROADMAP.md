# ROADMAP: TypeDoc Plugins Collection

## Overview

Phases derived from requirements: focus on developer experience, tests/CI, and docs.

| Phase | Goal                             | Requirements                   |
| ----- | -------------------------------- | ------------------------------ |
| 1     | Developer onboarding & templates | DEV-01, DEV-02, DOC-01, DOC-02 |
| 2     | Testing baseline                 | TEST-01, TEST-02               |
| 3     | CI and quality gates             | TEST-03, COVER-01              |

## Phase Details

### Phase 1: Developer Experience

Goal: Make it easy to contribute and create new plugins.
Requirements: DEV-01, DEV-02, DOC-01, DOC-02
Success criteria:

1. `CONTRIBUTING.md` exists and explains setup steps to run `apps/demo` and build plugins.
2. A plugin template is available under `scripts/` or `templates/` and can scaffold a new plugin.
3. `plugins/*/README.md` contain usage examples for plugin options.

### Phase 2: Testing Baseline

Goal: Add unit and integration tests to catch regressions.
Requirements: TEST-01, TEST-02
Success criteria:

1. `vitest` or equivalent runs and passes on at least one plugin.
2. Integration test runs TypeDoc build for `apps/demo` and asserts that plugin output contains expected strings.

### Phase 3: CI and Quality Gates

Goal: Ensure builds and tests run in CI and enforce basic quality thresholds.
Requirements: TEST-03, COVER-01
Success criteria:

1. CI workflow present (`.github/workflows/ci.yml`) that runs `pnpm -w build` and `pnpm -w test`.
2. Coverage report generated and minimum threshold enforced for changed packages.

---

_Roadmap created: 2026-03-03_
