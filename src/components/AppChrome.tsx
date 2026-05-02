"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Nav } from "@/components/Nav"

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/")

  if (isStudio) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      {/* Skip-to-content for keyboard / screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">{children}</main>
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-content px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="font-mono text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-[0.2em]">
              © 2026 Pratishek Bansal
            </span>
            <div className="flex gap-10">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/pratishek-bansal-designer/?originalSubdomain=in" },
                { label: "Email", href: "mailto:pratishek.designs@gmail.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-300 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

