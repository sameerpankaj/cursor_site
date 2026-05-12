import type React from "react";
import { cn } from "@/lib/cn";

export function Section({
  eyebrow,
  title,
  children,
  className,
  id,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-14 sm:py-20", className)}>
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div className="space-y-3">
          {eyebrow ? (
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted-2)]">
              <span className="h-px w-6 bg-black/15" />
              {eyebrow}
            </div>
          ) : null}
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

