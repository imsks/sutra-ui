import { createElement, forwardRef, type ElementType, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { text, type TextVariants } from "./Text.variants";

/** Default HTML element rendered for each variant when `as` is omitted. */
const DEFAULT_ELEMENT: Record<NonNullable<TextVariants["variant"]>, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "p",
  caption: "span",
};

/** Props for {@link Text}. */
export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color">, TextVariants {
  /**
   * Override the rendered element. Defaults to a sensible tag per `variant`
   * (e.g. `h2` for `variant="h2"`, `p` for `variant="body"`). Set this to keep
   * visual style and semantic level independent.
   */
  as?: ElementType;
}

/**
 * The canonical typography primitive for headings and body copy. Visual style
 * (`variant`) is decoupled from semantics (`as`) so you can, say, render an
 * `h1`-sized element as an `h2`.
 *
 * @example
 * <Text variant="h1">Rajya Sabha</Text>
 * <Text variant="body" color="muted">232 sitting members</Text>
 * <Text variant="h2" as="h1">Visually h2, semantically h1</Text>
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as, variant, color, weight, className, ...props },
  ref,
) {
  const Element = as ?? DEFAULT_ELEMENT[variant ?? "body"];
  return createElement(Element, {
    ref,
    className: cn(text({ variant, color, weight }), className),
    ...props,
  });
});
