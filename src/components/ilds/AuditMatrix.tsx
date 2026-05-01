"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

const SYSTEMS = [
  "Spectrum",
  "Material",
  "Carbon",
  "Polaris",
  "Lightning",
  "Atlassian",
  "Fluent",
  "IL DS",
] as const

type Cell = "y" | "n" | "p"

interface Row {
  name: string
  phase: string
  cells: Cell[] // length 8 — order matches SYSTEMS
}

// Sourced from your audit sheet. y=Yes, n=No, p=Partial.
// IL DS column reflects the "before" state at time of audit.
const ROWS: Row[] = [
  { name: "Principles",          phase: "P1", cells: ["y","n","n","y","n","y","y","n"] },
  { name: "Brand values",        phase: "P1", cells: ["n","n","n","n","n","y","n","y"] },
  { name: "Design tokens",       phase: "P1", cells: ["y","y","y","y","y","y","y","n"] },
  { name: "Color",               phase: "P1", cells: ["y","y","y","y","y","y","y","y"] },
  { name: "Typography",          phase: "P1", cells: ["y","y","y","y","y","y","y","y"] },
  { name: "Surface",             phase: "P1", cells: ["n","y","n","n","y","n","y","n"] },
  { name: "Elevation / Shadow",  phase: "P1", cells: ["y","y","n","y","y","y","y","n"] },
  { name: "Shapes",              phase: "P1", cells: ["y","y","n","n","n","n","y","n"] },
  { name: "Motion",              phase: "P1", cells: ["y","y","y","y","y","y","y","n"] },
  { name: "Spacing",             phase: "P1", cells: ["y","n","y","y","y","y","y","y"] },
  { name: "Iconography",         phase: "P2", cells: ["y","y","y","y","y","y","y","y"] },
  { name: "States",              phase: "P2", cells: ["y","y","n","y","n","n","y","n"] },
  { name: "Voice & Tone",        phase: "P1", cells: ["y","n","y","y","y","y","y","y"] },
  { name: "Accessibility",       phase: "P2", cells: ["y","y","y","y","y","y","y","n"] },
  { name: "Layouts",             phase: "P4", cells: ["n","y","n","y","y","y","y","n"] },
  { name: "Grid",                phase: "P2", cells: ["y","n","y","n","y","y","y","y"] },
  { name: "Illustration",        phase: "P3", cells: ["y","n","n","y","n","y","n","y"] },
  { name: "Data Viz",            phase: "P4", cells: ["y","n","y","y","y","n","n","n"] },
  { name: "Internationalisation",phase: "P3", cells: ["y","n","n","y","n","n","y","n"] },
  { name: "Border Width",        phase: "—",  cells: ["y","n","n","n","y","n","n","n"] },
]

const CELL_FILL: Record<Cell, string> = {
  y: "var(--accent)",
  n: "transparent",
  p: "color-mix(in srgb, var(--accent) 35%, transparent)",
}

export function AuditMatrix() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  // Compute IL DS reusability score from rows that fall in P1+P2 (in-scope)
  const ilCol = SYSTEMS.indexOf("IL DS")
  const inScope = ROWS.filter((r) => r.phase === "P1" || r.phase === "P2")
  const ilHits = inScope.filter((r) => r.cells[ilCol] === "y").length
  const reuse = Math.round((ilHits / inScope.length) * 100)

  return (
    <div ref={ref} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 md:p-10 backdrop-blur">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-2">
            Competitive Benchmark
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            Audited 28 system dimensions across 7 industry leaders
          </h3>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/60 mb-1">Baseline reuse</p>
            <p className="text-3xl font-extrabold tracking-tight text-[var(--text)]">
              <span className="text-red-400">{reuse}%</span>
            </p>
          </div>
          <div className="h-12 w-px bg-[var(--border)]" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/60 mb-1">P1 target</p>
            <p className="text-3xl font-extrabold tracking-tight text-[var(--accent)]">75%</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="sticky left-0 bg-[var(--surface)]/80 backdrop-blur py-3 pr-4 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text)]/60 align-bottom">
                Dimension
              </th>
              {SYSTEMS.map((s) => (
                <th
                  key={s}
                  className={`px-2 py-3 text-[10px] font-mono font-bold uppercase tracking-wider align-bottom ${
                    s === "IL DS" ? "text-[var(--accent)]" : "text-[var(--text)]/60"
                  }`}
                >
                  <span className="inline-block -rotate-45 origin-bottom-left whitespace-nowrap">
                    {s}
                  </span>
                </th>
              ))}
              <th className="pl-4 py-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text)]/60 align-bottom">
                Phase
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.name} className="border-t border-[var(--border)]">
                <td className="sticky left-0 bg-[var(--surface)]/80 backdrop-blur py-2 pr-4 text-sm font-medium text-[var(--text)]">
                  {row.name}
                </td>
                {row.cells.map((c, ci) => (
                  <td key={ci} className="px-2 py-2">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        delay: 0.02 * (i * SYSTEMS.length + ci),
                        type: "spring",
                        stiffness: 200,
                        damping: 22,
                      }}
                      className="aspect-square w-6 md:w-7 rounded"
                      style={{
                        backgroundColor: CELL_FILL[c],
                        border: c === "n"
                          ? "1px solid rgba(239, 68, 68, 0.4)"
                          : `1px solid var(--accent)`,
                      }}
                    />
                  </td>
                ))}
                <td className="pl-4 py-2 text-[10px] font-mono font-bold tracking-wider">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      row.phase === "P1"
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : row.phase === "—"
                        ? "text-[var(--text)]/40"
                        : "bg-[var(--text)]/5 text-[var(--text)]/60"
                    }`}
                  >
                    {row.phase}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-[var(--text)]/60 max-w-2xl">
        IL&apos;s pre-existing system covered just <span className="text-[var(--text)] font-semibold">{reuse}%</span> of in-scope dimensions adopted by industry-leading systems. The audit framed scope, phasing, and the case for executive sign-off.
      </p>
    </div>
  )
}
