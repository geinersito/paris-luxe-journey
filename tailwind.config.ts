import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const colors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "#2F5E96", // Trust blue primary (AA-safe ≥4.5:1 with white text)
    foreground: "#FFFFFF",
    accent: "#274F80", // Hover más oscuro (AA-safe)
    dark: "#23466E", // Dark mode
    light: "#DCE8F8", // Claro para gradientes suaves
    50: "#F5F8FC",
    100: "#EAF1F9",
    200: "#D1E0F3",
    300: "#AEC8E9",
    400: "#7EA6D7",
    500: "#2F5E96", // DEFAULT - trust blue
    600: "#274F80",
    700: "#23466E",
    800: "#1D3757",
    900: "#162841",
  },
  secondary: {
    DEFAULT: "#24364D", // Navy slate (steady/credible base)
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
    DEFAULT: "#F3F5F8", // Cool light neutral
    light: "#F8FAFC",
    dark: "#E7ECF2",
  },
  cream: {
    DEFAULT: "#F7F8FA", // Neutral base
    light: "#FCFDFE",
    dark: "#EDF1F6",
  },
  metallic: {
    DEFAULT: "#D8DFE8", // Soft cool border
    dark: "#E4E9EF",
    light: "#F4F7FA",
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
    DEFAULT: "#EEF2F7", // Muted background (blue-gray very light)
    foreground: "#24364D",
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
    fadeInUp: {
      "0%": { opacity: "0", transform: "translateY(20px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    fadeInDown: {
      "0%": { opacity: "0", transform: "translateY(-20px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    fadeInLeft: {
      "0%": { opacity: "0", transform: "translateX(-20px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    fadeInRight: {
      "0%": { opacity: "0", transform: "translateX(20px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    scaleIn: {
      "0%": { opacity: "0", transform: "scale(0.9)" },
      "100%": { opacity: "1", transform: "scale(1)" },
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
    goldGlow: {
      "0%, 100%": { boxShadow: "0 0 16px hsl(213 52% 45% / 0.2)" },
      "50%": { boxShadow: "0 0 28px hsl(213 52% 45% / 0.35)" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    fadeIn: "fadeIn 1s ease-in",
    fadeInUp: "fadeInUp 0.6s ease-out",
    fadeInDown: "fadeInDown 0.6s ease-out",
    fadeInLeft: "fadeInLeft 0.6s ease-out",
    fadeInRight: "fadeInRight 0.6s ease-out",
    scaleIn: "scaleIn 0.5s ease-out",
    slideUp: "slideUp 0.5s ease-out",
    slideDown: "slideDown 0.5s ease-out",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    shimmer: "shimmer 2s linear infinite",
    goldGlow: "goldGlow 2s ease-in-out infinite",
    float: "float 3s ease-in-out infinite",
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
      fontSize: {
        // Fluid typography tokens — map to clamp() CSS vars in index.css
        // Usage: text-fluid-sm, text-fluid-2xl, etc.
        'fluid-xs':  'var(--text-xs)',
        'fluid-sm':  'var(--text-sm)',
        'fluid-base': 'var(--text-base)',
        'fluid-lg':  'var(--text-lg)',
        'fluid-xl':  'var(--text-xl)',
        'fluid-2xl': 'var(--text-2xl)',
        'fluid-3xl': 'var(--text-3xl)',
        'fluid-4xl': 'var(--text-4xl)',
        'fluid-5xl': 'var(--text-5xl)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #5E83B4 0%, #2F5E96 50%, #274F80 100%)',
        'gradient-gold-radial': 'radial-gradient(circle, #8AAEDB 0%, #2F5E96 55%, #23466E 100%)',
        'gradient-champagne': 'linear-gradient(180deg, #FCFDFE 0%, #F3F5F8 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1F2D42 0%, #232F3E 100%)',
        'gradient-gold-subtle': 'linear-gradient(135deg, #F2F6FB 0%, #E5EDF7 50%, #D4E2F2 100%)',
        'gradient-cinematic': 'linear-gradient(180deg, hsl(220 45% 15% / 0.8) 0%, hsl(220 45% 15% / 0.6) 30%, hsl(220 45% 15% / 0.4) 50%, hsl(220 45% 15% / 0.6) 70%, hsl(220 45% 15% / 0.9) 100%)',
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
      zIndex: {
        nav: '50',
        'modal-overlay': '60',
        floating: '80',
        toast: '100',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      boxShadow: {
        'luxury': '0 8px 24px -12px hsl(220 30% 20% / 0.18)',
        'luxury-hover': '0 14px 32px -14px hsl(220 30% 20% / 0.24)',
        'gold-glow': '0 0 20px hsl(213 52% 45% / 0.22)',
        'gold-glow-strong': '0 0 28px hsl(213 52% 45% / 0.34)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
