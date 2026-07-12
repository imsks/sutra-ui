import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Close, LinkIcon, Search, Spinner } from "./index";

describe("icons", () => {
  it("re-exports renderable icon components", () => {
    const { container } = render(<Search aria-hidden />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("exposes friendly aliases", () => {
    expect(Spinner).toBeDefined();
    expect(Close).toBeDefined();
    expect(LinkIcon).toBeDefined();
  });
});
