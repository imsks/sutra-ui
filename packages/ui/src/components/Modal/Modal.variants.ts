import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for the {@link Modal} panel. */
export const modalPanel = tv({
  base: [
    "relative z-10 flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden",
    "rounded-lg border border-border bg-surface text-content shadow-xl",
    "focus:outline-none",
  ],
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-lg",
      lg: "max-w-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Typed size variant accepted by {@link Modal}. */
export type ModalVariants = VariantProps<typeof modalPanel>;
