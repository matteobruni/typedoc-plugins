Directory Structure

Top-level layout (paths are workspace-aware):

- `apps/` — runnable applications
  - `apps/demo/` — demo TypeDoc site and small Express server
    - `apps/demo/src/index.ts` — demo TypeScript entry
    - `apps/demo/app.js` — Express server
    - `apps/demo/package.json`, `typedoc.json`

- `plugins/` — TypeDoc plugins (each plugin is a package)
  - `plugins/<plugin>/src/*.tsx` — plugin source (e.g. `plugins/clarity/src/index.tsx`)
  - `plugins/<plugin>/package.json`, `tsconfig.json`, `.eslintrc.js`, `.prettierrc`

- `node_modules/`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` — workspace tooling
- Root `package.json` — lists workspaces and a `build` script that runs `lerna run build`

Where to find common responsibilities:

- Build scripts: root `package.json` and `plugins/*/package.json` (package build scripts, if present)
- Plugin source: `plugins/*/src` (look for `load(app)` functions)
- Demo server: `apps/demo/app.js`, `apps/demo/src` (express + typedoc usage)
- Lint/format: `plugins/*/.eslintrc.js`, `.prettierrc`

Notes about repo layout:

- This is a small monorepo; there are no nested workspaces beyond `apps` and `plugins`.
- Distribution artifacts appear under `plugins/*/dist` and `apps/demo/dist`.
