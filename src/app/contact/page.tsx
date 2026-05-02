// src/app/contact/page.tsx
"use client"

import * as React from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/Button"
import { SectionWrapper } from "@/components/SectionWrapper"

export default function ContactPage() {
  const [state, handleSubmit] = useForm("meenoewr")

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] pb-24 pt-28 md:pt-32 transition-colors duration-500">
      {/* 1. HEADER SECTION */}
      <section className="mb-12">
        <SectionWrapper>
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Let&apos;s work together
            </span>
            <h1 className="mt-6 font-sans text-4xl font-extrabold tracking-tighter text-[var(--text)] md:text-7xl">
              Contact
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              Looking for a Principal Design Lead to architect your next system or scale your product team?
              Send a note below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* 2. FORM SECTION */}
      <section>
        <SectionWrapper>
          <div className="overflow-hidden rounded-[24px] md:rounded-[32px] border border-[var(--border)] bg-[var(--bg)] transition-all duration-500 shadow-sm">
            {state.succeeded ? (
              <div className="p-12 md:p-20 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[var(--text)]">Message sent successfully</h2>
                <p className="mt-4 text-[var(--text-muted)]">
                  Thanks for reaching out! I&apos;ve received your inquiry and will reply soon.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button variant="secondary" onClick={() => window.location.reload()}>
                    Send another
                  </Button>
                  <Button href="/">
                    Back Home
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-5">
                {/* Contact Info Sidebar */}
                <div className="md:col-span-2 bg-[var(--surface)] p-5 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border)]">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--text)] mb-8">Direct Channels</h2>
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Email</p>
                      <a href="mailto:pratishek.designs@gmail.com" className="break-all text-base font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                        pratishek.designs@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Social</p>
                      <a href="https://www.linkedin.com/in/pratishek-bansal-designer/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                        LinkedIn
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Location</p>
                      <p className="text-base font-medium text-[var(--text)]">Remote / Relocation friendly</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="md:col-span-3 p-5 md:p-12 grid gap-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="grid gap-3">
                      <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text)]">Name</label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-5)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                      />
                      <ValidationError field="name" prefix="Name" errors={state.errors} className="text-sm text-red-400" />
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text)]">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-5)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                      />
                      <ValidationError field="email" prefix="Email" errors={state.errors} className="text-sm text-red-400" />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text)]">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="relative w-[110px] shrink-0">
                        <select
                          id="countryCode"
                          name="countryCode"
                          aria-label="Country code"
                          autoComplete="tel-country-code"
                          className="w-full h-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all appearance-none cursor-pointer"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </div>
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-5)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                      />
                    </div>
                    <ValidationError field="phone" prefix="Phone" errors={state.errors} className="text-sm text-red-400" />
                  </div>

                  <div className="grid gap-3">
                    <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text)]">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      required
                      placeholder="Project Inquiry / Design Leadership"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-5)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                    />
                    <ValidationError field="subject" prefix="Subject" errors={state.errors} className="text-sm text-red-400" />
                  </div>

                  <div className="grid gap-3">
                    <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text)]">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your goals..."
                      className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-sm text-[var(--text)] placeholder:text-[var(--text-5)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                    />
                    <ValidationError field="message" prefix="Message" errors={state.errors} className="text-sm text-red-400" />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={state.submitting} className="w-full md:w-auto min-w-[200px]">
                      {state.submitting ? "Sending..." : "Send Message"}
                    </Button>
                    <ValidationError errors={state.errors} className="mt-3 text-sm text-red-400" />
                  </div>
                </form>
              </div>
            )}
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}