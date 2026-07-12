import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Card}. */
export const card = tv({
  base: "rounded-lg bg-surface text-content",
  variants: {
    variant: {
      elevated: "border border-border shadow-md",
      outlined: "border border-border",
      subtle: "border border-transparent bg-surface-subtle",
    },
    padding: {
      none: "",
      sm: "p-3",
      md: "p-5",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "outlined",
    padding: "md",
  },
});

/** Typed variant props accepted by {@link Card}. */
export type CardVariants = VariantProps<typeof card>;
