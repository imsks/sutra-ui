/**
 * Elevation (box-shadow) tokens for Sutra. Soft and low-contrast to keep the
 * editorial, restrained feel. `focus` is reserved for the accessible focus ring
 * fallback where an outline is not appropriate.
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(15 23 42 / 0.06)",
  md: "0 2px 8px -2px rgb(15 23 42 / 0.10), 0 1px 2px 0 rgb(15 23 42 / 0.06)",
  lg: "0 8px 24px -6px rgb(15 23 42 / 0.14), 0 2px 6px -2px rgb(15 23 42 / 0.08)",
  xl: "0 18px 48px -12px rgb(15 23 42 / 0.22)",
} as const;

/** Union of shadow token names. */
export type Shadow = keyof typeof shadows;
