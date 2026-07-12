"use client";

/**
 * `@sutra/ui` — the Sutra React component library.
 *
 * Import token styles once at your app root: `import "@sutra/tokens/css";`
 * Icons live at `@sutra/ui/icons`.
 */

export { cn } from "./lib/cn";
export { tv, type VariantProps } from "./lib/variants";

export { Button, type ButtonProps, button, type ButtonVariants } from "./components/Button";
export { Card, type CardProps, card, type CardVariants } from "./components/Card";
export { Badge, type BadgeProps, badge, type BadgeVariants } from "./components/Badge";
export { Avatar, type AvatarProps, avatar, type AvatarVariants } from "./components/Avatar";
export { Skeleton, type SkeletonProps, skeleton, type SkeletonVariants } from "./components/Skeleton";

export {
  Field,
  type FieldProps,
  useFieldControl,
  type FieldControlAria,
} from "./components/Field";
export { Input, type InputProps, input, type InputVariants } from "./components/Input";
export {
  Textarea,
  type TextareaProps,
  textarea,
  type TextareaVariants,
} from "./components/Textarea";
export { Select, type SelectProps, select, type SelectVariants } from "./components/Select";

export { Modal, type ModalProps, modalPanel, type ModalVariants } from "./components/Modal";
export {
  Toast,
  type ToastProps,
  type ToastVariant,
  toast,
  type ToastVariants,
  ToastProvider,
  type ToastProviderProps,
  type ToastOptions,
  useToast,
} from "./components/Toast";
