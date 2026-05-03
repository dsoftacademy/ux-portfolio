"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { SectionWrapper } from "@/components/SectionWrapper"
import { Button } from "@/components/Button"
import { IltcMorph } from "./IltcMorph"
import {
  InsightCounters,
  ImpactScoreboard,
  UserVoices,
} from "./IltcImpact"

const SECTION_H2 =
  "font-sans text-[1.85rem] sm:text-[2.1rem] md:text-[2.65rem] lg:text-[3.35rem] font-extrabold tracking-tighter text-[var(--text)] leading-[1.06]"

// IL TakeCare orange used as a project-tinted spot accent. The site's
// global --accent (purple/indigo) still drives buttons + chrome.
const ORANGE_GRAD =
  "bg-clip-text text-transparent bg-gradient-to-br from-[#EC6625] via-[#F08C46] to-[#F5A06A]"

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function StageLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-[#EC6625]">
        {index}
      </span>
      <span className="h-px w-12 bg-[#EC6625]/40" />
      <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
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
      ? "text-[#EC6625]"
      : "text-[var(--text)]"
  return (
    <div className="flex flex-col gap-1 py-3 px-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40">
      <span className={`text-3xl font-extrabold tracking-tight ${colorClass}`}>
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
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
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
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

export function IltcCaseStudy() {
  const narrativeRef = React.useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen bg-[var(--bg)] pb-24 transition-colors duration-500">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-x-clip">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #EC6625 0%, transparent 70%)",
          }}
        />
        <SectionWrapper>
          <FadeIn>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#EC6625] mb-6">
              Case Study · Flagship App Revamp · ICICI Lombard
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-sans text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold tracking-tighter leading-[1.04] text-[var(--text)] max-w-[20ch]">
              Transforming IL TakeCare from{" "}
              <span className={ORANGE_GRAD}>complexity to clarity</span>.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text)]/70">
              IL TakeCare is ICICI Lombard&apos;s flagship insurance and
              lifestyle app — a one-stop solution for policy, claims, wellness,
              and value-added services. We rebuilt the experience around three
              promises: clarity, control, and care — and the numbers followed
              within three months.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              <StatCallout value="−53.8%" label="Customer-care calls" tone="positive" />
              <StatCallout value="+328.1%" label="Feature utilisation" tone="positive" />
              <StatCallout value="+34.2%" label="Monthly installs" tone="positive" />
              <StatCallout value="−85.4%" label="Feature TAT reduced" tone="positive" />
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  Role
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  Design Lead
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  Team
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  6 designers · cross-functional eng &amp; QA
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  Platform
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  iOS &amp; Android · India
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  Outcome window
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  3 months post-launch · sustained
                </dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn delay={0.65}>
            <div className="mt-16 flex items-center gap-2 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-[0.25em]">
              <span>Scroll to read</span>
              <ScrollCueArrow />
            </div>
          </FadeIn>
        </SectionWrapper>
      </section>

      {/* ─── PROJECT META STRIP (node 42:576) ────────────────────────────── */}
      <section aria-label="Project meta" className="pb-16 md:pb-24">
        <SectionWrapper>
          <FadeIn>
            <div className="grid gap-y-8 gap-x-10 grid-cols-2 md:grid-cols-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 md:p-10">
              <Meta label="Company" value="ICICI Lombard General Insurance" />
              <Meta label="Geography" value="India · 280M+ insured lives" />
              <Meta label="Domain" value="Insurance Tech" />
              <Meta label="Role" value="Design Lead" />
              <Meta label="Design Team" value="6 Designers" />
              <Meta label="Platform" value="iOS & Android" />
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
              {/* 1. The flagship that drifted */}
              <article>
                <StageLabel index="01" label="The drift" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  A flagship that customers had stopped relying on.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-4">
                  IL TakeCare was meant to be the one place a policyholder
                  could turn to — for renewals, claims, health services, and
                  every-day wellness. In practice, it had become a fragmented
                  surface that customers opened only to file something, and
                  closed as quickly as they could.
                </p>
                <p className="text-lg leading-relaxed text-[var(--text)]/70">
                  The brief was ambitious: revamp the flagship without
                  interrupting service for millions of live policies — and
                  re-earn its place as a daily-use app, not an emergency-only
                  tool.
                </p>
              </article>

              {/* 2. Gaps in the existing app */}
              <article>
                <StageLabel index="02" label="The gaps" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Four faults the legacy app couldn&apos;t hide.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-8 max-w-3xl">
                  We started with heuristics evaluations, journey audits, and
                  call-centre transcripts. The same four faults surfaced from
                  every direction — the language customers used to complain,
                  the patterns of where flows broke, the tickets repeating
                  every week.
                </p>

                <GapGrid />
              </article>

              {/* 3. Listening */}
              <article>
                <StageLabel index="03" label="The listening" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Our users told us — and we listened.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-10 max-w-3xl">
                  We pulled four customer cohorts into in-depth conversations:
                  first-time policyholders, frequent claimants, health-policy
                  renewers, and lifestyle-services users. Across 40+ sessions,
                  the same wishes kept surfacing — quietly, patiently, in
                  plain language.
                </p>

                <UserVoices />
              </article>

              {/* 4. Turning data into actionable insights */}
              <article>
                <StageLabel index="04" label="The signal" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Turning data into{" "}
                  <span className={ORANGE_GRAD}>actionable insights</span>.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-8 max-w-3xl">
                  We mapped 9,280 customer-support tickets and analytics events
                  back to four core hypotheses. The volume behind each was the
                  business case for the revamp — every percentage of friction
                  was a measurable cost-to-serve.
                </p>

                <InsightCounters />
              </article>

              {/* 5. The strategy */}
              <article>
                <StageLabel index="05" label="The strategy" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Transforming an insurance app into an{" "}
                  <span className={ORANGE_GRAD}>intuitive experience</span>.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-10 max-w-3xl">
                  Our goal was to reimagine IL TakeCare as more than an
                  insurance app — a digital-first platform that integrates
                  protection, wellness, and lifestyle benefits. Not just a
                  redesign — a strategic step toward digital transformation,
                  enriching the overall customer experience.
                </p>

                <WayForwardGrid />
              </article>

              {/* 6. Design principles */}
              <article>
                <StageLabel index="06" label="The principles" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Designing with purpose:{" "}
                  <span className={ORANGE_GRAD}>Clarity, Control &amp; Care</span>.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-10 max-w-3xl">
                  Five principles became the daily decision-making rubric for
                  every flow, every component, every empty state — used in
                  every design review and shipped into the design-system
                  documentation.
                </p>

                <PrincipleGrid />
              </article>

              {/* 7. Shaping experiences that matter */}
              <article>
                <StageLabel index="07" label="The execution" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  Shaping experiences{" "}
                  <span className={ORANGE_GRAD}>that matter</span>.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-10 max-w-3xl">
                  Execution ran in parallel tracks. Structural fixes
                  stabilised the live app while the overhaul tracks rebuilt
                  flows behind feature flags. Design-system integration kept
                  the new and the legacy from drifting apart again.
                </p>

                <ExecutionTracks />
                <DesignSystemCallout />
              </article>

              {/* 8. The refreshed experience */}
              <article>
                <StageLabel index="08" label="The product" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  The shipping experience customers now meet.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70 mb-10 max-w-3xl">
                  The home screen now leads with clarity — policy at a glance,
                  claims in two taps, wellness one swipe away, and lifestyle
                  benefits surfaced when they&apos;re actually relevant.
                </p>

                <SurfaceShowcase />
              </article>

              {/* 9. The outcome */}
              <article>
                <StageLabel index="09" label="The outcome" />
                <h2 className={`${SECTION_H2} mb-6`}>
                  From revamp to results — the impact we delivered.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--text)]/70">
                  Within three months of launch the app moved from
                  emergency-only to genuinely daily. The numbers below come
                  from production analytics and call-centre logs, sustained
                  every month since.
                </p>
              </article>
            </div>

            {/* RIGHT — sticky morph (desktop only) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 h-[calc(100vh-180px)] flex items-center justify-center">
                <IltcMorph targetRef={narrativeRef} />
              </div>
            </aside>
          </div>
        </SectionWrapper>
      </section>

      {/* ─── IMPACT ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-t border-[var(--border)] bg-gradient-to-b from-transparent via-[var(--surface)]/30 to-transparent">
        <SectionWrapper>
          <FadeIn>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#EC6625] mb-4">
              Transformation in numbers · within 3 months
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className={`${SECTION_H2} mb-12 max-w-3xl`}>
              From revamp to results.{" "}
              <span className={ORANGE_GRAD}>The impact we delivered.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ImpactScoreboard />
          </FadeIn>
        </SectionWrapper>
      </section>

      {/* ─── REFLECTION & CTA ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <SectionWrapper>
          <div className="max-w-3xl">
            <FadeIn>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#EC6625] mb-4">
                Reflection
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className={`${SECTION_H2} mb-8`}>
                Insurance, but worth opening on a Tuesday.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6 text-lg leading-relaxed text-[var(--text)]/70">
                <p>
                  The strongest signal wasn&apos;t the install bump — it was
                  the call-centre drop. Customers stopped phoning because they
                  could find what they needed, not because we discouraged
                  them. That&apos;s the only kind of self-service worth
                  shipping.
                </p>
                <p>
                  An insurance app is a contract with the people who carry
                  it. Listen first. Codify the principles. Phase the work
                  behind feature flags. And measure adoption like a product
                  manager — because that&apos;s what it is.
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
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[#EC6625] transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden>←</span> All projects
          </Link>
        </SectionWrapper>
      </section>
    </main>
  )
}

function ScrollCueArrow() {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <span className="inline-block" aria-hidden>
        ↓
      </span>
    )
  }
  return (
    <motion.span
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.6 }}
      className="inline-block"
      aria-hidden
    >
      ↓
    </motion.span>
  )
}

function PhoneFloatWrap({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div>{children}</div>
  }
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Section blocks
// ────────────────────────────────────────────────────────────────────────────

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-2">
        {label}
      </p>
      <p className="text-[15px] leading-relaxed text-[var(--text)]">{value}</p>
    </div>
  )
}

function GapGrid() {
  const gaps = [
    {
      key: "complex",
      title: "Complex",
      detail:
        "Confusing journeys frustrated users — too many ways to do the same thing.",
      Icon: ComplexIcon,
    },
    {
      key: "slow",
      title: "Slow",
      detail:
        "Delays and timeouts impacted retention; first-paint on key flows took 4–7s.",
      Icon: SlowIcon,
    },
    {
      key: "discover",
      title: "Discoverability",
      detail:
        "Low visibility of features limited engagement — power-features stayed buried.",
      Icon: DiscoverIcon,
    },
    {
      key: "drift",
      title: "Inconsistent",
      detail:
        "Lack of a shared design language — every screen looked like a different app.",
      Icon: DriftIcon,
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {gaps.map((g, i) => (
        <FadeIn key={g.key} delay={i * 0.07}>
          <div className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 transition-all hover:border-[#EC6625]/40 hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)] group-hover:border-[#EC6625]/40">
              <g.Icon />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">
              {g.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text)]/65">
              {g.detail}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

// Complex — branching arrows showing too many paths (static)
function ComplexIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2" fill="#EC6625" />
      <line x1="12" y1="12" x2="5"  y2="5"  stroke="#EC6625" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="12" x2="19" y2="5"  stroke="#EC6625" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="12" x2="5"  y2="19" stroke="#EC6625" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="12" x2="19" y2="19" stroke="#EC6625" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5"  cy="5"  r="1.5" fill="#EC6625" />
      <circle cx="19" cy="5"  r="1.5" fill="#EC6625" />
      <circle cx="5"  cy="19" r="1.5" fill="#EC6625" />
      <circle cx="19" cy="19" r="1.5" fill="#EC6625" />
    </svg>
  )
}

// Slow — a clock face (static)
function SlowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#EC6625" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="12" y1="12" x2="12" y2="5"  stroke="#EC6625" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="12" x2="16" y2="9"  stroke="#EC6625" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      <circle cx="12" cy="12" r="1.5" fill="#EC6625" />
    </svg>
  )
}

// Discoverability — an eye (static, open)
function DiscoverIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z"
        stroke="#EC6625"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="#EC6625" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1" fill="#EC6625" />
    </svg>
  )
}

// Inconsistent — three mismatched shapes (static)
function DriftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="5"  cy="12" r="2.5" stroke="#EC6625" strokeWidth="1.5" />
      <rect   x="9.5" y="9.5" width="5" height="5" rx="1" stroke="#EC6625" strokeWidth="1.5" />
      <circle cx="19" cy="12" r="2.5" stroke="#EC6625" strokeWidth="1.5" />
    </svg>
  )
}

function WayForwardGrid() {
  const items = [
    {
      label: "Optimise",
      detail:
        "Simplify user journeys. Cut step-counts on the top-10 flows by 30–50%.",
      Icon: OptimiseIcon,
    },
    {
      label: "Boost",
      detail:
        "Reduce load times and bottlenecks. Cold-start under 1.8s on mid-tier Android.",
      Icon: BoostIcon,
    },
    {
      label: "Engage & Delight",
      detail:
        "Surface core and value-added features in context, not in menus.",
      Icon: DelightIcon,
    },
    {
      label: "Consistent",
      detail:
        "A cohesive, scalable design language built on shared tokens and components.",
      Icon: ConsistIcon,
    },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((s, i) => (
        <FadeIn key={s.label} delay={i * 0.06}>
          <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]/55 p-6">
            <s.Icon />
            <h3 className="mt-5 text-lg font-bold text-[var(--text)]">
              {s.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/65">
              {s.detail}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

function OptimiseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="21" y2="12" />
      <circle cx="12" cy="12" r="1.5" fill="#EC6625" />
    </svg>
  )
}

function BoostIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 14c2 0 4-2 4-4 0-2-2-4-4-4S8 8 8 10c0 2 2 4 4 4Z" />
      <path d="M5 17c1.5-1.5 4-2.5 7-2.5s5.5 1 7 2.5" opacity="0.6" />
      <path d="M2 19c2-2 5.5-3.5 10-3.5s8 1.5 10 3.5" opacity="0.3" />
    </svg>
  )
}

function DelightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" fill="#EC6625" />
    </svg>
  )
}

function ConsistIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="12" r="3" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
    </svg>
  )
}

function PrincipleGrid() {
  const principles = [
    {
      n: "01",
      title: "Intuitive & simplified",
      detail:
        "Clear, easy-to-follow user journeys that make insurance tasks a couple of taps, not a tutorial.",
    },
    {
      n: "02",
      title: "Assisted & guided flows",
      detail:
        "Hand-holding through guided tours and quick tips when context demands them — never blocking.",
    },
    {
      n: "03",
      title: "Engagement & personalisation",
      detail:
        "Increase retention through interactive nudges that promote healthy, smart choices.",
    },
    {
      n: "04",
      title: "Integrated lifestyle features",
      detail:
        "Wellness, mobility, and lifestyle services woven into one seamless experience.",
    },
    {
      n: "05",
      title: "User-accessibility first",
      detail:
        "Reassuring users with clear, transparent communication and interactive feedback in every state.",
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {principles.map((p, i) => (
        <FadeIn key={p.n} delay={i * 0.06}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/55 p-7">
            <span
              aria-hidden
              className="pointer-events-none select-none absolute -bottom-6 -right-1 text-[8rem] font-extrabold tracking-tighter leading-none"
              style={{ color: "rgba(240,240,244,0.018)" }}
            >
              {p.n}
            </span>
            <div className="relative">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EC6625] text-[11px] font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              <h3 className="mt-5 text-lg font-bold text-[var(--text)]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/65">
                {p.detail}
              </p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

function DesignSystemCallout() {
  return (
    <FadeIn delay={0.1}>
      <div className="mt-8 grid md:grid-cols-[1fr_1.4fr] gap-4 rounded-2xl overflow-hidden border border-[var(--border)]">
        {/* Left — ILDS brand tile */}
        <div
          className="p-8 flex flex-col justify-between min-h-[200px]"
          style={{ background: "linear-gradient(135deg,#EC6625 0%,#F5A06A 100%)" }}
        >
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-white/80" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-white/50" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-white/30" aria-hidden />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 mb-2">
              Built on
            </p>
            <p className="text-2xl font-extrabold text-white tracking-tight leading-tight">
              IL Design System
            </p>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">
              Shared tokens, reusable components, zero drift between design and production.
            </p>
          </div>
        </div>
        {/* Right — type specimen */}
        <div className="bg-[var(--surface)]/70 p-8 flex flex-col justify-between">
          <p
            className="text-[4rem] font-extrabold tracking-tighter leading-none text-[var(--text)]"
            aria-hidden
          >
            Aa
          </p>
          <div className="space-y-3 mt-4">
            {[
              { label: "Tokens", tags: ["Colour", "Spacing", "Radius"] },
              { label: "Components", tags: ["Button", "Card", "Input", "Toggle"] },
              { label: "Delivery", tags: ["TAT 24 hrs", "Figma → Code"] },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/45 w-24 flex-shrink-0">
                  {row.label}
                </span>
                {row.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[var(--border)] text-[var(--text)]/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function ExecutionTracks() {
  const tracks = [
    {
      title: "Collaborative execution",
      lede: "Agile sprints, user validation, and continuous iteration.",
      tags: ["Product", "Design", "Engineering", "QA"],
    },
    {
      title: "Structural fixes",
      lede: "Resolving friction. Rebuilding trust on the live app.",
      tags: [
        "Rapid response to user escalations",
        "Fixing broken journeys",
        "Improving app reliability and performance",
      ],
    },
    {
      title: "Overhaul",
      lede: "Designing for clarity and simplicity, behind feature flags.",
      tags: [
        "Rethinking core UX journeys",
        "Simplifying architecture for intuitive navigation",
        "Introducing a new visual language",
      ],
    },
    {
      title: "Design-system integration",
      lede: "Unified experiences. Accelerating delivery.",
      tags: [
        "Scalable component library",
        "Consistent cross-platform UI",
        "Faster design–dev collaboration",
      ],
    },
  ]
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/55 overflow-hidden">
      {tracks.map((t, ti) => (
        <FadeIn key={t.title} delay={ti * 0.07}>
          <div
            className={`grid gap-4 p-6 md:p-8 md:grid-cols-[280px_1fr] md:items-start ${
              ti > 0 ? "border-t border-[var(--border)]" : ""
            }`}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text)]">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text)]/60">{t.lede}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text)]/85 bg-[var(--bg)] border border-[var(--border)]"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EC6625"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// SurfaceShowcase — S08 The Product (node 42:162269)
// Phone hero + 3 code-built feature sections using individual Figma assets
// (node 77:12165). No screenshot-as-image; every section is built in code.
// ────────────────────────────────────────────────────────────────────────────

/** Dark rounded card that wraps each sub-feature block. */
function FeatureCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

/** Numbered badge + bold title + description — top of every card. */
function FeatureCardHeader({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="p-5 md:p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[11px] font-bold text-[#EC6625]">{num}</span>
        <h4 className="text-[15px] font-semibold text-[var(--text)]">{title}</h4>
      </div>
      <p className="text-sm leading-relaxed text-[var(--text)]/60 pl-[calc(2ch+12px)]">{description}</p>
    </div>
  )
}

/**
 * Fixed-height image crop box.
 * Container stays at the given height; the image inside scales to fill (object-cover)
 * and bleeds/overflows before being clipped by overflow-hidden.
 */
function FeatureImageBox({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center block"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}

/** Section heading for each of the 3 product categories. */
function S08Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[1.55rem] md:text-[1.9rem] lg:text-[2.15rem] font-extrabold tracking-tight text-[var(--text)] mb-5 leading-tight">
      {children}
    </h3>
  )
}

function SurfaceShowcase() {
  return (
    <div className="space-y-10 md:space-y-16">

      {/* ── Floating phone hero ── */}
      <FadeIn>
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:items-start gap-8 lg:gap-10 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 w-full max-w-[220px] sm:max-w-[240px] mx-auto lg:mx-0 lg:w-full lg:max-w-none justify-self-start pb-10"
          >
            <PhoneFloatWrap>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iltc-mockup.png"
                alt="IL TakeCare app — personalised home screen with policy card, quick actions, and buy insurance shortcuts"
                className="w-full h-auto block drop-shadow-2xl"
                width={610}
                height={1024}
                draggable={false}
              />
            </PhoneFloatWrap>
            <div
              aria-hidden
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-2xl pointer-events-none"
              style={{ background: "rgba(236,102,37,0.35)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 min-w-0 w-full lg:pt-1"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#EC6625]">
              Designed for every user state
            </p>
            <p className="text-lg leading-relaxed text-[var(--text)]/70">
              The home screen dynamically adapts to who&apos;s opening the app — a win-back
              user sees a renewal nudge; a new user sees an onboarding widget; an active
              policyholder gets their policy card front-and-centre.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Active Policyholder", detail: "Policy at a glance · quick claims · wellness" },
                { label: "New User",             detail: "Onboarding · add-policy widget · spotlight" },
                { label: "Win-back User",        detail: "Renewal nudge · missed benefits · one-tap buy" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-3"
                >
                  <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "#EC6625" }} aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{s.label}</p>
                    <p className="text-xs text-[var(--text)]/55 mt-0.5">{s.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </FadeIn>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — Simplified Core Insurance services  (node 42:161939)
      ══════════════════════════════════════════════════════════════════════ */}
      <FadeIn delay={0.04}>
        <S08Heading>Simplified Core Insurance services</S08Heading>
        <div className="space-y-3">

          {/* 01 — Policy at a glance (full width, short/wide image) */}
          <FeatureCard>
            <FeatureCardHeader
              num="01"
              title="Policy at a glance"
              description="Coverage, dependants, and renewal status surfaced before claims — the single most-asked question, answered on launch."
            />
            <FeatureImageBox
              src="/images/s08-policy-glance.png"
              alt="Policy at a glance — Two Wheeler Insurance card with Active badge, policyholder and vehicle details"
              className="h-[180px] md:h-[220px]"
            />
          </FeatureCard>

          {/* 02 + 03 — two column */}
          <div className="grid md:grid-cols-2 gap-3">
            <FeatureCard>
              <FeatureCardHeader
                num="02"
                title="Hassle-Free Insurance Management"
                description="Quick and easy access to core services like claims, network hospitals, and policy details"
              />
              <FeatureImageBox
                src="/images/s08-quick-actions.png"
                alt="Quick actions — Register a claim, Edit policy details, Find local services"
                className="h-[240px] md:h-[260px]"
              />
            </FeatureCard>
            <FeatureCard>
              <FeatureCardHeader
                num="03"
                title="Seamless Onboarding"
                description="Guided onboarding with coach-marks to help users navigate seamlessly"
              />
              <FeatureImageBox
                src="/images/s08-onboarding.png"
                alt="Seamless onboarding — coach-mark guided setup flow"
                className="h-[240px] md:h-[260px]"
              />
            </FeatureCard>
          </div>
        </div>
      </FadeIn>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — Beyond Insurance: A Holistic Lifestyle Solutions  (42:161940)
      ══════════════════════════════════════════════════════════════════════ */}
      <FadeIn delay={0.04}>
        <S08Heading>Beyond Insurance: A Holistic Lifestyle Solutions</S08Heading>
        <div className="space-y-3">

          {/* 04 + 05 — two column */}
          <div className="grid md:grid-cols-2 gap-3">
            <FeatureCard>
              <FeatureCardHeader
                num="04"
                title="Wellness in context"
                description="Teleconsult and OPD slots surface based on policy benefits — not buried under a tab."
              />
              <FeatureImageBox
                src="/images/s08-wellness.png"
                alt="Wellness — teleconsultation with video and audio call cards, doctor profile"
                className="h-[240px] md:h-[260px]"
              />
            </FeatureCard>
            <FeatureCard>
              <FeatureCardHeader
                num="05"
                title="Expert Insights &amp; Health monitoring"
                description="Real-time insights into your health vitals and tips from our experts"
              />
              <FeatureImageBox
                src="/images/s08-health-vitals.png"
                alt="Health monitoring — face scan showing HR, SpO2, RR and HRV readings"
                className="h-[240px] md:h-[260px]"
              />
            </FeatureCard>
          </div>

          {/* 06 — full width */}
          <FeatureCard>
            <FeatureCardHeader
              num="06"
              title="Unlock smarter, safer driving habits"
              description="Track and improve your driving with real-time telematics data and real time insights."
            />
            <FeatureImageBox
              src="/images/s08-telematics.png"
              alt="Telematics — Driving Score card, Acceleration and Turning metrics with car"
              className="h-[260px] md:h-[320px]"
            />
          </FeatureCard>
        </div>
      </FadeIn>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — Cohort based Customisation  (node 42:164533)
      ══════════════════════════════════════════════════════════════════════ */}
      <FadeIn delay={0.04}>
        <S08Heading>Cohort based Customisation</S08Heading>
        <FeatureCard>
          <FeatureCardHeader
            num="07"
            title="Dynamic Homepage with personalised experience"
            description="Dynamically personalising the homepage to align with the target user's preferences. Each section changes in real time to provide user specific sections which are relevant to their persona."
          />
          {/* 3-col phone grid with cohort labels */}
          <div className="grid grid-cols-3 border-t border-[var(--border)]">
            {[
              { label: "New User",            src: "/images/s08-cohort-new.png",     alt: "New user home — add policy widget, business banners, quick buy" },
              { label: "Active Policyholder", src: "/images/s08-cohort-active.png",  alt: "Active policyholder home — policy card, health vitals, wellness" },
              { label: "Win-back User",        src: "/images/s08-cohort-winback.png", alt: "Win-back user home — renewal nudge and one-tap buy" },
            ].map((c, i) => (
              <div key={c.label} className={i > 0 ? "border-l border-[var(--border)]" : ""}>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text)]/45 text-center py-2.5 border-b border-[var(--border)]">
                  {c.label}
                </p>
                <div className="relative overflow-hidden h-[320px] md:h-[400px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} className="absolute inset-0 w-full h-full object-cover object-top block" loading="lazy" draggable={false} />
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>
      </FadeIn>

    </div>
  )
}
