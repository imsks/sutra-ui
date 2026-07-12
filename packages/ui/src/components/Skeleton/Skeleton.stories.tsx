import type { Story } from "@ladle/react";

import { Skeleton } from "./Skeleton";

export default { title: "Primitives/Skeleton" };

/** Text lines of varying width. */
export const Text: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="60%" />
  </div>
);

/** A typical card placeholder combining shapes. */
export const CardPlaceholder: Story = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", maxWidth: 320 }}>
    <Skeleton variant="circle" width={48} height={48} />
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
);

/** Rectangular block. */
export const Rect: Story = () => <Skeleton width={280} height={120} />;
