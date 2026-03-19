import type { ReactNode } from "react"

export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: ReactNode // Changed from string to ReactNode to allow spans
  title: ReactNode   // Changed from string to ReactNode to allow spans
  children: ReactNode
}) {
  return (
    <section className="py-12 bg-[var(--bg)] transition-colors duration-500">
      <div className="mx-auto max-w-5xl px-5">
        {eyebrow ? (
          // Use var(--accent) for consistent high-end branding
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] font-mono">
            {eyebrow}
          </p>
        ) : null}
        
        {/* Use var(--text) so headings stay visible in Dark Mode */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl lg:leading-[1.1]">
          {title}
        </h1>
        
        {/* Use var(--text-muted) for better body readability */}
        <div className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] font-sans">
          {children}
        </div>
      </div>
    </section>
  )
}