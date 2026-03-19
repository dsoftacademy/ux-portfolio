"use client"

import { useTheme } from "./ThemeProvider" // Adjust path if needed
import { useEffect, useState } from "react"

export function ThemeCheck() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for mount to avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-xs flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-2xl backdrop-blur-md">
      <div className="space-y-2">
        <h3 className="font-sans text-lg font-bold leading-none tracking-tight">
          System Check (v5)
        </h3>
        <div className="space-y-1">
          <p className="font-sans text-sm text-[var(--text-2)]">
            <span className="font-bold text-[var(--accent)]">Sans:</span> Inter 
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            <span className="font-bold text-[var(--accent)] text-[10px]">MONO:</span> Geist Mono
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-[var(--border)]" />

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
          Mode: {theme}
        </span>
        <button
          onClick={toggleTheme}
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold text-white transition-transform active:scale-95"
        >
          Switch Theme
        </button>
      </div>
    </div>
  )
}