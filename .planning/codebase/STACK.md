Technologies and stack

- Languages: TypeScript (primary), JavaScript (build/distribution artifacts)
- Runtimes: Node.js (used for build and demo app in `apps/demo`)
- Package manager: pnpm (root `pnpm-lock.yaml` and `pnpm-workspace.yaml`)
- Monorepo: workspace configured in `package.json` with `apps/*` and `plugins/*`
- Build tools: `lerna` for running package scripts (root `package.json`), `typescript` for compilation (`tsconfig.json` per package)
- Main frameworks/libraries:
  - `typedoc` used across demo and plugins (see `apps/demo/package.json` and plugins)
  - `express` used by demo app (`apps/demo/package.json` -> `app.js`, `src/index.ts`)

Major files and locations:

- `package.json` (root) — workspace, scripts (build uses `lerna run build`)
- `pnpm-lock.yaml` (root) — lockfile
- `apps/demo/src/index.ts`, `apps/demo/app.js` — demo application entry
- `plugins/*/src/*.tsx` — TypeDoc plugin source (e.g. `plugins/clarity/src/index.tsx`)
- `plugins/*/package.json` and `tsconfig.json` — package-specific config

How to run locally (basic):

```bash
# install
pnpm install

# run demo app
pnpm --filter apps/demo start

# build packages
pnpm -w run build
```

Important configs to inspect:

- `plugins/*/.eslintrc.js`, `.prettierrc` — code style in packages
- `apps/demo/typedoc.json` — typedoc entry points and output

Notes:

- Several plugins register renderer hooks and expect runtime options passed via TypeDoc CLI or configuration (see `plugins/*/src/*.tsx` for option names like `clarityId`, `carbonServe`, `googleAdsId`). Values are passed through TypeDoc/CLI options (not via a central `.env`).
