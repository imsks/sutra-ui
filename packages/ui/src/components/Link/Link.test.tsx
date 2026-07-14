import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with its href", () => {
    render(<Link href="/bills">Bills</Link>);
    const anchor = screen.getByRole("link", { name: "Bills" });
    expect(anchor).toHaveAttribute("href", "/bills");
  });

  it("adds target and rel for external links", () => {
    render(
      <Link href="https://example.gov" external>
        Source
      </Link>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies the variant classes", () => {
    render(
      <Link href="#" variant="nav">
        Nav
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("after:bg-accent");
  });

  it("forwards styling to the child when asChild", () => {
    render(
      <Link asChild variant="underline">
        <button type="button">Go</button>
      </Link>,
    );
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn.className).toContain("underline");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Link href="/x">Accessible link</Link>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
