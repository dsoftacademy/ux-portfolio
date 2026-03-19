const v5Theme = {
  colors: {
    brand: {
      bg: "#0C0C10",
      "bg-light": "#F5F5F2",
      accent: "#6366F1",
      "accent-lt": "#818CF8",
      purple: "#A78BFA",
      text: "#F0F0F4",
      "text-light": "#111827",
      success: "#22C55E",
      "proj-indigo": "#6366F1",
      "proj-violet": "#8B5CF6",
      "proj-pink": "#EC4899",
      "proj-teal": "#14B8A6",
    },
  },
  fontFamily: {
    sans: ["var(--font-inter)", "Inter", "sans-serif"],
    mono: ["var(--font-geist-mono)", "GeistMono", "monospace"],
  },
  borderRadius: {
    card: "16px",
    btn: "10px",
    pill: "100px",
  },
  animation: {
    "fade-up": "fade-up 0.7s ease-[cubic-bezier(0.23,1,0.32,1)] forwards",
    marquee: "marquee 35s linear infinite",
  },
  keyframes: {
    "fade-up": {
      "0%": { opacity: "0", transform: "translateY(24px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    marquee: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" },
    },
  },
}

// src/v5-tailwind-tokens.js
module.exports = {
  v5Theme
};

