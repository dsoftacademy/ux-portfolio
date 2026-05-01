// src/app/projects/ilds-design-system/page.tsx
import type { Metadata } from "next"
import { IldsCaseStudy } from "@/components/ilds/IldsCaseStudy"

export const metadata: Metadata = {
  title: "ILDS Design System",
  description:
    "How a static, unused Figma file became a token-driven design system at ICICI Lombard — audited against 7 industry leaders, shipped in 3 phases, now active across 23 projects with 4.7M variable inserts.",
}

export default function IldsCaseStudyPage() {
  return <IldsCaseStudy />
}
