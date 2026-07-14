# Sutra component template

Canonical starting point for a new `@sutra/ui` component. Copy each block into
`packages/ui/src/components/<Name>/`, then replace `Sample` → `<Name>` (PascalCase) and
`sample` → `<name>` (camelCase, used for the `tv` function name). Delete variants/props you do not
need, but keep the structure, JSDoc, and the `jest-axe` test.

This template mirrors the existing `Badge` component — the smallest complete example in the repo.

---

## `Sample.variants.ts`

```ts
import { tv, type VariantProps } from "../../lib/variants";

/** Variant map for {@link Sample}. */
export const sample = tv({
  base: "inline-flex items-center justify-center rounded-md font-medium",
  variants: {
    variant: {
      neutral: "bg-surface-muted text-content",
      accent: "bg-accent text-accent-contrast",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
  },
});

/** Typed variant props accepted by {@link Sample}. */
export type SampleVariants = VariantProps<typeof sample>;
```

---

## `Sample.tsx`

```tsx
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { sample, type SampleVariants } from "./Sample.variants";

/** Props for {@link Sample}. */
export interface SampleProps extends HTMLAttributes<HTMLDivElement>, SampleVariants {}

/**
 * One-line description of what Sample is for.
 *
 * @example
 * <Sample variant="accent">Hello</Sample>
 */
export const Sample = forwardRef<HTMLDivElement, SampleProps>(function Sample(
  { className, variant, size, ...props },
  ref,
) {
  return <div ref={ref} className={cn(sample({ variant, size }), className)} {...props} />;
});
```

> Interactive components (buttons, inputs, toggles): render the correct element, keep the visible
> focus ring (`focus-visible:ring-2 focus-visible:ring-ring`), wire keyboard handlers, and set ARIA.
> For polymorphism, accept `asChild` and render via `Slot` from `../../lib/slot` instead of adding a
> framework dependency.

---

## `Sample.stories.tsx`

```tsx
import type { Story } from "@ladle/react";

import { Sample } from "./Sample";

export default { title: "Primitives/Sample" };

const row = { display: "flex", gap: 8, flexWrap: "wrap" as const, alignItems: "center" };

/** Every variant. */
export const Variants: Story = () => (
  <div style={row}>
    <Sample variant="neutral">Neutral</Sample>
    <Sample variant="accent">Accent</Sample>
  </div>
);

/** Sizes. */
export const Sizes: Story = () => (
  <div style={row}>
    <Sample size="sm">Small</Sample>
    <Sample size="md">Medium</Sample>
  </div>
);
```

---

## `Sample.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Sample } from "./Sample";

describe("Sample", () => {
  it("renders its content", () => {
    render(<Sample>Hello</Sample>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Sample variant="accent">Hi</Sample>);
    expect(screen.getByText("Hi").className).toContain("bg-accent");
  });

  it("merges a custom className", () => {
    render(<Sample className="custom-class">Hi</Sample>);
    expect(screen.getByText("Hi")).toHaveClass("custom-class");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Sample variant="accent">Accessible</Sample>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

---

## `index.ts`

```ts
export { Sample, type SampleProps } from "./Sample";
export { sample, type SampleVariants } from "./Sample.variants";
```

---

## Then, outside the folder

1. Add to `packages/ui/src/index.ts`:

```ts
export { Sample, type SampleProps, sample, type SampleVariants } from "./components/Sample";
```

2. Add a changeset (`.changeset/<slug>.md`):

```md
---
"@sutra/ui": minor
---

Add `Sample` primitive.
```

3. Run the gate: `pnpm build && pnpm test && pnpm lint && pnpm typecheck`.
