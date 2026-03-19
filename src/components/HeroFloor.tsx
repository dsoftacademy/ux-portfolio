"use client"

import React from 'react'
import { useTheme } from './ThemeProvider'
import { HeroArtifacts } from './HeroArtifacts'

export const HeroFloor = ({ tiltX, tiltY }: { tiltX: number, tiltY: number }) => {
  const { isDark } = useTheme()
  const accent = isDark ? '#6366F1' : '#6366F1'
  const gridOp = isDark ? 0.025 : 0.035
  const fadeTo = isDark ? 'rgba(12,12,16,1)' : 'rgba(245,245,242,1)'

  return (
    <div className="absolute inset-0 overflow-hidden z-0" style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}>
      {/* The Global Tilted Desk Container */}
      <div 
        className="absolute inset-[-2%]"
        style={{
          transform: `rotateX(${tiltY * 1.5}deg) rotateY(${tiltX * -1.5}deg)`,
          transition: 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          transformOrigin: '50% 50%',
        }}
      >
        {/* The 24px SVG Grid */}
        <div className="absolute inset-0" style={{ opacity: gridOp }}>
          <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none">
            {Array.from({ length: 25 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 24} x2="100%" y2={i * 24} stroke={accent} strokeWidth="0.5" />
            ))}
            {Array.from({ length: 34 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="100%" stroke={accent} strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        {/* Ambient Desk Orbs */}
        <div className="absolute top-[-20%] right-[-15%] w-[700px] h-[700px] rounded-full pointer-events-none" 
             style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.045)'} 0%, transparent 65%)` }} />
        <div className="absolute bottom-[-25%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none" 
             style={{ background: `radial-gradient(circle, rgba(129,140,248,0.03) 0%, transparent 55%)` }} />

        {/* The 13 Artifacts injected directly onto the desk plane */}
        <HeroArtifacts isDark={isDark} />
      </div>

      {/* Bottom fade out so the desk doesn't have a hard edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none z-[1]" 
           style={{ background: `linear-gradient(to top, ${fadeTo}, transparent)` }} />
    </div>
  )
}