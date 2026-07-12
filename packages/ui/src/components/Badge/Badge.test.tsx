import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Verified</Badge>);
    expect(screen.getByText("Verified")).toBeInTheDocument();
  });

  it("uses subtle tone classes by default", () => {
    render(<Badge variant="success">ok</Badge>);
    expect(screen.getByText("ok").className).toContain("bg-success-subtle");
  });

  it("switches to solid tone classes", () => {
    render(
      <Badge variant="danger" tone="solid">
        no
      </Badge>,
    );
    expect(screen.getByText("no").className).toContain("bg-danger");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge variant="info">Sourced</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
