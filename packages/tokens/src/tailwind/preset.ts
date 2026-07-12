/**
 * Tailwind preset for Sutra. Every value references a `--sutra-*` CSS variable,
 * so utilities automatically respond to light/dark mode and per-product accent
 * overrides. Consumers spread this into their Tailwind config `presets`.
 *
 * @example
 * // tailwind.config.ts
 * import { sutraPreset } from "@sutra/tokens/tailwind";
 * export default { presets: [sutraPreset], content: ["./src/**\/*.{ts,tsx}"] };
 */

import { palette } from "../colors";
import { radii } from "../radii";
import { shadows } from "../shadows";
import { spacing } from "../spacing";
import { fontSize, fontWeight, letterSpacing, lineHeight } from "../typography";
import { varName } from "../internal/css-model";

type ColorScale = Record<string, string>;

const v = (name: string): string => `var(${name})`;

/** Build a ramp (e.g. accent.50…950) that references palette CSS variables. */
function ramp(name: string, stops: Record<string, string>): ColorScale {
  const out: ColorScale = {};
  for (const stop of Object.keys(stops)) out[stop] = v(varName.color(`${name}-${stop}`));
  return out;
}

const accent: ColorScale = {
  ...ramp("accent", palette.accent),
  DEFAULT: v(varName.color("accent")),
  hover: v(varName.color("accent-hover")),
  contrast: v(varName.color("accent-contrast")),
  subtle: v(varName.color("accent-subtle")),
  "subtle-content": v(varName.color("accent-subtle-content")),
};

/** Build a semantic color that carries its ramp plus role sub-tokens. */
function semantic(name: string, stops: Record<string, string>): ColorScale {
  return {
    ...ramp(name, stops),
    DEFAULT: v(varName.color(name)),
    contrast: v(varName.color(`${name}-contrast`)),
    subtle: v(varName.color(`${name}-subtle`)),
    "subtle-content": v(varName.color(`${name}-subtle-content`)),
  };
}

function scale(keys: string[], name: (k: string) => string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of keys) out[k] = v(name(k));
  return out;
}

/** The Sutra Tailwind preset object. */
export const sutraPreset = {
  darkMode: ["class", "&:where(.dark, .dark *)"],
  theme: {
    extend: {
      colors: {
        neutral: ramp("neutral", palette.neutral),
        accent,
        success: semantic("success", palette.success),
        warning: semantic("warning", palette.warning),
        danger: semantic("danger", palette.danger),
        info: semantic("info", palette.info),
        surface: {
          DEFAULT: v(varName.color("surface")),
          subtle: v(varName.color("surface-subtle")),
          muted: v(varName.color("surface-muted")),
        },
        content: {
          DEFAULT: v(varName.color("content")),
          muted: v(varName.color("content-muted")),
          subtle: v(varName.color("content-subtle")),
        },
        border: {
          DEFAULT: v(varName.color("border")),
          strong: v(varName.color("border-strong")),
        },
        ring: v(varName.color("ring")),
      },
      fontFamily: {
        display: v(varName.font("display")),
        body: v(varName.font("body")),
        sans: v(varName.font("body")),
        mono: v(varName.font("mono")),
      },
      fontSize: scale(Object.keys(fontSize), varName.text),
      fontWeight: scale(Object.keys(fontWeight), varName.weight),
      lineHeight: scale(Object.keys(lineHeight), varName.leading),
      letterSpacing: scale(Object.keys(letterSpacing), varName.tracking),
      spacing: scale(Object.keys(spacing), varName.space),
      borderRadius: {
        ...scale(Object.keys(radii), varName.radius),
        DEFAULT: v(varName.radius("md")),
      },
      boxShadow: {
        ...scale(Object.keys(shadows), varName.shadow),
        DEFAULT: v(varName.shadow("md")),
      },
    },
  },
} satisfies { darkMode: unknown; theme: { extend: Record<string, unknown> } };

export default sutraPreset;
