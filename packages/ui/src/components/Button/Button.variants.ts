import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Button}. */
export const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-md border font-medium transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary: "border-transparent bg-accent text-accent-contrast hover:bg-accent-hover",
      secondary: "border-border bg-surface text-content hover:bg-surface-subtle",
      ghost: "border-transparent bg-transparent text-content hover:bg-surface-subtle",
      danger: "border-transparent bg-danger text-danger-contrast hover:bg-danger/90",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

/** Typed variant props accepted by {@link Button}. */
export type ButtonVariants = VariantProps<typeof button>;
