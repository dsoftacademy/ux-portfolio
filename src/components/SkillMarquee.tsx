"use client"

import React from 'react'

const SKILLS = [
  "Design Systems", "Enterprise SaaS", "AI Agents", "DesignOps",
  "Cross-Platform", "LLM Interfaces", "AR/VR", "Accessibility",
  "Insurance Tech", "Telecom", "D2C", "Research & Strategy",
]

export const SkillMarquee = () => {
  // Double the array to create a seamless infinite loop
  const displaySkills = [...SKILLS, ...SKILLS]

  return (
    <section className="relative py-10 border-y border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      {/* Edge Fades (Masking) */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />

      <div className="flex overflow-hidden">
        {/* The Marquee Track */}
        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {displaySkills.map((skill, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 px-6 py-2"
            >
              {/* Decorative Dot */}
              <div className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-40" />
              
              <span className="font-mono text-[11px] font-medium uppercase tracking-[2px] text-[var(--text-3)]">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}