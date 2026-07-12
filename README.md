# Sutra

**Sutra** (सूत्र — Sanskrit for _"codified rule / the thread that ties things together"_) is an
open-source design system: the shared UI foundation across multiple products, starting with
[Rajniti](https://github.com/) (civic tech) and Saransh (hyperlocal news).

Built in public. TypeScript-first. Accessible by default. Dark mode from day one.
Hindi + English typography. Zero runtime CSS-in-JS.

## Packages

| Package                        | Description                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| [`@sutra/tokens`](packages/tokens) | Design tokens as TypeScript constants, CSS variables, and a Tailwind v4 preset. No React. |
| [`@sutra/ui`](packages/ui)         | React component library + curated icon set (`@sutra/ui/icons`). Depends on tokens. |

## Design language

The products consuming Sutra are civic-tech, news, and information products. **Trust and clarity
matter more than playfulness** — editorial, restrained, high-legibility. Newsroom-adjacent, not
"SaaS startup gradient," not "playful indie."

- **Neutral editorial base** (slate ink/paper) + **semantic colors** (success / warning / danger / info).
- A **themeable brand accent** (`--sutra-accent-*`) each product overrides. Sutra ships a warm
  ochre/terracotta default; Rajniti keeps its orange, Saransh picks its own.
- **Type**: [Rozha One](https://fonts.google.com/specimen/Rozha+One) (display) + [Mukta](https://fonts.google.com/specimen/Mukta) (body) — both render Devanagari + Latin cleanly.

## Quick start (consuming Sutra)

```bash
pnpm add @sutra/ui @sutra/tokens
```

```tsx
// 1. Import the token CSS variables once, at your app root.
import "@sutra/tokens/css";

// 2. Use components.
import { Button } from "@sutra/ui";

export function Example() {
  return <Button variant="primary">नमस्ते / Hello</Button>;
}
```

```ts
// tailwind: extend with the Sutra preset (Tailwind v4)
import { sutraPreset } from "@sutra/tokens/tailwind";
```

Dark mode: add the `dark` class to a root element (`<html class="dark">`); every token flips via
CSS variables.

## Local development

Requires Node >= 18.18 and `pnpm`.

```bash
pnpm install
pnpm build          # build all packages (tsup)
pnpm test           # run all tests (Vitest + Testing Library + jest-axe)
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit across packages
pnpm --filter @sutra/ui ladle:dev   # visual component docs (Ladle)
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The public roadmap lives in [ROADMAP.md](ROADMAP.md).

## License

[MIT](LICENSE)
