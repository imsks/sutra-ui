import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Avatar}. */
export const avatar = tv({
  base: [
    "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden",
    "bg-surface-muted font-medium uppercase text-content-muted",
  ],
  variants: {
    size: {
      xs: "size-6 text-[0.625rem]",
      sm: "size-8 text-xs",
      md: "size-10 text-sm",
      lg: "size-12 text-base",
      xl: "size-16 text-lg",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

/** Typed variant props accepted by {@link Avatar}. */
export type AvatarVariants = VariantProps<typeof avatar>;
