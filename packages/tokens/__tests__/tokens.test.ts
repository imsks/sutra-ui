import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { palette, themeDark, themeLight } from "../src/colors";
import { darkVars, rootVars } from "../src/internal/css-model";

const cssPath = fileURLToPath(new URL("../src/css/variables.css", import.meta.url));
const css = readFileSync(cssPath, "utf8");

/** Split the generated CSS into its `:root` and `.dark` declaration blocks. */
function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  expect(start, `expected ${selector} block in variables.css`).toBeGreaterThan(-1);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  return css.slice(open + 1, close);
}

const rootBlock = block(":root");
const darkBlock = block(".dark");

describe("token → CSS contract", () => {
  it("emits every :root variable with its TypeScript value", () => {
    for (const [name, value] of Object.entries(rootVars)) {
      expect(rootBlock, `${name} missing or wrong in :root`).toContain(`${name}: ${value};`);
    }
  });

  it("emits every dark override under .dark", () => {
    for (const [name, value] of Object.entries(darkVars)) {
      expect(darkBlock, `${name} missing or wrong in .dark`).toContain(`${name}: ${value};`);
    }
  });

  it("declares color-scheme for native control theming", () => {
    expect(rootBlock).toContain("color-scheme: light;");
    expect(darkBlock).toContain("color-scheme: dark;");
  });
});

describe("light / dark role parity", () => {
  it("defines the same semantic roles in both themes", () => {
    expect(Object.keys(themeDark).sort()).toEqual(Object.keys(themeLight).sort());
  });

  it("overrides exactly the semantic roles in dark mode", () => {
    const roleVarCount = Object.keys(themeLight).length;
    expect(Object.keys(darkVars)).toHaveLength(roleVarCount);
  });
});

describe("palette integrity", () => {
  it("uses valid 6-digit hex for every palette stop", () => {
    for (const [ramp, stops] of Object.entries(palette)) {
      for (const [stop, value] of Object.entries(stops)) {
        expect(value, `${ramp}-${stop}`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it("has a full neutral and accent ramp", () => {
    expect(Object.keys(palette.neutral)).toHaveLength(11);
    expect(Object.keys(palette.accent)).toHaveLength(11);
  });
});
