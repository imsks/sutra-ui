import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("accepts multi-line text", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Notes" />);
    const el = screen.getByRole("textbox", { name: "Notes" });
    await user.type(el, "line one{enter}line two");
    expect(el).toHaveValue("line one\nline two");
  });

  it("applies size and resize classes", () => {
    render(<Textarea aria-label="x" size="lg" resize="none" />);
    const el = screen.getByRole("textbox");
    expect(el.className).toContain("min-h-36");
    expect(el.className).toContain("resize-none");
  });

  it("reflects the invalid prop", () => {
    render(<Textarea aria-label="x" invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea aria-label="Notes" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
