"use client"

import React, { useState } from 'react'

const STATS = [
  { value: "10+", label: "Years of Craft", watermark: "10" },
  { value: "15+", label: "Teams Adopted DS", watermark: "15" },
  { value: "53.8%", label: "Support Calls Cut", watermark: "54" },
  { value: "100+", label: "Research Sessions", watermark: "100" },
]

export const Experience = () => {
  return (
    <section className="py-24 bg-[var(--bg)] border-t border-[var(--border)] relative z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
            Impact & Scale
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
            Measuring the <span className="text-[var(--text-3)]">unmeasurable.</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:hover:-translate-y-1 hover:shadow-2xl"
      style={{
        boxShadow: isHovered ? '0 12px 32px rgba(99,102,241,0.06)' : 'none'
      }}
    >
      {/* 1. Large Watermark Anchor */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold pointer-events-none select-none transition-all duration-700 opacity-[0.05]"
        style={{
          fontSize: '110px',
          color: 'var(--accent)',
          transform: isHovered ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(1)',
          lineHeight: 1,
          letterSpacing: '-4px'
        }}
      >
        {stat.watermark}
      </div>

      {/* 2. Top Accent Line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent transition-all duration-500"
        style={{ width: isHovered ? '60%' : '0%' }}
      />

      {/* 3. Content */}
      <div className="relative z-10">
        <div className="text-[clamp(32px,4vw,48px)] font-extrabold mb-2 tracking-tighter bg-gradient-to-br from-[#818CF8] to-[#A78BFA] bg-clip-text text-transparent">
          {stat.value}
        </div>
        <div className="font-sans text-[13px] font-medium text-[var(--text-3)] tracking-wide uppercase">
          {stat.label}
        </div>
      </div>
    </div>
  )
}