"use client"

import React, { useState, useEffect } from 'react'

const roles = [
  "Senior UX Design Lead",
  "Design Systems Architect",
  "Enterprise Product Strategist",
  "AI Interaction Specialist",
  "Scalable Systems Designer"
]

export const TypingRole = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[roleIndex]
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setSpeed(40) // Faster deletion for a more "active" feel
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setSpeed(80) // Steady typing speed
      }

      // Pause at the end of typing
      if (!isDeleting && currentText === fullText) {
        setSpeed(2500) // Longer pause so the user can actually read the role
        setIsDeleting(true)
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setSpeed(500) // Brief pause before starting the next role
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roleIndex, speed])

  return (
    <div className="flex items-center gap-2 h-8">
      <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)] font-mono leading-none">
        {currentText}
      </p>
      <span className="w-[2px] h-4 bg-[var(--accent)] animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
    </div>
  )
}