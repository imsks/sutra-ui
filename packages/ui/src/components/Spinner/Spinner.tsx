import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { spinner, type SpinnerVariants } from "./Spinner.variants";

/** Props for {@link Spinner}. */
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>, SpinnerVariants {
  /**
   * Accessible loading message. When provided, the spinner is announced via
   * `role="status"`; otherwise it is treated as decorative (`aria-hidden`),
   * which is correct when it sits inside a control that already conveys the
   * busy state (e.g. a loading `Button`).
   */
  label?: string;
}

/**
 * An indeterminate loading indicator. Inherits `currentColor` so it adopts the
 * surrounding text color.
 *
 * @example
 * <Spinner size="lg" label="Loading results" />
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size, label, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(spinner({ size }), className)}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
});
