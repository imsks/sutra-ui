import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { skeleton, type SkeletonVariants } from "./Skeleton.variants";

/** Props for {@link Skeleton}. */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, SkeletonVariants {
  /** Width as a CSS length or number of pixels. */
  width?: number | string;
  /** Height as a CSS length or number of pixels. */
  height?: number | string;
  /**
   * Accessible loading message. When provided, the skeleton is announced via
   * `role="status"`; otherwise it is treated as decorative (`aria-hidden`).
   */
  label?: string;
}

/**
 * A placeholder shown while content loads. Decorative by default; pass `label`
 * to announce a loading state to assistive tech.
 *
 * @example
 * <Skeleton variant="text" width="60%" />
 * <Skeleton variant="circle" width={40} height={40} label="Loading avatar" />
 * <Skeleton animation="shimmer" width="100%" height={120} />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, variant, animation, width, height, label, style, ...props },
  ref,
) {
  const resolved: CSSProperties = {
    width,
    height: height ?? (variant === "text" ? "1em" : undefined),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={cn(skeleton({ variant, animation }), className)}
      style={resolved}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
});
