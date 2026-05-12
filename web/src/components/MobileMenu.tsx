"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

export function MobileMenu({
  nav,
}: {
  nav: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[var(--foreground)]/80 shadow-sm transition hover:bg-white hover:text-[var(--foreground)] md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-white/60 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute left-1/2 top-5 w-[min(92vw,420px)] -translate-x-1/2 rounded-3xl border border-black/10 bg-white/80 p-4 shadow-2xl transition-all",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="flex items-center justify-between px-2 py-1">
            <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              Menu
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[var(--foreground)]/80 transition hover:bg-white hover:text-[var(--foreground)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--foreground)]/80 transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

