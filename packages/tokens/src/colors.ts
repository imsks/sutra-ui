/**
 * Color tokens for Sutra.
 *
 * Two layers:
 * 1. `palette` — fixed, raw color ramps. These never change between light/dark.
 * 2. `themeLight` / `themeDark` — semantic role tokens that reference the palette
 *    and flip between light and dark mode. Components should consume roles
 *    (e.g. `surface`, `content`, `accent`) rather than raw ramp stops.
 *
 * The brand `accent` role is intentionally themeable: consuming products override
 * the generated `--sutra-color-accent-*` CSS variables to apply their own brand.
 */

/** Fixed, raw color ramps. Values are the same in light and dark mode. */
export const palette = {
  /** Slate-leaning neutral ramp — the editorial ink/paper foundation. */
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  /** Warm ochre/terracotta — Sutra's default, themeable brand accent. */
  accent: {
    50: "#fdf6ed",
    100: "#f8e6cc",
    200: "#f0cd9b",
    300: "#e6ad66",
    400: "#db8f3d",
    500: "#c9741f",
    600: "#ab5a17",
    700: "#8a4515",
    800: "#703917",
    900: "#5c3016",
    950: "#341809",
  },
  /** Success (emerald). */
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
  },
  /** Warning (amber). */
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
  },
  /** Danger (red). */
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  /** Info (blue). */
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
} as const;

const white = "#ffffff";

/**
 * Semantic role tokens for light mode. Each key becomes a
 * `--sutra-color-<role>` CSS variable and a Tailwind utility color.
 */
export const themeLight = {
  surface: white,
  "surface-subtle": palette.neutral[50],
  "surface-muted": palette.neutral[100],

  content: palette.neutral[900],
  "content-muted": palette.neutral[500],
  "content-subtle": palette.neutral[400],

  border: palette.neutral[200],
  "border-strong": palette.neutral[300],

  ring: palette.accent[500],

  accent: palette.accent[600],
  "accent-hover": palette.accent[700],
  "accent-contrast": white,
  "accent-subtle": palette.accent[50],
  "accent-subtle-content": palette.accent[700],

  success: palette.success[600],
  "success-contrast": white,
  "success-subtle": palette.success[50],
  "success-subtle-content": palette.success[700],

  warning: palette.warning[600],
  "warning-contrast": palette.neutral[950],
  "warning-subtle": palette.warning[50],
  "warning-subtle-content": palette.warning[700],

  danger: palette.danger[600],
  "danger-contrast": white,
  "danger-subtle": palette.danger[50],
  "danger-subtle-content": palette.danger[700],

  info: palette.info[600],
  "info-contrast": white,
  "info-subtle": palette.info[50],
  "info-subtle-content": palette.info[700],
} as const;

/**
 * Semantic role tokens for dark mode. Keys mirror {@link themeLight} exactly;
 * a contract test guarantees the two stay in sync.
 */
export const themeDark = {
  surface: palette.neutral[900],
  "surface-subtle": palette.neutral[800],
  "surface-muted": "#243244",

  content: palette.neutral[100],
  "content-muted": palette.neutral[400],
  "content-subtle": palette.neutral[500],

  border: palette.neutral[700],
  "border-strong": palette.neutral[600],

  ring: palette.accent[400],

  accent: palette.accent[500],
  "accent-hover": palette.accent[400],
  "accent-contrast": palette.neutral[950],
  "accent-subtle": "#2a1a0f",
  "accent-subtle-content": palette.accent[200],

  success: palette.success[500],
  "success-contrast": palette.neutral[950],
  "success-subtle": "#0f2417",
  "success-subtle-content": palette.success[100],

  warning: palette.warning[500],
  "warning-contrast": palette.neutral[950],
  "warning-subtle": "#2a1e08",
  "warning-subtle-content": palette.warning[100],

  danger: palette.danger[500],
  "danger-contrast": palette.neutral[950],
  "danger-subtle": "#2a1213",
  "danger-subtle-content": palette.danger[100],

  info: palette.info[500],
  "info-contrast": palette.neutral[950],
  "info-subtle": "#0f1e33",
  "info-subtle-content": palette.info[100],
} as const;

/** Union of every semantic color role name. */
export type ColorRole = keyof typeof themeLight;

/** Union of every raw palette ramp name. */
export type PaletteName = keyof typeof palette;
