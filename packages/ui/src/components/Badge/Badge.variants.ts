import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Badge}. */
export const badge = tv({
  base: "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
  variants: {
    variant: {
      neutral: "",
      accent: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
    },
    tone: {
      subtle: "",
      solid: "",
    },
    size: {
      sm: "h-5 px-2 text-xs",
      md: "h-6 px-2.5 text-sm",
    },
  },
  compoundVariants: [
    { variant: "neutral", tone: "subtle", class: "bg-surface-muted text-content-muted" },
    { variant: "accent", tone: "subtle", class: "bg-accent-subtle text-accent-subtle-content" },
    { variant: "success", tone: "subtle", class: "bg-success-subtle text-success-subtle-content" },
    { variant: "warning", tone: "subtle", class: "bg-warning-subtle text-warning-subtle-content" },
    { variant: "danger", tone: "subtle", class: "bg-danger-subtle text-danger-subtle-content" },
    { variant: "info", tone: "subtle", class: "bg-info-subtle text-info-subtle-content" },
    { variant: "neutral", tone: "solid", class: "bg-content text-surface" },
    { variant: "accent", tone: "solid", class: "bg-accent text-accent-contrast" },
    { variant: "success", tone: "solid", class: "bg-success text-success-contrast" },
    { variant: "warning", tone: "solid", class: "bg-warning text-warning-contrast" },
    { variant: "danger", tone: "solid", class: "bg-danger text-danger-contrast" },
    { variant: "info", tone: "solid", class: "bg-info text-info-contrast" },
  ],
  defaultVariants: {
    variant: "neutral",
    tone: "subtle",
    size: "md",
  },
});

/** Typed variant props accepted by {@link Badge}. */
export type BadgeVariants = VariantProps<typeof badge>;
