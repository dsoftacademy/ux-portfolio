import type { Metadata } from "next"
import "./globals.css"
import { AppChrome } from "@/components/AppChrome"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"

// Updated variable to --font-sans to match tailwind.config.js
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", 
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Pratishek Bansal | Senior Design Lead",
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
      <body className="antialiased">
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  )
}