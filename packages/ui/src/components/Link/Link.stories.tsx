import type { Story } from "@ladle/react";

import { Link } from "./Link";

export default { title: "Primitives/Link" };

const row = { display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" as const };

/** Visual variants. */
export const Variants: Story = () => (
  <div style={row}>
    <Link href="#">Default</Link>
    <Link href="#" variant="subtle">
      Subtle
    </Link>
    <Link href="#" variant="underline">
      Underline
    </Link>
    <Link href="#" variant="nav">
      Nav
    </Link>
  </div>
);

/** External links get target + rel automatically. */
export const External: Story = () => (
  <Link href="https://sansad.in" external>
    Parliament of India
  </Link>
);

/** Bilingual navigation links. */
export const Bilingual: Story = () => (
  <div style={row}>
    <Link href="#" variant="nav">
      प्रतिनिधि / Representatives
    </Link>
    <Link href="#" variant="nav">
      विधेयक / Bills
    </Link>
  </div>
);
