import type { Story } from "@ladle/react";

import { Button } from "./Button";

export default { title: "Primitives/Button" };

const row = { display: "flex", gap: 12, flexWrap: "wrap" as const, alignItems: "center" };

/** All four variants side by side. */
export const Variants: Story = () => (
  <div style={row}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Delete</Button>
  </div>
);

/** The three sizes. */
export const Sizes: Story = () => (
  <div style={row}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

/** Disabled and loading states. */
export const States: Story = () => (
  <div style={row}>
    <Button disabled>Disabled</Button>
    <Button isLoading>Saving</Button>
    <Button variant="secondary" isLoading>
      Loading
    </Button>
  </div>
);

/** Full-width block button. */
export const FullWidth: Story = () => (
  <div style={{ maxWidth: 320 }}>
    <Button fullWidth>Continue</Button>
  </div>
);

/** Renders Devanagari and Latin together to verify bilingual typography. */
export const Bilingual: Story = () => (
  <div style={row}>
    <Button>नया जोड़ें / Add new</Button>
    <Button variant="secondary">रद्द करें / Cancel</Button>
  </div>
);
