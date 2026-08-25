# Sutra Design System

Sutra is the shared, open-source design system powering civic-tech and news products. It provides framework-agnostic design tokens and accessible React components.

## Language

**Token**:
A named design decision (color, spacing, typography, shadow) stored as a TypeScript constant and exported as a CSS variable (`--sutra-*`).
_Avoid_: Variable, constant, style

**Component**:
A reusable React UI primitive that consumes tokens for styling. Ships with `tailwind-variants` for variant composition.
_Avoid_: Widget, element, block

**Variant**:
A typed prop value that switches a component's visual appearance (e.g., `variant: "primary" | "secondary"`).
_Avoid_: Style, theme, mode

**Primitive**:
A low-level component that serves as a building block for higher-level patterns (Button, Input, Card).
_Avoid_: Base component, atomic component

**asChild**:
A polymorphism pattern using `Slot` that lets the component delegate its root element to a child (e.g., wrapping a Next.js `Link`).
_Avoid_: Render prop, as prop

## Consuming Products

**Consumer**:
A downstream product (Rajniti, Saransh) that imports `@sutra_ui/ui` and `@sutra_ui/tokens` as npm dependencies.
_Avoid_: Client, user

**Override**:
A consumer's CSS that redefines token variables to re-skin Sutra components (e.g., setting `--sutra-color-accent-*` to a brand palette).
_Avoid_: Customization, theming

## Example Dialogue

**Designer**: The button in Rajniti needs to be orange, but Sutra buttons are blue.

**Dev**: Sutra's Button uses the `accent` token. Rajniti overrides `--sutra-color-accent-*` in its root CSS — no changes to Sutra needed.

**Designer**: What if we want a red "danger" variant?

**Dev**: That's a Sutra concern. We add a `danger` variant to the Button component, wire it to `--sutra-color-danger-*`, and consumers inherit it automatically.
