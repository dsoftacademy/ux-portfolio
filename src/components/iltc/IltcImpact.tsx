"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion"

function formatMetric(value: number, decimals: number, prefix: string, suffix: string) {
  return `${prefix}${value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })}${suffix}`
}

function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const value = useMotionValue(0)
  const finalText = formatMetric(to, decimals, prefix, suffix)
  const display = useTransform(value, (v) =>
    formatMetric(v, decimals, prefix, suffix)
  )

  React.useEffect(() => {
    if (!inView || prefersReducedMotion) return
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, to, duration, value, prefersReducedMotion])

  if (prefersReducedMotion) {
    return <span ref={ref}>{finalText}</span>
  }

  return (
    <span ref={ref}>
      <span className="sr-only">{finalText}</span>
      <motion.span aria-hidden>{display}</motion.span>
    </span>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Insight counters (3130, 2256, 2524, 1370 — customer signals from research)
// ────────────────────────────────────────────────────────────────────────────

interface InsightRow {
  value: number
  tag: string
  label: string
  icon: React.ReactNode
}

const INSIGHTS: InsightRow[] = [
  {
    value: 3130,
    tag: "Policy",
    label: "Couldn't find their policy coverage or understand what they were actually insured for.",
    // shield / document icon
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    value: 2256,
    tag: "Claims",
    label: "Were uncertain about the claim process — when to file, what's covered, what to expect.",
    // file-check icon
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    value: 2524,
    tag: "Benefits",
    label: "Had no idea the app offered value-added benefits — wellness, lifestyle, and partner services.",
    // star / gift icon
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </svg>
    ),
  },
  {
    value: 1370,
    tag: "Login",
    label: "Hit friction logging in or couldn't link their existing policy to their account.",
    // lock icon
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC6625" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="#EC6625" />
      </svg>
    ),
  },
]

export function InsightCounters() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]">
      {INSIGHTS.map((m) => (
        <div key={m.tag} className="bg-[var(--bg)] p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            {m.icon}
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {m.tag}
            </span>
          </div>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)] tabular-nums">
            <Counter to={m.value} />
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--text)]/65">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Impact scoreboard — 5 hero metrics from the post-launch report
// ────────────────────────────────────────────────────────────────────────────

type Direction = "up" | "down" | "neutral"

interface ImpactMetric {
  value: number
  decimals?: number
  suffix: string
  prefix?: string
  direction: Direction
  label: string
  detail: string
  span?: 1 | 2
}

const IMPACT: ImpactMetric[] = [
  {
    value: 53.8,
    decimals: 1,
    suffix: "%",
    direction: "down",
    label: "Drop in customer calls",
    detail: "Guided tours, contextual tips and easy navigation cut call-centre escalations.",
  },
  {
    value: 37.2,
    decimals: 1,
    suffix: "%",
    direction: "up",
    label: "Boost in health-services usage",
    detail: "Teleconsultation and OPD bookings climbed after surfacing wellness in the home flow.",
  },
  {
    value: 328.1,
    decimals: 1,
    suffix: "%",
    direction: "up",
    label: "Higher feature utilisation",
    detail: "Discoverability redesign turned dormant value-added benefits into daily-active surfaces.",
    span: 2,
  },
  {
    value: 34.2,
    decimals: 1,
    suffix: "%",
    direction: "up",
    label: "Growth in monthly app installs",
    detail: "A clearer first-run story and store creatives drove acquisition alongside retention.",
  },
  {
    value: 24,
    suffix: " hrs",
    direction: "down",
    label: "Feature TAT (was ~48 days)",
    detail: "Design-system tokens + reusable components compressed rollout from weeks to a single day.",
  },
]

function ArrowIcon({ direction }: { direction: Direction }) {
  if (direction === "up") {
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#01A252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    )
  }
  if (direction === "down") {
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#01A252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14" />
        <path d="m5 12 7 7 7-7" />
      </svg>
    )
  }
  return null
}

function ImpactMetricCard({
  m,
  index,
}: {
  m: ImpactMetric
  index: number
}) {
  const reduce = useReducedMotion()
  const className = `relative h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 p-7 md:p-8 backdrop-blur ${
    m.span === 2 ? "md:col-span-2" : ""
  }`
  const body = (
    <>
      <div className="flex items-start justify-between gap-4 mb-2">
        <ArrowIcon direction={m.direction} />
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          {m.direction === "down" ? "Decrease" : "Increase"}
        </span>
      </div>
      <p className="font-sans text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-tighter leading-[1] text-[var(--text)] tabular-nums">
        <Counter to={m.value} decimals={m.decimals ?? 0} suffix={m.suffix} prefix={m.prefix ?? ""} />
      </p>
      <p className="mt-4 text-base font-semibold text-[var(--text)]">{m.label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text)]/65">{m.detail}</p>
    </>
  )
  if (reduce) {
    return <article className={className}>{body}</article>
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {body}
    </motion.article>
  )
}

export function ImpactScoreboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {IMPACT.map((m, i) => (
        <ImpactMetricCard key={m.label} m={m} index={i} />
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// User feedback cards — quotes from listening sessions
// ────────────────────────────────────────────────────────────────────────────

const QUOTES = [
  {
    name: "Pragya",
    persona: "First-time policyholder",
    quote:
      "I can't find my policy easily. I'm not sure what my policy actually covers with so much jargon.",
  },
  {
    name: "Shailesh",
    persona: "Health-policy renewer",
    quote: "I want to feel reassured, not just reminded.",
  },
  {
    name: "Arpan",
    persona: "Frequent claimant",
    quote: "I don't know where to tap. I just want quick access.",
  },
  {
    name: "Kajal",
    persona: "Lifestyle services user",
    quote: "Why open the app if I don't need to file something?",
  },
] as const

export function UserVoices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {QUOTES.map((q, i) => (
        <motion.figure
          key={q.name}
          initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/55 p-6 md:p-7"
        >
          <svg
            aria-hidden
            className="absolute top-5 right-6 opacity-30"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="#EC6625"
          >
            <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4Zm12 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4Z" />
          </svg>
          <blockquote className="text-base md:text-lg leading-relaxed text-[var(--text)]/85 pr-10">
            “{q.quote}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-[12px] font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#EC6625 0%,#F5A06A 100%)",
              }}
              aria-hidden
            >
              {q.name[0]}
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">{q.name}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--text)]/55">
                {q.persona}
              </p>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
