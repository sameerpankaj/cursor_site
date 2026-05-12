import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/cn";

type Props = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-200 text-black hover:brightness-105 focus-visible:ring-white/35",
  secondary:
    "bg-black/[0.04] text-[var(--foreground)] hover:bg-black/[0.06] border border-black/10 focus-visible:ring-black/15",
  ghost:
    "text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-black/[0.04] focus-visible:ring-black/15",
};

export function ButtonLink({
  className,
  variant = "secondary",
  ...props
}: Props) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

