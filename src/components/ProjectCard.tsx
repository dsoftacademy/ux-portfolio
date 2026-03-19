import { Button } from "@/components/Button"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export type ProjectCardProps = {
  title: string
  category: string
  description: string
  href?: string
  image?: SanityImageSource
}

export function ProjectCard({
  title,
  category,
  description,
  href = "/projects",
  image,
}: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
      {/* Image Container with v5 Surface Gradient Fallback */}
      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-[var(--border)] to-[var(--surface)]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(image).width(800).height(450).fit("crop").url()}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans text-xl font-bold tracking-tight text-[var(--text)]">
            {title}
          </h3>
          <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            {category}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[var(--text-2)] line-clamp-2">
          {description}
        </p>

        <div className="mt-8">
          <Button href={href ?? "/projects"} variant="secondary" className="w-full sm:w-auto">
            View case study
          </Button>
        </div>
      </div>
    </article>
  )
}