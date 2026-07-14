import { tv, type VariantProps } from "../../lib/variants";

/**
 * Variant map for {@link Text}. Heading variants use the display face; body
 * variants use the body face. Both faces are token-driven so products can
 * swap typefaces by overriding `--sutra-font-*`.
 */
export const text = tv({
  base: "",
  variants: {
    variant: {
      display: "font-display font-bold text-5xl leading-tight tracking-tight",
      h1: "font-display font-bold text-4xl leading-tight tracking-tight",
      h2: "font-display font-semibold text-3xl leading-snug tracking-tight",
      h3: "font-display font-semibold text-2xl leading-snug",
      h4: "font-display font-medium text-xl leading-snug",
      body: "font-body text-base leading-normal",
      small: "font-body text-sm leading-normal",
      caption: "font-body text-xs leading-normal",
    },
    color: {
      default: "text-content",
      muted: "text-content-muted",
      subtle: "text-content-subtle",
      accent: "text-accent",
      danger: "text-danger",
      success: "text-success",
      inverse: "text-surface",
    },
    weight: {
      light: "font-light",
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
  },
});

/** Typed variant props accepted by {@link Text}. */
export type TextVariants = VariantProps<typeof text>;
