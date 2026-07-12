import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/cn";
import { modalPanel, type ModalVariants } from "./Modal.variants";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/** Props for {@link Modal}. */
export interface ModalProps extends ModalVariants {
  /** Whether the modal is visible. */
  open: boolean;
  /** Called when the user requests to close (Esc, backdrop, or close button). */
  onClose: () => void;
  /** Accessible title, rendered as the heading and wired to `aria-labelledby`. */
  title?: string;
  /** Supporting text below the title, wired to `aria-describedby`. */
  description?: string;
  /** Modal body content. */
  children?: ReactNode;
  /** Optional footer, typically action buttons. */
  footer?: ReactNode;
  /** Close when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdrop?: boolean;
  /** Close when Escape is pressed. Defaults to `true`. */
  closeOnEsc?: boolean;
  /** Render the header close button. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Extra classes for the panel. */
  className?: string;
}

/**
 * An accessible modal dialog: focus trap, Escape to close, restored focus, body
 * scroll lock, and `role="dialog"` + `aria-modal` wiring.
 *
 * @example
 * <Modal open={open} onClose={close} title="Confirm" footer={<Button onClick={close}>OK</Button>}>
 *   Are you sure?
 * </Modal>
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size,
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel ? panel.querySelectorAll<HTMLElement>(FOCUSABLE) : null;
    (focusables && focusables.length > 0 ? focusables[0]! : panel)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc) {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, closeOnEsc]);

  if (!open || typeof document === "undefined") return null;

  const hasHeader = Boolean(title) || Boolean(description) || showCloseButton;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(modalPanel({ size }), className)}
      >
        {hasHeader ? (
          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div className="min-w-0">
              {title ? (
                <h2 id={titleId} className="font-display text-xl text-content">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id={descriptionId} className="mt-1 text-sm text-content-muted">
                  {description}
                </p>
              ) : null}
            </div>
            {showCloseButton ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="-m-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-content-muted transition-colors hover:bg-surface-subtle hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
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
        ) : null}
        <div className="overflow-auto p-5">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-3 border-t border-border p-5">{footer}</div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
