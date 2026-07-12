import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Bill status</Card>);
    expect(screen.getByText("Bill status")).toBeInTheDocument();
  });

  it("applies variant and padding classes", () => {
    render(
      <Card variant="elevated" padding="lg" data-testid="card">
        x
      </Card>,
    );
    const el = screen.getByTestId("card");
    expect(el.className).toContain("shadow-md");
    expect(el.className).toContain("p-8");
  });

  it("forwards arbitrary props", () => {
    render(
      <Card role="region" aria-label="stats">
        x
      </Card>,
    );
    expect(screen.getByRole("region", { name: "stats" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card>
        <h3>Title</h3>
        <p>Body</p>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
