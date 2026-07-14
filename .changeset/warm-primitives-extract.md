---
"@sutra_ui/ui": minor
"@sutra_ui/tokens": patch
---

Add five primitives extracted from real product usage: `Text` (decoupled
style/semantics typography), `Link` (framework-agnostic with `asChild`),
`Spinner` (now used internally by `Button`), and a `Theme` module
(`ThemeProvider`, `useTheme`, `ThemeToggle`). Add a `Slot` utility to power the
`asChild` pattern.

`Skeleton` gains an `animation` prop (`pulse` | `shimmer` | `none`); the
`shimmer` keyframe ships in `@sutra_ui/tokens/css` and respects
`prefers-reduced-motion`.
