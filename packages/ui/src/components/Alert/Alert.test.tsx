import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders title and body content", () => {
    render(
      <Alert variant="success" title="Saved">
        Your changes were stored.
      </Alert>,
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were stored.")).toBeInTheDocument();
  });

  it("uses role=alert for danger messages", () => {
    render(<Alert variant="danger">Something went wrong.</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong.");
  });

  it("uses role=status for informational messages", () => {
    render(<Alert variant="info">All good.</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("All good.");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert variant="warning" title="Review">
        Check the highlighted fields.
      </Alert>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
