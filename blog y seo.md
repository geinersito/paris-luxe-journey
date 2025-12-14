

---

# INSTRUCCIONES PARA AUGMENT CODE

## FASE 0 — Events Feed Multiidioma sin APIs (operación manual asistida)

## 0) Objetivo

Implementar un **Events Feed multiidioma (EN/ES/FR/PT)** que se actualiza **manualmente 1 vez por semana** (o 2 veces/mes mínimo) mediante un archivo de datos generado por el usuario con ayuda de Perplexity Pro.

Este feed debe:

* Verse “premium” y consistente con el sitio.
* Ser robusto (si faltan datos, no se rompe).
* No crear páginas indexables por evento.
* Poder migrar fácilmente a ingestión automática más adelante.

---

## 1) Modelo de datos (archivo de entrada)

### 1.1 Crear un archivo fuente único

Crear un archivo en el repo, por ejemplo:

* `src/data/events/events-feed.json` (o `.ts` si prefieren tipado fuerte)

Debe contener:

* `generatedAt` (ISO timestamp)
* `timezone` (`Europe/Paris`)
* Dos listas:

  * `thisWeek`: máximo 8 eventos
  * `thisMonth`: máximo 12 eventos

### 1.2 Estructura de cada evento

Cada evento debe incluir:

* `id` (string estable; recomendado: slug simple o hash manual)
* `startAt` (ISO)
* `endAt` (ISO opcional)
* `title`: objeto con `en/es/fr/pt` (obligatorio)
* `description`: objeto con `en/es/fr/pt` (obligatorio; corto)
* `venueName`: objeto con `en/es/fr/pt` (opcional; si es nombre propio, repetir igual)
* `district` (string opcional: “8ème”, “1er”, “La Défense”, etc.)
* `address` (string opcional)
* `eventUrl` (string obligatorio; enlace oficial o fuente confiable)
* `imageUrl` (opcional; si no hay, usar placeholder del sitio)
* `category` (opcional: “opera”, “exhibition”, “fashion”, “festival”, etc.)
* `isFeatured` (boolean)
* `sourceName` (string: “Ville de Paris”, “OpenAgenda”, “Opera de Paris”, etc.)

Reglas:

* Debe haber al menos **4 eventos** siempre en `thisWeek` y **6** en `thisMonth`.
* Si no hay imagen, el UI debe usar imagen por defecto.
* Si faltan campos opcionales, el UI no debe mostrar placeholders vacíos.

---

## 2) Componente UI: `EventsFeed`

### 2.1 Crear componente reutilizable

Crear componente `EventsFeed` con:

* `range`: `week | month`
* `variant`: `compact | full`

Comportamiento:

* Obtiene el idioma desde tu sistema i18n.
* Renderiza títulos y descripciones en el idioma actual.
* Formatea fecha/hora según idioma.
* Incluye CTA principal por evento: “Book a ride” (traducido por i18n).
* Incluye link secundario: “Official details” (traducido).
* Si `generatedAt` > 14 días, mostrar un aviso discreto: “Content updated on [date]”.

### 2.2 Dónde se muestra

* Insertar `EventsFeed`:

  * En **BlogIndex** (bloque “This month in Paris”)
  * En los **hubs mensuales** (cerca del inicio: “What’s happening now”)
* NO crear ruta nueva indexable.

---

## 3) i18n (labels UI)

Añadir keys i18n (EN/ES/FR/PT) para:

* “This week”, “This month”
* “Book a ride”
* “Official details”
* “Updated on”
* “Featured”
* “No events available right now” (fallback)

---

## 4) Performance y SEO

* El feed debe cargar sin bloquear el render.
* No usar Helmet/SEO específicos del feed (no es una página).
* No crear enlaces internos a URLs inexistentes.
* Abrir `eventUrl` en nueva pestaña con atributos seguros.

---

## 5) Proceso de actualización (operación semanal)

* Documentar un procedimiento claro en `CONTENT_OPS.md`:

  1. Ejecutar prompt en Perplexity Pro para obtener eventos.
  2. Copiar el JSON final.
  3. Pegar reemplazando `events-feed.json`.
  4. Verificar que el build compila y que el feed renderiza.
  5. Deploy.

---

## 6) Fase 1 futura (no implementar ahora)

Dejar “hooks” documentados para migrar luego a:

* `events_cache` en Supabase
* ingestión automática
* traducción automática
  Pero **no crear tablas ni Edge Functions** ahora (sin API keys y sin scheduler).

---

# PROMPT PARA PERPLEXITY PRO (para generar el JSON multiidioma)

Copia y pega tal cual. Ajusta solo la semana/mes.

**Prompt:**

> Actúa como editor de contenido premium para un servicio VTC boutique en París. Necesito un “Events Feed” para mi web con eventos culturales relevantes en París (Ópera, exposiciones de arte, desfiles/Moda, conciertos, festivales) con enfoque práctico para turistas.
>
> Tarea: devuelve SOLO un JSON válido (sin explicación, sin markdown) con esta estructura exacta:
>
> * generatedAt (ISO)
> * timezone: "Europe/Paris"
> * thisWeek: array máximo 8
> * thisMonth: array máximo 12
>
> Reglas de selección:
>
> * Solo eventos en París o Île-de-France con fechas verificables.
> * Prioriza eventos con venue conocido y enlace oficial.
> * Mezcla: 2–3 exposiciones, 1–2 ópera/ballet, 1 moda/cultura, 1 festival o evento grande, 1 “family-friendly” si aplica.
> * Si un evento no tiene descripción oficial clara, no lo incluyas.
>
> Para cada evento incluye:
>
> * id (slug corto, único, en minúsculas con guiones)
> * startAt (ISO con hora si está disponible)
> * endAt (ISO opcional)
> * title: { en, es, fr, pt } (traducción natural, tono premium, sin jerga)
> * description: { en, es, fr, pt } (1–2 frases, útil y práctica, sin exagerar)
> * venueName: { en, es, fr, pt } (si es nombre propio, repetir igual)
> * district (si se conoce; si no, omitir)
> * address (si se conoce; si no, omitir)
> * eventUrl (obligatorio; preferir web oficial)
> * imageUrl (si existe en fuente oficial; si no, omitir)
> * category (exhibition|opera|fashion|festival|concert|museum|family)
> * isFeatured (true para 3 eventos máximo)
> * sourceName (ej. "Ville de Paris", "OpenAgenda", "Opera de Paris", "Grand Palais")
>
> Importante:
>
> * Las traducciones ES/PT deben sonar naturales (no literales).
> * No inventes datos: si falta hora exacta, usa solo fecha (00:00) y explica en descripción “times vary / see official site” en los 4 idiomas.
> * Devuelve eventos para: [INDICAR SEMANA ACTUAL] y [INDICAR MES ACTUAL].
> * Devuelve SOLO el JSON.

---

## Recomendación operativa (con tus 10h/mes)

* Semana 1 de cada mes: generas `thisMonth` (12 eventos).
* Cada semana: actualizas `thisWeek` (8 eventos).
* Revisión rápida: solo comprobar enlaces y fechas de los 3 “featured”.

