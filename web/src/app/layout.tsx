import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { profile } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Enterprise-grade delivery, with an edge. Function ownership, integration testing, and requirements-driven execution in automotive programs.",
  openGraph: {
    title: `${profile.name} — ${profile.headline}`,
    description:
      "Function ownership and integration testing in automotive programs. Requirements clarity, alignment, and delivery across global teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-[0.32]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.26),transparent_55%),radial-gradient(circle_at_74%_18%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(circle_at_45%_85%,rgba(99,102,241,0.16),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(247,248,255,0.35)] to-[rgba(247,248,255,0.95)]" />
        </div>

        <div id="top" className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
