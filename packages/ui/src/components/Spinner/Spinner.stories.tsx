import type { Story } from "@ladle/react";

import { Spinner } from "./Spinner";

export default { title: "Primitives/Spinner" };

const row = { display: "flex", gap: 16, alignItems: "center" };

/** The three sizes. */
export const Sizes: Story = () => (
  <div style={row}>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </div>
);

/** Inherits the surrounding text color via `currentColor`. */
export const Colored: Story = () => (
  <div style={row}>
    <span className="text-accent">
      <Spinner size="lg" />
    </span>
    <span className="text-danger">
      <Spinner size="lg" />
    </span>
    <span className="text-content-muted">
      <Spinner size="lg" />
    </span>
  </div>
);

/** Labelled spinner announces a loading status to assistive tech. */
export const Labelled: Story = () => <Spinner size="lg" label="Loading results" />;
