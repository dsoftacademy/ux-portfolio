// src/components/Nav.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/cn"
import { useTheme } from "./ThemeProvider"
import ThemeToggle from "./ThemeToggle"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export function Nav() {
  const pathname = usePathname()
  useTheme()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled 
          ? "py-4 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md" 
          : "py-8 bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Link href="/" className="group flex flex-col rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
          <span className="text-[15px] font-bold tracking-tight text-[var(--text)] transition-colors">
            Pratishek Bansal
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
            Principal Design Lead
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md border border-[var(--border)] px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "text-[12px] font-medium tracking-wide transition-colors relative rounded px-1 py-0.5",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                      pathname === l.href
                        ? "text-[var(--text)]"
                        : "text-[var(--text)]/60 hover:text-[var(--text)]"
                    )}
                  >
                    {l.label}
                    {pathname === l.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--accent)]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="pl-4 border-l border-[var(--border)]">
            <ThemeToggle />
          </div>
        </div>
      </div>
      {isMenuOpen ? (
        <nav
          aria-label="Mobile primary"
          className="md:hidden mx-6 mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/95 p-4 backdrop-blur-md"
        >
          <ul className="grid gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
                    pathname === l.href
                      ? "bg-[var(--surface)] text-[var(--text)]"
                      : "text-[var(--text)]/70 hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}