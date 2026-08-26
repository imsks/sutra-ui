# Contributing to Sutra

Thanks for helping build Sutra in public. This guide keeps the codebase predictable for both humans
and AI agents (Claude Code, Cursor).

## Prerequisites

- Node >= 18.18
- pnpm (`corepack enable` or install manually)

```bash
pnpm install
```

## Repository layout

```
sutra-ui/
├── packages/
│   ├── tokens/   # @sutra/tokens — design tokens, CSS vars, Tailwind preset (no React)
│   └── ui/       # @sutra/ui — React components + icons (@sutra/ui/icons)
```

## Everyday commands

```bash
pnpm build                          # build all packages
pnpm test                           # run all tests
pnpm lint                           # lint
pnpm typecheck                      # type-check
pnpm format                         # prettier --write
pnpm --filter @sutra/ui ladle:dev   # run the visual docs
pnpm --filter @sutra/tokens gen:css # regenerate token CSS variables
```

## Adding or changing a component

Each component lives in its own self-contained folder under `packages/ui/src/components/<Name>/`:

```
<Name>/
├── <Name>.tsx           # the component (default: forwardRef, typed union props)
├── <Name>.variants.ts   # tailwind-variants definition (no inline style geometry)
├── <Name>.stories.tsx   # Ladle story
├── <Name>.test.tsx      # Vitest + Testing Library + jest-axe
└── index.ts             # barrel export
```

Non-negotiable rules:

1. **One canonical component per job.** Do not add a second component that overlaps an existing one;
   extend it with a typed prop instead.
2. **Union props, not string props.** `variant: "primary" | "secondary"`, never `variant: string`.
3. **JSDoc every export** with a one-line description and an `@example`.
4. **Accessible by default.** Interactive components must handle keyboard nav, visible focus rings,
   and correct ARIA. Every component ships a `jest-axe` assertion.
5. **Zero runtime CSS-in-JS.** Style with Tailwind utilities + token CSS variables only.
6. **Style with variants.** Put class logic in `<Name>.variants.ts` via `tailwind-variants`; avoid
   inline `style` objects for geometry.

## Design tokens

Tokens are the single source of truth. Edit the TypeScript constants in `packages/tokens/src/`, then
regenerate the CSS variables:

```bash
pnpm --filter @sutra/tokens gen:css
```

A contract test guards against TS ↔ CSS drift; run `pnpm test` before committing.

## Tests

Per project rule: **every testable line of code has tests** (unit / integration). Run the full
suite before opening a PR:

```bash
pnpm test
```

## Commits & releases

- Write small, clean, conventional commits (`feat(ui): ...`, `fix(tokens): ...`, `docs: ...`).
- Record user-facing changes with Changesets:

```bash
pnpm changeset
```

Choose the affected packages and a semver bump, and describe the change.

**`production` is the release branch.** Landing work there is what publishes `@sutra_ui/tokens`
and `@sutra_ui/ui` to npm:

1. Open a PR into `production` (typically from `main` or a feature branch) that includes the
   changeset files.
2. CI runs `pnpm build && pnpm test && pnpm lint && pnpm typecheck`.
3. On merge, the Release workflow opens (or updates) a **Version Packages** PR that bumps versions
   and changelogs.
4. Merge that Version Packages PR into `production`. The same workflow then runs `pnpm release`
   (`changeset publish`) and creates GitHub releases.

Manual publish is still available if needed: `pnpm version-packages` then `pnpm release`.

### npm auth for CI

Configure one of:

- **Trusted Publishing (preferred):** on npm, add a trusted publisher for `@sutra_ui/tokens` and
  `@sutra_ui/ui` bound to this GitHub repo and the `release.yml` workflow. The job already requests
  `id-token: write`.
- **Fallback:** store a granular `NPM_TOKEN` (publish access to `@sutra_ui/*`) as a GitHub Actions
  secret named `NPM_TOKEN`.

In repo **Settings → Actions → General**, enable **Allow GitHub Actions to create and approve pull
requests** so the Version Packages PR can be opened.

## Code of conduct

Be respectful and constructive. This is a public, welcoming project.
