import type { Story } from "@ladle/react";
import { useState } from "react";

import { Button } from "../Button";
import { Modal } from "./Modal";

export default { title: "Overlays/Modal" };

/** A confirmation dialog with a footer. */
export const Confirmation: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete record
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this record?"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-content-muted">
          The record and all associated data will be permanently removed.
        </p>
      </Modal>
    </>
  );
};

/** Sizes. */
export const Sizes: Story = () => {
  const [size, setSize] = useState<"sm" | "md" | "lg" | null>(null);
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <Button key={s} variant="secondary" onClick={() => setSize(s)}>
          Open {s}
        </Button>
      ))}
      <Modal open={size !== null} onClose={() => setSize(null)} size={size ?? "md"} title={`Size: ${size}`}>
        <p className="text-content-muted">This dialog uses the {size} width.</p>
      </Modal>
    </div>
  );
};
