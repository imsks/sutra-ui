import { createTV } from "tailwind-variants";

/**
 * Sutra's configured `tailwind-variants` factory. Use it to declare typed,
 * conflict-free variant maps for a component in its `<Name>.variants.ts` file.
 *
 * @example
 * export const button = tv({
 *   base: "inline-flex items-center rounded-md",
 *   variants: { variant: { primary: "bg-accent text-accent-contrast" } },
 * });
 */
export const tv = createTV({ twMergeConfig: {} });

export type { VariantProps } from "tailwind-variants";
