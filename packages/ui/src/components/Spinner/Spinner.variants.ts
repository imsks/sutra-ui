import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Spinner}. */
export const spinner = tv({
  base: "inline-block shrink-0 animate-spin rounded-full border-current border-r-transparent motion-reduce:animate-none",
  variants: {
    size: {
      sm: "size-4 border-2",
      md: "size-5 border-2",
      lg: "size-8 border-[3px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Typed variant props accepted by {@link Spinner}. */
export type SpinnerVariants = VariantProps<typeof spinner>;
