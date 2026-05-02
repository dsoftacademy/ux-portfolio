// src/app/projects/[slug]/page.tsx
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { SectionWrapper } from "@/components/SectionWrapper"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { PortableTextBlock } from "@portabletext/types"
import type { Metadata } from "next"

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  mainImage?: SanityImageSource;
  heroSummary?: string;
  status?: "draft" | "review" | "published";
  overviewRole?: string;
  overviewTimeline?: string;
  overviewTools?: string;
  problem?: PortableTextBlock[];
  context?: PortableTextBlock[];
  constraints?: PortableTextBlock[];
  process?: PortableTextBlock[];
  keyDecisions?: PortableTextBlock[];
  outcomes?: PortableTextBlock[];
  reflections?: PortableTextBlock[];
  content?: PortableTextBlock[];
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      category,
      mainImage{
        ...,
        asset->
      },
      "overviewRole": role,
      "overviewTimeline": timeline,
      "overviewTools": tools,
      heroSummary,
      status,
      problem,
      context,
      constraints,
      process,
      keyDecisions,
      outcomes,
      reflections,
      content
    }`,
    { slug }
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "project" && defined(slug.current)][]{
      "slug": slug.current
    }`,
  )

  // ilds-design-system and il-takecare have bespoke static routes at /projects/<slug>/
  const bespoke = new Set(["ilds-design-system", "il-takecare"])
  return slugs.filter((s) => !bespoke.has(s.slug))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  return {
    title: project?.title ?? "Project",
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    return (
      <div className="min-h-screen bg-[var(--bg)] pt-32">
        <SectionWrapper>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-12 text-center">
            <h1 className="text-2xl font-bold text-[var(--text)]">Project not found</h1>
            <Link href="/projects" className="mt-4 inline-block text-[var(--accent)] hover:underline rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              &larr; Back to projects
            </Link>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  const project = await getProjectBySlug(slug)
  const fallbackHeroImageUrl = project?.slug?.current === "ilds-design-system" ? "/images/ilds-cover.png" : null

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg)] pt-32">
        <SectionWrapper>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-12 text-center">
            <h1 className="text-2xl font-bold text-[var(--text)]">Project &ldquo;{slug}&rdquo; not found</h1>
            <Link href="/projects" className="mt-4 inline-block text-[var(--accent)] hover:underline rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              &larr; Back to projects
            </Link>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 pt-32 transition-colors duration-500">
      {/* 1. HEADER SECTION */}
      <section className="mb-12">
        <SectionWrapper>
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span> Back to projects
          </Link>

          <div className="overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--bg)] p-8 md:p-16">
            <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--pillBg)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              {project.category ?? "Case study"}
            </span>
            <h1 className="mt-6 font-sans text-4xl font-extrabold tracking-tighter text-[var(--text)] md:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            {project.heroSummary ? (
              <p className="mt-6 max-w-3xl text-lg text-[var(--text-muted)]">
                {project.heroSummary}
              </p>
            ) : null}

            <div className="relative mt-12 w-full overflow-hidden rounded-[32px] bg-[var(--surface)] shadow-2xl">
              {project.mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(project.mainImage).width(1920).auto("format").url()}
                  alt={project.title}
                  className="w-full h-auto block"
                />
              ) : fallbackHeroImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fallbackHeroImageUrl}
                  alt={project.title}
                  className="w-full h-auto block"
                />
              ) : (
                <div className="flex aspect-[21/9] w-full items-center justify-center bg-gradient-to-br from-[var(--border)] to-transparent opacity-20">
                   <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)]">Image Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 2. META DATA GRID */}
      <section className="mb-12">
        <SectionWrapper>
          <div className="grid gap-6 rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-8 md:grid-cols-3 md:p-12">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Role</p>
              <p className="mt-3 text-[15px] font-medium text-[var(--text)]">{project.overviewRole ?? "Principal Design Lead"}</p>
            </div>
            <div className="border-[var(--border)] md:border-l md:pl-12">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Timeline</p>
              <p className="mt-3 text-[15px] font-medium text-[var(--text)]">{project.overviewTimeline ?? "Timeline available on request"}</p>
            </div>
            <div className="border-[var(--border)] md:border-l md:pl-12">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Focus</p>
              <p className="mt-3 text-[15px] font-medium text-[var(--text)]">{project.overviewTools ?? "Design Systems, Product UX, Strategy"}</p>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 3. CASE STUDY CONTENT */}
      <section>
        <SectionWrapper>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-8 md:p-16">
            <h2 className="mb-12 font-sans text-3xl font-extrabold tracking-tight text-[var(--text)]">Case Study</h2>

            <div className="space-y-12">
              {[
                { title: "Problem", value: project.problem },
                { title: "Context", value: project.context },
                { title: "Constraints", value: project.constraints },
                { title: "Process", value: project.process },
                { title: "Key Decisions", value: project.keyDecisions },
                { title: "Outcomes", value: project.outcomes },
                { title: "Reflections", value: project.reflections },
              ]
                .filter((section) => Array.isArray(section.value) && section.value.length > 0)
                .map((section) => (
                  <div key={section.title}>
                    <h3 className="mb-4 font-sans text-xl font-bold text-[var(--text)] md:text-2xl">
                      {section.title}
                    </h3>
                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-[var(--text-muted)] prose-p:leading-relaxed prose-headings:text-[var(--text)]">
                      <PortableText
                        value={section.value as PortableTextBlock[]}
                        components={{
                          block: {
                            h1: ({ children }) => <h1 className="mb-6 text-4xl font-bold">{children}</h1>,
                            h2: ({ children }) => <h2 className="mb-4 mt-12 text-2xl font-bold">{children}</h2>,
                            normal: ({ children }) => <p className="mb-6 text-base">{children}</p>,
                          },
                        }}
                      />
                    </div>
                  </div>
                ))}

              {Array.isArray(project.content) && project.content.length > 0 ? (
                <div>
                  <h3 className="mb-4 font-sans text-xl font-bold text-[var(--text)] md:text-2xl">
                    Full Narrative
                  </h3>
                  <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-[var(--text-muted)] prose-p:leading-relaxed prose-headings:text-[var(--text)]">
                    <PortableText
                      value={project.content}
                      components={{
                        block: {
                          h1: ({ children }) => <h1 className="mb-6 text-4xl font-bold">{children}</h1>,
                          h2: ({ children }) => <h2 className="mb-4 mt-12 text-2xl font-bold">{children}</h2>,
                          normal: ({ children }) => <p className="mb-6 text-base">{children}</p>,
                        },
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)]">
                  <p className="font-mono text-sm italic text-[var(--text-muted)]">
                    {`// Detailed case study content is being prepared in Sanity.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}