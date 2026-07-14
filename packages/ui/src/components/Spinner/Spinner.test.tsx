import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("is decorative (aria-hidden) by default", () => {
    const { container } = render(<Spinner />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("announces a loading status when labelled", () => {
    render(<Spinner label="Loading results" />);
    expect(screen.getByRole("status", { name: "Loading results" })).toBeInTheDocument();
  });

  it("applies the size variant", () => {
    const { container } = render(<Spinner size="lg" />);
    expect((container.firstElementChild as HTMLElement).className).toContain("size-8");
  });

  it("has no accessibility violations when labelled", async () => {
    const { container } = render(<Spinner label="Loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
