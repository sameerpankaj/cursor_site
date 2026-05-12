import Link from "next/link";
import { profile } from "@/lib/profile";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-black/10 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
            {profile.name}
          </div>
          <div className="text-xs text-[var(--muted)]">
            {profile.headline} • {profile.location}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-2 transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${profile.links.email}`}
            className="rounded-full px-3 py-2 transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
          >
            Email
          </Link>
          <Link
            href="#top"
            className="rounded-full px-3 py-2 transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
          >
            Back to top
          </Link>
        </div>
      </Container>
    </footer>
  );
}

