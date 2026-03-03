FEATURES research — what the repo should provide for v1 (developer experience)

Table stakes vs differentiators

- Table stakes (must have for good contributor DX):
  - Clear `CONTRIBUTING.md` with setup steps (`pnpm install`, `pnpm -w build`, how to run demo)
  - A minimal plugin scaffold that builds and can be included via `typedoc --plugin` in the demo
  - Linting and formatting scripts (root `lint`, `format`)
  - Example unit test using `vitest`

- Differentiators (nice-to-have):
  - CLI scaffolding tool (`pnpm create typedoc-plugin`) — Phase 2
  - Interactive demo toggles (run-time switches in `apps/demo`) — Phase 2

Complexity notes

- Creating a scaffold is low complexity (template + docs). Ensuring it builds across Node/TS versions adds moderate complexity.
- Adding vitest is low complexity but requires example tests and small setup (jsdom environment for DOM-like tests).

Deliverables

- `CONTRIBUTING.md` outline and checklist
- Plugin scaffold files (template)
- Example unit + integration test prototypes
