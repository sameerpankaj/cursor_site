import type React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  innerClassName,
  children,
}: {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-gradient-to-br from-blue-500/30 via-indigo-500/22 to-purple-500/24 p-[1px]",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-3xl bg-[var(--surface)] backdrop-blur-xl",
          "shadow-[0_0_0_1px_rgba(11,18,32,0.06),0_22px_60px_-36px_rgba(59,130,246,0.25)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

