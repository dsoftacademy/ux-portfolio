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
    <main className="pt-16 bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <Section
        // Eyebrow using accent color for brand distinction
        eyebrow={<span className="text-[var(--accent)]">Experience & Strategy</span>}
        // Title using var(--text) to ensure it stays white/light in Dark Mode
        title={<span className="text-[var(--text)]">Driving Product Strategy Through Design Leadership</span>}
      >
        <div className="space-y-6 text-[var(--text-muted)] leading-relaxed font-sans">
          <p>
            I am a <span className="text-[var(--text)] font-semibold">Senior UX Design Lead</span> with over a decade of experience crafting human-centered products. My work sits at the intersection of <strong>Design Systems Architecture</strong> and <strong>AI-first product strategy</strong>.
          </p>
          
          <p>
            Currently, as a <strong>Design Lead at ICICI Lombard</strong>, I direct the UX strategy for enterprise platforms. I recently led the creation of the <strong>IL Design System</strong>, unifying 15+ product teams and reducing handoff time by <strong>70%</strong>—earning the <span className="text-[var(--accent)] italic font-medium">Top Performer 2025</span> award.
          </p>

          <p>
            Previously at <strong>Jio</strong>, I drove design system maturity across India&apos;s largest digital ecosystem, contributing to a 17.8% increase in customer acquisition.
          </p>

          <p>
            I also pioneer AI-first features, including <strong>Autonomous AI Agents</strong> that reduced query resolution times by 40%. My background as a <strong>Co-Founder</strong> gives me a unique entrepreneurial lens on product growth.
          </p>
        </div>
      </Section>

      {/* Competency Cards */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-4 md:grid-cols-3">
            {competencies.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-[var(--border)] p-8 transition-all bg-[var(--bg)] shadow-sm hover:border-[var(--accent)]/30"
              >
                <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--accent)] uppercase font-mono">
                  {v.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg)] p-10 md:p-16 text-center shadow-xl">
            <h3 className="relative z-10 text-3xl font-bold tracking-tight mb-8 md:text-4xl text-[var(--text)]">
              Let&apos;s build something scalable.
            </h3>
            
            <div className="relative z-10 flex justify-center gap-4">
              <Button href="mailto:pratishek.designs@gmail.com" variant="primary">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}