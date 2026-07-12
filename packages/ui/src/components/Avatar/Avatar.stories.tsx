import type { Story } from "@ladle/react";

import { Avatar } from "./Avatar";

export default { title: "Primitives/Avatar" };

const row = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const };

/** Sizes, using the initials fallback. */
export const Sizes: Story = () => (
  <div style={row}>
    <Avatar name="Narendra Modi" size="xs" />
    <Avatar name="Narendra Modi" size="sm" />
    <Avatar name="Narendra Modi" size="md" />
    <Avatar name="Narendra Modi" size="lg" />
    <Avatar name="Narendra Modi" size="xl" />
  </div>
);

/** Circle and square shapes. */
export const Shapes: Story = () => (
  <div style={row}>
    <Avatar name="Rekha Sharma" shape="circle" size="lg" />
    <Avatar name="Rekha Sharma" shape="square" size="lg" />
  </div>
);

/** With a loaded image. */
export const WithImage: Story = () => (
  <div style={row}>
    <Avatar
      size="lg"
      name="Sample User"
      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&h=96&fit=crop"
    />
  </div>
);

/** No name and no image: neutral placeholder glyph. */
export const Placeholder: Story = () => (
  <div style={row}>
    <Avatar size="lg" />
  </div>
);
