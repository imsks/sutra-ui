import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("is decorative (aria-hidden) by default", () => {
    const { container } = render(<Skeleton width={100} height={20} />);
    const el = container.firstElementChild;
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("applies width and height styles", () => {
    const { container } = render(<Skeleton width={120} height={40} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("40px");
  });

  it("defaults text height to 1em", () => {
    const { container } = render(<Skeleton variant="text" width="50%" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.height).toBe("1em");
  });

  it("announces a loading status when labelled", () => {
    render(<Skeleton label="Loading avatar" width={40} height={40} />);
    expect(screen.getByRole("status", { name: "Loading avatar" })).toBeInTheDocument();
  });

  it("pulses by default", () => {
    const { container } = render(<Skeleton width={100} height={20} />);
    expect((container.firstElementChild as HTMLElement).className).toContain("animate-pulse");
  });

  it("uses the shimmer class when animation=shimmer", () => {
    const { container } = render(<Skeleton animation="shimmer" width={100} height={20} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("sutra-shimmer");
    expect(el.className).not.toContain("animate-pulse");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Skeleton label="Loading" width={100} height={20} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
