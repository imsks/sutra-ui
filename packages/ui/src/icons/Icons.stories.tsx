import type { Story } from "@ladle/react";
import type { ComponentType } from "react";

import * as icons from "./index";

export default { title: "Foundations/Icons" };

const entries = Object.entries(icons).filter(
  ([, value]) => typeof value === "object" || typeof value === "function",
) as [string, ComponentType<{ className?: string }>][];

/** The full curated icon set. */
export const All: Story = () => (
  <div
    style={{
      display: "grid",
      gap: 16,
      gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
    }}
  >
    {entries.map(([name, Icon]) => (
      <div
        key={name}
        className="flex flex-col items-center gap-2 rounded-md border border-border p-3 text-center"
      >
        <Icon className="size-5 text-content" />
        <span className="text-xs text-content-muted">{name}</span>
      </div>
    ))}
  </div>
);
