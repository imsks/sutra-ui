import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Textarea}. */
export const textarea = tv({
  base: [
    "w-full rounded-md border border-border bg-surface px-3 py-2 text-content",
    "placeholder:text-content-subtle transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger",
  ],
  variants: {
    size: {
      sm: "min-h-16 text-sm",
      md: "min-h-24 text-base",
      lg: "min-h-36 text-lg",
    },
    resize: {
      none: "resize-none",
      vertical: "resize-y",
      both: "resize",
    },
  },
  defaultVariants: {
    size: "md",
    resize: "vertical",
  },
});

/** Typed variant props accepted by {@link Textarea}. */
export type TextareaVariants = VariantProps<typeof textarea>;
