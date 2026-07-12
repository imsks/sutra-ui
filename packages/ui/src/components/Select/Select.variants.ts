import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Select}. */
export const select = tv({
  base: [
    "w-full appearance-none rounded-md border border-border bg-surface pr-9 text-content",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger",
  ],
  variants: {
    size: {
      sm: "h-8 pl-3 text-sm",
      md: "h-10 pl-3 text-base",
      lg: "h-12 pl-4 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Typed variant props accepted by {@link Select}. */
export type SelectVariants = VariantProps<typeof select>;
