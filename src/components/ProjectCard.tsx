// src/components/ProjectCard.tsx
"use client"

import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export type ProjectCardProps = {
  title: string
  category: string
  description: string
  href?: string
  image?: SanityImageSource
  fallbackImageUrl?: string
}

export function ProjectCard({
  title,
  category,
  description,
  href = "/projects",
  image,
  fallbackImageUrl,
}: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--bg)] transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
      {/* 1. Image/Thumbnail Section */}
      <div className="relative w-full overflow-hidden bg-[var(--surface)]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(image).width(1200).auto("format").url()}
            alt={title}
            className="w-full h-auto block transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
            loading="lazy"
          />
        ) : fallbackImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fallbackImageUrl}
            alt={title}
            className="w-full h-auto block transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-[var(--border)] to-transparent opacity-20">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">No Image</span>
          </div>
        )}
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5 dark:group-hover:bg-black/20" />
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--pillBg)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent)]">
            {category}
          </span>
        </div>

        <h3 className="font-sans text-2xl font-extrabold leading-tight tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {title}
        </h3>

        {/* Updated Body Copy: Extended to 3 lines and adjusted spacing */}
        <div className="mt-4 flex-1 min-h-[4.5rem]">
          <p className="text-[15px] leading-relaxed text-[var(--text-muted)] line-clamp-3">
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          {/* aria-hidden + tabIndex=-1: the full-card overlay link below provides the accessible interaction */}
          <Link href={href} className="flex items-center gap-2 group/link" aria-hidden="true" tabIndex={-1}>
            <span className="text-[13px] font-bold tracking-wide text-[var(--text)]">View Project</span>
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          
          <div className="h-2 w-2 rounded-full bg-[var(--border)] transition-colors duration-500 group-hover:bg-[var(--accent)]" />
        </div>
      </div>
      
      {/* Absolute Overlay Link for entire card accessibility */}
      <Link href={href} className="absolute inset-0 z-10 rounded-[32px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" aria-label={`View ${title}`}>
        <span className="sr-only">View {title}</span>
      </Link>
    </article>
  )
}