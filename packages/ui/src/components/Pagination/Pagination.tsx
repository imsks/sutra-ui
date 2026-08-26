import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Button } from "../Button";
import { Link } from "../Link";
import { Text } from "../Text";
import { pagination } from "./Pagination.variants";

/** Props for a pagination link control. */
export interface PaginationHrefControl {
  href: string;
  label?: string;
}

/** Props for a pagination button control. */
export interface PaginationActionControl {
  onClick: () => void;
  label?: string;
}

/** Props for {@link Pagination}. */
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current page (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Previous-page link. Omit on the first page. */
  previous?: PaginationHrefControl | PaginationActionControl;
  /** Next-page link. Omit on the last page. */
  next?: PaginationHrefControl | PaginationActionControl;
  /** Override the default "Page X of Y" label. */
  pageLabel?: ReactNode;
}

function isHrefControl(
  control: PaginationHrefControl | PaginationActionControl,
): control is PaginationHrefControl {
  return "href" in control;
}

function PaginationControl({
  control,
  fallbackLabel,
}: {
  control: PaginationHrefControl | PaginationActionControl;
  fallbackLabel: string;
}) {
  const label = control.label ?? fallbackLabel;
  const classes = pagination().control();

  if (isHrefControl(control)) {
    return (
      <Link href={control.href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <Button type="button" variant="secondary" size="sm" className={classes} onClick={control.onClick}>
      {label}
    </Button>
  );
}

/**
 * Previous/next page navigation with an accessible page indicator.
 *
 * @example
 * <Pagination
 *   page={2}
 *   totalPages={5}
 *   previous={{ href: "/items?page=1" }}
 *   next={{ href: "/items?page=3" }}
 * />
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { className, page, totalPages, previous, next, pageLabel, ...props },
  ref,
) {
  if (totalPages <= 1) return null;

  const slots = pagination();

  return (
    <nav
      ref={ref}
      className={cn(slots.root(), className)}
      aria-label="Pagination"
      {...props}
    >
      {previous ? <PaginationControl control={previous} fallbackLabel="Previous" /> : <span />}
      <Text as="span" variant="small" className={slots.label()}>
        {pageLabel ?? `Page ${page} of ${totalPages}`}
      </Text>
      {next ? <PaginationControl control={next} fallbackLabel="Next" /> : <span />}
    </nav>
  );
});
