import type React from "react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/Card";

export function Kpi({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className} innerClassName="p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-2)]">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 text-lg font-semibold tracking-tight text-[var(--foreground)]",
        )}
      >
        {value}
      </div>
    </Card>
  );
}

