# 🎨 Paris Elite Services - Design System

## 📐 JERARQUÍA TIPOGRÁFICA OFICIAL

### **Títulos Principales (H1/H2)**
- **Font:** `font-display` (Playfair Display 700)
- **Uso:** Títulos de sección, hero titles
- **Tamaños:** `text-4xl md:text-5xl` (H1), `text-3xl md:text-4xl` (H2)
- **Color:** `text-secondary` (Navy #1F2D42) o `text-white` (sobre fondos oscuros)
- **Ejemplo:** "Premium Chauffeur Services", "Our Fleet"

### **Subtítulos Decorativos**
- **Font:** `font-accent` (Cormorant Garamond 500-italic)
- **Uso:** Subtítulos elegantes sobre títulos principales
- **Tamaños:** `text-xl md:text-2xl`
- **Color:** `text-primary` (Champagne Gold #B8956A)
- **Estilo:** Siempre `italic`
- **Ejemplo:** "Paris Elite Services", "Luxury Transportation"

### **Subtítulos de Sección (H3/H4)**
- **Font:** `font-sans` (Montserrat 600)
- **Uso:** Títulos de cards, categorías
- **Tamaños:** `text-xl md:text-2xl` (H3), `text-lg md:text-xl` (H4)
- **Color:** `text-secondary` (Navy)
- **Ejemplo:** "Airport Transfer", "Business Class"

### **Cuerpo de Texto**
- **Font:** `font-sans` (Montserrat 400)
- **Tamaños:** `text-base` (16px), `text-lg` (18px para destacados)
- **Color:** `text-gray-600` (texto normal), `text-gray-700` (énfasis)
- **Line height:** `leading-relaxed` (1.625)

---

## 🎨 PALETA DE COLORES

### **Primary (Champagne Gold)**
```css
DEFAULT: #B8956A
50: #FAF8F4
100: #F3EFE7
200: #E8DFD0
300: #D4C4A8
500: #B8956A (base)
600: #9A7B52
700: #7D6344
```

### **Secondary (Navy)**
```css
DEFAULT: #1F2D42
dark: #232F3E
light: #2A3F5F
```

### **Neutrales**
```css
Champagne: #F7F3E9
Cream: #FBF8F0
Pearl: #FDFBF7
Gray-600: #4B5563
Gray-700: #374151
```

---

## 🔘 SISTEMA DE BOTONES

### **Primary CTA (Gradient Gold)**
```tsx
className="silk-button"
// O manualmente:
className="bg-gradient-gold text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
```
**Uso:** "Réserver", "Book Now", "See Your Fixed Price"

### **Secondary (Outline Gold)**
```tsx
className="button-outline-gold"
// O manualmente:
className="border-2 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300"
```
**Uso:** "Voir les Détails", "Learn More", "Cancel"

### **Tertiary (Ghost)**
```tsx
<Button variant="ghost">
```
**Uso:** Navegación secundaria, acciones terciarias

---

## 📦 SISTEMA DE CARDS

### **Glass Card Premium (Default)**
```tsx
className="glass-card-premium"
// Incluye: bg-gradient-to-br from-white/90 to-champagne/80 backdrop-blur-2xl border border-primary/10 rounded-2xl shadow-2xl
```
**Uso:** Services, testimonials, FAQ, routes

### **Hover Effect Estándar**
```tsx
<motion.div whileHover={{ y: -8 }} className="transition-all duration-500 hover:shadow-2xl">
```

---

## 🎭 FONDOS DE SECCIONES

### **Patrón de Alternancia**
```tsx
// Sección 1 (Hero): Imagen con overlay
className="bg-gradient-to-b from-black/70 via-black/50 to-black/70"

// Sección 2 (Services): Gradient champagne
className="bg-gradient-to-b from-cream via-white to-champagne"

// Sección 3 (Routes): Gradient suave
className="bg-gradient-to-b from-white via-champagne/30 to-white"

// Sección 4 (Fleet): Gradient inverso
className="bg-gradient-to-b from-champagne via-cream to-white"

// Sección 5 (Testimonials): Gradient champagne
className="bg-gradient-to-b from-champagne via-cream to-white"

// Sección 6 (FAQ): Gradient suave
className="bg-gradient-to-b from-white via-cream/50 to-white"
```

**PROHIBIDO:** Fondos navy abruptos (`bg-secondary`) excepto en About Section con imagen de fondo

---

## 🏷️ BADGES

### **Featured Badge**
```tsx
<div className="bg-gradient-gold text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
  <Star className="w-3.5 h-3.5" />
  Most Popular
</div>
```

### **Price Badge**
```tsx
<div className="bg-gradient-gold-subtle px-4 py-3 rounded-xl">
  <p className="text-xs text-gray-600 font-medium mb-1 uppercase tracking-wide">From</p>
  <p className="text-3xl font-display font-bold text-primary">€{price}</p>
</div>
```

---

## 📏 SPACING

### **Section Padding**
```tsx
className="section-padding" // py-20 md:py-28 lg:py-32
className="section-padding-sm" // py-12 md:py-16 lg:py-20
```

### **Container**
```tsx
className="container mx-auto px-4 max-w-7xl"
```

### **Grid Gaps**
```tsx
className="gap-8 lg:gap-10" // Cards grid
className="space-y-12" // Vertical sections
```

---

## 🖼️ IMÁGENES

### **Aspect Ratio Estándar**
```tsx
className="aspect-[4/3]" // Vehículos, tours
className="aspect-video" // Hero backgrounds
```

### **Object Fit**
```tsx
className="object-cover" // Default
className="object-contain" // Logos, iconos
```

---

## ✨ ANIMACIONES

### **Scroll Reveal**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### **Hover Effects**
```tsx
whileHover={{ y: -8, scale: 1.02 }} // Cards
whileHover={{ scale: 1.1, rotate: 3 }} // Icons
```

