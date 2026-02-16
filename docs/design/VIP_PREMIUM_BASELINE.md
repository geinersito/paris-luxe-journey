# VIP_PREMIUM_BASELINE v1

This document defines the canonical premium baseline for a separate VIP-agency website (B2B). It is implementation-ready guidance, not an implementation change.

## 1) Positioning

### Target audience
- VIP agencies (B2B): concierge desks, travel designers, executive assistants, luxury DMCs.

### Brand attributes
- Premium
- Discreet
- High-trust
- High-end
- Non-intimidating, but clearly luxury

### What "premium" means here
- Materials: photography-first layouts, tactile surfaces (soft contrast, refined borders, restrained metallic accents).
- Contrast: readable at a glance, no low-contrast "fashion UI".
- Spacing: generous rhythm, fewer blocks per viewport, strong alignment.
- Motion: minimal and deliberate, no decorative overload.
- Typography: editorial headlines + neutral UI body, restrained weights.

### Tone of copy (B2B concierge)
- Short, assured, service-forward language.
- Operational clarity over adjectives (timing, process, guarantees).
- No aggressive urgency tactics; confidence over hype.

## 2) Color System (Tokens)

### Principle
- This VIP baseline is distinct from mainstream approachable themes: deeper navy foundations + controlled bronze/gold accents.
- Gold/bronze is a trust-and-status signal, not a full-page paint color.

### Light mode tokens

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--primary` | `214 33% 22%` | `#253A4B` | Primary CTA/background surfaces |
| `--primary-foreground` | `40 31% 96%` | `#F8F4EC` | Text/icons on primary |
| `--background` | `38 33% 95%` | `#F5F1EB` | App/page background |
| `--foreground` | `220 24% 17%` | `#20283A` | Default text |
| `--card` | `40 44% 98%` | `#FCFAF6` | Card background |
| `--card-foreground` | `220 24% 17%` | `#20283A` | Card text |
| `--muted` | `38 26% 88%` | `#E7E0D6` | Secondary blocks/tints |
| `--muted-foreground` | `220 14% 38%` | `#566070` | Secondary text |
| `--accent` | `34 50% 37%` | `#8C642F` | Premium accent action/highlight (AA-safe with light foreground) |
| `--accent-foreground` | `40 30% 97%` | `#FAF7F1` | Text/icons on accent |
| `--border` | `36 22% 78%` | `#D2C4AF` | Borders/dividers |
| `--input` | `38 24% 92%` | `#ECE4D8` | Input surfaces |
| `--ring` | `36 59% 44%` | `#B07C2E` | Focus ring (>=3:1 on light background) |

### Dark mode tokens

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--primary` | `214 32% 30%` | `#344A63` | Primary CTA/background surfaces |
| `--primary-foreground` | `40 35% 96%` | `#F7F2E8` | Text/icons on primary |
| `--background` | `220 28% 10%` | `#121824` | App/page background |
| `--foreground` | `38 30% 94%` | `#F2EEE5` | Default text |
| `--card` | `220 24% 14%` | `#1A2230` | Card background |
| `--card-foreground` | `38 30% 94%` | `#F2EEE5` | Card text |
| `--muted` | `219 18% 22%` | `#2D3645` | Secondary blocks/tints |
| `--muted-foreground` | `215 14% 72%` | `#AEB8C8` | Secondary text |
| `--accent` | `36 45% 56%` | `#C39A58` | Premium accent action/highlight |
| `--accent-foreground` | `220 30% 10%` | `#121926` | Text/icons on accent |
| `--border` | `220 16% 28%` | `#3A4353` | Borders/dividers |
| `--input` | `220 18% 20%` | `#293243` | Input surfaces |
| `--ring` | `36 60% 62%` | `#D6AE6C` | Focus ring |

### Gold/Bronze usage guidance (VIP agencies)
- Default rule: use bronze/gold in `--accent`, not as global background.
- Allowed primary usage:
  - CTA highlights
  - Small premium markers (badges, separators, icon accents)
  - Key conversion anchors (1-2 per viewport max)
- Avoid:
  - Gold text on light backgrounds for body copy
  - Multiple metallic gradients in one viewport
  - Gold as dominant fill across entire sections

### Contrast constraints
- Text: WCAG AA minimum 4.5:1 for normal text.
- Large text: minimum 3.0:1.
- Focus ring: minimum 3:1 against adjacent surface; use at least `2px` ring + visible offset.
- Disabled controls: keep readable labels; do not fade below practical legibility.
- Light `--accent` with `--accent-foreground` must stay >=4.5:1 (target approx 4.9:1).
- Light `--ring` against `--background` must stay >=3:1 (target approx 3.2:1).

## 3) Typography

### Font strategy
- Display: editorial serif for headings (e.g., `Playfair Display`, fallback `Georgia`, `serif`).
- UI/body: clean sans for content and controls (e.g., `Montserrat`, fallback `system-ui`, `sans-serif`).
- Optional accent serif (sparingly): short subheads only, never dense body text.

### Hierarchy
- `H1`: 52-64px, line-height `1.08-1.14`, letter-spacing `-0.01em`.
- `H2`: 36-44px, line-height `1.12-1.2`, letter-spacing `-0.005em`.
- `H3`: 26-32px, line-height `1.2-1.28`, letter-spacing `0`.
- `Body`: 17-19px, line-height `1.55-1.7`, weight `400-500`.
- `Small/UI`: 13-15px, line-height `1.4-1.55`, weight `500` for labels.

### Premium feel rules
- Slightly tighter tracking on headings, neutral tracking on body.
- Avoid heavy bold everywhere; keep emphasis selective.
- Preserve vertical breathing room around headlines/subheads.

## 4) Spacing & Layout Rules

### Grid and containers
- Desktop: 12-column grid, container max `1280px`.
- Tablet: 8-column grid.
- Mobile: 4-column grid.
- Reading width for dense text: `680-760px` max.

### Section spacing
- Desktop section rhythm: `96px` top/bottom.
- Tablet: `72px`.
- Mobile: `56px`.
- Intra-section block gaps: `24px` (default), `32px` for major blocks.

### Component geometry
- Card padding: `24-32px` desktop, `20-24px` mobile.
- Input height: `44-48px`.
- Button height: `44-52px`.
- Radius:
  - Cards: `12px`
  - Inputs/buttons: `10-12px`
  - Chips: full (`999px`)

### Luxury cadence
- Fewer elements per row, more breathing room.
- Align to a strict baseline/grid; avoid visual drift.
- Prioritize one primary action per section.

## 5) Components Baseline

### Buttons
- Primary:
  - Fill: `--primary`
  - Text: `--primary-foreground`
  - Hover: darken by 6-8%
  - Active: darken by 10-12%
  - Focus: `2px` ring (`--ring`) + `2px` offset
- Secondary:
  - Fill: transparent or `--card`
  - Border: `--border`
  - Text: `--foreground`
  - Hover: subtle `--muted` tint
- Ghost:
  - Transparent background
  - Text: `--foreground`/`--muted-foreground`
  - Hover: light tint only, no hard fills

### Component state matrix (baseline)
| Component | Variant | Default | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|---|
| Button | Primary | `bg-primary` + `text-primary-foreground` | Darken 6-8% | Darken 10-12% | `2px` ring + offset | Reduce fill contrast slightly; keep label readable |
| Button | Secondary | `bg-card` + `border` + `text-foreground` | `bg-muted` tint | Slightly darker tint | Same ring behavior | Border visible, text still readable |
| Button | Ghost | Transparent + `text-foreground` | `bg-muted/50` | `bg-muted` | Same ring behavior | Keep icon/text visible |
| Input | Default | `bg-input` + `border` | Border emphasis | N/A | Ring + border reinforce | Placeholder and value remain legible |
| Badge | Premium | `bg-accent` + `text-accent-foreground` | Slight darken | N/A | Optional ring if interactive | Avoid very low opacity states |

### Cards
- Base: `--card` + `1px` border `--border`.
- Elevation: subtle shadow only; no aggressive glow.
- Header/body/footer spacing must remain consistent (24/20/24 pattern recommended).

### Badges/Chips
- Small, restrained, readable.
- Primary informational chips: `--muted` background.
- Premium chips: `--accent` background, use sparingly.

### Inputs/Forms
- Inputs on `--input`, text `--foreground`, placeholder on `--muted-foreground`.
- Labels always visible and above field for clarity.
- Validation states must preserve AA contrast.

### Navbar
- Clean, low-noise top bar.
- One highlighted CTA max.
- Dropdowns: card-like panel with subtle border and controlled shadow.

### Hero
- Photography-first, concise copy, max two CTAs.
- Overlay only as needed for contrast, not to darken entire page.

### Footer
- Dense info architecture but calm visual tone.
- Keep trust/legal/contacts highly legible.

### Shadow/elevation rules
- Use soft shadows (`y=8-16`, blur `24-36`, low opacity).
- Avoid persistent glows; metallic glow only for rare spotlight elements.

### Motion rules
- Micro-interactions only.
- Duration bands:
  - Fast: `120-160ms` (hover/focus)
  - Standard: `180-240ms` (dropdown/card reveal)
  - Slow: `280-360ms` (hero transitions)
- Easing: smooth cubic-bezier, no bouncy motions on enterprise surfaces.

### Photography / imagery rules
- Prefer editorial, real-world transport imagery over generic stock visuals.
- Temperature: neutral-to-warm; avoid neon casts and oversaturation.
- Composition: clear subject, clean negative space for overlays/CTAs.
- Contrast: image must support readable text overlays without heavy black masks.
- Consistency: one art direction per page, avoid mixed visual styles.

## 6) Do / Don't

### Do
- Use minimalist premium composition.
- Let photography carry visual richness.
- Keep accents restrained and intentional.
- Preserve strong readability and calm hierarchy.
- Enforce one primary CTA per section (hard rule).

### Don't
- Do not stack heavy gradients.
- Do not use neon or oversized glow effects.
- Do not overuse gold/bronze as base background.
- Do not clutter sections with multiple competing CTAs.
- Do not place more than one primary CTA in the same section.

## 7) Implementation Mapping (Reference Only)

### Where tokens map later
- CSS variables: `src/index.css` (`:root` + `.dark`)
- Theme mapping: `tailwind.config.ts` (`colors` referencing CSS variables)

### Diff-friendly reference snippet (do not apply in this task)

```css
/* src/index.css (reference only) */
:root {
  --primary: 214 33% 22%;
  --primary-foreground: 40 31% 96%;
  --background: 38 33% 95%;
  --foreground: 220 24% 17%;
  --card: 40 44% 98%;
  --card-foreground: 220 24% 17%;
  --muted: 38 26% 88%;
  --muted-foreground: 220 14% 38%;
  --accent: 34 50% 37%;
  --accent-foreground: 40 30% 97%;
  --border: 36 22% 78%;
  --input: 38 24% 92%;
  --ring: 36 59% 44%;
}

.dark {
  --primary: 214 32% 30%;
  --primary-foreground: 40 35% 96%;
  --background: 220 28% 10%;
  --foreground: 38 30% 94%;
  --card: 220 24% 14%;
  --card-foreground: 38 30% 94%;
  --muted: 219 18% 22%;
  --muted-foreground: 215 14% 72%;
  --accent: 36 45% 56%;
  --accent-foreground: 220 30% 10%;
  --border: 220 16% 28%;
  --input: 220 18% 20%;
  --ring: 36 60% 62%;
}
```

```ts
// tailwind.config.ts (reference only)
const colors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
};
```

## 8) Versioning

### Ownership
- Owner: Design System Lead (Product + UX), with Engineering review on accessibility.
- Scope: VIP-agency web properties only.
- Fork rule: if the product target is B2C mainstream, use a separate baseline and do not mutate this one.

### Release rule
- Update version when token values or component behavior contracts change.
- Patch updates can add clarifications without changing visual contracts.

### Change log
- No entries yet.

## 9) Adoption Definition of Done
- Tokens implemented in `src/index.css` and mapped in `tailwind.config.ts`.
- WCAG AA checks pass for body text and CTA labels in light/dark.
- Focus ring is visibly perceivable on light and dark surfaces.
- Home, Airports, Excursions, Events, Fleet pass visual review in desktop and mobile.
- No section ships with more than one primary CTA.
