/**
 * Typography tokens for Sutra.
 *
 * Sutra pairs a display face and a body face that both render Devanagari + Latin
 * cleanly: Rozha One (display) and Mukta (body). The token layer only names the
 * families via CSS variables; loading the fonts (e.g. via `@fontsource` or
 * `next/font`) is the consuming app's responsibility.
 */

/**
 * Font-family stacks. `display` drives headings; `body` drives everything else.
 * Both fall back to script-aware system fonts so Devanagari degrades gracefully.
 */
export const fontFamily = {
  display: '"Rozha One", Georgia, "Noto Serif Devanagari", serif',
  body: 'Mukta, system-ui, "Noto Sans Devanagari", -apple-system, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
} as const;

/** Modular type scale (rem). Body copy sits at `base`. */
export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
} as const;

/** Font weights. Mukta ships 300–700; Rozha One is single-weight (400). */
export const fontWeight = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/** Line heights, unitless. `relaxed` is the default reading measure. */
export const lineHeight = {
  none: "1",
  tight: "1.15",
  snug: "1.35",
  normal: "1.5",
  relaxed: "1.7",
} as const;

/** Letter spacing (em). Display headings tighten; labels track slightly wider. */
export const letterSpacing = {
  tight: "-0.02em",
  normal: "0em",
  wide: "0.02em",
} as const;

/** Union of type-scale step names. */
export type FontSize = keyof typeof fontSize;
