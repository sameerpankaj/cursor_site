import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Timeline, TimelineItem } from "@/components/Timeline";
import { ProjectCard } from "@/components/ProjectCard";
import { Kpi } from "@/components/Kpi";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <div className="pb-10">
      <Container className="pt-10 sm:pt-14">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <Card className="lg:col-span-7" innerClassName="relative overflow-hidden px-6 py-9 sm:px-9 sm:py-12">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.40),transparent_58%),radial-gradient(circle_at_72%_20%,rgba(168,85,247,0.34),transparent_56%),radial-gradient(circle_at_60%_95%,rgba(99,102,241,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/35 to-white/70" />
            </div>

            <div className="relative">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-[11px] font-semibold tracking-tight text-[var(--foreground)]/70">
                  <Sparkles className="h-4 w-4 text-[var(--foreground)]/55" />
                  Enterprise-grade, with an edge
                </div>
                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  {profile.headline}. I build confidence in complex vehicle
                  functions through integration testing, requirements clarity,
                  and execution that ships.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                    <MapPin className="h-4 w-4 text-[var(--muted-2)]" />
                    {profile.location}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                    Automotive
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                    EV programs
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink
                    href={`mailto:${profile.links.email}`}
                    variant="primary"
                  >
                    Let’s talk
                  </ButtonLink>
                  <ButtonLink
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    LinkedIn <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </Card>

          <div className="lg:col-span-5">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Kpi label="Focus" value="Automotive & EV" />
              <Kpi label="Strength" value="Requirements → execution" />
              <Kpi label="Role" value="Function Owner / Test Manager" />
            </div>

            <Card className="mt-4" innerClassName="p-6">
              <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                Core strengths
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Integration testing",
                  "Function ownership",
                  "Requirements clarity",
                  "Stakeholder alignment",
                  "Delivery focus",
                ].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <Container>
        <Section id="about" eyebrow="Overview" title="About me">
          <Reveal>
            <div className="space-y-6">
              <p className="text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {profile.summary}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {profile.highlights.map((h) => (
                  <Card key={h} innerClassName="p-5">
                    <div className="text-sm leading-relaxed text-[var(--muted)]">
                      {h}
                    </div>
                  </Card>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.topSkills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="journey" eyebrow="Career" title="Career journey">
          <Reveal>
            <div className="space-y-10">
              <Card innerClassName="p-6">
                <Timeline>
                  {profile.experience.map((item) => (
                    <TimelineItem
                      key={`${item.company}-${item.title}-${item.start}`}
                      title={`${item.title} — ${item.company}`}
                      meta={`${item.start} → ${item.end}${
                        item.location ? ` • ${item.location}` : ""
                      }`}
                    >
                      {item.summary ??
                        "Driving clarity, alignment, and delivery across complex integration landscapes."}
                    </TimelineItem>
                  ))}
                </Timeline>
              </Card>

              <Card innerClassName="p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-2)]">
                  Education
                </div>
                <div className="mt-5 grid gap-3">
                  {profile.education.map((ed) => (
                    <Card
                      key={ed.school}
                      className="bg-gradient-to-br from-blue-500/18 via-purple-500/14 to-indigo-500/10"
                      innerClassName="p-5"
                    >
                      <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                        {ed.school}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {ed.degree}
                      </div>
                      {ed.years ? (
                        <div className="mt-2 text-xs text-[var(--muted-2)]">
                          {ed.years}
                        </div>
                      ) : null}
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </Reveal>
        </Section>

        <Section id="skills" eyebrow="Capabilities" title="Skills that scale delivery">
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-2">
              <Card innerClassName="p-6">
                <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                  What you can expect
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  <li>
                    Clear test strategy for integration and feature readiness.
                  </li>
                  <li>
                    Requirements alignment that reduces churn and surprises late
                    in the program.
                  </li>
                  <li>
                    Structured collaboration with engineering, QA, and
                    stakeholders.
                  </li>
                  <li>
                    Delivery focus: measurable progress, crisp communication,
                    and reliable execution.
                  </li>
                </ul>
              </Card>
              <Card innerClassName="p-6">
                <div className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                  Focus areas
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Integration test management",
                    "Function ownership",
                    "Test planning",
                    "Requirements definition",
                    "Stakeholder alignment",
                    "Automotive systems",
                    "EV programs",
                    "Quality gates",
                    "Cross-team delivery",
                  ].map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </Reveal>
        </Section>

        <Section id="portfolio" eyebrow="Work" title="Portfolio (coming soon)">
          <Reveal>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                This section is wired for future work samples. Drop in links to
                case studies, code, slide decks, or project write-ups when you’re
                ready.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <ProjectCard
                  title="Integration test strategy"
                  tag="Case study placeholder"
                  description="How to define quality gates, coverage, and release confidence for complex multi-team integration."
                />
                <ProjectCard
                  title="Requirements → validation"
                  tag="Case study placeholder"
                  description="A practical flow from requirements clarity to traceable validation and stakeholder-ready reporting."
                />
                <ProjectCard
                  title="Program execution"
                  tag="Case study placeholder"
                  description="Rituals, metrics, and communication patterns that keep delivery sharp without the noise."
                />
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/60 p-6 text-sm text-[var(--muted)]">
                Want a dedicated portfolio page later? Create{" "}
                <code className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[var(--foreground)]/80">
                  /portfolio
                </code>{" "}
                and point these cards to it.
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="digital-twin" eyebrow="AI" title="Digital Twin">
          <Reveal>
            <DigitalTwinChat />
          </Reveal>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let’s connect">
          <Reveal>
            <Card innerClassName="p-7 sm:p-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <div className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                    Open to conversations about roles and programs.
                  </div>
                  <div className="text-sm leading-7 text-[var(--muted)]">
                    Email is best. LinkedIn works too.
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink
                    href={`mailto:${profile.links.email}`}
                    variant="primary"
                  >
                    Email {profile.links.email}
                  </ButtonLink>
                  <ButtonLink
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    LinkedIn <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
              <div className="mt-6 text-xs text-[var(--muted-2)]">
                Prefer minimalism? You can swap this for a single contact link
                anytime.
              </div>
            </Card>
          </Reveal>
        </Section>

        <div className="pb-10 text-center text-xs text-[var(--muted-2)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-6 bg-black/10" />
            Built with Next.js
            <span className="h-px w-6 bg-black/10" />
          </span>
        </div>

        <div className="pb-6 text-center">
          <Link
            href="#top"
            className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold text-[var(--muted)] transition hover:bg-white hover:text-[var(--foreground)]"
          >
            Back to top
          </Link>
        </div>
      </Container>
    </div>
  );
}
