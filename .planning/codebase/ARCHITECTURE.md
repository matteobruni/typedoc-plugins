Architecture Overview

High-level: this is a TypeScript monorepo with two main types of packages:

- `apps/*` — consumer applications (currently `apps/demo`) that exercise the plugins and provide a runnable demo.
- `plugins/*` — TypeDoc renderer plugins authored in TypeScript/TSX that extend TypeDoc's renderer via hooks.

Runtime model:

- Plugins are plain Node modules loaded by TypeDoc. Each plugin exposes a `load(app: Application)` function (see `plugins/*/src/index.tsx`) where they register option declarations (`app.options.addDeclaration`) and renderer hooks (`app.renderer.hooks.on("body.end", ...)`).
- Demo app runs on Express (`apps/demo/app.js`) to serve static TypeDoc output and assets; it uses `apps/demo/src/index.ts` as TypeScript entry during build.

Data flow / request lifecycle (renderer hooks):

1. TypeDoc runs with plugin list and options (via CLI or `typedoc.json`).
2. Each plugin's `load` registers options and hooks.
3. During render, hooks run at phases like `head.begin`, `head.end`, `body.end`, `pageSidebar.begin` and return JSX elements that are inserted into generated HTML.

Core abstractions:

- Plugin layer — `plugins/*/src/*.tsx` (option declarations + renderer hooks)
- Demo/server layer — `apps/demo` (Express server + static docs)
- Tooling layer — root `package.json`, `pnpm` workspaces, `lerna` orchestration

Entry points:

- CLI: `typedoc` executed from `apps/demo` or root scripts (plugins are picked up via `--plugin` flags in `apps/demo/package.json` build script).
- Server: `apps/demo/app.js` (Express) — startable with `pnpm --filter apps/demo start`.

Diagram (ASCII):

[Developer] -runs-> `pnpm build` / `typedoc --plugin ...`  
 |  
 v  
 [TypeDoc CLI] --loads--> [plugins/*] --hooks--> [Renderer HTML output] --> [apps/demo/docs]
|
v
[Express server]

Notes:

- This project favors small focused plugins that rely on TypeDoc renderer lifecycle rather than a centralized service. Ownership is by plugin directories.
