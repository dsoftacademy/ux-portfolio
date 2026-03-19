"use client"

import React, { useState } from 'react'

// --- V5 Design Primitives (Internal) ---
type ThemeAwareProps = { isDark: boolean }

type ToggleProps = ThemeAwareProps & { on: boolean }
const AToggle = ({ on, isDark }: ToggleProps) => (
  <div className={`w-[56px] h-[30px] rounded-[15px] relative ${on ? 'bg-[linear-gradient(135deg,#6366F1,#818CF8)] shadow-[0_8px_28px_rgba(99,102,241,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]' : (isDark ? 'bg-[#3F3F46]' : 'bg-[#D4D4D8]')}`}>
    <div className={`w-[24px] h-[24px] rounded-full bg-white absolute top-[3px] shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-all duration-300 ${on ? 'left-[29px]' : 'left-[3px]'}`} />
  </div>
)

type ButtonArtifactProps = ThemeAwareProps & {
  label: string
  primary: boolean
}
const AButton = ({ label, primary, isDark }: ButtonArtifactProps) => (
  <div className={`px-6 py-2.5 rounded-[10px] font-sans text-[13px] font-semibold whitespace-nowrap ${primary ? 'bg-[linear-gradient(135deg,#818CF8,#6366F1)] text-white shadow-[0_8px_28px_rgba(99,102,241,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]' : (isDark ? 'bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)]' : 'bg-[rgba(255,255,255,0.92)] border border-[rgba(0,0,0,0.06)] text-[rgba(17,24,39,0.4)]')}`}>
    {label}
  </div>
)

type ColorArtifactProps = ThemeAwareProps & {
  color: string
  label: string
}
const AColor = ({ color, label, isDark }: ColorArtifactProps) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="w-[44px] h-[44px] rounded-[12px]" style={{ background: color, boxShadow: `0 8px 24px ${color}44, 0 2px 6px rgba(0,0,0,0.08)` }} />
    <span className={`font-mono text-[9px] ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(17,24,39,0.4)]'}`}>{label}</span>
  </div>
)

const AInput = ({ isDark }: ThemeAwareProps) => (
  <div className={`w-[190px] h-[42px] rounded-[10px] flex items-center px-[14px] gap-[10px] relative overflow-hidden ${isDark ? 'bg-[rgba(255,255,255,0.06)] border border-[rgba(99,102,241,0.12)] shadow-[0_4px_16px_rgba(0,0,0,0.15)]' : 'bg-[rgba(255,255,255,0.92)] border border-[rgba(99,102,241,0.18)] shadow-[0_6px_20px_rgba(0,0,0,0.07)]'}`}>
    <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1/2 h-[10px] rounded-full blur-[4px]" style={{ background: `radial-gradient(ellipse, ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'} 0%, transparent 70%)` }} />
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(17,24,39,0.4)"} strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    <span className={`font-sans text-[12px] ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(17,24,39,0.4)]'}`}>Search...</span>
  </div>
)

const ASlider = ({ isDark }: ThemeAwareProps) => (
  <div className="w-[120px] flex flex-col gap-1.5">
    <div className={`relative h-[6px] rounded-[3px] ${isDark ? 'bg-[rgba(255,255,255,0.06)]' : 'bg-[rgba(0,0,0,0.06)]'}`}>
      <div className="absolute left-0 top-0 w-[65%] h-full rounded-[3px] bg-gradient-to-r from-[#6366F1] to-[#818CF8]" />
      <div className="absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.2),0_0_0_3px_rgba(99,102,241,0.2)]" />
    </div>
    <span className={`font-mono text-[9px] text-right ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(17,24,39,0.4)]'}`}>65%</span>
  </div>
)

const ACheck = ({ isDark }: ThemeAwareProps) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-[#6366F1] to-[#818CF8] shadow-[0_3px_10px_rgba(99,102,241,0.3)] flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </div>
    <span className={`font-sans text-[11px] ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(17,24,39,0.4)]'}`}>Enabled</span>
  </div>
)

const ARadius = ({ isDark }: ThemeAwareProps) => (
  <div className="relative w-[52px] h-[52px]">
    <div className={`w-[52px] h-[52px] rounded-[14px] border-[1.5px] border-dashed ${isDark ? 'border-[rgba(99,102,241,0.12)]' : 'border-[rgba(99,102,241,0.18)]'}`} />
    <svg width="18" height="18" className="absolute -top-[1px] -left-[1px]">
      <path d="M0 16 Q0 0 16 0" fill="none" stroke="#818CF8" strokeWidth="1.5" />
    </svg>
    <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] whitespace-nowrap ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(17,24,39,0.4)]'}`}>r:14</span>
  </div>
)

const ASpacing = ({ isDark }: ThemeAwareProps) => (
  <svg width="72" height="36" viewBox="0 0 72 36">
    <line x1="6" y1="6" x2="6" y2="30" stroke="#818CF8" strokeWidth="0.8" opacity="0.5" />
    <line x1="66" y1="6" x2="66" y2="30" stroke="#818CF8" strokeWidth="0.8" opacity="0.5" />
    <line x1="6" y1="18" x2="66" y2="18" stroke="#818CF8" strokeWidth="0.5" opacity="0.35" strokeDasharray="3 3" />
    <polygon points="10,18 6,15.5 6,20.5" fill="#818CF8" opacity="0.4" />
    <polygon points="62,18 66,15.5 66,20.5" fill="#818CF8" opacity="0.4" />
    <text x="36" y="34" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? "rgba(255,255,255,0.4)" : "rgba(17,24,39,0.4)"}>8px</text>
  </svg>
)

type FloorPieceProps = ThemeAwareProps & {
  children: React.ReactNode
  left: string
  top: string
  rx?: number
  ry?: number
}

const FloorPiece = ({ children, left, top, rx = 12, ry = 0, isDark }: FloorPieceProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const baseOp = isDark ? 0.27 : 0.32 
  const hoverOp = isDark ? 0.42 : 0.40

  const filterStyle = (!isDark && !isHovered) 
    ? "drop-shadow(0 4px 8px rgba(0,0,0,0.04))" 
    : (!isDark && isHovered) 
      ? "drop-shadow(0 8px 16px rgba(99,102,241,0.12))" 
      : "none"

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute z-0 cursor-default"
      style={{
        left, top,
        transform: isHovered 
          ? `perspective(600px) rotateX(${rx * 0.2}deg) rotateY(${ry * 0.2}deg) translateY(-8px) scale(1.05)`
          : `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1)`,
        opacity: isHovered ? hoverOp : baseOp,
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform, opacity",
        filter: filterStyle
      }}
    >
      {children}
    </div>
  )
}

export const HeroArtifacts = ({ isDark }: { isDark: boolean }) => {
  return (
    <>
      {/* Right zone */}
      <FloorPiece left="62%" top="12%" rx={14} ry={-4} isDark={isDark}><AToggle on={true} isDark={isDark} /></FloorPiece>
      <FloorPiece left="58%" top="36%" rx={16} ry={-3} isDark={isDark}><AInput isDark={isDark} /></FloorPiece>
      <FloorPiece left="84%" top="48%" rx={12} ry={5} isDark={isDark}><AColor color="#6366F1" label="#6366F1" isDark={isDark} /></FloorPiece>
      <FloorPiece left="68%" top="60%" rx={14} ry={-6} isDark={isDark}><ASlider isDark={isDark} /></FloorPiece>
      <FloorPiece left="88%" top="20%" rx={10} ry={3} isDark={isDark}><ARadius isDark={isDark} /></FloorPiece>
      <FloorPiece left="56%" top="72%" rx={18} ry={-2} isDark={isDark}><ACheck isDark={isDark} /></FloorPiece>
      <FloorPiece left="80%" top="70%" rx={12} ry={4} isDark={isDark}><AButton label="Cancel" primary={false} isDark={isDark} /></FloorPiece>
      
      {/* Bottom zone */}
      <FloorPiece left="8%" top="82%" rx={16} ry={-5} isDark={isDark}><ASpacing isDark={isDark} /></FloorPiece>
      <FloorPiece left="28%" top="86%" rx={14} ry={3} isDark={isDark}><AToggle on={false} isDark={isDark} /></FloorPiece>
      <FloorPiece left="46%" top="82%" rx={12} ry={-4} isDark={isDark}><AColor color="#A78BFA" label="#A78BFA" isDark={isDark} /></FloorPiece>
      
      {/* Top-left sparse zone - REFINED POSITIONS */}
      <FloorPiece left="4%" top="15%" rx={10} ry={-6} isDark={isDark}>
        <div className="flex flex-col gap-[3px]">
          <span className={`font-sans text-[44px] font-bold leading-none tracking-[-1px] ${isDark ? 'text-[rgba(255,255,255,0.2)]' : 'text-[rgba(17,24,39,0.15)]'}`}>Aa</span>
          <span className={`font-mono text-[9px] ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(17,24,39,0.4)]'}`}>Inter / 44</span>
        </div>
      </FloorPiece>
      <FloorPiece left="36%" top="14%" rx={12} ry={4} isDark={isDark}><ASpacing isDark={isDark} /></FloorPiece>
    </>
  )
}