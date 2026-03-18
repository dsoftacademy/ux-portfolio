import { Section } from "@/components/Section"
import { Button } from "@/components/Button"

export const metadata = {
  title: "About | Pratishek Bansal",
  description: "Senior UX Design Lead with 10+ years of experience in Design Systems and AI strategy.",
}

export default function AboutPage() {
  const competencies = [
    {
      title: "Design Leadership",
      detail: "DesignOps, Systems Architecture, Strategy, and Mentorship.",
    },
    {
      title: "AI & Innovation",
      detail: "Autonomous AI Agents, LLM-powered assistants, and AR/VR UX.",
    },
    {
      title: "Strategic Impact",
      detail: "Scalable systems that reduce dev-time and increase acquisition.",
    },
  ];

  return (
    <main className="pt-16">
      <Section
        eyebrow="Experience & Strategy"
        title="Driving Product Strategy Through Design Leadership"
      >
        <div className="space-y-6 text-zinc-600 leading-relaxed">
          <p>
            I am a <span className="text-zinc-950 font-medium">Senior UX Design Lead</span> with over a decade of experience crafting human-centered products for enterprise and consumer markets. My work sits at the intersection of <strong>Design Systems Architecture</strong>, <strong>AI-first product strategy</strong>, and <strong>DesignOps</strong>.
          </p>
          
          <p>
            Currently, as a <strong>Design Lead at ICICI Lombard</strong>, I direct the UX strategy for enterprise insurance platforms. I recently led the creation of the <strong>IL Design System</strong> from scratch, unifying 15+ product teams and reducing design-to-dev handoff time by <strong>70%</strong>—earning the <span className="text-zinc-950 italic">Top Performer of the Year 2025</span> award.
          </p>

          <p>
            Previously at <strong>Jio</strong>, I drove design system maturity across India&apos;s largest digital ecosystem, contributing to a 17.8% increase in customer acquisition through optimized patterns.
          </p>

          <p>
            I also pioneer AI-first features, including <strong>Autonomous AI Agents</strong> and <strong>LLM-powered assistants</strong> that reduced query resolution times by 40%. My background as a <strong>Co-Founder</strong> (incubated at XLRI Jamshedpur) gives me a unique entrepreneurial lens on product growth.
          </p>
        </div>
      </Section>

      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-4 md:grid-cols-3">
            {competencies.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-zinc-200 p-8 hover:border-zinc-300 transition-colors bg-white shadow-sm"
              >
                <p className="text-sm font-bold tracking-tight text-zinc-950 uppercase">{v.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 p-10 md:p-16 text-center text-white">
            <h3 className="text-3xl font-bold tracking-tight mb-8 md:text-4xl">
              Let&apos;s build something scalable.
            </h3>
            {/* Primary Override: Uses our new logic to force White BG on Dark Section */}
            <Button 
              href="mailto:pratishek.designs@gmail.com" 
              className="bg-white text-zinc-950 hover:bg-zinc-200 px-10 py-4"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}