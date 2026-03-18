"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/cn" // Using your existing utility

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="group text-sm font-medium tracking-tight text-zinc-950 transition-colors"
        >
          Pratishek Bansal
          <span className="ml-2 align-middle text-xs font-normal text-zinc-400 group-hover:text-zinc-600 transition-colors">
            UX/UI Design Lead
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(pathname, l.href)
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}