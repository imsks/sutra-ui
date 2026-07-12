import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Input}. */
export const input = tv({
  base: [
    "w-full rounded-md border border-border bg-surface text-content",
    "placeholder:text-content-subtle transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger",
  ],
  variants: {
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Typed variant props accepted by {@link Input}. */
export type InputVariants = VariantProps<typeof input>;
