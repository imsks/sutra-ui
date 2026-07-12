import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Toast}. */
export const toast = tv({
  base: [
    "pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3",
    "rounded-lg border p-4 shadow-lg",
  ],
  variants: {
    variant: {
      info: "border-border bg-surface text-content",
      success: "border-success/30 bg-success-subtle text-success-subtle-content",
      warning: "border-warning/30 bg-warning-subtle text-warning-subtle-content",
      danger: "border-danger/30 bg-danger-subtle text-danger-subtle-content",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

/** Typed variant props accepted by {@link Toast}. */
export type ToastVariants = VariantProps<typeof toast>;
