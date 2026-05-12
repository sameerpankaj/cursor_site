import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/profile";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ButtonLink";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

const nav = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#digital-twin", label: "AI" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-5">
        <Link href="#top" className="group inline-flex items-center gap-3">
          <span className="text-[var(--foreground)]/80 transition group-hover:text-[var(--foreground)]">
            <Logo />
          </span>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              {profile.name}
            </div>
            <div className="text-xs text-[var(--muted)]">{profile.headline}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            LinkedIn <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={`mailto:${profile.links.email}`} variant="secondary">
            <Mail className="h-4 w-4" />
            Email
          </ButtonLink>
          <MobileMenu nav={[...nav]} />
        </div>
      </Container>
    </header>
  );
}

