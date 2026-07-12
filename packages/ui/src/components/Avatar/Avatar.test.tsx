import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders an image with the name as alt text", () => {
    render(<Avatar src="/pm.jpg" name="Narendra Modi" />);
    expect(screen.getByRole("img", { name: "Narendra Modi" })).toBeInTheDocument();
    expect(screen.getByAltText("Narendra Modi")).toHaveAttribute("src", "/pm.jpg");
  });

  it("shows initials when no image is provided", () => {
    render(<Avatar name="Rekha Sharma" />);
    expect(screen.getByText("RS")).toBeInTheDocument();
  });

  it("falls back to initials when the image fails to load", () => {
    render(<Avatar src="/broken.jpg" name="Amit Shah" />);
    const img = screen.getByAltText("Amit Shah");
    fireEvent.error(img);
    expect(screen.getByText("AS")).toBeInTheDocument();
  });

  it("exposes an accessible label via role=img", () => {
    render(<Avatar name="Sonia Gandhi" />);
    expect(screen.getByRole("img", { name: "Sonia Gandhi" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar name="Test User" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
