import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { cn } from "./cn";

/**
 * Merge a slotted element's own props with the props Sutra wants to inject.
 * Class names are merged with {@link cn}, inline styles are shallow-merged, and
 * event handlers with the same name are composed (child handler runs first).
 * The child's own props win for everything else.
 */
function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...slotProps };

  for (const key of Object.keys(childProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    const isHandler = /^on[A-Z]/.test(key);

    if (isHandler && typeof slotValue === "function" && typeof childValue === "function") {
      merged[key] = (...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(...args);
        (slotValue as (...a: unknown[]) => void)(...args);
      };
    } else if (key === "className") {
      merged[key] = cn(slotValue as string, childValue as string);
    } else if (key === "style") {
      merged[key] = { ...(slotValue as object), ...(childValue as object) };
    } else {
      merged[key] = childValue;
    }
  }

  return merged;
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref != null) (ref as { current: T | null }).current = node;
    }
  };
}

/** Props accepted by {@link Slot}. */
export type SlotProps = HTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLElement>;

/**
 * Renders its single child, merging Sutra's props (className, style, handlers,
 * ARIA, ref) onto it instead of emitting a wrapper element. This powers the
 * `asChild` pattern, letting router links (e.g. Next.js `<Link>`) receive Sutra
 * styling without Sutra depending on any framework.
 *
 * @example
 * <Link asChild>
 *   <NextLink href="/about">About</NextLink>
 * </Link>
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...slotProps },
  ref,
) {
  if (!isValidElement(children)) {
    if (Children.count(children) > 1) Children.only(null);
    return null;
  }

  const child = children as ReactElement<Record<string, unknown> & { ref?: Ref<HTMLElement> }>;
  const childProps = child.props;
  const merged = mergeProps(slotProps as Record<string, unknown>, childProps);
  merged.ref = composeRefs(ref, child.props.ref);

  return cloneElement(child, merged);
});
