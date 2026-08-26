import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Text } from "../Text";
import { alert, type AlertVariants } from "./Alert.variants";

/** Props for {@link Alert}. */
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title">, AlertVariants {
  /** Optional short heading shown above the body copy. */
  title?: ReactNode;
}

/**
 * Inline status or feedback message for forms, empty states, and banners.
 *
 * @example
 * <Alert variant="danger" title="Unable to save">Please try again.</Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant, title, children, role, ...props },
  ref,
) {
  const resolvedRole =
    role ?? (variant === "danger" || variant === "warning" ? "alert" : "status");

  return (
    <div
      ref={ref}
      role={resolvedRole}
      className={cn(alert({ variant }), className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title ? (
          <Text as="p" variant="small" className="mb-1 font-semibold">
            {title}
          </Text>
        ) : null}
        {children ? (
          <Text as="p" variant="small">
            {children}
          </Text>
        ) : null}
      </div>
    </div>
  );
});
