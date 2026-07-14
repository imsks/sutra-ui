import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "../../lib/cn";
import { useTheme } from "./ThemeProvider";

/** Props for {@link ThemeToggle}. */
export type ThemeToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "children"
>;

/**
 * An accessible button that flips between light and dark. Reads and updates the
 * nearest {@link ThemeProvider}; its label always describes the action it will
 * perform.
 *
 * @example
 * <ThemeProvider><ThemeToggle /></ThemeProvider>
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(function ThemeToggle(
  { className, type = "button", ...props },
  ref,
) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const nextIsDark = resolvedTheme === "light";

  return (
    <button
      ref={ref}
      type={type}
      onClick={toggleTheme}
      aria-label={nextIsDark ? "Switch to dark theme" : "Switch to light theme"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-border",
        "bg-surface text-content-muted transition-colors hover:bg-surface-subtle hover:text-content",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
      {...props}
    >
      {nextIsDark ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
    </button>
  );
});
