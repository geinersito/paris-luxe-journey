# PLAN VIVO DE MEJORAS UI/UX (CTO + Agente)

Documento vivo para planificar mejoras del producto mientras se revisan páginas reales en entorno.

## 1) Modo de trabajo

- CTO (tú): aporta observaciones de negocio, conversión y prioridad.
- Agente (yo): valida coherencia técnica con código actual, guardrails y riesgos.
- Regla de ejecución: cambios en micro-PRs mergeables, con scope único.

## 2) Guardrails activos para este plan

- Micro-PR: `<200` net lines, `<=4 files`, single concern.
- No mezclar scopes en el mismo PR: `UI-only` / `DB-only` / `functions-only` / `docs-only`.
- SSOT Booking/CTO: respetar `docs/SUPERVISOR.md`.
- Guardrail compacto: cualquier opción del `CompactBookingForm` debe existir en `locations` con el mismo `code` (si no existe, o se elimina del mini-form o el PR incluye cambio SSOT).
- Hard-lane (no negociable): secrets hygiene, timezone SSOT, idempotencia webhooks, anti double-booking.

### 2.1) Ancla SSOT y trazabilidad de PRs (obligatorio)

- SSOT del backlog ejecutable: `docs/plan/IMPROVEMENTS.md`.
- Este documento queda como narrativa y contexto de producto.
- Estado operativo corto: `docs/STATUS.md`.
- Todo PR debe declarar `Plan item(s): <ID...>` en el PR body.
- Todo PR debe actualizar:
  - `docs/plan/IMPROVEMENTS.md` (`Estado` del ID + referencia PR/commit),
  - `docs/STATUS.md` (HEAD de `main`, item en curso, siguientes 3).

### 2.2) Risk classes y gates (obligatorio)

- `R0 - UI-only`: CI + smoke basico.
- `R1 - Flow`: CI + smoke manual A/B/C/D.
- `R2 - Money/Checkout`: todo `R1` + idempotencia + limpieza.

Para `R1` y `R2` el PR debe evidenciar:

- `A)` Happy path completo.
- `B)` Refresh en `/booking/details`.
- `C)` TTL expirado/corrupto redirige sin loop.
- `D)` Back/Cancel sin corrupcion de estado.
- Security: no datos sensibles en persistencia.
- Precedencia SSOT: `location.state` > session snapshot > redirect.

## 3) Baseline actual (primera revisión: Home)

### Diagnóstico compartido

- El Home comunica una percepción "premium/exclusiva" (dorado + serif + hero Eiffel).
- Para objetivo de volumen estilo Uber/Bolt, hoy puede generar fricción de entrada.
- Landing extensa: demasiadas secciones para adquisición rápida.
- Hero/form no prioriza suficientemente "acción inmediata + claridad de precio".

### Ajustes CTO validados

- Se valida mover la dirección visual hacia "corporativo/accesible/volumen".
- Se valida priorizar formulario grande en hero (mobile-first).
- Se valida mostrar estimación claramente etiquetada (sin duplicar lógica de pricing fuera de SSOT).
- Se pospone autocomplete tipo Places para fase separada (implica keys/compliance/functions).

## 4) Backlog de micro-PRs (ejecutable)

Estado inicial: `PENDIENTE`.

| ID | Scope | Objetivo | Acceptance (DoD) | Files likely | Risk | Owner | Estado | Replaced by |
|---|---|---|---|---|---|---|---|---|
| PR-U1 | docs-only | Foundation visual monolítico original | Reemplazado por PR-U1-1/2/3 | `docs/PLAN_VIVO_MEJORAS_UI.md` | Low | CTO+Agente | DEPRECADO | PR-U1-1, PR-U1-2, PR-U1-3 |
| PR-U1-1 | UI-only | Foundation: tipografía base y jerarquía de headings | Tipografía consistente en Home + Booking sin regresión visual crítica | `tailwind.config.ts`, `src/index.css`, `src/components/*` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1-2 | UI-only | Foundation: botones/inputs (touch 48px) | Controles primarios >=48px en páginas críticas | `src/components/ui/*`, `src/pages/booking/*` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1-3 | UI-only | Foundation: contraste AA mínimo | Texto/UI críticos pasan contraste AA en hero/forms/nav | `src/index.css`, `src/components/*` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1a | docs-only | Hourly mismatch original | Fusionado en PR-U1g | `docs/PLAN_VIVO_MEJORAS_UI.md` | Low | CTO+Agente | DEPRECADO | PR-U1g |
| PR-U1b | FE-only (routing+UI) | Evitar páginas vacías de Airports top-nav | Ningún link Airports muestra placeholder vacío | `src/pages/airports/*`, `src/components/Navbar.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1c | docs-only | Política de sincronización SSOT top-nav | Cualquier cambio en `Navbar.tsx` (links) o `App.tsx` (routes) DEBE actualizar tabla SSOT en el mismo PR | `docs/PLAN_VIVO_MEJORAS_UI.md` | drift (alto si no enforceado) | Agente | PENDIENTE | - |
| PR-Doc0 | docs-only | Trackear `docs/PLAN_VIVO_MEJORAS_UI.md` en git | `git status` sin `?? docs/PLAN_VIVO_MEJORAS_UI.md` | `docs/PLAN_VIVO_MEJORAS_UI.md` | Low | Agente | PENDIENTE | - |
| PR-Doc1 | docs-only | Anclar gobernanza Plan Vivo + STATUS | Regla de trazabilidad en `SUPERVISOR.md` + `docs/STATUS.md` + `docs/plan/IMPROVEMENTS.md` | `docs/SUPERVISOR.md`, `docs/PLAN_VIVO_MEJORAS_UI.md`, `docs/STATUS.md`, `docs/plan/IMPROVEMENTS.md` | Low | CTO+Agente | DONE | #35 |
| PR-U1d | UI-only | Optimizar `/excursions` (quote-first) | CTA visible + estructura curada sin deriva a flujo incorrecto | `src/pages/Excursions.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1e | UI-only | Reencuadrar `/events` para conversión a ride | CTA contextual y no ticketing ambiguo | `src/pages/Events.tsx`, `src/components/events/EventsFeed.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1f | FE-only (routing+UI) | Top-nav coherence + dead-page protection | 100% links top-nav con destino útil o redirect explícito | `src/components/Navbar.tsx`, `src/App.tsx`, `src/pages/*` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1g | FE-only (routing+UI) | Separar intención Hourly de `/booking` | `Hourly` no termina en wizard airport transfer | `src/components/Navbar.tsx`, `src/App.tsx`, `src/pages/*hourly*` | Low | CTO+Agente | PENDIENTE | - |
| PR-U1h | UI-only | Excursions curation pass | Menor scroll tax + CTA consistente por tarjeta | `src/pages/Excursions.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1i | UI-only | Events CTA contextual con prefill si aplica | CTA de evento no salta vacío a booking genérico | `src/pages/Events.tsx`, `src/components/events/EventsFeed.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U1j | FE-only (routing+UI) | IA About/Contact/Fleet: anchors vs páginas | Navegación predecible sin saltos ambiguos | `src/components/Navbar.tsx`, `src/App.tsx`, `src/pages/Home.tsx` | Low | CTO+Agente | PENDIENTE | - |
| PR-U1k | UI-only | Language dropdown nítido sin blur/ghosting | Pass/fail de claridad y contraste en matriz de header | `src/components/LanguageSelector.tsx`, `src/components/ui/select.tsx`, `src/components/Navbar.tsx` | Low | CTO+Agente | PENDIENTE | - |
| PR-U1l | UI-only | Navbar estable al cambiar idioma | Cero overlap brand/links en 1366/1440/1920 | `src/components/Navbar.tsx` | Low | CTO+Agente | PENDIENTE | - |
| PR-U2 | UI-only | Hero Uber-like + formulario grande | Mensaje/acción principal clara en <5s | `src/pages/Home.tsx`, `src/components/*hero*` | Med | CTO+Agente | PENDIENTE | - |
| PR-U3 | UI-only | Simplificar IA landing a 4-5 secciones | Menor scroll y foco claro en CTA | `src/pages/Home.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U4 | UI-only | Trust layer y CTA de apoyo | Trust cerca del CTA sin saturar viewport | `src/pages/Home.tsx`, `src/components/*` | Low | CTO+Agente | PENDIENTE | - |
| PR-U5 | UI-only | Booster móvil (sticky CTA) | CTA always-visible en móvil sin tap conflicts | `src/pages/Home.tsx`, `src/components/*` | Med | CTO+Agente | PENDIENTE | - |
| PR-U2c | UI-only | Time picker compacto OneWay/RoundTrip | Selección de hora en <=3 interacciones medias | `src/components/booking/DateTimeInputs.tsx` | Low | CTO+Agente | PENDIENTE | - |
| PR-U3a | UI-only | Rediseñar `/booking/details` | Summary/CTA claros + validación UX mínima | `src/pages/booking/Details.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U3b | UI-only | Optimizar `/booking/payment` | Idioma consistente + CTA/T&C inequívocos | `src/pages/booking/Payment.tsx` | Med | CTO+Agente | PENDIENTE | - |
| PR-U3c | UI-only | Robustecer `/booking/confirmation` | Hora Paris explícita + refresh safe | `src/pages/booking/Confirmation.tsx`, `src/lib/datetime.ts` | Med | CTO+Agente | PENDIENTE | - |

### 4.1) Flow IDs (risk-gated)

| ID | Scope | Risk | DoD (gates) | PR | Estado |
|---|---|---|---|---|---|
| FLOW-DETAILS-SS-01 | Details refresh-safe via `sessionStorage` + TTL 30m | R1 | CI verde + smoke A/B/C/D + no sensitive data + precedence `state > session > redirect` | #34 | DONE |

## 5) Follow-ups fuera de scope inmediato

- U6 (`functions + secrets`): autocomplete direcciones con manejo seguro de claves.
- U7 (`pricing SSOT`): estimación del hero conectada a fuente única v312 (UI consumidora).
- DB-only: garantía anti double-booking a nivel base de datos + runbook de prueba.

### Reglas de modelo de producto (enforcement):

**Excursions (quote-first)**:
- Enforcement: CTAs primarios en `/excursions` NO navegan a `/booking` (airport wizard).
- DEBEN ir a quote/contact/WhatsApp con contexto del paquete.
- Válido hasta existir pricing SSOT dedicado.

**Events (content marketing → ride quote contextual)**:
- Enforcement: CTAs en `/events` deben pasar contexto (venue/date) o usar "ride quote" flow.
- NUNCA parecer ticketing ni saltar vacío a booking genérico.

## 5.1) Gates temporales (mientras PR-0 no esté mergeado)

### Gate mínimo obligatorio (todos los PRs):
```bash
npm run type-check
npx eslint <archivos_cambiados>
```
- Lista explícita de paths en PR body.
- Smoke test manual de la página impactada.

### Gate objetivo (post PR-0):
```bash
npm run lint:changed
```

### Política de bloqueo:
- No bloquear P0 UI por deuda histórica de `lint:changed` en Windows.
- Usar gate mínimo hasta corregir script en PR-0.

## 6) Registro de revisiones por página

Usar este bloque para cada página nueva revisada:

```md
### Página: <ruta/nombre>
Fecha: YYYY-MM-DD

- Observación CTO:
- Verificación técnica del agente:
- Riesgos/incoherencias detectadas:
- Decisión:
- PR propuesto (si aplica):
  - Scope:
  - Files estimados:
  - Gate esperado:
```

## 7) Próximos insumos solicitados (para cerrar diseño)

- Captura del formulario extenso (campos exactos).
- Captura de Confirmation (para validar timezone display).
- Capturas de Rutas Populares y Vehículos (origen estático vs DB).

## 8) Registro actual de revisión

### Página: Home (wizard/modal "Book Your Journey")
Fecha: 2026-02-07

- Observación CTO:
  - El modal se percibe antiguo (espacio en blanco, scroll interno, jerarquía débil, CTA al final).
  - Las ubicaciones visibles no convencen y hay precios errados por combinación.
- Verificación técnica del agente:
  - La lista de ubicaciones no está centralizada:
    - fallback hardcoded repetido 3 veces en `src/components/BookingForm.tsx`.
    - fallback hardcoded adicional en `src/components/booking/CompactBookingForm.tsx`.
    - también intenta leer desde tabla `locations` en Supabase.
  - El `Estimated Price` que muestra el modal se renderiza en `src/components/BookingForm.tsx`.
  - El cálculo viene de `src/hooks/booking/useBookingPrice.tsx`, con fallback legacy y precio por defecto (80/100) para rutas no mapeadas.
  - El catálogo actual en `src/config/pricing.ts` y `src/config/pricing-v312.ts` no cubre todas las combinaciones estación↔aeropuerto/POI observadas.
- Riesgos/incoherencias detectadas:
  - "Pricing drift": la UI puede mostrar estimaciones plausibles pero incorrectas cuando la ruta no existe en catálogo.
  - Mantenimiento caro por duplicación de locations en múltiples componentes.
- Decisión:
  - Separar líneas de trabajo:
    - UX/conversión (UI-only)
    - Correctitud pricing/location SSOT (DB/functions en PRs separados).
- PR propuesto (inmediato):
  - `PR-U6A` (UI-only, single concern): centralizar fallback de ubicaciones en una sola fuente de datos para evitar duplicación.
  - Files estimados (<=4):
    - `src/config/booking-locations.ts` (nuevo)
    - `src/components/BookingForm.tsx`
    - `src/components/booking/CompactBookingForm.tsx`
  - Gate esperado:
    - `npm run type-check` OK
    - `lint` en archivos cambiados OK (nota: script `lint:changed` actual falla en Windows por `xargs`).

### Página: Home modal (Date/Time controls)
Fecha: 2026-02-07

- Observación CTO:
  - Date picker correcto.
  - Time picker actual con lista larga + scroll interno (fricción), peor en móvil.
  - En round trip se duplica el mismo patrón de fricción.
- Verificación técnica del agente:
  - Implementación actual en `src/components/booking/DateTimeInputs.tsx`.
  - El control de hora usa `Popover` + lista generada (`generateTimeOptions`) con `max-h` y `overflow-y-auto`:
    - pickup time: `src/components/booking/DateTimeInputs.tsx:120`
    - return time: `src/components/booking/DateTimeInputs.tsx:200`
  - Step actual: 30 minutos (`'00'` y `'30'`) en `src/components/booking/DateTimeInputs.tsx:57`.
  - El estado que consume el flow sigue siendo string (`time`/`returnTime`) formato `HH:mm`.
- Riesgos/incoherencias detectadas:
  - Fricción de selección (especialmente en pantallas pequeñas).
  - Mayor riesgo de error en round trip por duplicación del control largo.
- Decisión:
  - Tratar como micro-PR `UI-only` sin tocar pricing/DB/functions.
  - Mantener contrato de estado y formato (`HH:mm`) para cero impacto funcional.
- PR propuesto (cuando CTO lo autorice):
  - `PR-U2c` (UI-only): time picker compacto para `pickup_time` y `return_time`.
  - Opción prioritaria: `input type="time"` (sin librerías nuevas), con step configurable.
  - Files estimados (2-3):
    - `src/components/booking/DateTimeInputs.tsx`
    - opcional `src/components/booking/TimePicker.tsx` (nuevo) solo si mejora claridad sin exceder scope
  - Non-goals:
    - no cambios de pricing
    - no cambios de DB/functions
    - no cambio de formato final de hora
  - Validaciones UX previstas:
    - return datetime no anterior a pickup datetime (guard UI suave)
    - defaults inteligentes solo si no alteran contratos actuales
  - Gate esperado:
    - `npm run type-check` OK
    - lint en archivos cambiados OK

### Página: Booking Flow Step 1 (`/booking/details`)
Fecha: 2026-02-07

- Observación CTO:
  - Layout con baja densidad visual y apariencia de plantilla antigua.
  - Price Summary demasiado discreto para anclar decisión.
  - Campos correctos pero faltan trust cues y mejoras de validación UX.
  - Footer global + botón flotante compiten con el CTA principal.
  - Stepper existe, pero guía débil.
- Verificación técnica del agente:
  - Ruta exacta confirmada en router:
    - `src/App.tsx:184` (`path: "booking"`)
    - `src/App.tsx:195` (`path: "details"`)
    - `src/App.tsx:199` (`<BookingDetails />`)
  - Componente de página:
    - `src/pages/booking/Details.tsx`
  - La página ya valida formulario básico y navega a pago; el plan es mejorar presentación/UX sin tocar lógica de negocio.
- Riesgos/incoherencias detectadas:
  - Conversión: CTA no domina el viewport crítico.
  - Mobile: summary y CTA no están anclados como capa de decisión.
  - UX: riesgo de abandono por densidad baja y señales de confianza poco visibles.
- Decisión:
  - Tratar como micro-PR `UI-only`, sin tocar pricing engine, Stripe, DB ni functions.
  - Mantener contrato actual de datos/navegación y centrar cambios en layout/jerarquía.
- PR-U3a (SPEC FINAL - micro-PR ejecutable, pendiente de autorización de runtime):
  - Summary:
    - Optimizar Step 1 `Passenger Details` para conversión y claridad.
    - Reforzar jerarquía visual con `Price Summary` visible/sticky, CTA más fuerte y validación UX mínima.
    - Sin tocar pricing, Stripe, DB ni funciones.
  - Scope / single concern:
    - Solo `/booking/details` (`src/pages/booking/Details.tsx`) como objetivo principal.
    - Extracción opcional de 1 componente (`PriceSummaryCard`) solo si reduce complejidad.
  - Files touched (target):
    - `src/pages/booking/Details.tsx`
    - opcional `src/components/booking/PriceSummaryCard.tsx` (nuevo)
  - Router context (SSOT):
    - `src/App.tsx:184` base `booking`
    - `src/App.tsx:195` `details`
    - `src/App.tsx:199` render `<BookingDetails />`
  - Diseño UX aceptado:
    - Desktop en 2 columnas (Form | Summary).
    - Mobile en 1 columna + sticky bottom bar (Total + Continue).
    - `Price Summary` con total grande, badge `Fixed price`, ruta, fecha/hora, trip type, pasajeros y luggage cuando aplique.
    - Copy de transición: `Next step: secure payment (Stripe)`.
    - Form UX: `autoComplete` correcto (`name`, `email`, `tel`), `inputMode="tel"` y `type="tel"`.
    - CTA con estado disabled hasta required fields válidos y loading state al continuar.
  - Resiliencia (anti-crash):
    - Si no hay contexto de viaje al entrar directo a `/booking/details`, comportamiento conservador: mensaje + `Back to booking` o redirect controlado.
    - Decisión de datos para summary: usar exactamente la fuente actual del flow; si faltan datos, no inventar ni reconstruir estado, aplicar back/redirect conservador.
  - Non-goals:
    - no cambios en `useBookingPrice`, `pricing.ts`, `pricing-v312.ts`, `routeMapping`, Stripe, Edge Functions, DB o migraciones.
    - no rediseño global de header/footer.
  - Gates para PR body:
    - `npm run type-check` ✅
    - Gate temporal: `npx eslint <archivos_cambiados>` ✅ mientras PR-0 siga pendiente.
    - Gate objetivo: `npm run lint:changed` ✅ tras PR-0.
  - Manual test (runbook del PR):
    - Home -> modal -> `See your fixed price` -> `/booking/details` con summary consistente.
    - Refresh directo en `/booking/details`: no crash (mensaje + back o redirect).
    - Mobile viewport: total + CTA accesibles y visibles.
    - No continuar sin Name/Email/Phone válidos.
  - Estado:
    - `PENDIENTE` (listo en plan; ejecución sujeta a PR-0 de gates en Windows).

### Página: Booking Flow Step 2 (`/booking/payment`)
Fecha: 2026-02-07

- Observación CTO:
  - Inconsistencia de idioma en el mismo viewport (EN/ES mezclado).
  - Resumen correcto pero jerarquía débil; panel derecho con bajo valor percibido y CTA poco dominante.
  - Checkbox de T&C correcto, pero debe quedar explícito en UX/compliance que bloquea continuar.
- Verificación técnica del agente:
  - Ruta y componente confirmados (SSOT):
    - `src/App.tsx:184` (`path: "booking"`)
    - `src/App.tsx:205` (`path: "payment"`)
    - `src/App.tsx:209` (`<BookingPayment />`)
    - `src/pages/booking/Payment.tsx`
  - Step 2 forma parte del flow Details -> Payment -> Confirmation.
  - El pago aquí usa Stripe Payment Element embebido (no redirección pura):
    - `src/components/booking/StripePaymentForm.tsx:44` (`<Elements ...>`)
    - `src/components/booking/StripePaymentFormContent.tsx` (render de `PaymentElement`).
  - `Elements` no define `locale` explícito; hoy solo configura `appearance`/`loader`.
  - T&C actual:
    - Fase previa (`TermsAndPayment`) deshabilita CTA con `!acceptedTerms`.
    - `handleSubmit` en Payment corta si `!acceptedTerms` antes de inicializar pago.
- Riesgos/incoherencias detectadas:
  - Conversión: CTA pierde prioridad en una pantalla de decisión.
  - Consistencia de producto: mezcla de idiomas (EN + ES + FR) reduce confianza.
  - Compliance UX: el bloqueo T&C existe, pero visualmente puede quedar poco evidente cuando aparece el Element.
- Decisión:
  - Tratar como micro-PR `UI-only` independiente (`PR-U3b`), sin tocar Stripe/webhooks/pricing/DB.
- PR-U3b (SPEC FINAL - micro-PR ejecutable, pendiente de autorización de runtime):
  - Summary:
    - Optimizar Step 2 `Payment` para claridad y conversión.
    - Unificar idioma, reforzar jerarquía del resumen y CTA, y definir comportamiento UX del checkbox T&C.
    - Sin cambios a Stripe, webhooks, pricing ni datos.
  - Scope / single concern:
    - UI-only en página Payment (ideal 1 archivo).
  - Files touched (target):
    - `src/pages/booking/Payment.tsx`
    - opcional (si compensa): `src/components/booking/PaymentSummaryCard.tsx` (nuevo)
  - UX changes documentados:
    - Language consistency por i18n activo (sin mezclar ES/EN/FR en mismo viewport).
    - Alinear locale del Stripe Element al idioma activo de la app (UI config, sin tocar secretos/webhooks).
    - Layout de conversión: 2 columnas (resumen | acción), CTA `Continue to secure payment` prominente.
    - T&C checkbox: mantener bloqueo inequívoco de acción y señal de compliance visible.
    - Trust cues cerca del CTA o compactados para no competir con el flujo principal.
    - Mitigar crecimiento vertical del Element para que la acción principal no quede fuera de foco (especialmente móvil).
  - Non-goals:
    - no cambios en session creation, redirect o lógica Stripe.
    - no cambios en pricing/payloads/DB/functions.
  - Risks / follow-ups:
    - Si hay strings hardcoded, posible mini-follow-up foundation i18n.
    - Bloqueo T&C se marca como `P0 UI` si hoy no está inequívocamente enforced en UX.
    - Prefill de email/teléfono: mantener SSOT desde el flow y, ante contexto ausente, aplicar redirect/back conservador.
  - Gates:
    - `npm run type-check` ✅
    - Gate temporal: `npx eslint <archivos_cambiados>` ✅ mientras PR-0 siga pendiente.
    - Gate objetivo: `npm run lint:changed` ✅ tras PR-0.
  - Manual test:
    - Details -> Payment mantiene coherencia de resumen (origen/destino/fecha/hora/pax/total).
    - Sin T&C aceptado no permite continuar.
    - Idioma consistente en toda la página.
  - Estado:
    - `PENDIENTE` (spec listo; sujeto a estado de gates).

### Página: Booking Flow Step 3 (`/booking/confirmation`)
Fecha: 2026-02-07

- Observación CTO:
  - La estructura de success page ya existe y es útil (booking details + policy + next steps + CTAs).
  - P0: timezone no explícito Paris en fecha/hora mostrada.
  - Legibilidad de ruta mejorable (códigos puros).
  - P0: comportamiento safe ante refresh/back y entrada directa.
- Verificación técnica del agente:
  - Ruta y componente confirmados (SSOT):
    - `src/App.tsx:184` (`path: "booking"`)
    - `src/App.tsx:215` (`path: "confirmation"`)
    - `src/App.tsx:219` (`<BookingConfirmation />`)
    - `src/pages/booking/Confirmation.tsx`
  - Timezone actual:
    - `src/pages/booking/Confirmation.tsx:101` usa `toLocaleString('en-US', ...)` sin `timeZone` explícito.
  - Guardas de contexto:
    - redirect a `/booking` si falta `location.state.bookingData` o si booking no está `confirmed`.
    - puntos: `src/pages/booking/Confirmation.tsx:30`, `src/pages/booking/Confirmation.tsx:37`.
  - Route display actual:
    - muestra `pickup/dropoff` como códigos/ids según disponibilidad (`BVA -> GDN`).
  - Add to Calendar:
    - existe CTA `handleAddToCalendar`, actualmente sin generación ICS real.
- Riesgos/incoherencias detectadas:
  - Incumplimiento de hard-lane timezone si no se fuerza Europe/Paris en display.
  - UX de ruta poco legible para usuario final (códigos internos).
  - Riesgo de experiencia inconsistente en refresh/entrada directa si no se estandariza fallback.
- Decisión:
  - Tratar como micro-PR `UI-only` (`PR-U3c`) sin tocar webhooks/pricing/DB.
- PR-U3c (SPEC FINAL - micro-PR ejecutable, pendiente de autorización de runtime):
  - Summary:
    - Robustecer confirmation para consistencia y confianza.
    - Aplicar formatter SSOT de fecha/hora en Europe/Paris, mejorar legibilidad de ruta y asegurar comportamiento safe con contexto ausente.
    - Mantener estructura de éxito y mejorar valor de CTA secundarias.
  - Scope / single concern:
    - UI-only en confirmation step.
  - Files touched (target 1-2):
    - `src/pages/booking/Confirmation.tsx`
    - opcional `src/lib/datetime.ts` (nuevo helper compartido `formatParisDateTime`) si no existe equivalente.
  - Must-haves:
    - Timezone SSOT: render con `Europe/Paris` explícito.
    - Safe reload/missing context: fallback visible + CTA a Home/Booking (o redirect conservador).
    - Route display legible: nombre + código cuando haya mapping; fallback seguro si solo hay code.
    - `Add to Calendar`: si se implementa acción real, generar `.ics` en timezone Paris (UI-only local).
  - Non-goals:
    - no cambios de webhooks/idempotencia server-side.
    - no cambios de pricing engine ni DB.
  - Gates:
    - `npm run type-check` ✅
    - Gate temporal: `npx eslint <archivos_cambiados>` ✅ mientras PR-0 siga pendiente.
    - Gate objetivo: `npm run lint:changed` ✅ tras PR-0.
  - Manual test:
    - Payment -> Confirmation: datos correctos en pantalla.
    - Refresh en `/booking/confirmation`: sin crash, fallback/redirect consistente.
    - Fecha/hora mostrada en Paris (no dependiente del timezone local del dispositivo).
  - Estado:
    - `PENDIENTE` (spec listo; ejecución sujeta a estado de gates).

### Página: Top Nav IA (Services/Airports) + Placeholder pages
Fecha: 2026-02-07

- Observación CTO:
  - Hay dos problemas distintos:
    - IA/navegación con mismatch de intención (`Hourly Service` llevando a booking estándar).
    - páginas placeholder vacías en top-nav (impacto de confianza/SEO).
- Verificación técnica del agente:
  - En nav de Services:
    - `Airport Transfers` -> `/airports/cdg` (`src/components/Navbar.tsx:116`).
    - `Hourly Service` (chauffeur) -> `/booking` (`src/components/Navbar.tsx:117`).
  - En router existen:
    - `/airports/cdg` (`src/App.tsx:128`)
    - `/airports/orly` (`src/App.tsx:136`)
    - `/airports/beauvais` (`src/App.tsx:144`)
    - `/booking` (`src/App.tsx:184`)
  - Estado de CDG:
    - `src/pages/airports/CDG.tsx` es placeholder puro (`return <div>CDG Airport Page</div>;`).
  - Búsqueda de página hourly dedicada:
    - no se detecta page específica "hourly" en `src/pages` (sin implementación visible).
- Riesgos/incoherencias detectadas:
  - Mismatch de intención de usuario (hourly vs airport transfer).
  - Rebote por páginas vacías desde menú principal.
  - Degradación de coherencia SEO/credibilidad por rutas de primer nivel sin contenido.
- Decisión:
  - Separar backlog de navegación/pages del backlog wizard funnel.
  - Tratar como línea FE/UI independiente (`PR-U1g/U1b/U1c`), sin mezclar con Stripe/pricing.
- PR-U1a (DEPRECADO):
  - Reemplazado por `PR-U1g` para evitar duplicación de alcance.
- PR-U1g (SPEC FINAL - FE-only routing+UI):
  - Objetivo:
    - `Hourly Service` deja de apuntar a `/booking` airport flow.
  - Opciones conservadoras:
    - ruta temporal `/services/hourly` con landing breve + CTA quote.
    - redirect temporal coherente a `/contact` con intención "hourly".
  - Scope:
    - routing frontend (`Navbar` + rutas) y capa UI mínima de destino.
  - Non-goals:
    - no DB, no Stripe, no pricing.
  - Manual test:
    - click en `Hourly Service` desde header -> destino coherente con servicio por horas.
- PR-U1b (SPEC FINAL - FE-only routing+UI):
  - Objetivo:
    - evitar que `/airports/cdg` (y equivalentes top-nav) rendericen blank/placeholder.
  - Regla:
    - si página no implementada, usar template mínimo consistente o redirect temporal a landing de airport transfers.
  - Scope:
    - páginas airports top-nav.
  - Manual test:
    - abrir `/airports/cdg` y links de Airports -> siempre contenido real y CTA.
- PR-U1c (SPEC FINAL - docs-only):
  - Objetivo:
    - mantener la tabla SSOT de rutas top-nav en formato estable y sincronizada con código:
      - nav item
      - path
      - componente
      - estado (`OK`, `placeholder`, `broken`, `redirect`).
  - Scope:
    - solo documentación.
  - Resultado:
    - reduce riesgo de nuevas incoherencias al evolucionar IA/routing.
- Prioridad recomendada (impacto):
  - 1) `PR-U1b`
  - 2) `PR-U1g`
  - 3) `PR-U1c`
  - ejecutable en paralelo al backlog wizard sin tocar garantías de booking.

### Página: `/excursions` (catálogo day trips)
Fecha: 2026-02-07

- Observación CTO:
  - No está vacía (hay contenido real), pero se percibe inacabada por densidad y mezcla de patrones.
  - Alto `scroll tax` por cards largas y bloques repetidos.
  - Conversión difusa: falta rail persistente de CTA y path principal inequívoco.
  - Mismatch conceptual con booking airport flow si la intención es day trip/quote.
- Verificación técnica del agente:
  - SSOT de ruta/componente:
    - `src/App.tsx:62` (`path: "excursions"`)
    - `src/App.tsx:65` (`<Excursions />`)
    - `src/pages/Excursions.tsx`
  - La página sí tiene contenido estructurado (hero, how it works, catálogo, FAQ, CTAs).
  - Tiene i18n embebido por idiomas (EN/FR/ES/PT).
  - Hallazgo clave de conversión:
    - CTA de booking en excursiones navega a `/booking` (`src/pages/Excursions.tsx:1166`) -> posible mismatch de intención.
  - También hay CTA WhatsApp por paquete y para custom quote.
- Riesgos/incoherencias detectadas:
  - Ambigüedad de producto: day trip quote-first mezclado con booking flow de airport transfer.
  - Fatiga de lectura por cards extensas antes de la acción principal.
  - En mobile, riesgo de perder CTA en scroll largo.
- Decisión:
  - Tratar como micro-PR UI-only independiente del wizard (`PR-U1d`), sin tocar pricing/Stripe/DB.
- PR-U1d (SPEC FINAL - micro-PR ejecutable, pendiente de autorización de runtime):
  - Summary:
    - Transformar `/excursions` en landing catálogo orientada a conversión (quote-first).
    - Reducir fricción de lectura y reforzar CTA persistente.
    - Mantener contenido real existente, optimizando estructura y jerarquía.
  - Scope / single concern:
    - UI-only sobre `src/pages/Excursions.tsx` (ideal 1 archivo).
  - UX changes documentados:
    - Hero simplificado con 2 CTAs:
      - `Get a Day Trip Quote`
      - `Browse Packages`
    - Cards compactas:
      - título + duración + `from €X`
      - 3 bullets máximo
      - CTA primario `Request this trip`
      - CTA secundario `View details` (expandir o detalle, según capacidad actual)
    - Sticky CTA mobile:
      - `Request a quote` + WhatsApp accesible durante scroll.
    - FAQ recortado a 3-5 preguntas + enlace a FAQ general.
  - Non-goals:
    - no integración con `/booking` flow actual.
    - no Stripe checkout para excursions.
    - no DB/migrations.
    - no refactor foundation i18n salvo ajustes mínimos de consistencia.
  - Risks / follow-ups:
    - Si no se define modelo comercial de excursions (quote vs booking), puede quedar UI atractiva pero ambigua.
    - Follow-up recomendado en docs: `Excursions model = quote-first + confirmación manual`.
  - Manual test:
    - Desktop/mobile: CTA siempre visible y comprensible.
    - `Request this trip` incluye nombre del paquete en WhatsApp/contact.
    - No deriva por defecto al flow airport booking salvo decisión explícita de producto.
  - Estado:
    - `PENDIENTE` (spec listo; decisión de primer corte entre sticky CTA mobile vs refactor de cards según próxima captura móvil).

### Página: `/events` (content marketing + conversión a ride)
Fecha: 2026-02-07

- Observación CTO:
  - La página tiene contenido real, pero semántica ambigua de producto (parece venta de evento, no de transporte).
  - Jerarquía visual floja para conversión: mucho aire + cards pequeñas + CTA principal tardío.
  - Solicitud explícita: medir cuánto aportan `blog` y `events` al SEO.
- Verificación técnica del agente:
  - SSOT de ruta/componente:
    - `src/App.tsx:70` (`path: "events"`)
    - `src/App.tsx:73` (`<Events />`)
    - `src/pages/Events.tsx`
  - Dataset y render:
    - `src/components/events/EventsFeed.tsx:8` importa `src/data/events/events-feed.json`.
    - Card CTA `Book a Ride` apunta directo a `/booking`: `src/components/events/EventsFeed.tsx:163`.
    - Hero CTA y CTA final también apuntan a `/booking`: `src/pages/Events.tsx:50` y `src/pages/Events.tsx:111`.
    - `Official Details` usa `event.eventUrl` externo: `src/components/events/EventsFeed.tsx:171`.
  - Frescura de contenido:
    - Feed con `generatedAt: "2025-01-13T10:00:00Z"` (`src/data/events/events-feed.json:2`), más de un año desactualizado respecto a esta revisión (2026-02-07).
  - SEO técnico actual en Events:
    - Tiene `title`, `description`, `keywords` (`src/pages/Events.tsx:15-23`).
    - No hay `canonical`, no hay Open Graph/Twitter, no hay JSON-LD de eventos en esta página.
- Riesgos/incoherencias detectadas:
  - Conversión: `Book a Ride` sin prefill de venue/fecha/hora crea salto genérico a `/booking`.
  - SEO/frescura: feed viejo reduce credibilidad y señal de actualidad.
  - Semántica: riesgo de expectativa incorrecta (ticketing vs transfer).
- Decisión:
  - Definir micro-PR dedicado `PR-U1e` (UI-only) y dejar SEO de Events/Blog con backlog separado y medible.
- PR-U1e (SPEC FINAL - micro-PR ejecutable, pendiente de autorización de runtime):
  - Summary:
    - Reencuadrar `/events` a "conversion-first" para rides, no ticketing.
    - Hacer explícito el siguiente paso y reducir clicks vacíos.
  - Scope / single concern:
    - UI-only sobre `src/pages/Events.tsx` y `src/components/events/EventsFeed.tsx` (target <=2 files).
  - Cambios UX definidos:
    - Hero con copy orientado a transfer (`Get a transfer quote`).
    - CTA de card: `Get ride quote` con prefill hacia `/booking` (`dropoff`, `date`, `time` cuando estén disponibles).
    - Mantener `Official Details` outbound, pero como acción secundaria.
    - Priorizar rail de conversión (especialmente en móvil).
  - Non-goals:
    - no scraping, no DB, no tickets, no Stripe.
  - Manual test:
    - Click CTA en card lleva a booking con parámetros de contexto (no salto genérico).
    - Copy deja claro que vendemos transporte al evento.
  - Estado:
    - `PENDIENTE`.

### Página: Home anchors (`About` + `Contact` + `Fleet`)
Fecha: 2026-02-07

- Observación CTO:
  - Visualmente correcto, pero hay duda de IA: si `About/Contact/Fleet` deben ser anchors de Home o páginas dedicadas.
- Verificación técnica del agente:
  - Navbar usa hashes:
    - `#fleet` (`src/components/Navbar.tsx:133`)
    - `#about` (`src/components/Navbar.tsx:134`)
    - `#contact` (`src/components/Navbar.tsx:135`)
  - Secciones reales existen en Home:
    - `id="fleet"` (`src/components/sections/FleetSection.tsx:99`)
    - `id="about"` (`src/components/sections/AboutSection.tsx:15`)
    - `id="contact"` (`src/components/sections/ContactSection.tsx:76`)
  - Navegación cross-page:
    - desde rutas no-home, navbar hace `navigate('/' + href)` para hashes (ej. `/#about`) en `src/components/Navbar.tsx:45`.
  - Router actual no tiene páginas dedicadas `/fleet`, `/about`, `/contact` (`src/App.tsx`).
- Riesgos/incoherencias detectadas:
  - Ambigüedad IA (anchor vs página) y potencial inconsistencia de scroll offset/estado al llegar desde otra ruta.
- Decisión:
  - Mantenerlo como decisión de arquitectura UI en `PR-U1j` (sin tocar backend).

### Página: Header global (selector idioma + navbar traducido)
Fecha: 2026-02-07

- Observación CTO:
  - Al abrir selector de idioma se percibe blur en el dropdown.
  - Tras cambiar idioma (ej. FR/ES), el navbar puede desalinearse y pisar el brand.
- Verificación técnica del agente:
  - Navbar es `fixed` y siempre activo en layout global (`src/components/Navbar.tsx:140`).
  - Header usa `backdrop-blur-xl/md` en ambos estados (`src/components/Navbar.tsx:144-145`).
  - Selector idioma vive en `src/components/LanguageSelector.tsx` y usa `SelectContent`.
  - `SelectContent` renderiza en `Portal` con `z-[10000]` (`src/components/ui/select.tsx`), pero igual hay riesgo visual por composición/backdrop del header.
  - Implicación SSOT:
    - al estar en `Portal`, el blur percibido apunta más a mezcla visual (alpha/transparencia/stacking context) que a herencia directa del DOM del navbar.
- Riesgos/incoherencias detectadas:
  - Bug visual en UI primaria global (afecta todas las páginas).
  - Riesgo de accesibilidad/claridad al leer opciones de idioma.
  - Riesgo de rotura de header al expandir labels traducidos.
- Decisión:
  - Separar en 2 micro-PRs: `PR-U1k` (claridad dropdown) + `PR-U1l` (layout translation-safe).

### Mapa SSOT de rutas top-nav (estado actual)
Fecha: 2026-02-07

| Nav Item | URL actual | Componente/target | Estado | Acción recomendada |
|---|---|---|---|---|
| Home | `/` | `src/pages/Home.tsx` | OK | Mantener |
| Services > Airport Transfers | `/airports/cdg` | `src/pages/airports/CDG.tsx` | Placeholder | `PR-U1f`/`PR-U1b`: proteger dead-page (template mínimo o redirect) |
| Services > Hourly Service | `/booking` | `src/pages/booking/index.tsx` | Mismatch intención | `PR-U1g` (separar ruta hourly) |
| Airports > CDG Airport | `/airports/cdg` | `src/pages/airports/CDG.tsx` | Placeholder | `PR-U1f`/`PR-U1b` |
| Airports > Orly Airport | `/airports/orly` | `src/pages/airports/Orly.tsx` | Implementada | Revisar coherencia visual/funnel |
| Airports > Beauvais Airport | `/airports/beauvais` | `src/pages/airports/Beauvais.tsx` | Implementada | Revisar coherencia visual/funnel |
| Excursions | `/excursions` | `src/pages/Excursions.tsx` | OK con deuda UX | `PR-U1h` |
| Events | `/events` | `src/pages/Events.tsx` | OK con deuda semántica/SEO | `PR-U1i` + `PR-SEO1` |
| Blog | `/blog` | `src/pages/blog/BlogIndex.tsx` | OK con deuda SEO/content | `PR-SEO1` + `PR-SEO2` |
| Fleet | `#fleet` / `/#fleet` | sección Home `id="fleet"` | Anchor-only | `PR-U1j` (decidir anchor vs página) |
| About | `#about` / `/#about` | sección Home `id="about"` | Anchor-only | `PR-U1j` |
| Contact | `#contact` / `/#contact` | sección Home `id="contact"` | Anchor-only | `PR-U1j` |

### Nuevos micro-PRs (spec resumido para ejecución futura)
Fecha: 2026-02-07

- `PR-U1f` — Top-nav coherence & dead-page protection (P0)
  - Objetivo: ningún link primario debe caer en placeholder.
  - Scope UI-only: Navbar + rutas de destino mínimas.
  - Criterio de aceptación: 100% links top-nav -> contenido útil o redirect explícito.
  - Non-goals: pricing/DB/Stripe/functions.

- `PR-U1g` — Hourly route separation (P0)
  - Objetivo: `Hourly Service` deja de apuntar a `/booking`.
  - Scope UI-only: destino `/hourly` o `/services/hourly` (o redirect temporal coherente con CTA contacto).
  - Criterio de aceptación: usuario hourly no entra al wizard de airport transfer.
  - Non-goals: motor hourly pricing.

- `PR-U1h` — Excursions curation + structure (P1)
  - Objetivo: reducir "scroll tax" y parálisis por elección.
  - Scope UI-only: Top packages + categorías colapsables + CTA consistente (`fixed price` solo si existe SSOT; si no, `request quote`).
  - Criterio de aceptación: jerarquía clara y CTA visible en móvil.
  - Non-goals: contenido masivo nuevo / SEO avanzado.

- `PR-U1i` — Events CTA contextual (P1)
  - Objetivo: alinear intención "evento" con traslado contextual.
  - Scope UI-only: copy + CTA de card/hero/final; prefill de booking si mecanismo disponible.
  - Criterio de aceptación: CTA no es salto genérico vacío a `/booking`.
  - Non-goals: scraping pipeline o backend de eventos.

- `PR-U1j` — About/Contact/Fleet IA decision (P2)
  - Objetivo: cerrar decisión SSOT `anchors` vs `pages`.
  - Scope UI-only: targets de navbar + comportamiento de scroll/hash consistente desde rutas no-home.
  - Criterio de aceptación: navegación predecible y sin saltos ambiguos.
  - Non-goals: reescritura de contenido editorial.

- `PR-Doc0` — Track `PLAN_VIVO` en git (docs-only)
  - Objetivo: eliminar deuda operativa de archivo no versionado (`??`).
  - Scope docs-only:
    - agregar `docs/PLAN_VIVO_MEJORAS_UI.md` al repositorio y mantenerlo dentro del circuito de PRs.
  - Criterio de aceptación:
    - `git status` deja de mostrar `?? docs/PLAN_VIVO_MEJORAS_UI.md`.
  - Non-goals:
    - sin cambios de runtime.

- `PR-U1k` — Language dropdown clarity (P0 UX visual)
  - Objetivo: eliminar efecto "flou/borroso" del selector de idioma al desplegar.
  - Where (SSOT):
    - `src/components/Navbar.tsx` (header fijo con backdrop blur en estado normal/scrolled).
    - `src/components/LanguageSelector.tsx` (trigger + content del selector).
    - `src/components/ui/select.tsx` (portal/layer de `SelectContent`).
  - Hipótesis técnica (prioridad):
    - #1 transparencia del dropdown + blur detrás (mezcla visual por alpha/backdrop).
    - #2 stacking context/overlay compitiendo con el portal.
    - #3 estilos del propio dropdown (fondo translúcido o blur local).
  - Scope UI-only:
    - asegurar fondo opaco y capa nítida del dropdown.
    - aislar composición visual para que el blur del header no degrade labels.
    - mantener stacking claro por encima del navbar.
  - Estrategias válidas (no excluyentes):
    - A) `SelectContent` con `bg` opaco y sin blur local.
    - B) reforzar layer/z-index del portal frente a overlays/hero.
    - C) limitar blur al contenedor del navbar y no a una capa más amplia.
  - Criterio de aceptación (pass/fail):
    - PASS: texto nítido a zoom `100%` y `125%` en `/` y `/events`.
    - PASS: el dropdown no se tiñe por el fondo del hero (imagen/video).
    - PASS: abrir/cerrar dropdown no genera reflow del navbar.
    - FAIL: blur perceptible, contraste pobre o ghosting en labels.
  - Non-goals:
    - no cambios de lógica i18n ni rutas.

- `PR-U1l` — Navbar translation-safe layout (P0 UX estructural)
  - Objetivo: evitar superposición entre brand y links al cambiar idioma (ES/FR/PT).
  - Where (SSOT):
    - `src/components/Navbar.tsx` (layout flex del brand, links y selector idioma).
  - Scope UI-only:
    - constraints de layout (`flex-shrink`, `min-w-0`, gaps/breakpoints) para mantener header estable.
    - definir comportamiento cuando no cabe (ajuste de spacing o colapso controlado).
  - Estrategias válidas (documentadas):
    - A) `brand: shrink-0`, `nav: min-w-0`, `links: flex-wrap` con gap controlado.
    - B) colapso a menú móvil en breakpoint más alto para locales largos.
    - C) ajuste de spacing/padding condicionado por locale cuando sea necesario.
  - Criterio de aceptación (pass/fail):
    - PASS: en `1366/1440/1920`, ES/FR/PT nunca pisan el brand.
    - PASS: selector de idioma mantiene ancho estable y no empuja links fuera de grilla.
    - PASS: no hay saltos de línea no intencionales en navbar desktop.
    - FAIL: cualquier superposición o truncado sin intención explícita.
  - Non-goals:
    - no rediseño completo del navbar.

### Corte SEO: Blog + Events (estado técnico actual)
Fecha: 2026-02-07

- Lo que sí ayuda hoy:
  - Blog post pages tienen base SEO robusta:
    - canonical: `src/pages/blog/BlogPost.tsx:158`
    - OG/Twitter: `src/pages/blog/BlogPost.tsx:139-155`
    - JSON-LD Article + Breadcrumb: `src/pages/blog/BlogPost.tsx:130-131`
  - Categorías blog tienen canonical + OG:
    - `src/pages/blog/BlogCategory.tsx:56-62`
  - Blog tiene arquitectura index/categoría/post en router (`src/App.tsx:78-108`), útil para profundidad de indexación.
- Lo que limita fuerte el impacto SEO hoy:
  - `Events` y `BlogIndex` no tienen canonical, OG/Twitter ni JSON-LD dedicados (solo Helmet básico en title/description/keywords).
  - Contenido incompleto en blog:
    - `10` slugs declarados en metadata (`src/data/blog/posts.meta.ts`).
    - `8` slugs con placeholders en los artículos (`32` archivos con marcador `[Article content ... To be completed]`), riesgo de thin content.
  - Sitemaps/robots no están materializados en `public`:
    - existe script `scripts/generate-sitemap.ts`, pero no está conectado al `build` de `package.json`.
    - además, el generador asume rutas con prefijo idioma (`/${lang}/blog/...`) que no coinciden con el router actual sin prefijo.
  - Feed de events no fresco (enero 2025), reduciendo potencial SEO de intención "qué hacer ahora".
- Evaluación práctica (sin métricas de Search Console todavía):
  - Blog: **potencial alto**, rendimiento actual **medio-bajo** por cantidad de contenido placeholder.
  - Events: **potencial medio**, rendimiento actual **bajo** por frescura y SEO técnico incompleto.
- Backlog SEO propuesto (separado de UI funnel):
  - `PR-SEO1` (UI-only): metadatos completos + canonical + OG/Twitter + JSON-LD en `Events` y `BlogIndex`.
  - `PR-SEO2` (content-only): ocultar/noindex temporal para slugs placeholder o completar contenido antes de indexar.
  - `PR-SEO3` (docs/build-only): automatizar generación `sitemap.xml`/`robots.txt` en build y alinear rutas reales del router.

## 9) Orden De Ejecucion Recomendado

- `P0 - Gates / proceso`:
  - `PR-0`: corregir `lint:changed` en Windows (mientras tanto aplicar gates temporales de `5.1`).
  - `PR-Doc0`: trackear `docs/PLAN_VIVO_MEJORAS_UI.md` en git.
- `P0 - Coherencia navegación (impacto inmediato)`:
  - `PR-U1f`: proteger top-nav contra páginas vacías/placeholder.
  - `PR-U1g`: separar `Hourly Service` del wizard `/booking`.
- `P0 - Header crítico (global)`:
  - `PR-U1k`: language dropdown nítido (sin blur/ghosting).
  - `PR-U1l`: navbar estable en traducciones largas (sin overlap).
- `P0 - Correctitud visible`:
  - `PR-U3c`: timezone SSOT en confirmation (`Europe/Paris` explícito + helper de formateo).
- `P1 - UX fricción alta (wizard/modal)`:
  - `PR-U2c`: reemplazar dropdown largo de hora por control compacto (`input type="time"`), One Way + Round Trip.
- `P1 - Calidad percibida de landings de adquisición`:
  - `PR-U1h`: excursiones (curación + estructura + CTA coherente).
  - `PR-U1i`: events (CTA contextual + prefill).
- `P1 - Mantenibilidad UI (locations)`:
  - `PR-U6A`: centralizar fallback de locations en config única.
  - `PR-U6B`: ajustar catálogo de 9 locations en esa fuente única.
- `P2 - Conversión funnel pages`:
  - `PR-U3a`: `/booking/details` (layout + summary + validación UX).
  - `PR-U3b`: `/booking/payment` (idioma, framing, T&C UX, locale del Payment Element).
- `P2 - IA Home sections`:
  - `PR-U1j`: decisión definitiva `hash anchors` vs `páginas dedicadas` para Fleet/About/Contact.

## 10) Checklist Transversal (Capturas)

Cada pantalla nueva se valida contra estos 5 checks:

1. Idioma consistente (sitio + Stripe Element).
2. Timezone Paris en todo display de fecha/hora.
3. CTA visible y accionable en mobile (sticky si aplica).
4. Refresh/back safe sin duplicación de estado.
5. Sin secretos ni pricing logic hardcoded en UI (solo consumo).

### 10.1) Test matrix header (para PR-U1k/U1l)

- Contexto técnico:
  - Navbar actual es `fixed/sticky` global (`src/components/Navbar.tsx`) y aplica `backdrop-blur` en ambos estados.
  - El selector de idioma usa `Select` (Radix) con `SelectContent` en `Portal` (`src/components/ui/select.tsx`).
- Páginas críticas a probar:
  - `/` (Home)
  - `/events`
  - `/booking/payment`
  - `/airports/orly`
- Viewports mínimos:
  - Desktop: `1366x768`, `1440x900`, `1920x1080`
  - Tablet: `1024x768`
  - Móvil: `390x844`
- Casos:
  - Abrir/cerrar selector idioma en cada página.
  - Repetir test de claridad en zoom `100%` y `125%`.
  - Cambiar `EN -> FR -> ES -> PT` y verificar que brand/links no se pisan.
  - Abrir dropdown de `Services` y `Airports` después de cambiar idioma.
  - Scroll down/up con navbar sticky visible/oculto y reabrir selector.
  - Confirmar pass/fail:
    - `U1k`: cero blur/ghosting y dropdown sin tinte de fondo.
    - `U1l`: cero overlap/truncado no intencional en navbar.

## 11) Nota Operativa

- Hasta instrucción explícita del CTO: solo se actualiza documentación/plan.
- Implementación de código pausada.
