// src/app/projects/[slug]/page.tsx
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { SectionWrapper } from "@/components/SectionWrapper"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  mainImage?: SanityImageSource;
  overviewRole?: string;
  overviewTimeline?: string;
  overviewTools?: string;
  content?: import("@portabletext/types").PortableTextBlock[];
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

  return slugs
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-32">
        <SectionWrapper>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-12 text-center">
            <h1 className="text-2xl font-bold text-[var(--text)]">Project not found</h1>
            <Link href="/projects" className="mt-4 inline-block text-[var(--accent)] hover:underline">
              &larr; Back to projects
            </Link>
          </div>
        </SectionWrapper>
      </main>
    )
  }

  const project = await getProjectBySlug(slug)

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-32">
        <SectionWrapper>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-12 text-center">
            <h1 className="text-2xl font-bold text-[var(--text)]">Project &ldquo;{slug}&rdquo; not found</h1>
            <Link href="/projects" className="mt-4 inline-block text-[var(--accent)] hover:underline">
              &larr; Back to projects
            </Link>
          </div>
        </SectionWrapper>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pb-24 pt-32 transition-colors duration-500">
      {/* 1. HEADER SECTION */}
      <section className="mb-12">
        <SectionWrapper>
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
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

            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-[32px] bg-[var(--surface)] shadow-2xl">
              {project.mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(project.mainImage).width(1920).height(820).fit("crop").auto("format").url()}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--border)] to-transparent opacity-20">
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
              <p className="mt-3 text-[15px] font-medium text-[var(--text)]">{project.overviewRole ?? "Product Designer"}</p>
            </div>
            <div className="border-[var(--border)] md:border-l md:pl-12">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Timeline</p>
              <p className="mt-3 text-[15px] font-medium text-[var(--text)]">{project.overviewTimeline ?? "2024 &mdash; Present"}</p>
            </div>
            <div className="border-[var(--border)] md:border-l md:pl-12">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Focus</p>
              <p className="mt-3 text-[15px] font-medium text-[var(--text)]">{project.overviewTools ?? "UI/UX, Systems"}</p>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 3. CASE STUDY CONTENT */}
      <section>
        <SectionWrapper>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--bg)] p-8 md:p-16">
            <h2 className="mb-12 font-sans text-3xl font-extrabold tracking-tight text-[var(--text)]">The Process</h2>
            
            {Array.isArray(project.content) && project.content.length > 0 ? (
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
            ) : (
              <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)]">
                <p className="font-mono text-sm italic text-[var(--text-muted)]">
                  {`// Content is being enriched in Sanity CMS.`}
                </p>
              </div>
            )}
          </div>
        </SectionWrapper>
      </section>
    </main>
  )
}