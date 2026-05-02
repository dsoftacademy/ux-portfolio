import { Hero } from "@/components/Hero"
import { Button } from "@/components/Button"
import { ProjectCard } from "@/components/ProjectCard"
import { SectionWrapper } from "@/components/SectionWrapper"
import { SkillMarquee } from "@/components/SkillMarquee"
import { Impact } from "@/components/Impact" 
import { Experience } from "@/components/Experience" 
import { client } from "@/sanity/lib/client"

interface Project {
  _id: string;
  title: string;
  mainImage?: { asset: { url: string } };
  slug: { current: string };
  category?: string;
  excerpt?: string;
}

// Bespoke case studies (not in Sanity) shown alongside Sanity projects.
const BESPOKE_PROJECTS: Project[] = [
  {
    _id: "static-iltc",
    title: "IL TakeCare — From complexity to clarity",
    slug: { current: "il-takecare" },
    category: "Flagship App Revamp",
    excerpt:
      "Rebuilt ICICI Lombard's flagship insurance & lifestyle app — cutting customer-care calls 53.8%, lifting feature utilisation 328.1%, and shrinking feature TAT from ~48 days to 24 hours.",
  },
]

async function getProjects(): Promise<Project[]> {
  const sanityProjects: Project[] = await client.fetch(
    `*[_type == "project"] | order(_createdAt desc){
      _id, title, "slug": slug, category,
      mainImage{..., asset->},
      "excerpt": content[0].children[0].text
    }`
  );
  const bespokeSlugs = new Set(BESPOKE_PROJECTS.map((p) => p.slug.current))
  return [
    ...BESPOKE_PROJECTS,
    ...sanityProjects.filter((p) => !bespokeSlugs.has(p.slug?.current ?? "")),
  ]
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. SKILL MARQUEE */}
      <SkillMarquee />

      {/* 3. IMPACT & SCALE SECTION */}
      <Impact />

      {/* 4. THE PROJECT VAULT */}
      <section
        id="work"
        className="py-24 bg-[var(--bg)] border-t border-[var(--border)] relative z-10"
        aria-label="Selected work and case studies"
      >
        <SectionWrapper>
          <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-10 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Selected Work
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text)] font-sans">
                Strategic Case Studies
              </h2>
            </div>
            <Button href="/projects" variant="secondary">
              View All Work
            </Button>
          </div>

          <div className="mt-16">
            {projects && projects.length > 0 ? (
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    category={project.category ?? "Case study"}
                    description={project.excerpt || "Driving impact through research-led design strategy."}
                    image={project.mainImage}
                    fallbackImageUrl={
                      project.slug?.current === "ilds-design-system"
                        ? "/images/ilds-cover.png"
                        : project.slug?.current === "il-takecare"
                          ? "/images/iltc-cover.svg"
                          : undefined
                    }
                    href={project.slug?.current ? `/projects/${project.slug.current}` : "/projects"}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-[var(--border)] p-24 text-center">
                <p className="text-sm font-mono italic text-[var(--text-muted)]">
                  {/* Fixed: Comments inside children must be in braces */}
                  No projects found in Sanity.
                </p>
              </div>
            )}
          </div>
        </SectionWrapper>
      </section>

      {/* 5. CAREER TIMELINE */}
      <div id="about" className="scroll-mt-24" aria-hidden="true" />
      <Experience />

      {/* 6. V5 "GET IN TOUCH" SECTION */}
      <section
        className="py-32 md:py-56 text-center relative overflow-hidden"
        aria-label="Get in touch"
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
        
        <SectionWrapper>
          <div className="relative z-10">
            <span className="font-mono text-[11px] font-medium text-[var(--accent)] tracking-[0.3em] uppercase block mb-8">
              Get in Touch
            </span>

            <h2 className="font-sans text-4xl md:text-7xl font-extrabold tracking-tighter mb-8 text-[var(--text)] leading-[1.05]">
              <span className="block">Let&apos;s build something</span>{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#A78BFA] to-[#6366F1]">
                extraordinary.
              </span>
            </h2>

            <p className="text-[15px] md:text-lg text-[var(--text-muted)] max-w-[500px] mx-auto mb-12 leading-relaxed font-sans">
              Looking for a Principal Design Lead who can architect systems, drive AI innovation, and scale product teams?
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <Button href="mailto:pratishek.designs@gmail.com" variant="primary">
                Email Me
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </Button>
              
              <Button href="https://www.linkedin.com/in/pratishek-bansal-designer/?originalSubdomain=in" variant="secondary">
                LinkedIn
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}