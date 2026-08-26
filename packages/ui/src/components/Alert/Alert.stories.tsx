import type { Story } from "@ladle/react";

import { Alert } from "./Alert";

export default { title: "Feedback/Alert" };

const stack = { display: "grid", gap: 12, maxWidth: 480 };

/** All semantic variants. */
export const Variants: Story = () => (
  <div style={stack}>
    <Alert variant="info" title="Heads up">
      We&apos;ll email you when Saransh is ready.
    </Alert>
    <Alert variant="success" title="Saved">
      Your preferences were updated.
    </Alert>
    <Alert variant="warning" title="Review needed">
      One source could not be verified automatically.
    </Alert>
    <Alert variant="danger" title="Submission failed">
      Please check your connection and try again.
    </Alert>
  </div>
);

/** Body-only alert without a title. */
export const BodyOnly: Story = () => (
  <Alert variant="info">No newsletters, no spam — just one launch email.</Alert>
);
