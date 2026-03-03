PITFALLS research — common mistakes and how to avoid them

1. Mixed TypeScript/ESLint versions across packages
   - Symptom: CI lint/build failures only in some packages
   - Prevention: shared `tsconfig.base.json` and root `.eslintrc.js`; upgrade devDeps in workspace simultaneously; run `pnpm -w -s build` locally

2. Typedoc plugin runtime incompatibilities
   - Symptom: plugin hooks work locally but fail in different TypeDoc versions
   - Prevention: pin TypeDoc minor version for v1 and test plugin builds against declared TypeDoc version in `apps/demo`

3. Missing example tests leading to regressions
   - Symptom: refactors break plugin output without detection
   - Prevention: include at least one unit test and one integration smoke test in Phase 1

4. Overly strict lint rules that block contributions
   - Symptom: many autofix changes required; contributors discouraged
   - Prevention: start with moderate rules; use automated codefix PRs or codemods to transition
