# CLAUDE.md — Sutra operating guide for AI agents

This file tells Claude Code (and any coding agent) how to work in this repo without breaking its
conventions. It is the fast path; [CONTRIBUTING.md](./CONTRIBUTING.md) is the human-facing companion.
When they disagree, CONTRIBUTING.md wins.

## What Sutra is

Sutra is the shared, open-source design system behind civic-tech and news products (e.g. Rajniti).
It ships two packages from a pnpm + Turborepo monorepo:

- **`@sutra_ui/tokens`** — framework-agnostic design tokens. TypeScript constants are the single source
  of truth; they generate `variables.css` (`--sutra-*` CSS variables) and a Tailwind v4 preset. No React.
- **`@sutra_ui/ui`** — accessible, TypeScript-first React components + icons (`@sutra_ui/ui/icons`). Depends
  on `@sutra_ui/tokens`. Styling is Tailwind utilities bound to token variables via `tailwind-variants`.

Products consume the published npm packages, import `@sutra_ui/tokens/css` once at the app root, and
re-skin Sutra by **overriding token CSS variables** (notably the themeable `--sutra-color-accent-*`
and `--sutra-font-*`). Never hardcode a product's brand color inside a component.

## Repository map

```
sutra-ui/
├── packages/
│   ├── tokens/                      # @sutra_ui/tokens
│   │   └── src/
│   │       ├── scripts/generate-css.ts  # gen:css — TS tokens → variables.css
│   │       └── css/variables.css        # GENERATED, do not hand-edit
│   └── ui/                          # @sutra_ui/ui
│       └── src/
│           ├── index.ts                 # public barrel — every export lives here
│           ├── lib/                     # cn, tv/variants, Slot (asChild)
│           ├── icons/                   # @sutra_ui/ui/icons subpath
│           └── components/<Name>/       # one folder per component (5-file convention)
├── .changeset/                      # one changeset per user-facing change
├── .claude/skills/sutra-component/  # scaffolding skill (mirrored to .agents/skills)
└── CLAUDE.md / CONTRIBUTING.md / README.md / ROADMAP.md
```

## Canonical commands (run from repo root)

```bash
pnpm install                         # bootstrap
pnpm build                           # build all packages (turbo)
pnpm test                            # all vitest suites (includes jest-axe + token drift test)
pnpm lint                            # eslint
pnpm typecheck                       # tsc --noEmit
pnpm format                          # prettier --write
pnpm changeset                       # record a user-facing change (pick package + semver bump)
pnpm --filter @sutra_ui/ui ladle:dev    # visual component docs
pnpm --filter @sutra_ui/ui ladle:build  # build static docs
pnpm --filter @sutra_ui/tokens gen:css  # regenerate token CSS after editing token TS
```

Before finishing any change, the gate is: **`pnpm build && pnpm test && pnpm lint && pnpm typecheck`
all green.** Per the project rule, every testable line ships with tests — do not skip the suite.

## The 5-file component convention

Each component is a self-contained folder `packages/ui/src/components/<Name>/`:

| File                 | Responsibility                                                                   |
| -------------------- | -------------------------------------------------------------------------------- |
| `<Name>.tsx`         | The component. `forwardRef`, typed union props, JSDoc `@example`.                |
| `<Name>.variants.ts` | `tailwind-variants` (`tv`) class map. All geometry/color lives here.             |
| `<Name>.stories.tsx` | Ladle stories covering each meaningful variant/state.                            |
| `<Name>.test.tsx`    | Vitest + Testing Library, including a `jest-axe` no-violations assertion.        |
| `index.ts`           | Barrel: re-export the component, its props type, the `tv` fn, its variants type. |

After creating the folder, **add the exports to `packages/ui/src/index.ts`** and **write a changeset**.

## Non-negotiables

1. **One canonical component per job.** Extend an existing component with a typed prop; never add a
   near-duplicate.
2. **Union props, not `string`.** `variant: "primary" | "secondary"`, never `variant: string`.
3. **JSDoc every export** with a one-line description and at least one `@example`.
4. **Accessible by default.** Keyboard nav, visible focus rings, correct ARIA; ship a `jest-axe` test.
5. **Zero runtime CSS-in-JS.** Only Tailwind utilities + token CSS variables. No `styled`, no geometry
   in inline `style`.
6. **Token-driven color.** Use semantic roles (`bg-accent`, `text-content`, `border-border`, …). Never
   hardcode hex or a product brand color — products override token variables instead.
7. **Defer animation to CSS.** Sutra does not depend on `framer-motion`; use CSS keyframes/transitions
   (see the `sutra-shimmer` utility) so products opt into motion libraries themselves.
8. **`asChild` via `Slot`.** For polymorphism (e.g. wrapping a router `Link`), use `lib/slot.tsx` rather
   than taking a framework dependency.

## Token workflow

Tokens are the source of truth. Edit the TypeScript constants under `packages/tokens/src/`, then run
`pnpm --filter @sutra_ui/tokens gen:css`. **Do not hand-edit `variables.css`** — it is generated, and a
contract test fails on TS ↔ CSS drift. Commit the regenerated CSS with the token change.

## Adding a component, the fast way

Use the bundled skill: **`.claude/skills/sutra-component/`** (mirrored at `.agents/skills/`). It
scaffolds the 5 files from `references/component-template.md`, wires the barrel export, adds a
changeset, and runs `test` + `typecheck` + `lint` to verify. Prefer it over hand-creating files so
scaffolds stay consistent.

## Commits & releases

- Small, conventional commits: `feat(ui): …`, `fix(tokens): …`, `docs: …`.
- Every user-facing change gets a changeset (`pnpm changeset`). Maintainers run `pnpm version-packages`
  then `pnpm release` (builds packages, then `changeset publish`).
- Do not commit or publish unless the user asks.

## Roadmap note

Deeper agent tooling (a ROADMAP MCP server that turns roadmap items into scaffolds/PRs) is the planned
evolution beyond this doc + skill. It is out of scope today; see [ROADMAP.md](./ROADMAP.md).
