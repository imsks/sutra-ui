import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** The theme preference a user can choose. */
export type Theme = "light" | "dark" | "system";

/** The concrete theme actually applied to the document. */
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** The current preference, including `"system"`. */
  theme: Theme;
  /** The concrete theme applied to the DOM (`"system"` resolved). */
  resolvedTheme: ResolvedTheme;
  /** Set the preference explicitly. */
  setTheme: (theme: Theme) => void;
  /** Flip between light and dark based on what is currently shown. */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function prefersDark(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(theme: Theme): ResolvedTheme {
  if (theme === "system") return prefersDark() ? "dark" : "light";
  return theme;
}

/** Props for {@link ThemeProvider}. */
export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial preference before any stored value is read. Defaults to `"system"`. */
  defaultTheme?: Theme;
  /** `localStorage` key used to persist the preference. Defaults to `"sutra-theme"`. */
  storageKey?: string;
  /** Disable persistence to `localStorage`. */
  disableStorage?: boolean;
}

/**
 * Dependency-free theme controller. Toggles the `.dark` class on the document
 * root (which flips every `--sutra-*` token) and persists the preference. Wrap
 * your app once, then read state with {@link useTheme}.
 *
 * @example
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sutra-theme",
  disableStorage = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolve(defaultTheme));

  useEffect(() => {
    if (disableStorage) return;
    try {
      const stored = window.localStorage.getItem(storageKey) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeState(stored);
      }
    } catch {
      // Storage unavailable (private mode, SSR hydration edge) — keep default.
    }
  }, [storageKey, disableStorage]);

  useEffect(() => {
    const next = resolve(theme);
    setResolvedTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, [theme]);

  useEffect(() => {
    if (theme !== "system" || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next: ResolvedTheme = media.matches ? "dark" : "light";
      setResolvedTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (disableStorage) return;
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Ignore write failures.
      }
    },
    [storageKey, disableStorage],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolve(theme) === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Access the current theme and controls. Must be called under a
 * {@link ThemeProvider}.
 *
 * @example
 * const { resolvedTheme, toggleTheme } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
