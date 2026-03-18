import { Button } from "@/components/Button"
import { ProjectCard } from "@/components/ProjectCard"
import { SectionWrapper } from "@/components/SectionWrapper"
import { client } from "@/sanity/lib/client"

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Project {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: { current: string };
  category?: string; 
  excerpt?: string;
}

async function getProjects(): Promise<Project[]> {
  return await client.fetch(
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
    }`
  );
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <SectionWrapper>
          <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                Senior UX Design Lead
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-950 md:text-6xl">
                Building scalable systems and AI-first products.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
                Over 10 years of experience driving design strategy for enterprise SaaS, 
                telecom, and startups. Currently leading UX at <span className="font-medium border-b-2 border-zinc-200 text-zinc-950">ICICI Lombard</span>.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/projects">Explore Work</Button>
                <Button href="/about" variant="secondary">
                  My Story
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Current Focus
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Directing UX strategy for India&apos;s leading insurance ecosystem. 
                Specializing in <span className="font-medium text-zinc-950">70% handoff efficiency</span> through Design Systems.
              </p>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Expertise</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">Systems Architecture</p>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Innovation</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">AI-Integrated UX (LLMs)</p>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* DYNAMIC WORK SECTION */}
      <section className="pb-16">
        <SectionWrapper>
          <div className="flex flex-col gap-2 border-b border-zinc-100 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Selected Work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">Strategic Case Studies</h2>
            </div>
            <Button href="/projects" variant="secondary">View All Work</Button>
          </div>

          <div className="mt-12">
            {projects && projects.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    category={project.category ?? "Case study"}
                    description={project.excerpt || "Driving impact through research-led design strategy."}
                    href={project.slug?.current ? `/projects/${project.slug.current}` : "/projects"}
                    image={project.mainImage}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-center text-sm italic text-zinc-500">
                No projects found in Sanity. Add documents to see them here.
              </div>
            )}
          </div>
        </SectionWrapper>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <SectionWrapper>
          <div className="relative rounded-[2.5rem] bg-zinc-950 p-10 text-center text-white md:p-16">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-5xl">
              Let&apos;s build something scalable.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="mailto:pratishek.designs@gmail.com" className="bg-white text-zinc-950 hover:bg-zinc-200">
                Email Me
              </Button>
              <Button
                href="https://www.linkedin.com/in/pratishekbansal"
                variant="secondary"
                className="border-zinc-700 text-white hover:bg-zinc-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </main>
  );
}