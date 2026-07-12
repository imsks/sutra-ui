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
