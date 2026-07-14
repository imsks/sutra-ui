import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Skeleton}. */
export const skeleton = tv({
  base: "block",
  variants: {
    variant: {
      text: "rounded-sm",
      circle: "rounded-full",
      rect: "rounded-md",
    },
    animation: {
      /** Gentle opacity pulse (Tailwind built-in). */
      pulse: "animate-pulse bg-surface-muted",
      /** A sweeping gradient highlight; keyframe ships in @sutra/tokens/css. */
      shimmer: "sutra-shimmer",
      /** Static placeholder, no motion. */
      none: "bg-surface-muted",
    },
  },
  defaultVariants: {
    variant: "rect",
    animation: "pulse",
  },
});

/** Typed variant props accepted by {@link Skeleton}. */
export type SkeletonVariants = VariantProps<typeof skeleton>;
