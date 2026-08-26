import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(<Pagination page={1} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the page indicator", () => {
    render(
      <Pagination
        page={2}
        totalPages={5}
        previous={{ href: "/page/1" }}
        next={{ href: "/page/3" }}
      />,
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("renders previous and next links", () => {
    render(
      <Pagination
        page={2}
        totalPages={5}
        previous={{ href: "/page/1", label: "Previous" }}
        next={{ href: "/page/3", label: "Next" }}
      />,
    );
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute("href", "/page/1");
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute("href", "/page/3");
  });

  it("calls the next action handler", async () => {
    const onNext = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        page={1}
        totalPages={3}
        next={{ onClick: onNext, label: "Next" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Pagination
        page={2}
        totalPages={5}
        previous={{ href: "/page/1" }}
        next={{ href: "/page/3" }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
