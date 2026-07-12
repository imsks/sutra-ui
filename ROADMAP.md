# Sutra Roadmap

Sutra is built in public. This roadmap is intentionally conservative: ship a small, excellent core
before expanding surface area.

## v0.0.1 — Foundation (current)

The first published release. Scope is deliberately tight.

- [x] Monorepo: pnpm workspaces + Turborepo
- [x] `@sutra/tokens`: color, spacing, typography, radii, shadow tokens as TS constants, CSS
      variables (`:root` + `.dark`), and a Tailwind v4 preset
- [x] Themeable brand accent via `--sutra-accent-*`
- [x] Hindi + English typography (Rozha One display + Mukta body) via `@fontsource`
- [x] 10 accessible React primitives:
      Button, Card, Input, Textarea, Select (styled native), Badge, Avatar, Skeleton, Modal, Toast
      (+ a small `Field` form helper)
- [x] Curated icon set at `@sutra/ui/icons`
- [x] Ladle visual documentation
- [x] Vitest + Testing Library + `jest-axe` coverage
- [x] Changesets release flow

## v0.1+ — Deferred (explicitly out of scope for v0.0.1)

Noted here so the intent is on record, not forgotten.

### Components & tokens

- **Custom listbox `Select`** — a fully accessible, non-native combobox (keyboard nav,
  `aria-activedescendant`, typeahead, popover positioning). v0.0.1 ships a styled native `<select>`.
- **Extract `@sutra/icons`** — promote icons from the `@sutra/ui/icons` subpath into a standalone
  package if/when the icon set grows independently. Import path stays stable for consumers.
- More primitives (Tabs, Tooltip, Popover, Menu/Dropdown, Table, Pagination, Breadcrumb, Switch,
  Checkbox, Radio, Progress, Alert/Banner) — added deliberately, one canonical component per job.

### Tooling & ecosystem

- **MCP server** — let Claude Code / Cursor query tokens and component APIs directly.
- **Figma plugin / Figma token sync** — keep design and code tokens in lockstep.
- **CLI** — `sutra add <component>` scaffolding (shadcn-style), theme generation.
- **Animation library integration** — v0.0.1 uses basic CSS transitions only.
- **Storybook migration** — Ladle stories are Storybook-compatible; migrate if the ecosystem
  (a11y addon, interaction tests, autodocs) becomes worth the weight.
- **Automated publishing** — a GitHub Action running Changesets on merge to `main`. v0.0.1 publishes
  manually.

## Principles (do not drift from these)

1. One canonical component per job — no overlapping variants.
2. Accessible by default — keyboard, focus, ARIA are not optional.
3. Zero runtime CSS-in-JS.
4. TypeScript-first with union props, JSDoc on every export.
5. AI-agent friendly — predictable structure, strong types, self-documenting.
