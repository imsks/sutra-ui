import type { Story } from "@ladle/react";

import { Input } from "../Input";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { Field } from "./Field";

export default { title: "Forms/Field" };

const wrap = { display: "flex", flexDirection: "column" as const, gap: 20, maxWidth: 360 };

/** Field wrapping each control, with description and error states. */
export const Controls: Story = () => (
  <div style={wrap}>
    <Field label="Full name" description="As it appears on the electoral roll">
      <Input placeholder="e.g. Rekha Sharma" />
    </Field>
    <Field label="State" required>
      <Select placeholder="Choose a state">
        <option value="BR">Bihar</option>
        <option value="MH">Maharashtra</option>
        <option value="TN">Tamil Nadu</option>
      </Select>
    </Field>
    <Field label="Notes" error="Please keep this under 500 characters">
      <Textarea rows={3} defaultValue="…" />
    </Field>
  </div>
);
