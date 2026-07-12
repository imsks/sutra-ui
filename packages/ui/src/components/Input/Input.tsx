import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { useFieldControl } from "../Field";
import { input, type InputVariants } from "./Input.variants";

/** Props for {@link Input}. */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariants {
  /** Force the invalid state. Set automatically when wrapped in a Field with an error. */
  invalid?: boolean;
}

/**
 * A single-line text input. Wire it to a label and errors by wrapping in a
 * {@link Field}; it also works standalone with an `aria-label`.
 *
 * @example
 * <Field label="Email"><Input type="email" name="email" /></Field>
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, invalid, id, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const field = useFieldControl({ id });
  const describedBy = [field["aria-describedby"], ariaDescribedBy].filter(Boolean).join(" ");

  return (
    <input
      ref={ref}
      id={field.id}
      className={cn(input({ size }), className)}
      aria-describedby={describedBy || undefined}
      aria-invalid={invalid ?? field["aria-invalid"]}
      aria-required={field["aria-required"]}
      {...props}
    />
  );
});
