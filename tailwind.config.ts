import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const colors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "#B8956A", // Oro champagne suave - elegante y refinado
    foreground: "#FFFFFF",
    accent: "#9A7B52", // Hover más oscuro pero suave
    dark: "#7D6344", // Dark mode
    light: "#D4C4A8", // Claro para gradientes suaves
    50: "#FAF8F4",
    100: "#F3EFE7",
    200: "#E8DFD0",
    300: "#D4C4A8",
    400: "#C6AD8A",
    500: "#B8956A", // DEFAULT - champagne gold
    600: "#9A7B52",
    700: "#7D6344",
    800: "#5F4A33",
    900: "#3D2F20",
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
      "0%, 100%": { boxShadow: "0 0 20px hsl(45 93% 47% / 0.3)" },
      "50%": { boxShadow: "0 0 40px hsl(45 93% 47% / 0.6)" },
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
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4C4A8 0%, #B8956A 50%, #9A7B52 100%)',
        'gradient-gold-radial': 'radial-gradient(circle, #D4C4A8 0%, #B8956A 50%, #7D6344 100%)',
        'gradient-champagne': 'linear-gradient(180deg, #FEFCF8 0%, #F7F3E9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1F2D42 0%, #232F3E 100%)',
        'gradient-gold-subtle': 'linear-gradient(135deg, #F3EFE7 0%, #E8DFD0 50%, #D4C4A8 100%)',
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
        'luxury': '0 10px 40px -10px hsl(220 40% 20% / 0.2)',
        'luxury-hover': '0 20px 60px -15px hsl(220 40% 20% / 0.3)',
        'gold-glow': '0 0 30px hsl(45 93% 47% / 0.3)',
        'gold-glow-strong': '0 0 40px hsl(45 93% 47% / 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
