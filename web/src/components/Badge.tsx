import type React from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 px-3 py-1 text-xs font-medium text-[var(--foreground)]/80 backdrop-blur transition hover:border-black/20 hover:from-blue-500/16 hover:via-indigo-500/16 hover:to-purple-500/16 hover:text-[var(--foreground)]",
        className,
      )}
      {...props}
    />
  );
}

