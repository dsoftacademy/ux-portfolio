"use client"

import * as React from "react"
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion"

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

/** Component insertions — ILDS Master → Analytics, Type: Components, Duration: Year (May 2024 – Apr 2025). */
const COMPONENT_ADOPTION = [
  { name: "PMT Design Team", insertions: 505_360, shareLabel: "83%" },
  { name: "IL Nysa", insertions: 85_356, shareLabel: "14%" },
  { name: "Project Orion", insertions: 10_181, shareLabel: "2%" },
  { name: "Lombard Creative", insertions: 4_191, shareLabel: "1%" },
  { name: "AutoNinja CRM", insertions: 2_649, shareLabel: "<1%" },
  { name: "IL Design System 2.0", insertions: 1_012, shareLabel: "<1%" },
] as const

const COMPONENT_INSERTION_TOTAL = COMPONENT_ADOPTION.reduce((sum, r) => sum + r.insertions, 0)

const HEADLINE_METRICS = [
  { label: "Projects using",      value: 23,         suffix: "" },
  { label: "Components built",   value: 20,         suffix: "" },
  { label: "Variables published", value: 112,       suffix: "" },
  { label: "Variable inserts",   value: 4.7,        suffix: "M", decimals: 1 },
  { label: "Style inserts",      value: 1.17,       suffix: "M", decimals: 2 },
  { label: "Weekly inserts",     value: 46.8,       suffix: "K", decimals: 1 },
] as const

export function HeadlineMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]">
      {HEADLINE_METRICS.map((m) => (
        <div key={m.label} className="bg-[var(--bg)] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text)]/60 mb-3">
            {m.label}
          </p>
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]">
            <Counter
              to={m.value}
              suffix={m.suffix}
              decimals={"decimals" in m && typeof m.decimals === "number" ? m.decimals : 0}
            />
          </p>
        </div>
      ))}
    </div>
  )
}

export function AdoptionBars() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const max = COMPONENT_ADOPTION[0].insertions
  const totalDisplay = COMPONENT_INSERTION_TOTAL.toLocaleString("en-IN")

  return (
    <div ref={ref} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 md:p-10 backdrop-blur">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--accent)] mb-2">
            Adoption distribution
          </p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            Six teams ranked by component insertions ({totalDisplay}/year)
          </h3>
        </div>
        <p className="font-mono text-[11px] text-[var(--text)]/60 max-w-xs leading-relaxed">
          Source: ILDS Master → Analytics · Type: Components · Duration: Year (May 2024 – Apr 2025). Matches exported
          Figma Library dashboards.
        </p>
      </div>

      <div className="space-y-5">
        {COMPONENT_ADOPTION.map((t, i) => {
          const width = (t.insertions / max) * 100
          const countDisplay = t.insertions.toLocaleString("en-IN")
          return (
            <div key={t.name} className="grid grid-cols-12 items-center gap-3">
              <div className="col-span-12 md:col-span-3">
                <p className="text-sm font-medium text-[var(--text)] truncate">{t.name}</p>
              </div>
              <div className="col-span-9 md:col-span-7">
                <div className="relative h-7 w-full rounded-full bg-[var(--text)]/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${width}%` } : {}}
                    transition={{
                      duration: 1.4,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, var(--accent) 0%, #A78BFA 100%)`,
                      opacity: 0.3 + (1 - i * 0.14),
                    }}
                  />
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <p className="font-mono text-[12px] font-bold tracking-wider text-[var(--text)] tabular-nums">
                  {countDisplay}
                </p>
                <p className="font-mono text-[10px] tracking-wider text-[var(--text)]/50">
                  {t.shareLabel}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-sm text-[var(--text)]/60 max-w-2xl">
        PMT Design Team drove <span className="text-[var(--text)] font-semibold">83%</span> of those component inserts—an internal signal that the library anchored day-to-day product work, not slideware.
      </p>
    </div>
  )
}
