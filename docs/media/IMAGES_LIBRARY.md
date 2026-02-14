# IMAGES_LIBRARY (MVP)

## Purpose

Define a deterministic, local-first image library to avoid hotlinking and keep visual parity across locales.

## Scope (MEDIA-IMAGES-LIBRARY-01)

- Excursions hero image
- Excursions card images
- Events feed images
- Home trust visuals (testimonial avatars)

## Storage Rules

- Runtime image source must be local under `public/images/library/`.
- Do not use remote image URLs in UI/data (`images.unsplash.com`, etc.).
- Keep one canonical image set for all locales unless a locale-specific asset is explicitly required.
- Keep source provenance in this doc (source URL + retrieval date).

## Naming Rules (Deterministic)

Pattern:

`/images/library/<area>/<group>/<slug>-<width>x<height>.jpg`

Examples:

- `/images/library/excursions/hero/excursions-hero-paris-eiffel-1920x1080.jpg`
- `/images/library/excursions/cards/excursion-giverny-800x600.jpg`
- `/images/library/events/salon-du-dessin-2026-800x600.jpg`
- `/images/library/home/trust/testimonial-marie-dubois-400x400.jpg`

Conventions:

- Lowercase, kebab-case only.
- Include semantic slug (not random UUID names).
- Include final dimensions in filename.
- Prefer `.jpg` for photo assets in this MVP.

## Sourcing Checklist

Before adding a new image:

1. Confirm usage rights/license for web use.
2. Store source URL and retrieval date in this document.
3. Download and store asset locally in the deterministic path.
4. Update UI/data references to local path only.
5. Validate EN/FR/ES/PT pages render the same image set.

## Current MVP Inventory

Retrieval date: 2026-02-14
Source domain: Unsplash (downloaded to local library; no runtime hotlinking)

### Excursions

- Hero: `/images/library/excursions/hero/excursions-hero-paris-eiffel-1920x1080.jpg`
  - Source: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34`
- Cards:
  - `/images/library/excursions/cards/excursion-paris-half-day-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34`
  - `/images/library/excursions/cards/excursion-paris-full-day-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1511739001486-6bfe10ce785f`
  - `/images/library/excursions/cards/excursion-paris-night-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34`
  - `/images/library/excursions/cards/excursion-versailles-half-day-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1511739001486-6bfe10ce785f`
  - `/images/library/excursions/cards/excursion-versailles-full-day-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1511739001486-6bfe10ce785f`
  - `/images/library/excursions/cards/excursion-giverny-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1566073771259-6a8506099945`
  - `/images/library/excursions/cards/excursion-champagne-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1547595628-c61a29f496f0`
  - `/images/library/excursions/cards/excursion-loire-valley-800x600.jpg`
    - Source: `https://images.unsplash.com/photo-1566073771259-6a8506099945`

### Events

- `/images/library/events/art-capital-grand-palais-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1545989253-02cc26577f88`
- `/images/library/events/six-invitational-paris-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1542751110-97427bbecf20`
- `/images/library/events/jeu-de-paume-festival-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1501612780327-45045538702b`
- `/images/library/events/salon-agriculture-2026-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1457530378978-8bac673b8062`
- `/images/library/events/l2p-convention-2026-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1511512578047-dfb367046420`
- `/images/library/events/paris-world-tourism-fair-2026-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1469474968028-56623f02e42e`
- `/images/library/events/ecotrail-paris-2026-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1486218119243-13883505764c`
- `/images/library/events/salon-du-dessin-2026-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1513364776144-60967b0f800f`
- `/images/library/events/festival-mondial-magie-2026-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1501472312651-726afe119ff1`
- Fallback: `/images/library/events/event-placeholder-800x600.jpg`
  - Source: `https://images.unsplash.com/photo-1501612780327-45045538702b`

### Home Trust Visuals

- `/images/library/home/trust/testimonial-marie-dubois-400x400.jpg`
  - Source: `https://images.unsplash.com/photo-1494790108377-be9c29b29330`
- `/images/library/home/trust/testimonial-pierre-laurent-400x400.jpg`
  - Source: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`
- `/images/library/home/trust/testimonial-isabella-garcia-400x400.jpg`
  - Source: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80`
- `/images/library/home/trust/testimonial-james-wilson-400x400.jpg`
  - Source: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e`
