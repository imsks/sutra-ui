import type { Story } from "@ladle/react";

import { Text } from "./Text";

export default { title: "Primitives/Text" };

const stack = { display: "flex", flexDirection: "column" as const, gap: 12 };

/** The full type scale, display through caption. */
export const Scale: Story = () => (
  <div style={stack}>
    <Text variant="display">Display</Text>
    <Text variant="h1">Heading 1</Text>
    <Text variant="h2">Heading 2</Text>
    <Text variant="h3">Heading 3</Text>
    <Text variant="h4">Heading 4</Text>
    <Text variant="body">Body copy sets the baseline reading rhythm.</Text>
    <Text variant="small">Small supporting text.</Text>
    <Text variant="caption" color="muted">
      Caption / metadata
    </Text>
  </div>
);

/** Semantic color roles. */
export const Colors: Story = () => (
  <div style={stack}>
    <Text color="default">Default</Text>
    <Text color="muted">Muted</Text>
    <Text color="subtle">Subtle</Text>
    <Text color="accent">Accent</Text>
    <Text color="danger">Danger</Text>
    <Text color="success">Success</Text>
  </div>
);

/** Decoupling style from semantics with `as`. */
export const StyleVsSemantics: Story = () => (
  <Text variant="h2" as="h1">
    Looks like h2, is an h1
  </Text>
);

/** Bilingual display: Devanagari on the display face, Latin alongside. */
export const Bilingual: Story = () => (
  <div style={stack}>
    <Text variant="h1">राज्य सभा</Text>
    <Text variant="body">Rajya Sabha — the Council of States.</Text>
  </div>
);
