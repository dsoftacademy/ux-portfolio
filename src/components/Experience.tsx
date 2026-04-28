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
      className="transition-colors duration-500"
      style={{ 
        padding: "120px 0", 
        backgroundColor: "var(--bg)", 
        borderTop: "1px solid var(--border)",
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
        
        {/* Section Label */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ 
            fontSize: "10px", 
            fontWeight: 800, 
            textTransform: "uppercase", 
            letterSpacing: "0.4em", 
            color: "var(--accent)",
            marginBottom: "16px"
          }}>
            Experience
          </p>
        </div>

        {/* The v5 Minimalist Row Logic */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
      style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 2fr 1fr",
        alignItems: "baseline",
        padding: "40px 0",
        borderBottom: "1px solid var(--border)",
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        opacity: isHovered ? 1 : 0.7,
        transform: isHovered ? "translateX(12px)" : "translateX(0)",
        cursor: "default"
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
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "flex-end", 
        gap: "12px",
        fontFamily: "'GeistMono', monospace",
        fontSize: "13px",
        color: "var(--text-4)",
        transition: "color 0.4s ease"
      }}>
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