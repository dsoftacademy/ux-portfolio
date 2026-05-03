// src/app/projects/page.tsx
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { Section } from "@/components/Section"
import { SectionWrapper } from "@/components/SectionWrapper"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"
import Link from "next/link"

export const metadata = {
  title: "Projects",
  description: "A collection of design leadership and AI-first product case studies.",
}

// Define interface with proper types to resolve 'any' linting error
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  mainImage?: SanityImageSource;
  excerpt?: string;
  tags?: string[];
}

// Bespoke case studies that live as static routes (not in Sanity).
// They render as cards alongside Sanity-managed projects on the listing.
const BESPOKE_PROJECTS: Project[] = [
  {
    _id: "static-iltc",
    title: "IL TakeCare — From complexity to clarity",
    slug: { current: "il-takecare" },
    category: "Flagship App Revamp",
    excerpt:
      "Rebuilt ICICI Lombard's flagship insurance & lifestyle app — cutting customer-care calls 53.8%, lifting feature utilisation 328.1%, cutting feature TAT by 85.4%, and landing a 24-hour rollout cadence.",
    tags: ["Mobile", "Insurance", "UX Strategy"],
  },
]

const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  mainImage,
  excerpt,
  tags
}`;

export default async function ProjectsPage() {
  const sanityProjects: Project[] = await client.fetch(PROJECTS_QUERY)
  // Surface bespoke case studies first, then Sanity-managed projects.
  // Filter out any Sanity row that collides with a bespoke slug.
  const bespokeSlugs = new Set(BESPOKE_PROJECTS.map((p) => p.slug.current))
  const projects: Project[] = [
    ...BESPOKE_PROJECTS,
    ...sanityProjects.filter((p) => !bespokeSlugs.has(p.slug?.current ?? "")),
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 pt-32 transition-colors duration-500">
      <Section
        eyebrow={<span className="text-[var(--accent)]">Selected Work</span>}
        title={<span className="text-[var(--text)]">Projects</span>}
      >
        <p className="max-w-2xl text-lg text-[var(--text-muted)] leading-relaxed">
          A few recent case studies and explorations. Most entries load from Sanity CMS; flagship
          write-ups (ILDS, IL TakeCare) ship as static routes with bespoke cards in this grid.
        </p>
      </Section>

      <section className="pb-16">
        <SectionWrapper>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project._id}>
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="group block overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--bg)] transition-all hover:border-[var(--accent)]/30 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <div className="relative w-full overflow-hidden bg-[var(--surface)]">
                    {project.mainImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={urlFor(project.mainImage).width(800).url()}
                        alt={project.title}
                        className="w-full h-auto block transition-transform duration-500 motion-safe:group-hover:scale-105"
                      />
                    ) : project.slug?.current === "ilds-design-system" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/images/ilds-cover.png"
                        alt={project.title}
                        className="w-full h-auto block transition-transform duration-500 motion-safe:group-hover:scale-105"
                      />
                    ) : project.slug?.current === "il-takecare" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/images/iltc-cover.svg"
                        alt={project.title}
                        className="w-full h-auto block transition-transform duration-500 motion-safe:group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest">
                        No Image Available
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                        {project.category || "Case Study"}
                      </span>
                      <div className="h-8 w-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14m-7-7 7 7-7 7"/>
                        </svg>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] line-clamp-2">
                      {project.excerpt || "View the full case study and design process."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[10px] font-medium text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-8 md:p-12 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-2">Next up</p>
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Have a specific project in mind?</h3>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--text)] px-8 text-sm font-bold text-[var(--bg)] transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Get in touch
            </Link>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}