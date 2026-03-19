/** @type {import('tailwindcss').Config} */
const { v5Theme } = require("./v5-tailwind-tokens")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Spread v5 tokens first
      ...v5Theme,
      
      colors: {
        // Spread existing v5 colors
        ...(v5Theme?.colors ?? {}),
        brand: {
          primary: "#18181B",
          accent: "#6366F1", // Your Indigo v5 Accent
          ...(v5Theme?.colors?.brand ?? {}),
        },
        surface: "#F9FAFB",
      },

      fontFamily: {
        // FIX: Mapping the variables to match layout.tsx exactly
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
        heading: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        ...(v5Theme?.fontFamily ?? {}),
      },

      maxWidth: {
        content: "1200px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
}