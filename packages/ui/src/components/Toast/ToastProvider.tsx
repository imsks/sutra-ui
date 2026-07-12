import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { Toast, type ToastVariant } from "./Toast";

/** Options accepted by the imperative `toast()` function. */
export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. `0` disables auto-dismiss. Falls back to the provider default. */
  duration?: number;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  /** Enqueue a toast; returns its id. */
  toast: (options: ToastOptions) => string;
  /** Dismiss a toast by id. */
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;
function nextId(): string {
  counter += 1;
  return `sutra-toast-${counter}`;
}

/** Props for {@link ToastProvider}. */
export interface ToastProviderProps {
  children: ReactNode;
  /** Default auto-dismiss delay in ms. Defaults to 5000. */
  duration?: number;
}

/**
 * Provides the toast queue and renders notifications in a fixed viewport. Wrap
 * your app once, then call {@link useToast} anywhere beneath it.
 *
 * @example
 * <ToastProvider><App /></ToastProvider>
 */
export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = nextId();
    setToasts((prev) => [...prev, { id, ...options }]);
    return id;
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <div
              role="region"
              aria-label="Notifications"
              className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-3"
            >
              {toasts.map((record) => (
                <ToastItem
                  key={record.id}
                  record={record}
                  defaultDuration={duration}
                  onDismiss={dismiss}
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

function ToastItem({
  record,
  defaultDuration,
  onDismiss,
}: {
  record: ToastRecord;
  defaultDuration: number;
  onDismiss: (id: string) => void;
}) {
  const duration = record.duration ?? defaultDuration;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = window.setTimeout(() => onDismiss(record.id), duration);
    return () => window.clearTimeout(timer);
  }, [record.id, duration, onDismiss]);

  return (
    <Toast
      variant={record.variant}
      title={record.title}
      description={record.description}
      onDismiss={() => onDismiss(record.id)}
    />
  );
}

/**
 * Access the toast API. Must be called within a {@link ToastProvider}.
 *
 * @example
 * const { toast } = useToast();
 * toast({ title: "Saved", variant: "success" });
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}
