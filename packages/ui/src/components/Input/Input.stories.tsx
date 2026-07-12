import type { Story } from "@ladle/react";

import { Input } from "./Input";

export default { title: "Forms/Input" };

const wrap = { display: "flex", flexDirection: "column" as const, gap: 12, maxWidth: 320 };

/** Sizes. */
export const Sizes: Story = () => (
  <div style={wrap}>
    <Input size="sm" aria-label="small" placeholder="Small" />
    <Input size="md" aria-label="medium" placeholder="Medium" />
    <Input size="lg" aria-label="large" placeholder="Large" />
  </div>
);

/** Invalid and disabled states. */
export const States: Story = () => (
  <div style={wrap}>
    <Input aria-label="invalid" invalid defaultValue="Wrong" />
    <Input aria-label="disabled" disabled placeholder="Disabled" />
  </div>
);
