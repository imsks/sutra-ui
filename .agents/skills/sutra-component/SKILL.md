---
name: sutra-component
description: Use when creating, scaffolding, or maintaining a component in the Sutra design system (@sutra/ui) — or when the user types `/sutra-component`, asks to "add a Sutra component", "scaffold a primitive", or "make a new @sutra/ui component". Enforces the 5-file convention, barrel export, changeset, and the build/test/lint/typecheck gate.
version: "1.0.0"
---

# Sutra Component

Scaffolds and maintains components in `@sutra/ui` so every component follows the same 5-file
convention, is accessible, token-driven, and released with a changeset. Read
[CLAUDE.md](../../../CLAUDE.md) first for the repo's non-negotiables — this skill assumes them.

## When to use

- The user wants a new `@sutra/ui` component (a primitive or composite).
- The user wants to extend or refactor an existing component and keep it convention-clean.
- Anytime you are about to hand-create files under `packages/ui/src/components/` — use this instead.

## Before you scaffold — decide, don't guess

1. **Does a canonical component already exist for this job?** If yes, extend it with a typed prop.
   Never create a near-duplicate (rule #1).
2. **Is it a token gap, not a component gap?** If the need is a new color/space/typography role, add a
   token in `packages/tokens/src/` and run `pnpm --filter @sutra/tokens gen:css` instead.
3. **Nail the prop API up front** as typed unions (`variant`, `size`, `tone`, …) — never `string`.
4. **Pick the element + a11y contract** (role, keyboard, focus ring, ARIA) before writing code.

## Scaffold steps

Given a `<Name>` in PascalCase:

1. Create the folder `packages/ui/src/components/<Name>/` with exactly these five files, using
   [references/component-template.md](references/component-template.md) as the canonical starting
   point (replace `Sample`/`sample` with `<Name>`/`<name>`):
   - `<Name>.tsx` — `forwardRef`, union props extending the variants type, JSDoc `@example`.
   - `<Name>.variants.ts` — `tv({ base, variants, defaultVariants })`; all geometry/color here.
   - `<Name>.stories.tsx` — one Ladle story per meaningful variant/state.
   - `<Name>.test.tsx` — Testing Library behavior tests **plus** a `jest-axe` no-violations test.
   - `index.ts` — barrel: component, props type, `tv` fn, variants type.
2. **Wire the public barrel:** add the exports to `packages/ui/src/index.ts` (component, props type,
   variants fn, variants type), grouped with similar components.
3. **Style only with tokens.** Use semantic utilities (`bg-accent`, `text-content`, `border-border`,
   `ring-ring`, …). No hex, no product brand color, no runtime CSS-in-JS, no framer-motion.
4. **Add a changeset:** `pnpm changeset` → select `@sutra/ui` (and `@sutra/tokens` if tokens changed),
   choose the semver bump (new component = `minor`), and describe the change. If running
   non-interactively, write `.changeset/<slug>.md` by hand in the same format as existing entries.
5. **Verify (the gate):**

```bash
pnpm --filter @sutra/ui test
pnpm --filter @sutra/ui typecheck
pnpm --filter @sutra/ui lint
```

Then run the full `pnpm build && pnpm test && pnpm lint && pnpm typecheck` before declaring done.
Fix everything red — do not lower coverage or delete assertions to make it pass.

## Checklist before you finish

- [ ] Folder has all five files; names match `<Name>`.
- [ ] Props are typed unions and the component `forwardRef`s to the right element.
- [ ] Every export has JSDoc with an `@example`.
- [ ] Only Tailwind + token variables for styling; variants live in `<Name>.variants.ts`.
- [ ] a11y: keyboard + focus ring + ARIA correct; `jest-axe` test passes.
- [ ] `packages/ui/src/index.ts` exports the new component.
- [ ] A changeset exists.
- [ ] `pnpm build && pnpm test && pnpm lint && pnpm typecheck` all green.

## Roadmap

Automated scaffolding beyond this skill (a ROADMAP MCP server that generates components/PRs from
roadmap items) is planned; see [ROADMAP.md](../../../ROADMAP.md). Until then, this skill is the source
of truth for authoring Sutra components.
