"use client"

import * as React from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

const STAGE_COUNT = 9

function useStageOpacity(progress: MotionValue<number>, index: number) {
  const slot = 1 / STAGE_COUNT
  const start = index * slot
  const end = (index + 1) * slot
  const fadeIn = Math.max(0, start - slot * 0.4)
  const fadeOut = Math.min(1, end + slot * 0.4)
  return useTransform(
    progress,
    [fadeIn, start, end, fadeOut],
    [0, 1, 1, 0]
  )
}

function useStageScale(progress: MotionValue<number>, index: number) {
  const slot = 1 / STAGE_COUNT
  const start = index * slot
  const end = (index + 1) * slot
  return useTransform(
    progress,
    [Math.max(0, start - slot * 0.5), start, end, Math.min(1, end + slot * 0.5)],
    [0.85, 1, 1, 1.05]
  )
}

interface SceneProps {
  progress: MotionValue<number>
  index: number
  children: React.ReactNode
}

function Scene({ progress, index, children }: SceneProps) {
  const opacity = useStageOpacity(progress, index)
  const scale = useStageScale(progress, index)
  return (
    <motion.g style={{ opacity, scale, transformOrigin: "center" }}>
      {children}
    </motion.g>
  )
}

const ACCENT = "#7C7EF5"
const ACCENT_SOFT = "#A78BFA"
const TEXT = "#F0F0F4"
const SURFACE = "#16161C"

export function ScrollMorph({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Subtle global rotation that drifts through the whole narrative
  const drift = useTransform(scrollYProgress, [0, 1], [-6, 6])

  return (
    <div className="relative aspect-square w-full max-w-[440px] mx-auto">
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        style={{ rotate: drift }}
      >
        {/* Subtle background ring */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* Stage 1 — Solid Block (the static past) */}
        <Scene progress={scrollYProgress} index={0}>
          <rect
            x="130"
            y="130"
            width="140"
            height="140"
            rx="8"
            fill={SURFACE}
            stroke={ACCENT}
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.4"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            STATIC
          </text>
        </Scene>

        {/* Stage 2 — Fractured (chaos) */}
        <Scene progress={scrollYProgress} index={1}>
          {[
            { x: 100, y: 90, w: 70, h: 50, r: -12 },
            { x: 230, y: 110, w: 60, h: 70, r: 8 },
            { x: 80, y: 200, w: 90, h: 40, r: 6 },
            { x: 230, y: 220, w: 80, h: 60, r: -18 },
            { x: 160, y: 150, w: 50, h: 90, r: 22 },
            { x: 250, y: 60, w: 30, h: 30, r: 30 },
          ].map((s, i) => (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx="4"
              fill={SURFACE}
              stroke={ACCENT}
              strokeOpacity={0.2 + i * 0.08}
              strokeWidth="1"
              transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`}
            />
          ))}
        </Scene>

        {/* Stage 3 — Two orbiting fragments (mandate: App + Website) */}
        <Scene progress={scrollYProgress} index={2}>
          <rect
            x="100"
            y="140"
            width="80"
            height="120"
            rx="14"
            fill="none"
            stroke={ACCENT}
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <text
            x="140"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="1.5"
          >
            APP
          </text>
          <rect
            x="220"
            y="120"
            width="120"
            height="160"
            rx="8"
            fill="none"
            stroke={ACCENT_SOFT}
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <text
            x="280"
            y="208"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="1.5"
          >
            WEB
          </text>
          <line
            x1="180"
            y1="200"
            x2="220"
            y2="200"
            stroke={ACCENT}
            strokeOpacity="0.4"
            strokeDasharray="2 3"
          />
        </Scene>

        {/* Stage 4 — Audit Grid (8 rows × 7 cols, mostly red/empty) */}
        <Scene progress={scrollYProgress} index={3}>
          {(() => {
            const cells = []
            const cols = 7
            const rows = 8
            const cellW = 32
            const cellH = 24
            const gap = 2
            const totalW = cols * cellW + (cols - 1) * gap
            const totalH = rows * cellH + (rows - 1) * gap
            const startX = (400 - totalW) / 2
            const startY = (400 - totalH) / 2
            // Pseudorandom pass/fail pattern matching the audit reusability of ~20%
            const passPattern = [
              0, 1, 0, 1, 1, 1, 1,
              0, 0, 0, 0, 0, 1, 0,
              1, 1, 0, 0, 1, 1, 1,
              0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 1, 0, 1, 0,
              0, 0, 0, 0, 0, 1, 0,
              1, 1, 0, 1, 0, 1, 1,
              0, 0, 0, 0, 0, 0, 0,
            ]
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const idx = r * cols + c
                const pass = passPattern[idx]
                cells.push(
                  <rect
                    key={`${r}-${c}`}
                    x={startX + c * (cellW + gap)}
                    y={startY + r * (cellH + gap)}
                    width={cellW}
                    height={cellH}
                    rx="2"
                    fill={pass ? ACCENT : SURFACE}
                    fillOpacity={pass ? 0.7 : 1}
                    stroke={pass ? ACCENT : "rgba(239, 68, 68, 0.5)"}
                    strokeWidth="0.8"
                  />
                )
              }
            }
            return cells
          })()}
        </Scene>

        {/* Stage 5 — Three Phase Columns */}
        <Scene progress={scrollYProgress} index={4}>
          {[
            { x: 100, h: 200, label: "P1", op: 0.85 },
            { x: 175, h: 130, label: "P2", op: 0.55 },
            { x: 250, h: 90, label: "P3", op: 0.35 },
          ].map((c) => (
            <g key={c.label}>
              <rect
                x={c.x}
                y={300 - c.h}
                width="50"
                height={c.h}
                rx="6"
                fill={ACCENT}
                fillOpacity={c.op}
              />
              <text
                x={c.x + 25}
                y="320"
                textAnchor="middle"
                fontSize="11"
                fill={TEXT}
                fillOpacity="0.7"
                fontFamily="Geist Mono, monospace"
                letterSpacing="1"
              >
                {c.label}
              </text>
            </g>
          ))}
          <line
            x1="80"
            y1="300"
            x2="320"
            y2="300"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
        </Scene>

        {/* Stage 6 — Color Palette (foundations) */}
        <Scene progress={scrollYProgress} index={5}>
          {[
            "#7C7EF5", "#A78BFA", "#5B5DDF", "#EC4899",
            "#F59E0B", "#10B981", "#3B82F6", "#06B6D4",
            "#F0F0F4", "#A1A1AA", "#52525B", "#27272A",
          ].map((color, i) => {
            const col = i % 4
            const row = Math.floor(i / 4)
            return (
              <rect
                key={i}
                x={120 + col * 50}
                y={140 + row * 50}
                width="42"
                height="42"
                rx="6"
                fill={color}
                opacity={0.85}
              />
            )
          })}
          <text
            x="200"
            y="320"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.5"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            TOKENS · 112
          </text>
        </Scene>

        {/* Stage 7 — Component Stack */}
        <Scene progress={scrollYProgress} index={6}>
          {/* Card */}
          <rect x="110" y="100" width="180" height="200" rx="12" fill={SURFACE} stroke="rgba(255,255,255,0.08)" />
          {/* Title bar */}
          <rect x="125" y="120" width="100" height="10" rx="2" fill={TEXT} fillOpacity="0.8" />
          <rect x="125" y="138" width="60" height="6" rx="2" fill={TEXT} fillOpacity="0.3" />
          {/* Input */}
          <rect x="125" y="160" width="150" height="28" rx="6" fill="none" stroke={TEXT} strokeOpacity="0.2" />
          <rect x="135" y="172" width="70" height="4" rx="1" fill={TEXT} fillOpacity="0.4" />
          {/* Button (Primary) */}
          <rect x="125" y="200" width="80" height="32" rx="16" fill={ACCENT} />
          <rect x="142" y="213" width="46" height="6" rx="1" fill="white" fillOpacity="0.95" />
          {/* Secondary chip */}
          <rect x="215" y="208" width="60" height="20" rx="10" fill="none" stroke={TEXT} strokeOpacity="0.3" />
          {/* Footer ticks */}
          <circle cx="135" cy="265" r="3" fill={ACCENT} />
          <rect x="145" y="262" width="80" height="6" rx="1" fill={TEXT} fillOpacity="0.4" />
          <text
            x="200"
            y="325"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.5"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            COMPONENTS · 20
          </text>
        </Scene>

        {/* Stage 8 — Adoption Network */}
        <Scene progress={scrollYProgress} index={7}>
          {(() => {
            // Central hub + 7 team nodes
            const center = { x: 200, y: 200 }
            const nodes = [
              { angle: -90, r: 110, size: 18, label: "PMT" },
              { angle: -38, r: 100, size: 11, label: "Nysa" },
              { angle: 14, r: 90, size: 8, label: "Orion" },
              { angle: 66, r: 95, size: 6, label: "Auto" },
              { angle: 118, r: 105, size: 5, label: "DS2" },
              { angle: 170, r: 100, size: 5, label: "Lomb" },
              { angle: -142, r: 100, size: 4, label: "Ninad" },
            ]
            return (
              <>
                {nodes.map((n, i) => {
                  const rad = (n.angle * Math.PI) / 180
                  const x = center.x + Math.cos(rad) * n.r
                  const y = center.y + Math.sin(rad) * n.r
                  return (
                    <g key={i}>
                      <line
                        x1={center.x}
                        y1={center.y}
                        x2={x}
                        y2={y}
                        stroke={ACCENT}
                        strokeOpacity="0.25"
                        strokeWidth="0.8"
                      />
                      <circle cx={x} cy={y} r={n.size} fill={ACCENT} fillOpacity="0.85" />
                    </g>
                  )
                })}
                <circle cx={center.x} cy={center.y} r="22" fill={ACCENT} />
                <circle cx={center.x} cy={center.y} r="32" fill="none" stroke={ACCENT} strokeOpacity="0.5" />
                <circle cx={center.x} cy={center.y} r="46" fill="none" stroke={ACCENT} strokeOpacity="0.2" />
                <text
                  x={center.x}
                  y="345"
                  textAnchor="middle"
                  fontSize="9"
                  fill={TEXT}
                  fillOpacity="0.5"
                  fontFamily="Geist Mono, monospace"
                  letterSpacing="2"
                >
                  23 PROJECTS · 4.7M INSERTS
                </text>
              </>
            )
          })()}
        </Scene>

        {/* Stage 9 — The Refined Mark */}
        <Scene progress={scrollYProgress} index={8}>
          <defs>
            <radialGradient id="finalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.5" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="finalFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ACCENT} />
              <stop offset="100%" stopColor={ACCENT_SOFT} />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="120" fill="url(#finalGlow)" />
          <rect
            x="130"
            y="130"
            width="140"
            height="140"
            rx="32"
            fill="url(#finalFill)"
          />
          {/* Subtle grid inside */}
          {[1, 2, 3].map((i) => (
            <line
              key={`h${i}`}
              x1="130"
              y1={130 + i * 35}
              x2="270"
              y2={130 + i * 35}
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
          ))}
          {[1, 2, 3].map((i) => (
            <line
              key={`v${i}`}
              x1={130 + i * 35}
              y1="130"
              x2={130 + i * 35}
              y2="270"
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
          ))}
          <text
            x="200"
            y="335"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="3"
          >
            ILDS
          </text>
        </Scene>
      </motion.svg>
    </div>
  )
}
