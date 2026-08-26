import type { Story } from "@ladle/react";

import { Pagination } from "./Pagination";

export default { title: "Navigation/Pagination" };

/** Link-based previous/next controls. */
export const Default: Story = () => (
  <Pagination
    page={2}
    totalPages={5}
    previous={{ href: "#page-1" }}
    next={{ href: "#page-3" }}
  />
);

/** First page hides the previous control. */
export const FirstPage: Story = () => (
  <Pagination page={1} totalPages={4} next={{ href: "#page-2" }} />
);

/** Last page hides the next control. */
export const LastPage: Story = () => (
  <Pagination page={4} totalPages={4} previous={{ href: "#page-3" }} />
);

/** Button controls for client-side pagination. */
export const WithActions: Story = () => (
  <Pagination
    page={3}
    totalPages={6}
    previous={{ onClick: () => undefined, label: "Back" }}
    next={{ onClick: () => undefined, label: "Forward" }}
  />
);
