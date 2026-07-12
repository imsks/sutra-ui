/**
 * Spacing scale for Sutra, in `rem`. A 4px (0.25rem) base step keeps rhythm
 * predictable across padding, gaps, and layout. Keys map to Tailwind spacing
 * utilities via the preset (e.g. `p-4`, `gap-2`).
 */
export const spacing = {
  0: "0rem",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

/** Union of spacing step keys. */
export type SpacingStep = keyof typeof spacing;
