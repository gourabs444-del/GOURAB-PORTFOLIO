import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050507",
        foreground: "#f4f4f6",
        void: "#030304",
        surface: {
          50: "#181a24",
          100: "#14151e",
          200: "#101117",
          300: "#0b0c10",
          400: "#07080a",
        },
        accent: {
          DEFAULT: "#E5A93C",
          hover: "#F3B74F",
          glow: "rgba(229, 169, 60, 0.15)",
          muted: "rgba(229, 169, 60, 0.4)",
        },
        cyanGlow: "rgba(56, 189, 248, 0.12)",
        mist: "#8E919C",
        steel: "#4A4D57",
        borderDark: "rgba(255, 255, 255, 0.08)",
        borderLight: "rgba(255, 255, 255, 0.16)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        editorial: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-plus-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.03em",
        widest: "0.25em",
        ultra: "0.35em",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "glow-slow": "glow 4s ease-in-out infinite alternate",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%": { opacity: "0.4", transform: "scale(0.98)" },
          "100%": { opacity: "0.8", transform: "scale(1.02)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "cinematic-vignette": "radial-gradient(circle at center, transparent 40%, rgba(5, 5, 7, 0.85) 100%)",
      }
    },
  },
  plugins: [],
};

export default config;
