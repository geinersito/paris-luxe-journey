import type { Config } from "tailwindcss";

const colors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "#C2A033", // Dorado - Brand primary action color (confianza y profesionalismo)
    foreground: "#FFFFFF",
    accent: "#A3862B", // Dorado hover (más oscuro)
    dark: "#8B7024", // Dorado dark mode
  },
  secondary: {
    DEFAULT: "#1F2D42", // Navy (accent para hero cards y secciones oscuras)
    foreground: "#F8F6F0",
    dark: "#232F3E",
  },
  pearl: {
    DEFAULT: "#FDFBF7", // Blanco cálido (background principal)
    dark: "#F5F3EE",
    light: "#FFFFFF",
  },
  metallic: {
    DEFAULT: "#E5E1D8", // Beige claro (borders)
    dark: "#EDEBE5",
    light: "#F8F6F0",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "#F5F3EE", // Muted background (beige muy claro)
    foreground: "#2B3340",
    dark: "#232F3E",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
};

const animations = {
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    slideUp: {
      "0%": { transform: "translateY(100%)" },
      "100%": { transform: "translateY(0)" },
    },
    slideDown: {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(0)" },
    },
    pulse: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.5" },
    },
    shimmer: {
      "0%": { backgroundPosition: "-200%" },
      "100%": { backgroundPosition: "200%" },
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    fadeIn: "fadeIn 1s ease-in",
    slideUp: "slideUp 0.5s ease-out",
    slideDown: "slideDown 0.5s ease-out",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    shimmer: "shimmer 2s linear infinite",
  },
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors,
      fontFamily: {
        display: ["Playfair Display", "serif"],
        accent: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: animations.keyframes,
      animation: animations.animation,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;