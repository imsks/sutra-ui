import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Toast } from "./Toast";
import { ToastProvider, useToast } from "./ToastProvider";

afterEach(() => {
  vi.useRealTimers();
});

describe("Toast (presentational)", () => {
  it("renders title and description", () => {
    render(<Toast title="Saved" description="Your changes were saved" />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved")).toBeInTheDocument();
  });

  it("uses role=status for polite variants", () => {
    render(<Toast variant="success" title="ok" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses role=alert for danger", () => {
    render(<Toast variant="danger" title="bad" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("calls onDismiss from the dismiss button", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<Toast title="x" onDismiss={onDismiss} />);
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Toast variant="info" title="Note" description="Body" onDismiss={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

function Trigger() {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: "Saved", description: "Done" })}>notify</button>;
}

describe("ToastProvider / useToast", () => {
  it("shows a toast when enqueued", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "notify" }));
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("auto-dismisses after the duration", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider duration={1000}>
        <Trigger />
      </ToastProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "notify" }));
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("exposes a notifications region", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "notify" }));
    expect(screen.getByRole("region", { name: "Notifications" })).toBeInTheDocument();
  });

  it("throws when useToast is used without a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
