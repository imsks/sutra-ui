import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { card, type CardVariants } from "./Card.variants";

/** Props for {@link Card}. */
export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardVariants {}

/**
 * A surface container that groups related content with a consistent border,
 * radius, and padding.
 *
 * @example
 * <Card variant="elevated" padding="md">
 *   <h3>Bill status</h3>
 *   <p>Passed in Lok Sabha.</p>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, padding, ...props },
  ref,
) {
  return <div ref={ref} className={cn(card({ variant, padding }), className)} {...props} />;
});
