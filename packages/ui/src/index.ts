/**
 * `@sutra_ui/ui` — the Sutra React component library.
 *
 * The published bundle is marked as a client boundary ("use client") by the
 * build; see scripts/prepend-use-client.mjs.
 *
 * Import token styles once at your app root: `import "@sutra_ui/tokens/css";`
 * Icons live at `@sutra_ui/ui/icons`.
 */

export { cn } from "./lib/cn";
export { tv, type VariantProps } from "./lib/variants";
export { Slot, type SlotProps } from "./lib/slot";

export { Button, type ButtonProps, button, type ButtonVariants } from "./components/Button";
export { Card, type CardProps, card, type CardVariants } from "./components/Card";
export { Badge, type BadgeProps, badge, type BadgeVariants } from "./components/Badge";
export { Avatar, type AvatarProps, avatar, type AvatarVariants } from "./components/Avatar";
export { Skeleton, type SkeletonProps, skeleton, type SkeletonVariants } from "./components/Skeleton";
export { Text, type TextProps, text, type TextVariants } from "./components/Text";
export { Link, type LinkProps, link, type LinkVariants } from "./components/Link";
export { Spinner, type SpinnerProps, spinner, type SpinnerVariants } from "./components/Spinner";
export {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
  type Theme,
  type ResolvedTheme,
  ThemeToggle,
  type ThemeToggleProps,
} from "./components/Theme";

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
