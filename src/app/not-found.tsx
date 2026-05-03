import Link from "next/link"

export default function NotFound() {
  return (
    <div className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
          404
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5.5vw,4rem)] font-extrabold tracking-tight text-[var(--text)] leading-[1.08]">
          Page not found
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
          This page doesn&rsquo;t exist (yet). Head back home or browse projects.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] px-8 text-[13px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_6px_20px_rgba(var(--accent-rgb),0.25)] transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-8 text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--text)] transition-all motion-safe:hover:scale-105 motion-safe:active:scale-95 hover:bg-[var(--text)]/[0.04] hover:border-[var(--text)]/[0.2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
