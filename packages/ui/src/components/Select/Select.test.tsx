import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Select } from "./Select";

function options() {
  return (
    <>
      <option value="BR">Bihar</option>
      <option value="MH">Maharashtra</option>
    </>
  );
}

describe("Select", () => {
  it("renders its options", () => {
    render(<Select aria-label="State">{options()}</Select>);
    expect(screen.getByRole("combobox", { name: "State" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bihar" })).toBeInTheDocument();
  });

  it("renders a disabled placeholder option", () => {
    render(
      <Select aria-label="State" placeholder="Choose">
        {options()}
      </Select>,
    );
    expect(screen.getByRole("option", { name: "Choose" })).toBeDisabled();
  });

  it("changes the selected value", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="State">{options()}</Select>);
    const el = screen.getByRole("combobox", { name: "State" });
    await user.selectOptions(el, "MH");
    expect(el).toHaveValue("MH");
  });

  it("reflects the invalid prop", () => {
    render(<Select aria-label="State" invalid>{options()}</Select>);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Select aria-label="State" placeholder="Choose">
        {options()}
      </Select>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
