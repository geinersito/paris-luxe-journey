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
    light: "#D4B85E", // Dorado claro para gradientes
    50: "#FBF8F0",
    100: "#F5EDDB",
    200: "#EBD9B3",
    300: "#DFC188",
    400: "#D4B85E",
    500: "#C2A033", // DEFAULT
    600: "#A3862B",
    700: "#8B7024",
    800: "#6B5519",
    900: "#4A3A11",
  },
  secondary: {
    DEFAULT: "#1F2D42", // Navy (accent para hero cards y secciones oscuras)
    foreground: "#F8F6F0",
    dark: "#232F3E",
    light: "#2A3F5F",
  },
  pearl: {
    DEFAULT: "#FDFBF7", // Blanco cálido (background principal)
    dark: "#F5F3EE",
    light: "#FFFFFF",
  },
  champagne: {
    DEFAULT: "#F7F3E9", // Champagne - tono crema elegante
    light: "#FAF7EF",
    dark: "#EDE8D9",
  },
  cream: {
    DEFAULT: "#FBF8F0", // Crema suave
    light: "#FEFCF8",
    dark: "#F5F0E3",
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
        display: ["Playfair Display", "serif"], // Títulos elegantes
        accent: ["Cormorant Garamond", "serif"], // Subtítulos decorativos
        sans: ["Montserrat", "sans-serif"], // Cuerpo de texto premium
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4B85E 0%, #C2A033 50%, #A3862B 100%)',
        'gradient-gold-radial': 'radial-gradient(circle, #D4B85E 0%, #C2A033 50%, #8B7024 100%)',
        'gradient-champagne': 'linear-gradient(180deg, #FEFCF8 0%, #F7F3E9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1F2D42 0%, #232F3E 100%)',
      },
      keyframes: animations.keyframes,
      animation: animations.animation,
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;