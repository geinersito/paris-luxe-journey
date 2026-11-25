# Disney Transfer Growth v3.0 — ORLY FIRST
25/11/2026 · Europe/Paris · **PLAN PENDIENTE de aprobación; R0 documental.**
Plan item(s): DISNEY-PRICE-SCOPE-01; DISNEY-FAMILY-BOOKING-01; CUSTOMER-ACQUISITION-DISCOVERY-01 (consolidado).
Landing y formulario familiar son un mismo proyecto comercial. Captación propia primero; [Dispatch Live #1465](https://github.com/geinersito/paris-dispatcher/pull/1465) conservado en P3. Historial v1/v2 preservado en Git.
Autorización exclusiva: actualizar PLAN/diseño. Sin implementación, precios reales, DB, mensajes, publicidad, contactos, cuentas Telegram, compras, merge ni despliegue.

![Propuesta estática: tres categorías y cuatro etapas](../design/disney-transfer-growth-2026-11-25.svg)
Datos sintéticos; precios objetivo, sin reserva funcional. Fotos reales autorizadas pendientes; sin reseñas inventadas, estética VIP ni afiliación oficial con Disney.

## 1. Matriz candidata para aprobación — DISNEY-PRICE-SCOPE-01, P0 · Orly primero
| Categoría | Precio objetivo por vehículo/trayecto | Pasajeros incluidos niños | Condición de equipaje |
|---|---:|---|---|
| ECO | 70 EUR | 1–4 | Sin maletas grandes; compatibilidad restante por comprobar |
| VAN | 80 EUR | 4–5 | Equipaje familiar según capacidad comprobada |
| VAN XL | 100 EUR | 6–8 | Según configuración y vehículo homologado; 8 pasajeros requieren 9 plazas con conductor |
| Alcance aún sin aprobar | Orly→Disney; Disney→Orly (P0); CDG↔Disney (P1); París↔Disney (P2) | Las tres tarifas son objetivos para validar en cada sentido | Hotel/zona, horarios, espera, retrasos, sillas, carritos, equipaje especial, impuestos y suplementos pendientes |
Cuatro viajeros no implican ECO: maleta grande lo excluye; sillas/carritos pueden exigir VAN o presupuesto. No garantizar capacidad solo por plazas ni extrapolar VAN para menos de 4 sin validar su alcance. Exceso/incompatibilidad/datos críticos: revisión manual, sin precio final automático.
P0: confirmar aceptación y capacidad real de colaboradores; atención en español según cobertura, sin prometer idioma del conductor. No inferir suplementos a partir de servicios recibidos ni tratarlos como nuevas reservas.
La matriz queda preparada para decisión, no se declara definitiva mientras falten esas validaciones. Modelo económico, aceptación de colaboradores y propuestas comerciales personalizadas se entregan privadamente.

**Prioridad comercial: Orly↔Disney P0 principal; CDG↔Disney P1 secundaria; París↔Disney P2 complementaria.** Validar primero ECO 70 / VAN 80 / VAN XL 100 EUR para los dos sentidos de Orly, con capacidad, condiciones, costes y aceptación de colaboradores; aprobación de Orly no extiende tarifas automáticamente a CDG/París.
Base de decisión: observación operativa del propietario, señal Keyword Planner de la consulta «traslado orly disney» (100–1.000/mes frente a 10–100 de las dos consultas CDG/París citadas) y conectividad publicada por [Transavia](https://www.transavia.com/aeroports/fr-fr/aeroport-de-paris-orly) / [Vueling](https://www.vueling.com/fr/vols-au-depart-de-paris). Son términos distintos e intervalos, no comparación normalizada ni número de familias/clientes. Las cifras de pasajeros 2025 aportadas no se acreditaron por ruta contra Aena: no usarlas como estadística verificada.
Aplicación futura: Orly primero en contenido SEO, orden de trayectos y propuestas de colaboración; publicidad solo como prioridad futura, presupuesto actual 0 EUR. Misma landing/formulario, sin páginas nuevas por aeropuerto; origen editable, sin cambiar la elección del pasajero en silencio. CDG/París siguen disponibles para solicitud humana con precio por confirmar si falta tarifa aprobada.

## 2. Auditoría reutilizada y ampliada, sin repetir discovery
Bases sin cambios: Booking [94baae0](https://github.com/geinersito/paris-luxe-journey/commit/94baae0c228d8ad9cab40b5ab2bb9a273520a100); ERP [4c6e624](https://github.com/geinersito/paris-dispatcher/commit/4c6e6248700d40cae6a765e3e5e261bcfd52f819). Seis SSOT Booking presentes/no vacíos; SSOT PowerShell ERP exit 0. Gobernanza cross-repo revisada; auditoría por API/ZIP, no checkout ni prueba de despliegue.
Reutilizar destinos, LocationInputs/DateTimeInputs cuando su contrato encaje, controles UI, validación base y endpoint de solicitud. No reconstruir reserva general ni reactivar checkout. Landing /es/traslados-disneyland-paris y formulario universal /es/reserva-disney son rutas propuestas nuevas, conservando otras páginas/idiomas y dominio.
BookingForm usa useBookingForm→src/hooks/booking/useBookingPrice.tsx: selección sedan/van por pasajeros y fallbacks; no representa ECO/VAN/VAN XL. PassengerCount limita online a 7; useVehicleAssignment presupone VAN de 7 y carga ponderada, sin sillas/carritos. No reutilizar sus heurísticas como prueba de capacidad ni elevar el límite global a ciegas.
src/pages/booking/Pending.tsx transmite luggage genérico; no los contadores de maletas, vuelo, dirección detallada ni ficha infantil. submit-booking-request admite pasajeros/luggage/notes, sin contrato familiar; notes tiene límite 500. No empaquetar toda la ficha en texto ni añadir campos que el servidor ignore.
supabase/migrations/20260531000000_public_booking_requests.sql acredita intake pending_review, sin acceso cliente directo. No acredita family_details ni idempotencia de reintentos. Proponer extensión aditiva y pruebas antes de conectar el nuevo formulario.
[Booking→ERP](../integrations/erp.md) sigue documentado **NOT LIVE**; sin ingest ni cambios dispatch_*. Observación pública v2 se conserva con fecha: /booking solicitud humana; sitemap vista 404. No se repite prueba de producción ni se afirma estado HTTP/indexación.

## 3. DISNEY-FAMILY-BOOKING-01 — recorrido y contrato propuestos
1. **Viaje:** origen/destino exactos; fecha y hora Europe/Paris; vuelo/aterrizaje separados de recogida; vuelta con trayecto, vuelo, horario y necesidades independientes. Aterrizaje no equivale a recogida.
2. **Viajeros:** adultos y menores; edad individual, meses para bebés cuando proceda; sillas/alzadores, propios o solicitados; talla/peso solo si necesarios para dispositivo homologado compatible. Sin nombres, fecha de nacimiento ni documentos de menores.
3. **Equipaje:** grandes, cabina, mochilas, carritos plegables/no plegables y especial; dimensiones cuando sean necesarias. No asignar litros o cupos genéricos sin vehículo/configuración comprobados.
4. **Contacto y resumen:** reutilizar controles de contacto y transporte de solicitud; categoría candidata y motivos, precio objetivo o “por confirmar”. Antes de reserva: total final, inclusiones, condiciones y transportista validados por operador. “Solicitud recibida” ≠ reserva confirmada.
Modelo v1 propuesto: legs[] con horarios diferenciados; party.adults/children[] sin identidad; bags/strollers por trayecto; equipment requests; recommendation/category/reasons/review_required; tarifa versionada y ámbito, separados de confirmación. El servidor valida tamaños/tipos/coherencia y no confía en precio/categoría enviados por cliente.
Compatibilidad = pasajeros + asientos útiles con dispositivos + montaje homologado + equipaje/carritos + disponibilidad comprobada. Resultado candidato/revisión/incompatible; nunca asigna conductor. No inventar algoritmo volumétrico ni declarar asiento adecuado solo por edad.
Propuesta de persistencia: family_details JSONB opcional/versionado en public_booking_requests, manteniendo columnas legacy; request_key y digest de solicitud para idempotencia atómica. Contrato canónico y minimización aprobados antes de migración/functions; no almacenar economía interna en la solicitud pública.
Un único FamilyBookingForm reutilizado en landing y página propia /es/reserva-disney, sin cuenta de pasajero. Compartible manualmente por WhatsApp Business, redes, correo y QR; misma validación/endpoint, sin duplicar formularios por canal ni montar pricing/vehículos heredados. Extraer contacto/envío reutilizables; legacy /booking→pending permanece. Activar ambas rutas solo con contrato/almacenamiento/envío completos.
URL pública sin PII: allowlist de códigos de canal/prescriptor y campaña, no query libre ni parámetros de pasajero. Respuesta rápida WhatsApp preparada como borrador, sin configurar cuenta ni enviar. Sin WhatsApp API/Flows/SaaS nuevo ahora; coste incremental de infraestructura no contratado, capacidad de alojamiento por validar.
Datos familiares/contacto solo en memoria del formulario; no en URLs, analytics, fixtures reales, logs, sessionStorage o propuestas abiertas. Snapshot existente solo admite escalares: no ampliar su allowlist con menores. Refresh vuelve a revisión/reentrada explícita, sin fingir que conserva datos. Estado de envío seguro sin PII puede conservar referencia/nonce para evitar reenvío ciego.
Ficha futura: referencia, trayecto, aterrizaje/recogida, composición/edades necesarias, dispositivos, bultos/carritos y categoría/precio confirmados. Operador ve la solicitud; conductor autorizado recibe lo mínimo tras asignación. Primera versión: función pura/preview sintético, sin PDF/Telegram/envío a red.

## 4. Captación orgánica y validación jurídica
Presupuesto publicitario inicial **0 EUR**. Estudio v2 y export Planner reutilizados: España/Spanish/Google, nov-2025/oct-2026, 36 ideas; seis semillas muestran intervalos, sin serie mensual detallada. No convertir 50/500 del CSV en conteos exactos, sumar variantes o prever ventas/año estable.
Kit privado: diez oportunidades priorizadas con fuentes/contactos/límites, diez borradores personalizados, publicaciones, recomendación y solicitud de reseña auténtica, enlaces de atribución propuestos. Son propuestas no enviadas; no prometen descuentos, patrocinio o capacidad. Respetar reglas de comunidades y relaciones existentes; no captar cartera confiada para ejecución.
Separar servicios confiados para ejecución personal (nunca redistribuir), propios ejecutados y propios intermediados. No mezclar operador contractual, cobro, factura o procedencia. ERP comisión pagadera actual no acredita cuenta a cobrar al conductor: PLAN COMMISSION-RECEIVABLES-01 R2 separado, sin invertir signos ni duplicar ledger/facturas.
Checklist P0: clasificación/declaración centrale de réservation y renovación, RC profesional, contratos, identidad transportista, habilitaciones/seguros, cancelación, mediación, datos, facturación de gestión y régimen fiscal/social. No se ha verificado situación administrativa ni se concluye conformidad.
Fuentes revisadas: [Ministerio, centrales](https://www.ecologie.gouv.fr/politiques-publiques/taxi-vtc-vmdtr-cpa-reglementation-transports-publics-particuliers-personnes), [Service Public VTC](https://entreprendre.service-public.gouv.fr/vosdroits/F31027), [retención infantil](https://www.service-public.gouv.fr/particuliers/vosdroits/F628?lang=en), R3122-6/R412-2. La excepción taxi no se aplica por analogía al VTC; dispositivo y vehículo requieren comprobación profesional, sin inferir seguridad por edad o plazas. Fiscalidad/contratos continúan pendientes de asesor.

## 5. PLAN técnico por micro-PR, sin implementación autorizada
Cada fila incluye docs/STATUS.md + docs/plan/IMPROVEMENTS.md; quedan como máximo dos archivos de implementación, <200 líneas netas totales y una responsabilidad. R0 documental no implica lanzar ruta; dinero/precio confirmado es R2. Archivos nuevos son propuestos, no existentes.
| Orden / ID | Archivos de implementación/documentación previstos, además de dos SSOT | Riesgo / líneas totales estimadas |
|---|---|---|
| P0 DISNEY-PRICE-SCOPE-01 | Este audit: Orly→Disney y Disney→Orly primero; inclusiones/capacidades/aceptación; CDG/París después | R0, 60–100 |
| P0 LEGAL-INTERMEDIATION-SCOPE-01 | docs/audits/LEGAL_INTERMEDIATION_SCOPE.md; dictamen sensible privado | R0, 50–90 |
| P1 FAMILY-01a modelo | src/types/familyBooking.ts; contrato canónico en docs/BOOKING_MODEL.md | R1, 110–170 |
| P1 FAMILY-01b reglas | src/lib/booking/familyCompatibility.ts; familyCompatibility.test.ts junto a módulo | R1, 140–190 |
| P1 FAMILY-01c intake DB | supabase/migrations/<timestamp>_family_request_v1.sql; supabase/tests/database/family_request_v1.sql | R2 DB-only, 120–185; aditivo/RLS/idempotencia/rollback lógico |
| P1 FAMILY-01d validación API | supabase/functions/_shared/familyRequest.ts; familyRequest.test.ts | R2 functions-only, 130–190 |
| P1 FAMILY-01e recepción API | supabase/functions/submit-booking-request/index.ts; index.test.ts junto a función | R2 functions-only, 120–190; legacy, reintento y fallos |
| P1 FAMILY-01f transporte | src/lib/booking/submitRequest.ts; src/pages/booking/Pending.tsx | R1, 100–160; extracción compatible, sin activar familia |
| P1 FAMILY-01g contacto | src/components/booking/RequestContactFields.tsx; src/pages/booking/Pending.tsx | R1, 80–140; mantener required/errores legacy |
| P1 FAMILY-01h/01i viaje/viajeros | src/components/booking/family/JourneyStep.tsx o PartyStep.tsx; test específico por slice | R1, 120–185 cada una |
| P1 FAMILY-01j/01k equipaje/resumen | src/components/booking/family/BaggageStep.tsx o ReviewStep.tsx; test por slice | R1, 120–185 cada una |
| P1 FAMILY-01l estado | src/hooks/booking/useFamilyRequest.ts; useFamilyRequest.test.ts | R1, 130–185; back, reentrada, bloqueo/reintento |
| P1 FAMILY-01m composición | src/components/booking/family/FamilyBookingForm.tsx; test del flujo | R1, 140–190; cuatro etapas sin confirmación automática |
| P1 FAMILY-01p URL universal | src/pages/FamilyRequestPage.tsx; src/App.tsx | R1, 60–120; /es/reserva-disney sin login, mismo formulario |
| P1 DISNEY-LANDING-01a | src/pages/DisneyTransfers.tsx; src/App.tsx | R1, 130–185; ruta española solo tras gates y formulario listo |
| P1 DISNEY-LANDING-01b precios | src/config/disneyOffer.ts; src/pages/DisneyTransfers.tsx | R2, 80–150; SSOT versionada, sin copiar precio en tres capas |
| P1 FAMILY-01o precio/resumen | src/components/booking/family/ReviewStep.tsx; prueba de tarifa/alcance junto al componente | R2, 90–160; misma SSOT, nunca sustituir total confirmado por objetivo |
| P1 FAMILY-01n ficha | src/lib/booking/familyOperationalSummary.ts; test específico | R1, 90–150; preview sintético, sin transporte |
| P1 ORGANIC-ACQUISITION-01 / CUSTOMER-REVIEWS-01 | Kit privado y aprobación individual de material/canal; publicación separada | R0, 40–80 por resumen documental |
| P2 ACQUISITION-ATTRIBUTION-01 | src/lib/analytics.ts y adaptador de atribución; plan exacto previo | R1, 80–150; solo códigos públicos permitidos, sin PII |
| P2 DRIVER-NETWORK-01 / COMMISSION-RECEIVABLES-01 | Reutilizar colaboradores/finanzas; contrato, devengo, cobro y liquidación en PLAN R2 propio | 100–190 por slice; no ejecución actual |
| P3 DISPATCH-LIVE / TELEGRAM | #1465 conservada; diseño de transporte solo tras volumen y nueva aprobación | R1 demo / R2 operativo |
Secuencia de lanzamiento: precio/legal → contrato/DB/API → reglas y cuatro etapas → tarifa aprobada → composición/ruta → QA → aprobación final de publicación. No activar una landing con envío incompleto. Una fila que exceda el límite se divide antes de codificar, sin minificar ni omitir tests pertinentes.

## 6. Aceptación y Evidence Pack
Casos sintéticos: 4 viajeros/equipaje pequeño; 4 con 2 sillas/2 carritos; 5; 8 con nueve plazas verificadas; exceso de equipaje; silla incompatible/no disponible; ida/vuelta independiente; retraso sin cambiar recogida a ciegas. Además: datos desconocidos≠cero, edad/contador incoherente, doble clic/retry, respuesta incierta, refresh/back, fallo, legado intacto y mismo flujo por URL directa/landing, sin login ni PII en atribución.
Gates futuros: SSOT, CI, npm run lint:changed, npm run type-check, npm run test -- <módulo>, npm run build; Deno/SQL locales para funciones/DB; A/B/C/D aplicable R1/R2 con fixtures. No ejecutar pagos/ingest ni requerir datos reales. Cuatro etapas navegables con teclado, labels, errores y foco; prueba móvil/escritorio.
Evidencia de este discovery: fuentes v2 y CSV leídos; main/PR heads verificados; escaneo de formulario/hooks/pending/endpoint/migración/snapshot; SSOT; SVG/PDF revisados; diff y lectura remota al publicar. Sin test runtime, formulario enviado ni consulta financiera productiva. Documentación/observación no acredita capacidad real ni versión desplegada.
**Operations & Revenue Radar:** menos transcripción y error de vehículo; conversión: tres precios y necesidades claras; ticket: ida/vuelta compatible, sin descuento inventado; confianza: total/transportista confirmados; SEO: landing española y guías; cashflow: gestión cobrable P2; dato faltante: aceptación/capacidad/precio por ruta; riesgo: prometer silla, suplemento o disponibilidad; micro-PR: DISNEY-PRICE-SCOPE-01, R0 ahora, automatización después.
**Next Best Slice: DISNEY-PRICE-SCOPE-01 — R0 documental.** Technical verdict HOLD para implementar; product verdict mejora de conversión por validar. Cerrar primero la matriz de Orly en ambos sentidos y condiciones con propietario/colaboradores, junto a validación jurídica, antes de iniciar la landing. Sin ampliar productos, canales técnicos o alcance de producción.
