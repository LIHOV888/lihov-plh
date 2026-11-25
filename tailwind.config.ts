import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070B14",
          900: "#0B1120",
          800: "#111A2E",
          700: "#1B2845",
        },
        brand: {
          blue: "#2563EB",
          indigo: "#4F46E5",
          purple: "#7C3AED",
          sky: "#38BDF8",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-khmer)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "var(--font-jakarta)",
          "var(--font-khmer)",
          "system-ui",
          "sans-serif",
        ],
        khmer: ["var(--font-khmer)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
