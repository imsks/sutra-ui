/**
 * Internal bridge between the TypeScript token constants and CSS custom
 * properties. This is the single source of truth for CSS variable *names*, used
 * by both the generator (`scripts/generate-css.ts`) and the Tailwind preset, so
 * the two can never drift.
 */

import { palette, themeDark, themeLight } from "../colors";
import { radii } from "../radii";
import { shadows } from "../shadows";
import { spacing } from "../spacing";
import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight } from "../typography";

/** Prefix shared by every Sutra CSS custom property. */
export const PREFIX = "--sutra";

/** CSS custom-property names disallow `.`; normalize scale keys like `0.5`. */
const safe = (k: string | number): string => String(k).replace(/\./g, "_");

/**
 * Builders for Sutra CSS custom-property names. Import these anywhere you need
 * to reference a token variable so names stay consistent.
 *
 * @example
 * varName.color("accent"); // "--sutra-color-accent"
 * varName.space("0.5");    // "--sutra-space-0_5"
 */
export const varName = {
  color: (name: string): string => `${PREFIX}-color-${name}`,
  space: (k: string | number): string => `${PREFIX}-space-${safe(k)}`,
  radius: (k: string): string => `${PREFIX}-radius-${k}`,
  shadow: (k: string): string => `${PREFIX}-shadow-${k}`,
  font: (k: string): string => `${PREFIX}-font-${k}`,
  text: (k: string): string => `${PREFIX}-text-${safe(k)}`,
  weight: (k: string): string => `${PREFIX}-weight-${k}`,
  leading: (k: string): string => `${PREFIX}-leading-${k}`,
  tracking: (k: string): string => `${PREFIX}-tracking-${k}`,
} as const;

function paletteVars(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [ramp, stops] of Object.entries(palette)) {
    for (const [stop, value] of Object.entries(stops)) {
      out[varName.color(`${ramp}-${stop}`)] = value;
    }
  }
  return out;
}

function roleVars(theme: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [role, value] of Object.entries(theme)) {
    out[varName.color(role)] = value;
  }
  return out;
}

function scaleVars(
  scale: Record<string, string>,
  name: (k: string) => string,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(scale)) out[name(k)] = v;
  return out;
}

/**
 * All CSS variables that belong in `:root`: the fixed palette, light-mode
 * semantic roles, and every non-color scale (spacing, radii, shadows, type).
 */
export const rootVars: Record<string, string> = {
  ...paletteVars(),
  ...roleVars(themeLight),
  ...scaleVars(spacing, varName.space),
  ...scaleVars(radii, varName.radius),
  ...scaleVars(shadows, varName.shadow),
  ...scaleVars(fontFamily, varName.font),
  ...scaleVars(fontSize, varName.text),
  ...scaleVars(fontWeight, varName.weight),
  ...scaleVars(lineHeight, varName.leading),
  ...scaleVars(letterSpacing, varName.tracking),
};

/** CSS variables overridden under `.dark`: semantic color roles only. */
export const darkVars: Record<string, string> = {
  ...roleVars(themeDark),
};
