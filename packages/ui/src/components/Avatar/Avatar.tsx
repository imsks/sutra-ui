import { forwardRef, useState, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { avatar, type AvatarVariants } from "./Avatar.variants";

/** Props for {@link Avatar}. */
export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    AvatarVariants {
  /** Image URL. Falls back to initials (or a neutral placeholder) if missing or it fails to load. */
  src?: string;
  /** Person or entity name. Drives the initials fallback and the accessible label. */
  name?: string;
  /** Overrides the alt text / accessible label. Defaults to `name`. */
  alt?: string;
}

/** Derive up to two uppercase initials from a name. */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * Displays a user or entity image with a graceful initials fallback when the
 * image is absent or fails to load.
 *
 * @example
 * <Avatar src="/pm.jpg" name="Narendra Modi" size="lg" />
 * <Avatar name="Rekha Sharma" />
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size, shape, src, name, alt, ...props },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const label = alt ?? name ?? "";
  const showImage = Boolean(src) && !failed;
  const initials = name ? initialsOf(name) : "";

  // The rendered <img> already provides image semantics; only the fallback
  // wrapper needs role="img". A nameless fallback is treated as decorative.
  const fallbackRole = showImage ? undefined : label ? "img" : undefined;
  const fallbackHidden = showImage || label ? undefined : true;

  return (
    <span
      ref={ref}
      className={cn(avatar({ size, shape }), className)}
      role={fallbackRole}
      aria-label={fallbackRole ? label : undefined}
      aria-hidden={fallbackHidden}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={label}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="size-3/5" aria-hidden="true">
          <path
            d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
});
