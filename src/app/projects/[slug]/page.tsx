import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { SectionWrapper } from "@/components/SectionWrapper"
import { H1, H2 } from "@/components/Typography"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"

export const dynamic = "force-dynamic"
export const revalidate = 0

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
    { slug },
    { next: { revalidate: 0 } },
  )
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    return (
      <div className="bg-surface">
        <section className="py-16">
          <SectionWrapper>
            <Link
              href="/projects"
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
            >
              ← Back to projects
            </Link>
            <H1 className="mt-6">Project not found</H1>
            <p className="mt-3 text-sm text-zinc-600">
              This project URL is missing a slug.
            </p>
          </SectionWrapper>
        </section>
      </div>
    )
  }

  const project = await getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="bg-surface">
        <section className="py-16">
          <SectionWrapper>
            <Link
              href="/projects"
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
            >
              ← Back to projects
            </Link>
            <H1 className="mt-6">Project not found</H1>
            <p className="mt-3 text-sm text-zinc-600">
              I couldn&apos;t find a project with slug <span className="font-medium text-zinc-900">{slug}</span>.
            </p>
          </SectionWrapper>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-surface">
      <section className="pt-12">
        <SectionWrapper>
          <Link
            href="/projects"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
          >
            ← Back to projects
          </Link>

          <div className="mt-4 rounded-3xl border border-zinc-200 bg-white p-6 md:p-10">
            <p className="text-sm font-medium text-zinc-600">
              {project.category ?? "Case study"}
            </p>
            <H1 className="mt-3">{project.title}</H1>

            <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200">
              {project.mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(project.mainImage)
                    .width(1200)
                    .height(675)
                    .fit("crop")
                    .url()}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </SectionWrapper>
      </section>

      <section className="py-12">
        <SectionWrapper>
          <div className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-3 md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Role
              </p>
              <p className="mt-2 text-sm font-medium text-brand-primary">
                {project.overviewRole ?? "UX/UI Design Lead"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Timeline
              </p>
              <p className="mt-2 text-sm font-medium text-brand-primary">
                {project.overviewTimeline ?? "Timeline coming soon"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Tools
              </p>
              <p className="mt-2 text-sm font-medium text-brand-primary">
                {project.overviewTools ?? "Tools coming soon"}
              </p>
            </div>
          </div>
        </SectionWrapper>
      </section>

      <section className="pb-16">
        <SectionWrapper>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-10">
            <H2>Case study</H2>
            {Array.isArray(project.content) && project.content.length > 0 ? (
              <div className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-zinc-600">
                <PortableText
                  value={project.content}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                    },
                  }}
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-600">
                No content yet. Add rich text to the project in Sanity to see it
                here.
              </p>
            )}
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}

