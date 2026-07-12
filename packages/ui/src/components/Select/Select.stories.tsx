import type { Story } from "@ladle/react";

import { Select } from "./Select";

export default { title: "Forms/Select" };

const wrap = { display: "flex", flexDirection: "column" as const, gap: 12, maxWidth: 320 };

const states = (
  <>
    <option value="BR">Bihar</option>
    <option value="MH">Maharashtra</option>
    <option value="TN">Tamil Nadu</option>
    <option value="UP">Uttar Pradesh</option>
  </>
);

/** Sizes with a placeholder prompt. */
export const Sizes: Story = () => (
  <div style={wrap}>
    <Select size="sm" aria-label="small" placeholder="Small">
      {states}
    </Select>
    <Select size="md" aria-label="medium" placeholder="Medium">
      {states}
    </Select>
    <Select size="lg" aria-label="large" placeholder="Large">
      {states}
    </Select>
  </div>
);

/** Invalid and disabled states. */
export const States: Story = () => (
  <div style={wrap}>
    <Select aria-label="invalid" invalid defaultValue="BR">
      {states}
    </Select>
    <Select aria-label="disabled" disabled placeholder="Disabled">
      {states}
    </Select>
  </div>
);
