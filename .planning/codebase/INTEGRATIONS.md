External Integrations

This project contains TypeDoc plugins that integrate with third-party services. Configuration is done primarily via TypeDoc options (declared in plugin `load` functions) and package-level config.

- Clarity (Microsoft Clarity)
  - Where: `plugins/clarity/src/index.tsx` — declares option `clarityId` and injects the Clarity script in `body.end`.
  - Config: option `clarityId` passed to TypeDoc via CLI or `typedoc.json`.
  - No secrets stored in repo; values should be provided at runtime.

- Carbon Ads
  - Where: `plugins/carbon-ads/src/index.tsx` — declares `carbonServe` and `carbonPlacement` options and injects Carbon script in `pageSidebar.begin`.
  - Config: options provided through TypeDoc config or CLI.

- Google Ads
  - Where: `plugins/google-ads/src/index.tsx` — declares `googleAdsId`; injects script with `client=ca-pub-{id}` in `body.end`.
  - Config: `googleAdsId` option (do not commit real publisher IDs in docs).

- tsParticles / CDN plugins
  - Where: `plugins/particles/src/index.tsx` — injects `https://cdn.jsdelivr.net/npm/tsparticles@2` and optional plugin scripts.
  - Config: `particlesOptions` and `additionalPlugins` options.

- Demo app integrations
  - `apps/demo` uses `express`, `pug` for templating and `livereload` during development. See `apps/demo/package.json` and `apps/demo/app.js`.

CI/CD and publishing

- No explicit CI workflow files present at repository root (no `.github/workflows/*` detected). Releases/publishing appear manual or handled outside repository.

Secrets handling

- Plugins accept identifiers and keys via TypeDoc options. No `.env` files or API keys are committed. If you add sensitive values, store them in CI secrets or local environment variables and avoid committing them.
