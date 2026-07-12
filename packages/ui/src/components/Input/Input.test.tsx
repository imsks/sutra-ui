import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("accepts typed text", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Email" />);
    const el = screen.getByRole("textbox", { name: "Email" });
    await user.type(el, "hi@sutra.dev");
    expect(el).toHaveValue("hi@sutra.dev");
  });

  it("applies the size class", () => {
    render(<Input aria-label="x" size="lg" />);
    expect(screen.getByRole("textbox").className).toContain("h-12");
  });

  it("reflects the invalid prop", () => {
    render(<Input aria-label="x" invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("can be disabled", () => {
    render(<Input aria-label="x" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Email" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
