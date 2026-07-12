import "@sutra/tokens/css";
import "../src/styles/theme.css";

import { type GlobalProvider, ThemeState, useLadleContext } from "@ladle/react";
import { useEffect } from "react";

/**
 * Wires Ladle's built-in theme toggle to Sutra's `.dark` class so the token CSS
 * variables flip, and frames every story on the themed `surface` background.
 */
export const Provider: GlobalProvider = ({ children }) => {
  const { globalState } = useLadleContext();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", globalState.theme === ThemeState.Dark);
  }, [globalState.theme]);

  return (
    <div className="bg-surface text-content font-sans" style={{ minHeight: "100vh", padding: 32 }}>
      {children}
    </div>
  );
};
