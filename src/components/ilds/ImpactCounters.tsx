"use client"

import * as React from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

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
  const value = useMotionValue(0)
  const display = useTransform(value, (v) =>
    `${prefix}${v.toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    })}${suffix}`
  )

  React.useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, to, duration, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

const TEAMS = [
  { name: "PMT Design Team",   variables: 4_033_626, components: 507_381, percent: 85 },
  { name: "IL Nysa",           variables:   447_199, components:  85_356, percent:  9 },
  { name: "Project Orion",     variables:   179_755, components:  10_181, percent:  4 },
  { name: "IL Design System 2.0", variables:  37_107, components:   1_012, percent: 1 },
  { name: "AutoNinja CRM",     variables:    19_915, components:   2_649, percent: 0.5 },
  { name: "Lombard Creative",  variables:     3_182, components:   4_208, percent: 0.4 },
  { name: "NINAD",             variables:     1_605, components:     188, percent: 0.1 },
] as const

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
  const max = TEAMS[0].variables

  return (
    <div ref={ref} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 md:p-10 backdrop-blur">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-2">
            Adoption Distribution
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            7 adopters, 4.7M variable inserts in year one
          </h3>
        </div>
        <p className="font-mono text-[11px] text-[var(--text)]/60 max-w-xs">
          Live insertions tracked through Figma Library Analytics, May 2024 – Apr 2025.
        </p>
      </div>

      <div className="space-y-5">
        {TEAMS.map((t, i) => {
          const width = (t.variables / max) * 100
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
                      opacity: 0.3 + (1 - i * 0.12),
                    }}
                  />
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <p className="font-mono text-[12px] font-bold tracking-wider text-[var(--text)]">
                  {(t.variables / 1000).toFixed(0)}K
                </p>
                <p className="font-mono text-[10px] tracking-wider text-[var(--text)]/50">
                  {t.percent}%
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-sm text-[var(--text)]/60 max-w-2xl">
        PMT alone accounts for <span className="text-[var(--text)] font-semibold">85%</span> of insertions — an internal sign of how foundational the tokens became to day-to-day product work.
      </p>
    </div>
  )
}
