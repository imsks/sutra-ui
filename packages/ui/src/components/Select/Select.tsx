import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { useFieldControl } from "../Field";
import { select, type SelectVariants } from "./Select.variants";

/** Props for {@link Select}. */
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SelectVariants {
  /** Force the invalid state. Set automatically when wrapped in a Field with an error. */
  invalid?: boolean;
  /** Non-selectable prompt rendered as the first, empty option. */
  placeholder?: string;
  /** `<option>` / `<optgroup>` elements. */
  children?: ReactNode;
}

/**
 * A styled wrapper over the native `<select>` — keyboard, typeahead, and mobile
 * pickers come free from the platform. Wrap in a {@link Field} for a label.
 *
 * @example
 * <Field label="State">
 *   <Select placeholder="Choose a state" name="state">
 *     <option value="BR">Bihar</option>
 *     <option value="MH">Maharashtra</option>
 *   </Select>
 * </Field>
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    size,
    invalid,
    placeholder,
    id,
    "aria-describedby": ariaDescribedBy,
    children,
    defaultValue,
    value,
    ...props
  },
  ref,
) {
  const field = useFieldControl({ id });
  const describedBy = [field["aria-describedby"], ariaDescribedBy].filter(Boolean).join(" ");
  // Only default to the placeholder when the select is uncontrolled and has no
  // explicit default, so it does not fight a controlled `value`.
  const resolvedDefault =
    value === undefined && defaultValue === undefined && placeholder ? "" : defaultValue;

  return (
    <div className="relative inline-flex w-full items-center">
      <select
        ref={ref}
        id={field.id}
        className={cn(select({ size }), className)}
        aria-describedby={describedBy || undefined}
        aria-invalid={invalid ?? field["aria-invalid"]}
        aria-required={field["aria-required"]}
        value={value}
        defaultValue={resolvedDefault}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 size-4 text-content-muted"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});
