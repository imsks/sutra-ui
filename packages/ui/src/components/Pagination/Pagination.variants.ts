import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Pagination}. */
export const pagination = tv({
  slots: {
    root: "flex items-center justify-between gap-4 border-t border-border pt-6 mt-8",
    label: "text-sm text-content-muted",
    control:
      "inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-content transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  },
});

/** Typed variant props accepted by {@link Pagination}. */
export type PaginationVariants = VariantProps<typeof pagination>;
