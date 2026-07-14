import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Link}. */
export const link = tv({
  base: [
    "inline-flex items-center gap-1 rounded-sm transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ],
  variants: {
    variant: {
      default: "text-accent hover:text-accent-hover hover:underline underline-offset-2",
      subtle: "text-content-muted hover:text-content",
      underline: "text-content underline underline-offset-2 hover:text-accent",
      nav: [
        "relative text-content-muted hover:text-content font-medium",
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left",
        "after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/** Typed variant props accepted by {@link Link}. */
export type LinkVariants = VariantProps<typeof link>;
