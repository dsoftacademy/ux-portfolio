"use client"

import React, { useState } from 'react'

type ExperienceItem = {
  company: string
  role: string
  period: string
  current: boolean
}

const EXPERIENCES: ExperienceItem[] = [
  { company: "ICICI Lombard", role: "Principal Design Lead", period: "2024 — Present", current: true },
  { company: "Jio", role: "UX/UI Design Lead — Design Systems", period: "2022 — 2024", current: false },
  { company: "YUJ Designs", role: "UX/UI Design Consultant", period: "2022 — 2023", current: false },
  { company: "XR Dial Technologies", role: "Senior UX/UI Designer — AR/VR", period: "2020 — 2022", current: false }
];

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 md:py-[120px] bg-[var(--bg)] border-t border-[var(--border)] relative z-10 transition-colors duration-500"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <div className="mb-16 md:mb-20">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-[var(--accent)]">
            Experience
          </p>
        </div>

        {/* The v5 Minimalist Row Logic */}
        <div className="flex flex-col">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceRow key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceRow({ exp }: { exp: ExperienceItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col gap-1 md:grid md:grid-cols-[1.5fr_2fr_1fr] md:items-baseline py-8 md:py-10 border-b border-[var(--border)] cursor-default"
      style={{
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        opacity: isHovered ? 1 : 0.7,
        transform: isHovered ? "translateX(12px)" : "translateX(0)",
      }}
    >
      {/* Column 1: Company */}
      <h3 style={{ 
        fontSize: "24px", 
        fontWeight: 700, 
        color: isHovered ? "var(--accent)" : "var(--text)", 
        transition: "color 0.4s ease, transform 0.4s ease",
        letterSpacing: "-0.02em" 
      }}>
        {exp.company}
      </h3>

      {/* Column 2: Role */}
      <p style={{ 
        fontSize: "16px", 
        color: "var(--text-3)", 
        fontWeight: 500,
        transition: "color 0.4s ease"
      }}>
        {exp.role}
      </p>

      {/* Column 3: Year & Status */}
      <div className="flex items-center justify-start md:justify-end gap-3 font-mono text-[13px] text-[var(--text-4)]" style={{ transition: "color 0.4s ease" }}>
        <span>{exp.period}</span>
        {exp.current && (
          <span style={{ 
            width: "8px", 
            height: "8px", 
            borderRadius: "50%", 
            backgroundColor: "#00FF85",
            boxShadow: isHovered ? "0 0 15px rgba(0,255,133,1)" : "0 0 8px rgba(0,255,133,0.6)",
            transition: "all 0.4s ease"
          }} />
        )}
      </div>
    </div>
  )
}