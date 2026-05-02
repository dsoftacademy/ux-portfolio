// src/app/projects/il-takecare/page.tsx
import type { Metadata } from "next"
import { IltcCaseStudy } from "@/components/iltc/IltcCaseStudy"

export const metadata: Metadata = {
  title: "IL TakeCare — From complexity to clarity",
  description:
    "How ICICI Lombard's flagship insurance & lifestyle app was rebuilt around clarity, control, and care — cutting customer-care calls 53.8%, lifting feature utilisation 328.1%, and shrinking feature TAT from ~48 days to 24 hours.",
}

export default function IltcCaseStudyPage() {
  return <IltcCaseStudy />
}
