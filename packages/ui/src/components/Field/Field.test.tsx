import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Input } from "../Input";
import { Field } from "./Field";

describe("Field", () => {
  it("associates the label with the control", () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBeInstanceOf(HTMLInputElement);
  });

  it("links the description via aria-describedby", () => {
    render(
      <Field label="Email" description="We never share it">
        <Input />
      </Field>,
    );
    const control = screen.getByLabelText("Email");
    const description = screen.getByText("We never share it");
    expect(control.getAttribute("aria-describedby")).toContain(description.id);
  });

  it("marks the control invalid and announces the error", () => {
    render(
      <Field label="Seat" error="Required">
        <Input />
      </Field>,
    );
    const control = screen.getByLabelText("Seat");
    const alert = screen.getByRole("alert");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(alert).toHaveTextContent("Required");
    expect(control.getAttribute("aria-describedby")).toContain(alert.id);
  });

  it("reflects required state", () => {
    render(
      <Field label="Name" required>
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText(/Name/)).toHaveAttribute("aria-required", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field label="Email" description="Helper" required>
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
