import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Slot } from "./slot";

describe("Slot", () => {
  it("renders the child element without an extra wrapper", () => {
    const { container } = render(
      <Slot data-testid="slot">
        <a href="/x">Link</a>
      </Slot>,
    );
    const anchor = screen.getByRole("link", { name: "Link" });
    expect(anchor.tagName).toBe("A");
    expect(container.firstElementChild).toBe(anchor);
  });

  it("merges className from slot and child", () => {
    render(
      <Slot className="slot-class">
        <a href="/x" className="child-class">
          Link
        </a>
      </Slot>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor.className).toContain("slot-class");
    expect(anchor.className).toContain("child-class");
  });

  it("composes event handlers, child first then slot", async () => {
    const order: string[] = [];
    const user = userEvent.setup();
    render(
      <Slot onClick={() => order.push("slot")}>
        <button type="button" onClick={() => order.push("child")}>
          Go
        </button>
      </Slot>,
    );
    await user.click(screen.getByRole("button"));
    expect(order).toEqual(["child", "slot"]);
  });

  it("forwards the ref to the child DOM node", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Slot ref={ref}>
        <a href="/x">Link</a>
      </Slot>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("renders nothing when the child is not a valid element", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<Slot>{"just text"}</Slot>);
    expect(container.firstElementChild).toBeNull();
    spy.mockRestore();
  });
});
