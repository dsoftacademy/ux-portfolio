// src/app/about/page.tsx
import { Button } from "@/components/Button"
import { SectionWrapper } from "@/components/SectionWrapper"

export const metadata = {
  title: "About",
  description: "Principal Design Lead with 10+ years of experience in Design Systems and AI strategy.",
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
    <div className="min-h-screen bg-[var(--bg)] pb-24 pt-32 transition-colors duration-500">
      {/* 1. HEADER & BIO SECTION */}
      <section className="mb-12">
        <SectionWrapper>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Experience & Strategy
              </span>
              <h1 className="mt-6 font-sans text-[clamp(2rem,6vw,4.5rem)] font-extrabold tracking-tighter text-[var(--text)]">
                Driving Product Strategy Through Design Leadership
              </h1>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-muted)] font-sans">
                <p>
                  I am a <span className="text-[var(--text)] font-semibold">Principal UX/UI Design Lead</span> with over a decade of experience crafting human-centered products. My work sits at the intersection of <strong>Design Systems Architecture</strong> and <strong>AI-first product strategy</strong>.
                </p>
                
                <p>
                  Currently, as a <strong>Principal Design Lead at ICICI Lombard</strong>, I direct the UX strategy for enterprise platforms. I recently led the creation of the <strong>IL Design System</strong>, unifying 15+ product teams and reducing handoff time by <strong>70%</strong>—earning the <span className="text-[var(--accent)] italic font-medium">Top Performer 2025</span> award.
                </p>

                <p>
                  Previously at <strong>Jio</strong>, I drove design system maturity across India&apos;s largest digital ecosystem, contributing to a 17.8% increase in customer acquisition.
                </p>

                <p>
                  I also pioneer AI-first features, including <strong>Autonomous AI Agents</strong> that reduced query resolution times by 40%. My background as a <strong>Co-Founder</strong> gives me a unique entrepreneurial lens on product growth.
                </p>
              </div>
            </div>
            
            {/* Sidebar / Profile Placeholder Area */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
                <div className="aspect-square w-full rounded-2xl bg-[var(--bg)] border border-[var(--border)] mb-8 flex items-center justify-center overflow-hidden">
                   <span className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest">Profile Image</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Location</p>
                    <p className="text-base font-medium text-[var(--text)]">Mumbai, India / Remote</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Current Role</p>
                    <p className="text-base font-medium text-[var(--text)]">Principal Design Lead @ ICICI Lombard</p>
                  </div>
                  <div className="pt-4">
                    <a
                      href="/Pratishek-Bansal-Resume.pdf"
                      download
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 2. COMPETENCY CARDS */}
      <section className="py-12">
        <SectionWrapper>
          <div className="grid gap-6 md:grid-cols-3">
            {competencies.map((v) => (
              <div
                key={v.title}
                className="rounded-[32px] border border-[var(--border)] p-8 transition-all bg-[var(--surface)] shadow-sm hover:border-[var(--accent)]/30 group"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--text)] uppercase font-mono">
                  {v.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* 3. CALL TO ACTION SECTION */}
      <section className="py-12">
        <SectionWrapper>
          <div className="relative overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--surface)] p-12 md:p-24 text-center shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
            <h2 className="relative z-10 text-4xl font-extrabold tracking-tighter mb-8 md:text-6xl text-[var(--text)]">
              Let&apos;s build something <br className="hidden md:block" /> scalable together.
            </h2>
            
            <div className="relative z-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" className="min-w-[180px]">
                Start a Conversation
              </Button>
              <Button href="/projects" variant="secondary" className="min-w-[180px]">
                View Projects
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}