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

// IL TakeCare brand-tinted palette (orange spot used alongside site accent)
const ORANGE = "#EC6625"
const ORANGE_SOFT = "#F5A06A"
const ACCENT = "#7C7EF5"
const TEXT = "#F0F0F4"
const SURFACE = "#16161C"
const RED = "#F5503F"
const GREEN = "#01A252"

export function IltcMorph({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Subtle global rotation that drifts through the whole narrative
  const drift = useTransform(scrollYProgress, [0, 1], [-4, 4])

  return (
    <div className="relative aspect-square w-full max-w-[440px] mx-auto overflow-hidden">
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        style={{ rotate: drift }}
        aria-hidden="true"
      >
        {/* Subtle background rings */}
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

        {/* Stage 1 — Phone with cluttered UI (the legacy app) */}
        <Scene progress={scrollYProgress} index={0}>
          <rect
            x="140"
            y="80"
            width="120"
            height="240"
            rx="22"
            fill={SURFACE}
            stroke={ORANGE}
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          {/* Notch */}
          <rect x="180" y="92" width="40" height="6" rx="3" fill={ORANGE} fillOpacity="0.3" />
          {/* Cluttered tiles */}
          {[...Array(6)].map((_, r) =>
            [...Array(3)].map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={150 + c * 36}
                y={108 + r * 32}
                width="32"
                height="28"
                rx="3"
                fill={ORANGE}
                fillOpacity={0.12 + (r * 3 + c) * 0.04}
                stroke={ORANGE}
                strokeOpacity="0.25"
                strokeWidth="0.5"
              />
            ))
          )}
          <text
            x="200"
            y="345"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.5"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            LEGACY · CLUTTERED
          </text>
        </Scene>

        {/* Stage 2 — Four pain dials (Complex / Slow / Hidden / Inconsistent) */}
        <Scene progress={scrollYProgress} index={1}>
          {[
            { x: 130, y: 130, label: "CMPLX" },
            { x: 270, y: 130, label: "SLOW" },
            { x: 130, y: 270, label: "HIDN" },
            { x: 270, y: 270, label: "DRFT" },
          ].map((d, i) => (
            <g key={d.label}>
              <circle
                cx={d.x}
                cy={d.y}
                r="44"
                fill="none"
                stroke={ORANGE}
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              <circle
                cx={d.x}
                cy={d.y}
                r="44"
                fill="none"
                stroke={ORANGE}
                strokeOpacity="0.85"
                strokeWidth="3"
                strokeDasharray={`${30 + i * 18} 200`}
                transform={`rotate(${-90 + i * 25} ${d.x} ${d.y})`}
              />
              <text
                x={d.x}
                y={d.y + 4}
                textAnchor="middle"
                fontSize="8"
                fill={TEXT}
                fillOpacity="0.7"
                fontFamily="Geist Mono, monospace"
                letterSpacing="1.5"
              >
                {d.label}
              </text>
            </g>
          ))}
        </Scene>

        {/* Stage 3 — Listening: speech bubbles converging */}
        <Scene progress={scrollYProgress} index={2}>
          {[
            { x: 90, y: 130, w: 90, h: 36 },
            { x: 220, y: 110, w: 95, h: 32 },
            { x: 100, y: 220, w: 100, h: 30 },
            { x: 215, y: 245, w: 90, h: 36 },
          ].map((b, i) => (
            <g key={i}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="14"
                fill={SURFACE}
                stroke={ORANGE}
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              {/* speech tail */}
              <path
                d={`M ${b.x + b.w / 2 - 4} ${b.y + b.h} l 6 6 l 0 -6 z`}
                fill={SURFACE}
                stroke={ORANGE}
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <rect x={b.x + 8} y={b.y + 10} width={b.w * 0.55} height="3" rx="1" fill={TEXT} fillOpacity="0.5" />
              <rect x={b.x + 8} y={b.y + 18} width={b.w * 0.4} height="3" rx="1" fill={TEXT} fillOpacity="0.3" />
            </g>
          ))}
          {/* central ear / focus */}
          <circle cx="200" cy="200" r="10" fill={ORANGE} fillOpacity="0.9" />
          <circle cx="200" cy="200" r="20" fill="none" stroke={ORANGE} strokeOpacity="0.4" />
        </Scene>

        {/* Stage 4 — Insight bars (data into insights) */}
        <Scene progress={scrollYProgress} index={3}>
          {[
            { x: 100, h: 180, label: "3130" },
            { x: 175, h: 130, label: "2256" },
            { x: 250, h: 145, label: "2524" },
            { x: 325, h: 78, label: "1370" },
          ].map((c) => (
            <g key={c.label}>
              <rect
                x={c.x - 25}
                y={300 - c.h}
                width="50"
                height={c.h}
                rx="6"
                fill={ORANGE}
                fillOpacity="0.85"
              />
              <rect
                x={c.x - 25}
                y={300 - c.h}
                width="50"
                height="6"
                rx="3"
                fill={ORANGE_SOFT}
              />
              <text
                x={c.x}
                y="320"
                textAnchor="middle"
                fontSize="9"
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
            x1="60"
            y1="300"
            x2="360"
            y2="300"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
        </Scene>

        {/* Stage 5 — Compass / four-direction strategy */}
        <Scene progress={scrollYProgress} index={4}>
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke={ORANGE}
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="60"
            fill="none"
            stroke={ORANGE}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          {[0, 90, 180, 270].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 200 200)`}>
              <line x1="200" y1="100" x2="200" y2="80" stroke={ORANGE} strokeWidth="2" />
              <polygon points="200,72 195,84 205,84" fill={ORANGE} />
              <line x1="200" y1="200" x2="200" y2="120" stroke={ORANGE} strokeOpacity="0.4" strokeWidth="1" />
            </g>
          ))}
          <circle cx="200" cy="200" r="14" fill={ORANGE} />
          <text
            x="200"
            y="60"
            textAnchor="middle"
            fontSize="8"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            OPTIMISE
          </text>
          <text
            x="350"
            y="204"
            textAnchor="middle"
            fontSize="8"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            BOOST
          </text>
          <text
            x="200"
            y="350"
            textAnchor="middle"
            fontSize="8"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            DELIGHT
          </text>
          <text
            x="50"
            y="204"
            textAnchor="middle"
            fontSize="8"
            fill={TEXT}
            fillOpacity="0.6"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            CONSIST
          </text>
        </Scene>

        {/* Stage 6 — Five principle pillars */}
        <Scene progress={scrollYProgress} index={5}>
          {[1, 2, 3, 4, 5].map((i) => {
            const x = 90 + (i - 1) * 55
            const heights = [120, 150, 180, 140, 100]
            const h = heights[i - 1]
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={300 - h}
                  width="38"
                  height={h}
                  rx="6"
                  fill={ORANGE}
                  fillOpacity={0.4 + i * 0.08}
                />
                <circle cx={x + 19} cy={300 - h - 14} r="10" fill={ORANGE} />
                <path
                  d={`M ${x + 14} ${300 - h - 14} l 4 4 l 7 -7`}
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x={x + 19}
                  y="320"
                  textAnchor="middle"
                  fontSize="9"
                  fill={TEXT}
                  fillOpacity="0.6"
                  fontFamily="Geist Mono, monospace"
                  letterSpacing="0.5"
                >
                  {i}
                </text>
              </g>
            )
          })}
          <text
            x="200"
            y="345"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.5"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            CLARITY · CONTROL · CARE
          </text>
        </Scene>

        {/* Stage 7 — Sprint swimlanes (collaborative execution) */}
        <Scene progress={scrollYProgress} index={6}>
          {["Product", "Design", "Eng", "QA"].map((track, i) => (
            <g key={track}>
              <line
                x1="80"
                y1={120 + i * 45}
                x2="320"
                y2={120 + i * 45}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <text
                x="76"
                y={123 + i * 45}
                textAnchor="end"
                fontSize="8"
                fill={TEXT}
                fillOpacity="0.6"
                fontFamily="Geist Mono, monospace"
                letterSpacing="1"
              >
                {track.toUpperCase()}
              </text>
              {/* sprint pills */}
              {[
                { x: 90, w: 60 },
                { x: 160, w: 80 },
                { x: 250, w: 65 },
              ].map((p, j) => (
                <rect
                  key={j}
                  x={p.x}
                  y={114 + i * 45}
                  width={p.w}
                  height="12"
                  rx="6"
                  fill={ORANGE}
                  fillOpacity={0.4 + j * 0.18}
                />
              ))}
            </g>
          ))}
          <text
            x="200"
            y="335"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.5"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            AGILE · CROSS-FUNCTIONAL
          </text>
        </Scene>

        {/* Stage 8 — Refreshed phone (clean, organised app) */}
        <Scene progress={scrollYProgress} index={7}>
          <rect
            x="140"
            y="70"
            width="120"
            height="260"
            rx="22"
            fill={SURFACE}
            stroke={ORANGE}
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
          {/* Notch */}
          <rect x="180" y="82" width="40" height="6" rx="3" fill={ORANGE} fillOpacity="0.4" />
          {/* Hero card */}
          <rect x="150" y="100" width="100" height="46" rx="8" fill={ORANGE} fillOpacity="0.85" />
          <rect x="158" y="112" width="50" height="5" rx="2" fill="white" fillOpacity="0.95" />
          <rect x="158" y="124" width="36" height="4" rx="2" fill="white" fillOpacity="0.7" />
          {/* Quick links */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={150 + (i % 4) * 26}
                y="160"
                width="20"
                height="20"
                rx="6"
                fill={ORANGE}
                fillOpacity="0.18"
              />
              <circle cx={160 + (i % 4) * 26} cy="170" r="3" fill={ORANGE} />
            </g>
          ))}
          {/* Wellness card */}
          <rect x="150" y="194" width="48" height="56" rx="8" fill={ORANGE_SOFT} fillOpacity="0.18" />
          <circle cx="174" cy="218" r="10" fill={GREEN} fillOpacity="0.85" />
          <rect x="158" y="234" width="32" height="4" rx="2" fill={TEXT} fillOpacity="0.55" />
          {/* Claims card */}
          <rect x="202" y="194" width="48" height="56" rx="8" fill={ACCENT} fillOpacity="0.18" />
          <rect x="210" y="206" width="32" height="6" rx="2" fill={ACCENT} />
          <rect x="210" y="220" width="22" height="3" rx="1" fill={TEXT} fillOpacity="0.4" />
          <rect x="210" y="228" width="28" height="3" rx="1" fill={TEXT} fillOpacity="0.4" />
          {/* Bottom nav */}
          <rect x="148" y="290" width="104" height="24" rx="12" fill="rgba(255,255,255,0.05)" />
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={166 + i * 22}
              cy="302"
              r="3"
              fill={i === 0 ? ORANGE : TEXT}
              fillOpacity={i === 0 ? 1 : 0.4}
            />
          ))}
          <text
            x="200"
            y="350"
            textAnchor="middle"
            fontSize="9"
            fill={TEXT}
            fillOpacity="0.55"
            fontFamily="Geist Mono, monospace"
            letterSpacing="2"
          >
            CLEAN · GUIDED · CALM
          </text>
        </Scene>

        {/* Stage 9 — Impact starburst */}
        <Scene progress={scrollYProgress} index={8}>
          <defs>
            <radialGradient id="iltcGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={ORANGE} stopOpacity="0.55" />
              <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="iltcFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ORANGE} />
              <stop offset="100%" stopColor={ORANGE_SOFT} />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="130" fill="url(#iltcGlow)" />
          {/* Up-arrows around centre = growth metrics */}
          {[
            { angle: -90, len: 60, label: "+328%", color: GREEN },
            { angle: -30, len: 48, label: "+37%", color: GREEN },
            { angle: 30, len: 44, label: "+34%", color: GREEN },
            { angle: 90, len: 56, label: "−54%", color: RED },
            { angle: 150, len: 50, label: "24h", color: ACCENT },
            { angle: 210, len: 46, label: "TAT", color: ACCENT },
          ].map((s) => {
            const rad = (s.angle * Math.PI) / 180
            const x = 200 + Math.cos(rad) * 110
            const y = 200 + Math.sin(rad) * 110
            return (
              <g key={s.label}>
                <line
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos(rad) * 80}
                  y2={200 + Math.sin(rad) * 80}
                  stroke={s.color}
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                />
                <circle cx={x} cy={y} r="22" fill={SURFACE} stroke={s.color} strokeWidth="1.4" />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill={s.color}
                  fontFamily="Geist Mono, monospace"
                  letterSpacing="0.5"
                >
                  {s.label}
                </text>
              </g>
            )
          })}
          {/* Centre mark */}
          <rect
            x="170"
            y="170"
            width="60"
            height="60"
            rx="14"
            fill="url(#iltcFill)"
          />
          <text
            x="200"
            y="206"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="white"
            fontFamily="Geist Mono, monospace"
            letterSpacing="1.5"
          >
            ILTC
          </text>
        </Scene>
      </motion.svg>
    </div>
  )
}
