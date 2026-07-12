import { createContext, useContext, useId, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

interface FieldContextValue {
  controlId: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** ARIA attributes a form control should spread onto itself to join a Field. */
export interface FieldControlAria {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-required"?: true;
}

/**
 * Connect a form control to its surrounding {@link Field} (shared id,
 * description/error wiring, required/invalid state). Falls back to a generated
 * id when the control is used standalone.
 */
export function useFieldControl(overrides?: { id?: string }): FieldControlAria {
  const ctx = useContext(FieldContext);
  const fallbackId = useId();
  return {
    id: overrides?.id ?? ctx?.controlId ?? fallbackId,
    "aria-describedby": ctx?.describedBy,
    "aria-invalid": ctx?.invalid ? true : undefined,
    "aria-required": ctx?.required ? true : undefined,
  };
}

/** Props for {@link Field}. */
export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  /** Visible, associated label text. */
  label: string;
  /** Optional helper text describing the control. */
  description?: string;
  /** Error message. When set, the control is marked invalid and this is announced. */
  error?: string;
  /** Marks the control as required and appends a visual asterisk. */
  required?: boolean;
  /** Override the generated control id. */
  id?: string;
  /** A single form control (Input, Textarea, Select). */
  children: ReactNode;
}

/**
 * Labels a form control and wires up description, error, and required/invalid
 * ARIA state. Wrap any Sutra input to make it accessible by default.
 *
 * @example
 * <Field label="Constituency" description="Where you vote" error={errors.seat}>
 *   <Input name="seat" />
 * </Field>
 */
export function Field({
  label,
  description,
  error,
  required = false,
  id,
  className,
  children,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <label htmlFor={controlId} className="text-sm font-medium text-content">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            {" *"}
          </span>
        ) : null}
      </label>
      <FieldContext.Provider value={{ controlId, describedBy, invalid: Boolean(error), required }}>
        {children}
      </FieldContext.Provider>
      {description ? (
        <p id={descriptionId} className="text-sm text-content-muted">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
