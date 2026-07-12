import type { Story } from "@ladle/react";

import { Card } from "./Card";

export default { title: "Primitives/Card" };

/** The three surface treatments. */
export const Variants: Story = () => (
  <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)" }}>
    <Card variant="elevated">
      <h3 className="font-display text-lg">Elevated</h3>
      <p className="text-content-muted">Raised with a soft shadow.</p>
    </Card>
    <Card variant="outlined">
      <h3 className="font-display text-lg">Outlined</h3>
      <p className="text-content-muted">Bordered, flat.</p>
    </Card>
    <Card variant="subtle">
      <h3 className="font-display text-lg">Subtle</h3>
      <p className="text-content-muted">Tinted background.</p>
    </Card>
  </div>
);

/** Padding options. */
export const Padding: Story = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
    <Card padding="sm">Small</Card>
    <Card padding="md">Medium</Card>
    <Card padding="lg">Large</Card>
  </div>
);
