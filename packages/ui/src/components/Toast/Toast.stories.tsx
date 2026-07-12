import type { Story } from "@ladle/react";

import { Button } from "../Button";
import { Toast } from "./Toast";
import { ToastProvider, useToast } from "./ToastProvider";

export default { title: "Overlays/Toast" };

/** Static presentation of each variant. */
export const Variants: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Toast variant="info" title="Heads up" description="A new bill was added." onDismiss={() => {}} />
    <Toast variant="success" title="Saved" description="Your changes were saved." onDismiss={() => {}} />
    <Toast variant="warning" title="Check this" description="Some fields need attention." onDismiss={() => {}} />
    <Toast variant="danger" title="Failed" description="Could not save your changes." onDismiss={() => {}} />
  </div>
);

function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button onClick={() => toast({ title: "Saved", variant: "success" })}>Success</Button>
      <Button
        variant="secondary"
        onClick={() => toast({ title: "Heads up", description: "Something happened", variant: "info" })}
      >
        Info
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ title: "Failed", description: "Try again", variant: "danger" })}
      >
        Danger
      </Button>
    </div>
  );
}

/** The imperative API via ToastProvider + useToast. */
export const Imperative: Story = () => (
  <ToastProvider>
    <Demo />
  </ToastProvider>
);
