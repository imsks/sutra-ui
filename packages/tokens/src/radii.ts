/**
 * Border-radius tokens for Sutra. Restrained and editorial — corners are soft
 * but never pill-round except where explicitly needed (`full`).
 */
export const radii = {
  none: "0px",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

/** Union of radius token names. */
export type Radius = keyof typeof radii;
