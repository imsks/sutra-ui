import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Slot } from "../../lib/slot";
import { link, type LinkVariants } from "./Link.variants";

/** Props for {@link Link}. */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkVariants {
  /**
   * Render the styles onto the child element instead of emitting an `<a>`.
   * Use this to apply Sutra link styling to a framework router link, e.g.
   * `<Link asChild><NextLink href="/x">…</NextLink></Link>`.
   */
  asChild?: boolean;
  /**
   * Mark the link as leaving the site. Adds `target="_blank"` +
   * `rel="noopener noreferrer"` and a trailing decorative icon slot.
   */
  external?: boolean;
  children?: ReactNode;
}

/**
 * A styled navigational link. Framework-agnostic: renders a plain `<a>` by
 * default, or forwards its styling to a router link via `asChild`.
 *
 * @example
 * <Link href="/bills" variant="nav">Bills</Link>
 * <Link href="https://example.gov" external>Source</Link>
 * <Link asChild><NextLink href="/about">About</NextLink></Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { asChild = false, external = false, variant, className, children, ...props },
  ref,
) {
  const classes = cn(link({ variant }), className);
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : undefined;

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...externalProps} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <a ref={ref} className={classes} {...externalProps} {...props}>
      {children}
    </a>
  );
});
