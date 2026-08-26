import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Alert}. */
export const alert = tv({
  base: "flex w-full gap-3 rounded-md border px-4 py-3 text-sm",
  variants: {
    variant: {
      info: "border-info/30 bg-info-subtle text-info-subtle-content",
      success: "border-success/30 bg-success-subtle text-success-subtle-content",
      warning: "border-warning/30 bg-warning-subtle text-warning-subtle-content",
      danger: "border-danger/30 bg-danger-subtle text-danger-subtle-content",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

/** Typed variant props accepted by {@link Alert}. */
export type AlertVariants = VariantProps<typeof alert>;
