import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { toast as toastVariants, type ToastVariants } from "./Toast.variants";

/** The visual style of a toast. */
export type ToastVariant = NonNullable<ToastVariants["variant"]>;

/** Props for {@link Toast}. */
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title">, ToastVariants {
  /** Bold headline of the notification. */
  title?: ReactNode;
  /** Optional supporting text. */
  description?: ReactNode;
  /** When provided, renders a dismiss button that calls this handler. */
  onDismiss?: () => void;
}

/**
 * A single notification. Rendered automatically by {@link ToastProvider}; also
 * usable standalone. Uses `role="alert"` for `danger`, `role="status"` otherwise.
 *
 * @example
 * <Toast variant="success" title="Saved" description="Your changes were saved" />
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { className, variant, title, description, onDismiss, ...props },
  ref,
) {
  const assertive = variant === "danger";
  return (
    <div
      ref={ref}
      role={assertive ? "alert" : "status"}
      aria-live={assertive ? "assertive" : "polite"}
      aria-atomic="true"
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title ? <p className="font-medium">{title}</p> : null}
        {description ? <p className="text-sm opacity-90">{description}</p> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="-m-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3.5">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
});
