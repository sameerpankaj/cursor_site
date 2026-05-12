"use client";

import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import { cn } from "@/lib/cn";

export function MarkdownText({ className }: { className?: string }) {
  return (
    <MarkdownTextPrimitive
      className={cn(
        "text-sm leading-relaxed text-[var(--muted)]",
        "[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
        "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1",
        "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_a]:underline [&_a]:decoration-black/20 hover:[&_a]:decoration-black/40",
        "[&_code]:rounded [&_code]:bg-black/[0.05] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.92em]",
        "[&_pre]:my-3 [&_pre]:overflow-auto [&_pre]:rounded-2xl [&_pre]:bg-black/[0.06] [&_pre]:p-4",
        className,
      )}
    />
  );
}

