import Link from "next/link";
import type React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/Card";

export function ProjectCard({
  title,
  description,
  href,
  tag,
  className,
}: {
  title: string;
  description: string;
  href?: string;
  tag?: string;
  className?: string;
}) {
  const CardEl: React.ElementType = href ? Link : "div";

  return (
    <Card
      className={cn("group transition hover:brightness-[1.03]", className)}
      innerClassName="relative overflow-hidden p-6"
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_22%_18%,rgba(59,130,246,0.35),transparent_60%),radial-gradient(circle_at_78%_62%,rgba(168,85,247,0.28),transparent_55%)]" />
      </div>

      <CardEl
        {...(href
          ? {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        className="relative block outline-none"
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                {title}
              </div>
              {tag ? (
                <div className="text-xs font-medium text-[var(--muted-2)]">
                  {tag}
                </div>
              ) : null}
            </div>
            {href ? (
              <ArrowUpRight className="h-4 w-4 text-[var(--muted-2)] transition group-hover:text-[var(--foreground)]" />
            ) : null}
          </div>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {description}
          </p>
          {!href ? (
            <div className="text-xs text-[var(--muted-2)]">
              Add a link when ready.
            </div>
          ) : null}
        </div>
      </CardEl>
    </Card>
  );
}

