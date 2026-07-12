import type { Story } from "@ladle/react";

import { Textarea } from "./Textarea";

export default { title: "Forms/Textarea" };

const wrap = { display: "flex", flexDirection: "column" as const, gap: 12, maxWidth: 360 };

/** Sizes. */
export const Sizes: Story = () => (
  <div style={wrap}>
    <Textarea size="sm" aria-label="small" placeholder="Small" />
    <Textarea size="md" aria-label="medium" placeholder="Medium" />
    <Textarea size="lg" aria-label="large" placeholder="Large" />
  </div>
);

/** Invalid and non-resizable states. */
export const States: Story = () => (
  <div style={wrap}>
    <Textarea aria-label="invalid" invalid defaultValue="Too long…" />
    <Textarea aria-label="fixed" resize="none" placeholder="Fixed size" />
  </div>
);
