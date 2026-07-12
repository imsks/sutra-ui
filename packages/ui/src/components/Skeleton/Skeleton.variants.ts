import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Skeleton}. */
export const skeleton = tv({
  base: "block animate-pulse bg-surface-muted",
  variants: {
    variant: {
      text: "rounded-sm",
      circle: "rounded-full",
      rect: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "rect",
  },
});

/** Typed variant props accepted by {@link Skeleton}. */
export type SkeletonVariants = VariantProps<typeof skeleton>;
