Known Concerns and Technical Debt

Areas to review

- Tests: there are no visible unit or integration tests for plugins. This increases risk when refactoring. Files to inspect: `plugins/*/src` and `apps/demo`.

- CI/Automation: repository lacks `.github/workflows` or clear CI configuration. Consider adding GitHub Actions for builds and tests.

- Runtime validation: plugins assume option values are present and well-formed (e.g., `clarityId`, `googleAdsId`). Missing guardrails mean malformed config could inject broken HTML. Inspect `plugins/*/src/*.tsx`.

- Security: plugins inject scripts that load third-party CDNs (Google Ads, Carbon Ads, tsParticles). Ensure content security policy and sourcing policies are considered when deploying.

- Ownership and docs: no CONTRIBUTING.md or maintainers section; onboarding new contributors may be harder. Add maintainers list per plugin in `plugins/<plugin>/README.md`.

Short-term mitigations

1. Add minimal tests that run the demo build and assert generated output contains expected strings for each plugin.
2. Create a basic CI workflow that runs `pnpm install` and `pnpm -w build` and `pnpm -w test`.
3. Add input validation when reading plugin options and fail fast with clear error messages.

Files/paths called out:

- `plugins/clarity/src/index.tsx` — reads `clarityId` (no validation)
- `plugins/google-ads/src/index.tsx` — reads `googleAdsId` (no validation)
- `plugins/carbon-ads/src/index.tsx` — reads `carbonServe`, `carbonPlacement`
- `plugins/particles/src/index.tsx` — injects CDN scripts
