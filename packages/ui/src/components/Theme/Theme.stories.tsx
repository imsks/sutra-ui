import type { Story } from "@ladle/react";

import { ThemeProvider, useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export default { title: "Primitives/Theme" };

function Readout() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <span className="text-content">
          preference: <strong>{theme}</strong> — resolved: <strong>{resolvedTheme}</strong>
        </span>
      </div>
      <div className="flex gap-2">
        <button className="rounded-md border border-border px-3 py-1" onClick={() => setTheme("light")}>
          Light
        </button>
        <button className="rounded-md border border-border px-3 py-1" onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button className="rounded-md border border-border px-3 py-1" onClick={() => setTheme("system")}>
          System
        </button>
      </div>
    </div>
  );
}

/**
 * Note: Ladle's own toolbar theme switch also toggles `.dark`. This story owns
 * its own provider to demonstrate the standalone API.
 */
export const Toggle: Story = () => (
  <ThemeProvider disableStorage>
    <Readout />
  </ThemeProvider>
);
