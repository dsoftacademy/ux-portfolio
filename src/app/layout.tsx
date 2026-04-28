// src/app/layout.tsx

import type { Metadata } from "next"
import "./globals.css"
import { AppChrome } from "@/components/AppChrome"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"

// Updated variable to --font-sans to match tailwind.config.js
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", 
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Pratishek Bansal | Principal Design Lead",
    template: "%s - Pratishek Bansal",
  },
  description:
    "Strategic Design Leader specializing in AI-First Products and Design Systems.",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Umami Analytics */}
        <Script
          async
          src="https://cloud.umami.is/script.js"
          data-website-id="805ef96e-57da-4e20-98cc-4d37528e461f"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  )
}