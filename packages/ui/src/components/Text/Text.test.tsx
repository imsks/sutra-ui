import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Text } from "./Text";

describe("Text", () => {
  it("renders body copy as a paragraph by default", () => {
    render(<Text>Hello</Text>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
  });

  it("maps heading variants to matching heading elements", () => {
    render(<Text variant="h2">Title</Text>);
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBeInTheDocument();
  });

  it("decouples style from semantics via `as`", () => {
    render(
      <Text variant="h2" as="h1">
        Title
      </Text>,
    );
    const heading = screen.getByRole("heading", { level: 1, name: "Title" });
    expect(heading.className).toContain("text-3xl");
  });

  it("applies color and weight variants", () => {
    render(
      <Text color="accent" weight="bold">
        Accent
      </Text>,
    );
    const el = screen.getByText("Accent");
    expect(el.className).toContain("text-accent");
    expect(el.className).toContain("font-bold");
  });

  it("forwards arbitrary attributes", () => {
    render(<Text data-testid="t">x</Text>);
    expect(screen.getByTestId("t")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Text variant="h1">Accessible heading</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
