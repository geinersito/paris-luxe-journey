# 📅 Content Operations Guide - Paris Luxe Journey

## Events Feed Update Procedure

The Events Feed displays curated cultural events in Paris (Opera, exhibitions, fashion, concerts, festivals) to help travelers plan their visit.

### ⏰ Update Frequency

- **Weekly Update**: Update `thisWeek` array every Monday (15-20 min)
- **Monthly Update**: Update `thisMonth` array on the 1st of each month (25-30 min)
- **Minimum**: Update at least twice per month to keep content fresh
- **Recommended**: Week 1 (monthly) + Week 3 (weekly refresh)

---

## Step-by-Step Update Process

### 1. Generate Events Data with Perplexity Pro

Copy and paste this prompt into Perplexity Pro (adjust the week/month as needed):

```
Actúa como editor de contenido premium para un servicio VTC boutique en París. Necesito un "Events Feed" para mi web con eventos culturales relevantes en París (Ópera, exposiciones de arte, desfiles/Moda, conciertos, festivales) con enfoque práctico para turistas.

Tarea: devuelve SOLO un JSON válido (sin explicación, sin markdown) con esta estructura exacta:

* generatedAt (ISO)
* timezone: "Europe/Paris"
* thisWeek: array máximo 8
* thisMonth: array máximo 12

Reglas de selección:

* Solo eventos en París o Île-de-France con fechas verificables.
* Prioriza eventos con venue conocido y enlace oficial.
* Mezcla: 2–3 exposiciones, 1–2 ópera/ballet, 1 moda/cultura, 1 festival o evento grande, 1 "family-friendly" si aplica.
* Si un evento no tiene descripción oficial clara, no lo incluyas.

Para cada evento incluye:

* id (slug corto, único, en minúsculas con guiones)
* startAt (ISO con hora si está disponible)
* endAt (ISO opcional)
* title: { en, es, fr, pt } (traducción natural, tono premium, sin jerga)
* description: { en, es, fr, pt } (1–2 frases, útil y práctica, sin exagerar)
* venueName: { en, es, fr, pt } (si es nombre propio, repetir igual)
* district (si se conoce; si no, omitir)
* address (si se conoce; si no, omitir)
* eventUrl (obligatorio; preferir web oficial)
* imageUrl (si existe en fuente oficial; si no, omitir)
* category (exhibition|opera|fashion|festival|concert|museum|family)
* isFeatured (true para 3 eventos máximo)
* sourceName (ej. "Ville de Paris", "OpenAgenda", "Opera de Paris", "Grand Palais")

Importante:

* Las traducciones ES/PT deben sonar naturales (no literales).
* No inventes datos: si falta hora exacta, usa solo fecha (00:00) y explica en descripción "times vary / see official site" en los 4 idiomas.
* Devuelve eventos para: [INDICAR SEMANA ACTUAL: Enero 13-19, 2025] y [INDICAR MES ACTUAL: Enero 2025].
* Devuelve SOLO el JSON.
```

### 2. Copy the Generated JSON

Perplexity Pro will return a JSON object. Copy the entire JSON response.

### 3. Update the Events Feed File

1. Open the file: `src/data/events/events-feed.ts`
2. Locate the `eventsData` object (around line 10)
3. Replace the ENTIRE object content with the new JSON from Perplexity
4. Keep the `export const eventsData: EventsFeedData = ` line
5. Save the file

**Example:**
```typescript
export const eventsData: EventsFeedData = {
  // PASTE YOUR NEW JSON HERE (replace everything inside the braces)
  "generatedAt": "2025-01-13T10:00:00Z",
  "timezone": "Europe/Paris",
  "thisWeek": [...],
  "thisMonth": [...]
}
```

### 4. Verify the Data

Before deploying, verify:

- [ ] JSON is valid (no syntax errors)
- [ ] `generatedAt` timestamp is current
- [ ] `thisWeek` has 4-8 events
- [ ] `thisMonth` has 6-12 events
- [ ] At least 3 events are marked as `isFeatured: true`
- [ ] All required fields are present (id, startAt, title, description, eventUrl, sourceName)
- [ ] All `eventUrl` links are valid and official
- [ ] Translations in all 4 languages (en, es, fr, pt) are present

### 5. Test Locally

Run the development server to preview:

```bash
npm run dev
```

Navigate to `/blog` and scroll down to see the "This Month in Paris" section.

Check:
- [ ] Events display correctly
- [ ] Images load (or fallback to placeholder)
- [ ] Dates are formatted correctly
- [ ] "Book a Ride" and "Official Details" buttons work
- [ ] All 4 languages display correctly

### 6. Build and Deploy

```bash
# Build to verify no errors
npm run build

# If successful, commit and push
git add src/data/events/events-feed.ts
git commit -m "chore: update events feed - [DATE]"
git push origin main
```

Vercel will automatically deploy in ~2 minutes. Verify in production after deployment.

---

## Quality Guidelines

### Event Selection Criteria

**DO Include:**
- Major cultural events (Opera, Ballet, Symphony)
- Museum exhibitions (Louvre, Orsay, Pompidou, etc.)
- Fashion Week events
- Festivals and special events
- Family-friendly activities
- Events with official websites and verified information

**DON'T Include:**
- Events without official confirmation
- Small local events without tourist appeal
- Events without clear venue/date information
- Duplicate events
- Events that have already passed

### Translation Quality

- **English**: Professional, clear, informative
- **Spanish**: Natural Spanish (not literal translation)
- **French**: Native French tone (formal but accessible)
- **Portuguese**: Brazilian Portuguese preferred

### Image Guidelines

- Use official event images when available
- If no image is available, omit `imageUrl` field (component will use placeholder)
- Ensure images are high quality and relevant

---

## Troubleshooting

### Build Fails

**Error**: JSON syntax error
- **Solution**: Validate JSON at https://jsonlint.com/

**Error**: Missing required fields
- **Solution**: Ensure all events have: id, startAt, title, description, eventUrl, sourceName

### Events Not Displaying

**Issue**: No events show on the page
- **Check**: `thisWeek` and `thisMonth` arrays are not empty
- **Check**: File is in correct location: `src/data/events/events-feed.ts`
- **Check**: TypeScript syntax is correct (no missing commas, brackets)

**Issue**: Images not loading
- **Solution**: This is normal if `imageUrl` is not provided. Component uses placeholder.

**Issue**: Translations not showing
- **Check**: Each event has `title` and `description` with all 4 keys: `en`, `es`, `fr`, `pt`

---

## Future Enhancements (Not Implemented Yet)

The current system is designed to be easily upgraded to:

- Automatic event ingestion from APIs
- Supabase caching (`events_cache` table)
- Automatic translation services
- Scheduled updates via Edge Functions

**Do not implement these features yet** - the manual process is intentional for now.

---

## Contact

For questions or issues with the Events Feed, contact the development team.

---

## 📊 Quick Checklist

**Before each update:**
- [ ] Open Perplexity Pro
- [ ] Copy prompt and update dates
- [ ] Get JSON response
- [ ] Update `events-feed.ts`
- [ ] Test locally (`npm run dev`)
- [ ] Verify in 4 languages
- [ ] Build (`npm run build`)
- [ ] Commit and push
- [ ] Verify in production

**Time estimate:** 15-30 minutes total

---

**Last Updated**: December 13, 2025 | **Version**: 1.1

