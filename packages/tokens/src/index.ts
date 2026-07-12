/**
 * `@sutra/tokens` — framework-agnostic design tokens for the Sutra design system.
 *
 * Exposes tokens three ways:
 * - TypeScript constants (this entry)
 * - CSS variables (`@sutra/tokens/css`)
 * - a Tailwind preset (`@sutra/tokens/tailwind`)
 */

export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./radii";
export * from "./shadows";
export { PREFIX, varName, rootVars, darkVars } from "./internal/css-model";
export { sutraPreset } from "./tailwind/preset";
