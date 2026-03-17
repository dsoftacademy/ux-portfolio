export const dynamic = "force-dynamic"
export const revalidate = 0


import { Button } from "@/components/Button"
import { ProjectCard } from "@/components/ProjectCard"
import { SectionWrapper } from "@/components/SectionWrapper"
import { client } from "@/sanity/lib/client"


type Project = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  mainImage?: any
  excerpt?: string
}

async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      "slug": slug,
      category,
      mainImage{
        ...,
        asset->
      },
      "excerpt": content[0].children[0].text
    }`,
  )
}

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <div className="bg-[#F9FAFB]">
      <section className="py-16">
        <SectionWrapper className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div>
            <p className="text-sm font-medium text-zinc-600">
              Product UX • Research • Systems
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Hi, I'm Pratishek Bansal, a UX/UI Design Lead crafting digital
              experiences.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700">
              I’m Pratishek, a UX/UI Design Lead focused on mobile products and
              design systems—partnering with product and engineering to turn
              messy problems into simple, high-performing experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/projects">View projects</Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm font-medium text-zinc-900">
              Available for select freelance
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Currently open to short engagements: UX audits, flows, IA, and
              design systems. Based in Mumbai, India (remote-friendly).
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium text-zinc-500">Strength</p>
                <p className="mt-1 font-medium text-zinc-900">
                  Information architecture
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium text-zinc-500">Focus</p>
                <p className="mt-1 font-medium text-zinc-900">
                  End-to-end product UX
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      <section className="pb-16">
        <SectionWrapper>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600">
                Featured projects
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl">
                Work I’m proud of
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
                Three recent highlights. Replace these with real case studies as
                you publish them.
              </p>
            </div>

            <Button href="/projects" variant="secondary" className="mt-4 md:mt-0">
              See all projects
            </Button>
          </div>

          {projects.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  category={project.category ?? "Case study"}
                  description={
                    project.excerpt ||
                    "A UX/UI case study from my portfolio."
                  }
                  href={
                    project.slug?.current
                      ? `/projects/${project.slug.current}`
                      : "/projects"
                  }
                  image={project.mainImage}
                />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-zinc-500">
              Projects coming soon. Add a few `project` documents in Sanity to
              see them here.
            </p>
          )}
        </SectionWrapper>
      </section>

      <section className="pb-20">
        <SectionWrapper>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-10">
            <p className="text-sm font-medium text-zinc-600">Contact</p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl">
              Let’s build something together
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              Currently available for UX/UI Design Lead roles and strategic
              consulting.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="mailto:pratishek.designs@gmail.com">Email Me</Button>
              <Button
                href="https://www.linkedin.com/in/pratishek-bansal-designer/"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}

