import type { Story } from "@ladle/react";

import { Badge } from "./Badge";

export default { title: "Primitives/Badge" };

const row = { display: "flex", gap: 8, flexWrap: "wrap" as const, alignItems: "center" };

/** Subtle tone across every variant. */
export const Subtle: Story = () => (
  <div style={row}>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="accent">Accent</Badge>
    <Badge variant="success">Verified</Badge>
    <Badge variant="warning">Pending</Badge>
    <Badge variant="danger">Disputed</Badge>
    <Badge variant="info">Sourced</Badge>
  </div>
);

/** Solid tone for stronger emphasis. */
export const Solid: Story = () => (
  <div style={row}>
    <Badge variant="neutral" tone="solid">
      Neutral
    </Badge>
    <Badge variant="accent" tone="solid">
      Accent
    </Badge>
    <Badge variant="success" tone="solid">
      Verified
    </Badge>
    <Badge variant="danger" tone="solid">
      Disputed
    </Badge>
  </div>
);

/** Sizes. */
export const Sizes: Story = () => (
  <div style={row}>
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
  </div>
);
