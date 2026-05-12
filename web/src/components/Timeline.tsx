import type React from "react";
import { cn } from "@/lib/cn";

export function Timeline({ children }: { children: React.ReactNode }) {
  return <ol className="relative space-y-5">{children}</ol>;
}

export function TimelineItem({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={cn("relative pl-8", className)}>
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-blue-200/90 shadow-[0_0_0_6px_rgba(59,130,246,0.14)]" />
      <div className="absolute left-[5px] top-7 h-[calc(100%_-_28px)] w-px bg-black/10" />
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
            {title}
          </div>
          {meta ? <div className="text-xs text-[var(--muted)]">{meta}</div> : null}
        </div>
        {children ? (
          <div className="text-sm leading-relaxed text-[var(--muted)]">
            {children}
          </div>
        ) : null}
      </div>
    </li>
  );
}

