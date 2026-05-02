"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/SectionWrapper"
import { Button } from "@/components/Button"
import { ScrollMorph } from "./ScrollMorph"
import { AuditMatrix } from "./AuditMatrix"
import { HeadlineMetrics, AdoptionBars } from "./ImpactCounters"

const SECTION_H2 =
  "font-sans text-[1.85rem] sm:text-[2.1rem] md:text-[2.65rem] lg:text-[3.35rem] font-extrabold tracking-tighter text-[var(--text)] leading-[1.06]"

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function StageLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
        {index}
      </span>
      <span className="h-px w-12 bg-[var(--accent)]/40" />
      <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-[var(--text)]/60">
        {label}
      </span>
    </div>
  )
}

function StatCallout({
  value,
  label,
  tone = "default",
}: {
  value: string
  label: string
  tone?: "default" | "negative" | "positive"
}) {
  const colorClass =
    tone === "negative"
      ? "text-red-400"
      : tone === "positive"
      ? "text-[var(--accent)]"
      : "text-[var(--text)]"
  return (
    <div className="flex flex-col gap-1 py-3 px-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40">
      <span className={`text-3xl font-extrabold tracking-tight ${colorClass}`}>{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/60">
        {label}
      </span>
    </div>
  )
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────

export function IldsCaseStudy() {
  const narrativeRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 transition-colors duration-500">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-x-clip">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        <SectionWrapper>
          <FadeIn>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-6">
              Case Study · Design System · ICICI Lombard
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-sans text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold tracking-tighter leading-[1.04] text-[var(--text)] max-w-[18ch]">
              From a static Figma file to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#7C7EF5] via-[#A78BFA] to-[#EC4899]">
                4.7M variable inserts
              </span>{" "}
              across 23 projects.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text)]/70">
              ILDS is the production design system at ICICI Lombard — surfaced when a comparative audit showed how
              far the legacy system lagged trusted industry patterns, shipped in three phases across PMT and
              Digital design, and now the foundation behind 23 active projects company-wide.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              <StatCallout value="19.9%" label="Legacy coverage vs benchmark" tone="negative" />
              <StatCallout value="20" label="Components built" tone="positive" />
              <StatCallout value="23" label="Projects using" />
              <StatCallout value="46.8K" label="Inserts / week" />
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">Role</dt>
                <dd className="text-[var(--text)] font-medium">Principal Design Lead</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">Team</dt>
                <dd className="text-[var(--text)] font-medium">3 designers (me + one from each team)</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">Timeline</dt>
                <dd className="text-[var(--text)] font-medium">Jun 2024 → present · three phases thru Nov 2024</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">Recognition</dt>
                <dd className="text-[var(--text)] font-medium">Top Performer 2025</dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn delay={0.65}>
            <div className="mt-16 flex items-center gap-2 text-[var(--text)]/40 font-mono text-[10px] uppercase tracking-[0.25em]">
              <span>Scroll to read</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="inline-block"
              >
                ↓
              </motion.span>
            </div>
          </FadeIn>
        </SectionWrapper>
      </section>

      {/* ─── NARRATIVE (sticky morph + scrolling stream) ──────────────────── */}
      <section ref={narrativeRef} className="relative pb-24">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-x-16">
            {/* LEFT — content stream */}
            <div className="space-y-32 md:space-y-48">
              {/* 1. The Static Past */}
              <article>
                <StageLabel index="01" label="The Static Past" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  A design system that nobody could rely on.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-4">
                  When I joined ICICI Lombard, what existed wasn&apos;t a working system—it was aimed at marketing
                  website use cases, outdated and rigid, with broken structure and weak implementation discipline.
                  Patterns didn&apos;t hold up against real product UX, and downstream teams rightly avoided it.
                  The flagship IL Take Care app didn&apos;t reference it at all.
                </p>
                <p className="text-lg leading-relaxed text-[var(--text)]/70">
                  Across internal tools, customer apps, and partner surfaces, interfaces kept diverging — each
                  shipping its own buttons, forms, colour, typography, and copy. There was no shared language,
                  no reuse at scale.
                </p>
              </article>

              {/* 2. The Chaos */}
              <article>
                <StageLabel index="02" label="The Cost of Drift" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  No principles. No tokens. No truth.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-6">
                  The cost of drift was concrete and accelerating:
                </p>
                <ul className="space-y-4">
                  {[
                    "12+ inconsistent color palettes across products, none mapped to brand",
                    "Typography scales that disagreed between web, app, and partner portals",
                    "Components rebuilt from scratch in every new sprint, every team",
                    "No documentation — handoff happened via Slack screenshots",
                    "Brand violations shipping to production with no review surface",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-base text-[var(--text)]/75 pl-5 border-l-2 border-red-400/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              {/* 3. The Mandate */}
              <article>
                <StageLabel index="03" label="The Mandate" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Align two flagships. Earn the rest.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-4">
                  My first ask was scoped: align the IL Take Care app and the ICICI Lombard website on a shared
                  visual language. But the moment I started looking, it was clear the rot ran deeper — and a
                  two-product fix would not survive contact with the other teams.
                </p>
                <p className="text-lg leading-relaxed text-[var(--text)]/70">
                  I rescoped: instead of patching two products, I&apos;d build a system that could earn the rest of
                  the company&apos;s adoption on its merits. To do that, I needed evidence — not opinion — to
                  justify the scope to leadership.
                </p>
              </article>

              {/* 4. The Audit */}
              <article>
                <StageLabel index="04" label="The Audit" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Benchmarked 28 dimensions. Across 7 industry leaders. Plus ours.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-8">
                  I built an evidence grid—same dimensions documented in mature systems—against Adobe Spectrum,
                  Google Material, IBM Carbon, Shopify Polaris, Salesforce Lightning, Atlassian, and Microsoft
                  Fluent. The goal wasn&apos;t applause; it was to show exactly what ICICI Lombard already had versus
                  what serious design systems routinely ship, so gaps were undeniable.
                </p>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-8">
                  The legacy artefact landed at{" "}
                  <span className="text-red-400 font-semibold">19.9% coverage versus that benchmark set</span>—not
                  a KPI to celebrate, but proof the old approach was uncompetitive alongside structural and UX-logic
                  failures. Combined with stakeholder pressure on the two flagship products, that deficit is what earned
                  a green light for central ILDS, budget, and a compact core team within two weeks.
                </p>
                <FadeIn delay={0.1}>
                  <AuditMatrix />
                </FadeIn>
              </article>

              {/* 5. Three-Phase Strategy */}
              <article>
                <StageLabel index="05" label="Three-Phase Plan" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Foundations before pixels. Phases before promises.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-8">
                  I split delivery into three time-boxed phases so value compounded without open-ended commitments.
                  Each phase had closure criteria before the next started. Since launch we&apos;ve kept shipping
                  variable and component updates whenever product teams surfaced real requirements—releases never
                  stayed frozen; they matured on a rhythm.
                </p>

                <PhaseStrip />
              </article>

              {/* 6. Phase 1: Foundations */}
              <article>
                <StageLabel index="06" label="Phase 1 · Foundations" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Brand-led anchor. Designer-owned logic.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-8">
                  Phase 1 ran 1.5 months, June through mid-July 2024. Marketing provided brand guardrails; we owned
                  product-grade colour logic. We defined five principle groups (Primary, Black/White, Secondary,
                  Neutral, Semantic/State), then translated them into 50-900 ramps, semantic tokens, and mode-aware
                  surface tokens. The outcome was a scalable colour engine teams could ship with, not a static style
                  reference.
                </p>

                <FoundationGrid />

                <p className="mt-10 text-base leading-relaxed text-[var(--text)]/60 max-w-3xl">
                  We enforced one colour contract across products: raw spectrum → semantic tokens → surface tokens →
                  light/dark modes. Contrast decisions were validated through APCA checks and WCAG baselines, while
                  OKLCH exploration kept lightness/chroma behaviour perceptually stable across states and surfaces.
                </p>

                <p className="mt-6 text-base leading-relaxed text-[var(--text)]/60 max-w-3xl">
                  Design tokens shipped in parallel — Figma variables on the design side, a JSON schema on the
                  dev side, with a single Style Dictionary build to keep them aligned. Engineering didn&apos;t wait
                  for the system to be &quot;done&quot;; they integrated tokens the week we published them.
                </p>
              </article>

              {/* 7. Phase 2 & 3: Components */}
              <article>
                <StageLabel index="07" label="Phase 2 & 3 · Components" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Login first. Logic before logos.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-6">
                  Components were prioritised by the journeys every product needed first.
                  Login and onboarding were universal — every new and legacy product needed Button, Text Field,
                  Checkbox, Radio, and Dropdown — so we built that cluster end-to-end before touching anything else.
                </p>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-10">
                  Each component was anchored to international benchmarks. Before a single pixel moved, the team
                  documented behaviour against Material, Polaris, and Atlassian — anatomy, states, slot rules,
                  accessibility, and motion. Only then did variants ship.
                </p>

                <ComponentBreakdown />

                <p className="mt-10 text-base leading-relaxed text-[var(--text)]/65 max-w-3xl">
                  After the three phase closures, upkeep stayed continuous: whenever adoption teams filed gaps, we
                  extended variables, patched component states, or published library revisions—with change notes in
                  our shared Slack contract so downstream files never woke up to surprises.
                </p>
              </article>

              {/* 8. Governance */}
              <article>
                <StageLabel index="08" label="Governance" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Two design teams. One source of truth.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-6">
                  ILDS bridged ICICI Lombard&apos;s central PMT design org and Digital—different reporting stacks and
                  Figma rituals. The core programme stayed intentionally small: myself plus two embedded designers,
                  each representing one tribe, aligning through a shared component intake, build checklist, and
                  documentation bar before anything entered the canonical library.
                </p>

                <GovernanceFlow />

                <p className="mt-10 text-base leading-relaxed text-[var(--text)]/60 max-w-3xl">
                  We stood up a single Slack channel as the contract: every release, every breaking change, every
                  bug ticket lived there. Adoption teams got SLAs. Bugs were triaged within 24 hours. The channel
                  became the single signal for whether the system was healthy.
                </p>
              </article>

              {/* 9. The Outcome */}
              <article>
                <StageLabel index="09" label="The Ripple" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  From two products to twenty-three projects.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70">
                  Within a year, ILDS moved from fragile artefacts to measurable infrastructure. The summary tiles
                  below track variable throughput (inserts / week, style volume, etc.). The adoption bars use
                  ILDS Master → Analytics → <span className="text-[var(--text)]">Components</span>, duration{" "}
                  <span className="text-[var(--text)]">Year</span>, and intentionally show only ranked top-team
                  insertions from production Figma reporting.
                </p>
              </article>
            </div>

            {/* RIGHT — sticky morph (desktop only) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 h-[calc(100vh-180px)] flex items-center justify-center">
                <ScrollMorph targetRef={narrativeRef} />
              </div>
            </aside>
          </div>
        </SectionWrapper>
      </section>

      {/* ─── IMPACT ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-t border-[var(--border)] bg-gradient-to-b from-transparent via-[var(--surface)]/30 to-transparent">
        <SectionWrapper>
          <FadeIn>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
              Adoption · May 2024 → Apr 2025
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className={`${SECTION_H2} mb-12 max-w-3xl`}>
              The system did its job — quietly, every day, across the company.
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <HeadlineMetrics />
          </FadeIn>

          <div className="mt-16">
            <FadeIn>
              <AdoptionBars />
            </FadeIn>
          </div>
        </SectionWrapper>
      </section>

      {/* ─── REFLECTION & CTA ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <SectionWrapper>
          <div className="max-w-3xl">
            <FadeIn>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
                Reflection
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className={`${SECTION_H2} mb-8`}>
                The system that earned its way in.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6 text-lg leading-relaxed text-[var(--text)]/70">
                <p>
                  The thing I&apos;m proudest of isn&apos;t the component count or the adoption curve — it&apos;s
                  that no one was forced. PMT chose ILDS because the brand was sharper than what they had.
                  IL Nysa chose it because their handoff times collapsed. Project Orion chose it because they
                  could ship onboarding in two weeks instead of two months.
                </p>
                <p>
                  A design system is a contract with the people who use it. Audit the truth. Phase the work.
                  Ship the foundations before the components. And measure adoption like a product manager —
                  because that&apos;s what it is.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Button href="/projects" variant="secondary">
                  See more work
                </Button>
                <Button href="/contact" variant="primary">
                  Start a conversation
                </Button>
              </div>
            </FadeIn>
          </div>
        </SectionWrapper>
      </section>

      {/* ─── PROJECT NAVIGATION ───────────────────────────────────────────── */}
      <section className="py-12 border-t border-[var(--border)]">
        <SectionWrapper>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/60 hover:text-[var(--accent)] transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span>←</span> All projects
          </Link>
        </SectionWrapper>
      </section>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Section blocks (kept inline since they're page-specific)
// ────────────────────────────────────────────────────────────────────────────

function PhaseStrip() {
  const phases = [
    {
      name: "Phase 1",
      title: "Foundations",
      duration: "1.5 months",
      window: "Jun → mid-Jul 2024",
      items: ["Brand values", "Principles", "Color", "Typography", "Spacing", "Tokens"],
    },
    {
      name: "Phase 2",
      title: "Universal Components",
      duration: "2 months",
      window: "Jul → Sep 2024",
      items: ["Button", "Text Field", "Checkbox", "Radio", "Text Link", "Dropdown Trigger"],
    },
    {
      name: "Phase 3",
      title: "Product Components",
      duration: "2 months",
      window: "Sep → Nov 2024",
      items: ["Accordion", "Tab", "Badge", "Toast", "Pagination", "Scrollbar"],
    },
  ]
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {phases.map((p, i) => (
        <FadeIn key={p.name} delay={i * 0.08}>
          <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 backdrop-blur">
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                {p.name}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[var(--text)]/50">
                {p.duration}
              </span>
            </div>
            <h4 className="text-2xl font-bold text-[var(--text)] mb-2">{p.title}</h4>
            <p className="font-mono text-[10px] tracking-wider text-[var(--text)]/50 mb-5">
              {p.window}
            </p>
            <ul className="space-y-1.5">
              {p.items.map((it) => (
                <li
                  key={it}
                  className="text-sm text-[var(--text)]/70 flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]/60" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

function FoundationGrid() {
  const foundations = [
    {
      title: "Color",
      detail:
        "Colour ran through three layers: Spectrum (global ramps), semantic tokens, and mode-aware surface tokens. Core families were Electric Orange (#EC6625), Merlot Maroon (#CC504D), Berkeley Blue (initial placeholder alignment), Tomato Red (#F5503F), Amber (#E49F04), Pigment Green (#01A252), and Warm Gray neutral (#736F6F midpoint). Feedback/state tokens were explicitly defined for text, icon, border, background, and action states.",
      tag: "12 ramps · 4 semantic intents",
    },
    {
      title: "Typography",
      detail:
        "Guidelines anchored type selection, but sizing, responsive scales, pairing rules, truncation, and how styles map into variables were authored and stress-tested inside the design system—not inherited wholesale from decks.",
      tag: "2 scales · 51 styles",
    },
    {
      title: "Spacing & Shape",
      detail:
        "8-point base, with 4-point allowance for compact UI. Six radius tokens map directly to component anatomy (input/card/sheet/pill).",
      tag: "8pt grid · 6 radii",
    },
    {
      title: "Iconography",
      detail:
        "20 / 24 / 32 px sets, single stroke weight, optical alignment baked in. One source SVG sprite consumed by both Figma and the React icon component.",
      tag: "3 sizes · 1.5 stroke",
    },
    {
      title: "Elevation & Surface",
      detail:
        "Four elevation tokens with light-mode and dark-mode pairs. Surfaces follow the platform — soft on iOS, sharper on web.",
      tag: "4 elevations · 2 themes",
    },
    {
      title: "Motion",
      detail:
        "Three duration tokens, three easing curves. Component-level motion is parametric, not bespoke — every animation reads from the same primitives.",
      tag: "3 durations · 3 curves",
    },
  ]
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {foundations.map((f, i) => (
        <FadeIn key={f.title} delay={i * 0.06}>
          <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-xl font-bold text-[var(--text)]">{f.title}</h4>
              <span className="font-mono text-[10px] tracking-wider text-[var(--text)]/50 mt-1.5">
                {f.tag}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text)]/65">{f.detail}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

function ComponentBreakdown() {
  const flows = [
    {
      tier: "Universal Inputs",
      desc: "Core interactions every product needs — built first, adopted fastest.",
      items: ["Button", "Selection Button", "Text Field", "Text Area", "Checkbox", "Radio", "Text Link", "Dropdown Trigger"],
    },
    {
      tier: "Selection & Navigation",
      desc: "Controls for choosing, filtering, and moving through content.",
      items: ["Dropdown Menu", "Tab", "Switch", "Filter: Search", "Filter: Tag", "Scrollbar"],
    },
    {
      tier: "Display & Feedback",
      desc: "Structure, status, and notification patterns.",
      items: ["Icon", "Divider", "Badge", "Accordion", "Pagination", "Toast"],
    },
  ]
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 overflow-hidden">
      {flows.map((tier, ti) => (
        <FadeIn key={tier.tier} delay={ti * 0.08}>
          <div className={`p-6 md:p-8 ${ti > 0 ? "border-t border-[var(--border)]" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-5">
              <div>
                <h4 className="text-2xl font-bold text-[var(--text)]">{tier.tier}</h4>
                <p className="text-sm text-[var(--text)]/60">{tier.desc}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50">
                {tier.items.length} components
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tier.items.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text)]/80 bg-[var(--bg)] border border-[var(--border)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

function GovernanceFlow() {
  const steps = [
    {
      step: "1. Intake",
      detail: "Adoption teams file requests in the central Slack channel — pattern, use case, urgency.",
    },
    {
      step: "2. Triage",
      detail: "Weekly triage by core team. Reusable patterns become tickets; one-offs are documented as variants.",
    },
    {
      step: "3. Build",
      detail: "Owner-led component creation against the standard checklist — anatomy, states, a11y, tokens, docs.",
    },
    {
      step: "4. Review",
      detail: "Cross-team review (design + dev + product). Final spec lives in Figma + Storybook in one PR.",
    },
    {
      step: "5. Ship & monitor",
      detail: "Library publish + release note in Slack. Adoption tracked via Figma Library Analytics weekly.",
    },
  ]
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 md:p-10">
      <div className="grid md:grid-cols-5 gap-4 md:gap-2">
        {steps.map((s, i) => (
          <FadeIn key={s.step} delay={i * 0.07}>
            <div className="relative h-full p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
                {s.step}
              </p>
              <p className="text-xs leading-relaxed text-[var(--text)]/70">{s.detail}</p>
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-[var(--accent)]/40">
                  →
                </span>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
