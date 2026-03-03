# TypeDoc Plugins Collection

## What This Is

Collection of small TypeDoc plugins (and a demo app) that extend TypeDoc's renderer with features like ads, analytics, and UI enhancements. The repo contains a demo application (`apps/demo`) and multiple plugins under `plugins/` (e.g. `clarity`, `carbon-ads`, `google-ads`, `particles`, `keywords`).

## Core Value

Provide well-structured, small, reusable TypeDoc renderer plugins that are easy to install and configure, and a demo app that showcases plugin usage.

## Requirements

### Validated

- ✓ Plugin packaging and basic renderer integration — existing (plugins expose `load(app)` and register options)

### Active

- [ ] Provide clear developer experience for adding new plugins (templates, docs)
- [ ] Improve testing and CI for plugins (unit + integration via demo)
- [ ] Add CONTRIBUTING.md and developer onboarding steps

### Out of Scope

- Publishing automation (handled externally) — keep manual for now

## Context

- Monorepo managed with pnpm workspaces and `lerna` orchestrating builds. Plugins written in TypeScript and compiled to `dist/`.
- Demo app (`apps/demo`) uses Express to serve generated docs and demonstrates plugin options via `typedoc` build.

## Constraints

- **Tech stack**: TypeScript, TypeDoc, Node.js — keep within this ecosystem
- **Timeline**: incremental improvements, start with docs, tests, and CI

## Key Decisions

| Decision                                          | Rationale                                                | Outcome   |
| ------------------------------------------------- | -------------------------------------------------------- | --------- |
| Focus on small plugins and demo-first development | Lowers maintenance surface and makes features composable | — Pending |

---

_Last updated: 2026-03-03 after initialization_
