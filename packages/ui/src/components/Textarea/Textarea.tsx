import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { useFieldControl } from "../Field";
import { textarea, type TextareaVariants } from "./Textarea.variants";

/** Props for {@link Textarea}. */
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    TextareaVariants {
  /** Force the invalid state. Set automatically when wrapped in a Field with an error. */
  invalid?: boolean;
}

/**
 * A multi-line text input. Wrap in a {@link Field} for a label and errors.
 *
 * @example
 * <Field label="Notes"><Textarea rows={4} name="notes" /></Field>
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, size, resize, invalid, id, "aria-describedby": ariaDescribedBy, ...props },
  ref,
) {
  const field = useFieldControl({ id });
  const describedBy = [field["aria-describedby"], ariaDescribedBy].filter(Boolean).join(" ");

  return (
    <textarea
      ref={ref}
      id={field.id}
      className={cn(textarea({ size, resize }), className)}
      aria-describedby={describedBy || undefined}
      aria-invalid={invalid ?? field["aria-invalid"]}
      aria-required={field["aria-required"]}
      {...props}
    />
  );
});
