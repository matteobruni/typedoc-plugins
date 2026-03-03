STACK research — dependency & tooling recommendations

Context

This project already includes TypeScript, ESLint, @typescript-eslint, Prettier and typedoc in root devDependencies (see `package.json`). The goal here is to recommend aligned versions and an upgrade strategy to reduce onboarding friction and avoid cross-package incompatibilities.

Recommended versions (align across workspace)

- TypeScript: 5.5.x (keep `^5.5.3` as in root `package.json`) — modern language features, stable for ecosystem
- ESLint: 8.57.x (keep `^8.57.0`) — compatible with current @typescript-eslint
- @typescript-eslint/parser & plugin: 7.15.x (keep `^7.15.0`) — aligns with ESLint 8.x
- Prettier: 3.8.x (keep `^3.8.1`) — code formatting
- TypeDoc: 0.28.x (keep `^0.28.17`) — plugins target this runtime
- Vitest: ^1.0 (recommend adding) — fast TS-native test runner for unit tests

Upgrade approach

1. Create a branch `chore/upgrade-devtools`.
2. Update root devDependencies using pnpm workspaces:

```bash
pnpm -w up typescript@^5.5.3 eslint@^8.57.0 @typescript-eslint/parser@^7.15.0 @typescript-eslint/eslint-plugin@^7.15.0 prettier@^3.8.1 typedoc@^0.28.17
pnpm -w add -D vitest@^1.0 jsdom@^21 @vitest/ui --workspace-root
```

3. Run smoke checks:

```bash
pnpm -w -s build
pnpm -w -s lint || true
pnpm -w -s test || true
```

4. Fix any lint/TS errors iteratively in the branch; keep commits small per package.
5. Open PR and run CI that executes build + lint + tests. If CI passes, merge.

Notes and rationale

- Using the versions already present in the repo reduces risk; prefer incremental upgrades to major jumps.
- Vitest is recommended for quick TypeScript-native testing and good DX — add it with example test in plugin template.
- Keep `skipLibCheck: true` in shared `tsconfig.base.json` to reduce noise during initial upgrades.

Deliverables for Phase 1 research

- A short compatibility checklist (what to run to verify) — included here
- List of packages to upgrade and the commands above
- Confidence: medium — upgrades are non-trivial but manageable with incremental fixes
