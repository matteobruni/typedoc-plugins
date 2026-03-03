Testing Practices

Current state

- There is no obvious centralized test runner config at the repository root (no `jest.config.js` or `vitest.config.ts` at top-level). Search hits in `node_modules` indicate testing libraries are present as dev deps only.
- Plugin packages do not appear to include test directories in this repository snapshot (look in `plugins/*/` for `test/` or `__tests__` — none present).

Where to add tests

- Unit tests for plugin logic: `plugins/<plugin>/src` — add `plugins/<plugin>/test` or `__tests__` alongside source.
- Integration tests: use `apps/demo` to render plugin output via TypeDoc and assert generated HTML contains expected injection points.

Suggested setup

1. Pick a runner (recommend `vitest` for speed with TypeScript) and add a root `vitest.config.ts`.
2. Add a root script `pnpm -w test` that runs tests across the workspace (`pnpm -w run test`), and include per-package test scripts.
3. Add a simple integration test that runs `typedoc --plugin <plugin>` against a small fixture and asserts output contains expected snippets.

Mocking and CI

- For DOM/HTML assertions use `jsdom` environment (available in `vitest` or `jest`).
- CI should run `pnpm install` then `pnpm -w test` and fail on coverage thresholds if desired.

Coverage

- No coverage reports found. Consider adding `--coverage` and a coverage threshold in CI.
