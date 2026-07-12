import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { badge, type BadgeVariants } from "./Badge.variants";

/** Props for {@link Badge}. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

/**
 * A small status or category label. Defaults to a restrained "subtle" tone; use
 * `tone="solid"` for stronger emphasis.
 *
 * @example
 * <Badge variant="success">Verified</Badge>
 * <Badge variant="danger" tone="solid">Disputed</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, tone, size, ...props },
  ref,
) {
  return <span ref={ref} className={cn(badge({ variant, tone, size }), className)} {...props} />;
});
