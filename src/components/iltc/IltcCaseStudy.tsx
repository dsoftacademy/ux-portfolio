"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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
      ? "text-[#EC6625]"
      : "text-[var(--text)]"
  return (
    <div className="flex flex-col gap-1 py-3 px-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40">
      <span className={`text-3xl font-extrabold tracking-tight ${colorClass}`}>
        {value}
      </span>
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

export function IltcCaseStudy() {
  const narrativeRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 transition-colors duration-500">
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
              <StatCallout value="24 hrs" label="Feature TAT (was ~48d)" tone="positive" />
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">
                  Role
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  Design Lead · Strategy &amp; UX
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">
                  Team
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  7 designers · 3 product managers · cross-functional eng &amp; QA
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">
                  Platform
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  iOS &amp; Android · India
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/50 mb-1">
                  Outcome window
                </dt>
                <dd className="text-[var(--text)] font-medium">
                  3 months post-launch · sustained
                </dd>
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
                aria-hidden
              >
                ↓
              </motion.span>
            </div>
          </FadeIn>
        </SectionWrapper>
      </section>

      {/* ─── PROJECT META STRIP ───────────────────────────────────────────── */}
      <section aria-label="Project meta" className="pb-16 md:pb-24">
        <SectionWrapper>
          <FadeIn>
            <div className="grid gap-y-8 gap-x-10 md:grid-cols-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 md:p-10">
              <Meta label="Company" value="ICICI Lombard General Insurance" />
              <Meta label="Domain" value="Insurance Tech" />
              <Meta label="Geography" value="India · 280M+ insured lives" />
              <Meta label="Platform" value="iOS &amp; Android" />
              <div className="md:col-span-2">
                <Meta
                  label="Designers"
                  value="Anjali Deswandikar, Sweta Balamurali, Avantika Pidiha, Gaurav Agrawal, Anaya Purandare, Milap Patel, Pratishek Bansal"
                />
              </div>
              <div className="md:col-span-2">
                <Meta
                  label="Product Managers"
                  value="Neha Gautam, Dinesh Mohan, Saurabh Lohani"
                />
              </div>
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
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/60 hover:text-[#EC6625] transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden>←</span> All projects
          </Link>
        </SectionWrapper>
      </section>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Section blocks
// ────────────────────────────────────────────────────────────────────────────

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text)]/55 mb-2">
        {label}
      </p>
      <p
        className="text-[15px] leading-relaxed text-[var(--text)]"
        dangerouslySetInnerHTML={{ __html: value }}
      />
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

function ComplexIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
    </svg>
  )
}

function SlowIcon() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#EC6625"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <path d="M12 2v4" />
      <path d="m16.24 7.76 2.83-2.83" />
      <path d="M18 12h4" />
      <path d="m16.24 16.24 2.83 2.83" />
      <path d="M12 18v4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="M2 12h4" />
      <path d="m4.93 4.93 2.83 2.83" />
    </motion.svg>
  )
}

function DiscoverIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3-7 10-7 10 7 10 7" />
      <path d="M2 12s3 7 10 7 10-7 10-7" opacity="0.35" />
      <path d="M3 7l2 3" />
      <path d="M21 7l-2 3" />
    </svg>
  )
}

function DriftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="3" stroke="#EC6625" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="#EC6625" strokeWidth="1.6" />
      <circle cx="18" cy="12" r="3" stroke="#EC6625" strokeWidth="1.6" />
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
              className="pointer-events-none absolute -bottom-4 -right-2 text-[7rem] font-extrabold tracking-tighter leading-none text-[var(--text)]/[0.04]"
            >
              {p.n}
            </span>
            <div className="relative">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EC6625] text-[11px] font-bold text-white">
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
// SurfaceShowcase — animated phone mockup illustrating key surfaces
// ────────────────────────────────────────────────────────────────────────────

function SurfaceShowcase() {
  const surfaces = [
    {
      title: "Policy at a glance",
      detail:
        "Coverage, dependants, and renewal status surfaced before claims — the single most-asked question, answered on launch.",
    },
    {
      title: "Two-tap claims",
      detail:
        "Pre-fill from policy + camera + location. A 7-screen flow collapsed to a 3-screen card stack.",
    },
    {
      title: "Wellness in context",
      detail:
        "Teleconsult and OPD slots surface based on policy benefits — not buried under a tab.",
    },
    {
      title: "Lifestyle, opt-in",
      detail:
        "Flight tracking, challan pay, and roadside assistance live behind a personalised quick-action rail.",
    },
  ]

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
      <FadeIn>
        <PhoneMock />
      </FadeIn>

      <div className="space-y-3">
        {surfaces.map((s, i) => (
          <FadeIn key={s.title} delay={0.1 + i * 0.07}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/55 p-5 md:p-6">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#EC6625]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-[var(--text)]">
                  {s.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text)]/65">
                {s.detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] aspect-[9/19] rounded-[42px] border border-[var(--border)] bg-[var(--surface)]/70 p-4 shadow-2xl">
      {/* Notch */}
      <div className="mx-auto h-5 w-24 rounded-full bg-[var(--bg)]" />

      {/* Status row */}
      <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-[var(--text)]/55">
        <span>9:41</span>
        <span>● ● ●</span>
      </div>

      {/* Greeting */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono text-[var(--text)]/55">Hello,</p>
          <p className="text-base font-bold text-[var(--text)]">Aryaan</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EC6625] text-white text-xs font-bold">
          A
        </span>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 rounded-2xl p-4"
        style={{
          background:
            "linear-gradient(135deg,#EC6625 0%,#F5A06A 100%)",
        }}
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/85">
          My policies
        </p>
        <p className="mt-1 text-lg font-bold text-white">
          Health Plus &nbsp;·&nbsp; ₹5L sum insured
        </p>
        <p className="mt-1 text-[11px] text-white/85">Renews 12 Mar · 2 dependants covered</p>
      </motion.div>

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { label: "Claim", c: "#EC6625" },
          { label: "Wellness", c: "#01A252" },
          { label: "OPD", c: "#7C7EF5" },
          { label: "Pay", c: "#F08C46" },
        ].map((q, i) => (
          <motion.div
            key={q.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            className="aspect-square rounded-xl bg-[var(--bg)] border border-[var(--border)] flex flex-col items-center justify-center gap-1"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: q.c }}
              aria-hidden
            />
            <span className="text-[9px] text-[var(--text)]/70">{q.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Wellness card */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#EC6625]">
          Today
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--text)]">
          Teleconsult — covered free
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-[var(--text)]/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "62%" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#EC6625 0%,#F5A06A 100%)",
              }}
            />
          </div>
          <span className="font-mono text-[10px] text-[var(--text)]/55">62%</span>
        </div>
      </motion.div>

      {/* Bottom nav */}
      <div className="absolute bottom-4 left-4 right-4 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur p-2 flex justify-around">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: i === 0 ? "#EC6625" : "rgba(255,255,255,0.25)",
            }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
