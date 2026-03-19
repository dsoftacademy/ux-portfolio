"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Button } from './Button'
import { TypingRole } from './TypingRole'
import { HeroFloor } from './HeroFloor'

export const Hero = () => {
  // Removed unused isDark to fix Vercel/Local build errors
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const ref = useRef<HTMLElement>(null)

  // Calculate normalized mouse position (-0.5 to 0.5)
  const onMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setTiltX((e.clientX - r.left) / r.width - 0.5)
    setTiltY((e.clientY - r.top) / r.height - 0.5)
  }, [])

  return (
    <section
      ref={ref}
      onMouseMove={onMouse}
      className="relative min-h-[100vh] flex flex-col justify-center px-12 pt-[120px] pb-[80px] overflow-hidden"
    >
      {/* 1. LAYER: 3D Desk Surface (z-0) */}
      <HeroFloor tiltX={tiltX} tiltY={tiltY} />

      {/* 2. LAYER: Sacred Content Zone (z-10) */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto pointer-events-none">
        <div className="max-w-[620px] pointer-events-auto">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--pillBg)] mb-7 animate-fade-up">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-medium text-[var(--text-3)] tracking-[0.5px]">
              Design Lead @ ICICI Lombard · Open to relocation
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(40px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-1.5px] mb-[22px] animate-fade-up-1 text-[var(--text)] font-sans">
            I design systems<br />that{" "}
            <span className="bg-gradient-to-br from-[#818CF8] to-[#A78BFA] bg-clip-text text-transparent">
              scale
            </span>{" "}
            products.
          </h1>

          {/* Typing Role */}
          <div className="font-sans text-[clamp(17px,2.2vw,22px)] font-medium text-[var(--text-2)] mb-7 min-h-[32px] animate-fade-up-2">
            <TypingRole />
          </div>

          {/* Bio Description */}
          <p className="text-[15px] leading-[1.75] text-[var(--text-3)] max-w-[520px] mb-9 animate-fade-up-3">
            10+ years building human-centred enterprise products across insurance, telecom, AR/VR and D2C. I architect design systems, introduce AI-first experiences, and lead teams that ship at scale.
          </p>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-3 animate-fade-up-4">
            <Button href="#work" variant="primary">
              Explore Work
            </Button>
            <Button href="#about" variant="secondary">
              My Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-fade-in-late z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-[var(--text-5)] tracking-[2px] uppercase">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[rgba(99,102,241,0.35)] to-transparent" />
      </div>
    </section>
  )
}