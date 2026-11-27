# Disney Transfer Growth v4.1 — Zero Friction (propuesta para aprobación)

27/11/2026 · Europe/Paris · Plan item(s): DISNEY-WHATSAPP-FIRST-PLAN-01 · R0 documental · [borrador #263](https://github.com/geinersito/paris-luxe-journey/pull/263).
Solo actualización del PLAN: ningún GO de implementación, merge, publicación, precios o comunicaciones. Sustituye el mecanismo de copia/enlace limpio de v4 y el orden de ejecución v3.1; conserva decisiones e historial y el contrato F1 integrado en main `d9619dde` / #261.

## Decisión y camino mínimo

Landing española → formulario universal de cuatro etapas → revisión → botón «Enviar solicitud por WhatsApp» → mensaje preparado → envío del cliente → confirmación humana. Objetivo: primeras 10 reservas propias; captación orgánica, publicidad 0 EUR.
Conservar eliteparistransfer.com, marca, colores, tipografías, servicios e idiomas actuales. ORLY FIRST · WHATSAPP FIRST · CONVERSION FIRST · LESS IS MORE. Sin API de WhatsApp, cuentas de pasajeros, pagos online, VPS o costes de integración recurrentes nuevos; sin prometer que la operativa carezca de costes.
F1 DONE/R1 se conserva sin cambios. F2 (compatibilidad automática), F3 (almacenamiento), F4 completo y F5 (recepción/avisos backend) se aplazan; F6–F11 no se autorizan. F4 se limita en este recorrido a controles esenciales y revisión humana; no se implementa ahora.
Booking→ERP sigue NOT LIVE; ERP #1465 P3. No Supabase/Stripe, endpoints, integración Telegram, asignaciones ni intermediación. Latins se ejecuta personalmente y nunca se redistribuye ni se usa para captar su cartera.

## WhatsApp: un botón, mensaje preparado y envío del cliente

- Contacto profesional público ya verificado en web/código: +33 6 68 25 11 02 (`WHATSAPP_NUMBER`); no se ha enviado un mensaje de prueba ni acreditado disponibilidad operativa.
- Único CTA de salida: **Enviar solicitud por WhatsApp**. Tras validar/revisar, el gesto construye `https://wa.me/33668251102?text=...` con una única codificación correcta del mensaje y abre WhatsApp directamente, sin espera asíncrona, clipboard, copiado/pegado ni segundo botón previo.
- WhatsApp presenta el texto editable; el cliente pulsa Enviar allí. La web no envía mensajes por sí sola, no obtiene su cuenta/teléfono y no verifica entrega. El operador responde al chat emisor; no se asume que ese número sea el contacto del viajero durante el traslado.
- No pedir nombre, teléfono ni email en este formulario. Pantalla 4: revisión y envío, sin datos de contacto redundantes; la información adicional imprescindible podrá aclararse en el chat, sin inferir identidad por el perfil.
- Microcopy: «Se abrirá WhatsApp con los datos de tu traslado. Revisa el mensaje y pulsa Enviar. Te confirmaremos disponibilidad y precio». Abrir/cancelar/volver/perder foco no acredita solicitud enviada, recibida ni reserva confirmada. Sin prometer entrega instantánea: depende de conexión, cuenta y WhatsApp.
- Si WhatsApp no abre o pide instalación/inicio de sesión: instrucciones y reintento del mismo botón, conservando borrador mientras siga en memoria; no éxito ficticio, truncado silencioso ni fallback obligatorio de copiar/pegar. Probar Web/app por plataforma; sin garantía de recuperación tras recarga, cierre o descarte móvil.

## Privacidad del prellenado — cambio explícito frente a v4

`?text` transporta el contenido en la URL de WhatsApp: codificar NO es cifrar ni anonimizar. Quitar contacto reduce datos, pero fecha, vuelo, hotel y composición familiar pueden seguir siendo personales. El texto llega al servicio de enlace al abrirlo, antes de que el cliente confirme el envío al operador; pueden existir historial/logs externos que el sitio no controla. No prometer ausencia de datos personales en toda URL.
Allowlist propuesta: ruta y hotel/punto necesario, fecha, recogida/vuelo separados, adultos/menores y edades necesarias para dispositivos, sillas, cantidades de equipaje/carritos y campos pendientes por tramo. Excluir nombre/teléfono/email, nombres o nacimiento de menores, peso/altura, documentos, pagos, claves, comisiones, IDs internos y texto libre no necesario; aclarar necesidades adicionales por chat.
Construir la URL solo en el gesto explícito, sin guardarla/renderizarla previamente, precargarla, acortarla ni enviarla a nuestro backend. No PII en URL de nuestra web, hash, logs, analytics, replay, fixtures, history.state o storage. Excluir también la URL saliente completa y el texto de captura/click tracking; `noreferrer` cuando aplique reduce referencia, no oculta `?text` al destinatario.
La excepción propuesta solo alcanza los datos operativos mínimos en `text` hacia WhatsApp; no el contrato F1 completo. Revisar aviso de privacidad, minimización/canal y aceptación expresa de este alcance antes del GO de implementación/publicación; este PLAN no declara cumplimiento validado. Si no se acepta el transporte en URL, no prometer simultáneamente ficha completa prellenada, cero backend/API y cero copia manual.

## Diseño móvil y formulario reutilizable (sin maqueta publicada)

| Pantalla | Contenido / comportamiento propuesto |
|---|---|
| Landing ES | H1 «Traslados privados Orly–Disneyland Paris»; ECO 70 / VAN 80 / VAN XL 100 EUR como objetivos pendientes de aprobación, por vehículo/trayecto. CDG/París consultar. CTA «Consultar disponibilidad» hacia el mismo formulario; fotos reales autorizadas, sin estética VIP ni reseñas inventadas. |
| Móvil 360/390 px | Una columna, tarjetas apiladas, progreso 1/4, etiquetas visibles, errores junto al campo, controles táctiles y CTA fuera del teclado; escritorio con resumen legible. Conservar identidad actual; sin introducir eventos/excursiones en esta landing. |
| 1. Tu viaje | Origen/destino, fecha, recogida solicitada; vuelo y horario de llegada/salida separados. Ida/vuelta con datos independientes, sin copiar automáticamente pasajeros/equipaje ni confundir aterrizaje con recogida. |
| 2. Quiénes viajan | Adultos, menores, edad necesaria y dispositivo/proveedor infantil; no pedir nombre, nacimiento, peso/altura o documentos de menores para este prellenado. Necesidades adicionales se aclaran por chat. |
| 3. Equipaje | Cantidades independientes: grande, cabina, mochilas, carritos plegables/no plegables y especiales por tramo. Desconocido distinto de cero; sin prometer capacidad por número de pasajeros. |
| 4. Revisión y envío | Resumen editable, campos pendientes, condiciones y aviso de privacidad. Sin nombre/teléfono/email. Un botón «Enviar solicitud por WhatsApp» prepara el mensaje; el cliente revisa y pulsa Enviar en WhatsApp. |

URL candidata corta `/es/reserva-disney`, compartible desde WhatsApp, redes, correo o QR y reutilizada desde la landing. Landing candidata `/es/traslados-disneyland-paris`; revisar resolución de rutas existente antes de montar. Sin login ni nuevo formulario por canal.
Validación esencial: trayecto y datos operativos mínimos necesarios, formato de fechas/horas, conteos enteros no negativos y total 1–8 por tramo; desconocidos críticos visibles como «por confirmar». No impedir una consulta por vuelo o dispositivo aún desconocido; impedir confirmación automática siempre. Sin motor de selección ECO/VAN, precio calculado ni capacidad ficticia.
Mantener horas civiles Europe/Paris sin conversión silenciosa; horas inexistentes/ambiguas se rechazan o revisan manualmente. Sin persistencia UTC ahora; requisito de F4 completo conservado para futura automatización.
Ficha: tramos y sentido, fechas/recogida/vuelos diferenciados, adultos/menores/edades/dispositivos, equipaje/carritos y campos pendientes; sin contacto ni texto libre innecesario; «CONSULTA — DISPONIBILIDAD Y PRECIO POR CONFIRMAR». `requestKey` no equivale a reserva, autorización ni idempotencia. No comisiones, conductor asignado o datos financieros internos.

## Reutilización, privacidad y exposición P0

Reutilizar estructura de tramos F1, componentes visuales y constante del número; estado controlado en memoria. El draft WhatsApp es una proyección solo de tramos: no instanciar FamilyBookingContractV1, que exige contacto, ni inventar nombre/teléfono/email/requestKey para satisfacerlo. El formatter aplica allowlist, no serializa el contrato íntegro; contrato F1 y backend futuros se conservan sin cambios. No conectar este flujo a BookingContext, bookingSession, RequireBookingData, Payment, Confirmation, Pending, useBookingPrice ni `submit-booking-request` (legacy requiere email y backend).
Evaluación limitada al repositorio y al smoke aislado ya documentado públicamente en #262: persisten pendientes de limpieza y revisión de logs. No se ha verificado la exposición del código efectivamente desplegado ni realizado solicitudes reales; el PLAN no declara el flujo legacy inactivo o corregido.
[#262](https://github.com/geinersito/paris-luxe-journey/issues/262) sigue P0/TODO: evaluar acceso efectivo y logs, corregir en alcance autorizado independiente antes de reactivación legacy. La dispensa de limpieza fue SOLO F1 declarativo; FAIL sigue FAIL y no cubre nuevo runtime/publicación. Sin corrección en esta PR documental.
Antes de montar, aislar la ruta sensible desde bootstrap y revisar analytics/eventos/form tracking globales; omitir eventos locales no basta para garantizar aislamiento. Ninguna PII debe salir hacia analytics, replay o logs, ni URLs salvo el prellenado mínimo a WhatsApp expresamente descrito arriba; atribución solo con códigos de canal no personales permitidos y consentimiento aplicable. No reutilizar hooks legacy que creen snapshots.
Publicación HOLD hasta aprobar tarifas por ruta/sentido, equipaje/capacidad real, sillas, horarios, espera, suplementos, cancelaciones, medios de pago confirmados, CGV y privacidad (WhatsApp y exposición de `text` incluidos). Ejecución propia e intermediación conservan gates jurídicos distintos; este lanzamiento no activa intermediación. Sin datos económicos internos en GitHub público.

## Micro-PRs mínimas futuras — todas pendientes de GO específico

Estimaciones netas; cada PR ≤4 archivos y <200 líneas, incluyendo STATUS + IMPROVEMENTS. Nuevos módulos propuestos aún inexistentes; mantener sin montar hasta gate final. Si una estimación no cabe con claridad, reducir/dividir antes de ejecutar; no omitir controles por tamaño.

| Slice / riesgo | Archivos de producto previstos (más los 2 SSOT) | Neto estimado / criterio principal |
|---|---|---|
| WA1 — ficha/controles esenciales, R1 | `src/lib/booking/familyWhatsApp.ts` + `.test.ts` | 130–185; proyección sin contacto, allowlist por tramo, encoding único y límites, null ≠ 0; sin precio/compatibilidad/confirmación. |
| WA2 — viaje/familia, R1 | `src/components/booking/FamilyTripFields.tsx`, `FamilyPartyFields.tsx` | 130–190; campos controlados sin storage, vuelos separados y vuelta independiente, sin montar. |
| WA3 — equipaje, R1 | `src/components/booking/FamilyBaggageFields.tsx` | 90–150; piezas/carritos/especiales mínimos sin campos de contacto, sin montar. |
| WA4 — cuatro etapas/revisión/envío, R1 | `src/components/booking/FamilyWhatsAppForm.tsx` + `.test.tsx` | 140–190; navegación accesible, un CTA con prellenado sin clipboard, reintento y ningún «enviado/recibido», sin montar. |
| WA5 — landing ES, R1 | `src/pages/DisneyTransfer.tsx` | 100–175; reutiliza marca/formulario, copy y tarifas solo aprobadas; sin ruta activa. |
| WA6 — aislamiento analytics, R1 | `index.html`, `src/lib/analytics.ts` | 100–180; excluir formulario y URL/texto salientes de captura automática; comprobar bootstrap/eventos globales, conservar resto del sitio. |
| WA7 — montaje revisable, R1 | `src/App.tsx`, `src/pages/DisneyTransfer.tsx` | 70–170; URL propia y enlace de landing tras flujo completo, sin backend; separar autorización de merge de autorización de despliegue/publicación. |

Next Best Slice propuesto: WA1, tras aprobación del PLAN y controles aplicables; NO ejecutarlo ahora. Alcance P0 #262 en paralelo para decisión independiente. No restaurar F2 como prerequisito comercial.
Cada R1: type-check, lint:changed, tests significativos, build, CI y smoke A/B/C/D seguro conforme a SUPERVISOR; la dispensa F1 no se hereda. Pruebas limitadas a datos sintéticos, sin cobros/efectos operativos; impedimentos o nuevo FAIL requieren resolución/decisión específica, nunca PASS inventado.

## Aceptación y Evidence Pack de la fase futura (NO ejecutados en esta revisión)

| Entorno | Evidencia requerida antes de publicación |
|---|---|
| Android Chrome + WhatsApp | Instalado/no instalado, enlace con mensaje completo, revisión/envío manual dentro de WhatsApp, cancelar/reintentar y retorno de app; sin clipboard ni campos de contacto. |
| iPhone Safari + WhatsApp | Un CTA abre mensaje preparado mediante gesto síncrono; teclado, atrás/retorno, login/no app y descarte de pestaña; sin popup tras promesa ni copia/pegado. |
| Escritorio Chrome/Safari/Edge | WhatsApp Web con/sin sesión y app cuando exista; cuenta emisora elegida por el cliente, mensaje correcto, cancelar/reintentar; no inferir envío por abrir login o volver. |
| Casos familiares | 4 pax/equipaje pequeño; 4 pax/2 sillas/2 carritos; 5 y 8 pax; exceso de equipaje; silla desconocida/incompatible; ida/vuelta diferentes; vuelo retrasado o desconocido; total inválido y horas DST. Siempre consulta/revisión, nunca capacidad o confirmación automática. |
| Privacidad y estados | Canarios solo en `text` hacia WhatsApp tras gesto; ausentes de URL propia/hash, analytics/dataLayer/GA, logs, storage e history.state; ningún tercero adicional ni intake legacy/Supabase/Stripe. Historial del destino no se garantiza limpio. Abrir/cancelar/no enviar jamás muestra recibida. |

Tests del formatter: Unicode/acentos, saltos, &, +, #, %, emoji, ida/vuelta y ficha máxima de 8 pax; sin doble encoding, inyección o truncado. No inventar un máximo universal de URL: verificar extremos reales; si un destino no acepta la ficha, informar y revisar alcance antes de publicar.
No declarar PASS móvil por emulación: registrar dispositivo/OS/navegador, HEAD, pasos y resultado real; si no hay dispositivo disponible, pendiente explícito. Envíos E2E solo a contacto de prueba autorizado por GO separado; no mensajes reales ahora.
Evidence Pack: diff ≤4/<200, SSOT/IDs y F1 íntegro, CI sobre HEAD final, QA por plataforma, capturas sintéticas y gates pendientes. Confirmación solo por el operador tras recibir realmente el mensaje; no hay webhook, acuse ni persistencia web en este alcance.
Medir manualmente consultas recibidas en WhatsApp, reservas confirmadas y traslados propios realizados hasta 10; origen declarado/código no personal, ida/vuelta, recomendaciones y reseñas auténticas. Abrir WhatsApp es una acción UI, no una reserva ni prueba de recepción. No publicar/contactar terceros ni contratar publicidad.

## Operations & Revenue Radar

| Campo | Evaluación provisional |
|---|---|
| Conversion upside / Trust-friction upside | Menos integración previa; información familiar completa y contacto humano. Se elimina copiar/pegar; validar prellenado y cambio de app. Pérdida de borrador al recargar documentada. |
| Average ticket upside / Segment opened | Ida y vuelta potencial; familias españolas, Orly primero. Sin previsión de ventas ni margen inventado. |
| SEO/editorial upside | Una landing ES enfocada; sin duplicar páginas ni retirar otros idiomas/servicios. |
| Operational promise risk | Capacidad, precio e inclusiones solo tras aprobación; ninguna reserva automática ni SLA de recepción. P0 y privacidad siguen gates. |
| Suggested micro-PR / Risk / Why now-later | WA1 R1 para aprobación tras este PLAN R0; F2/DB/ERP/Telegram después de demanda real. |

Fuentes primarias verificadas: [WhatsApp Click to Chat](https://faq.whatsapp.com/5913398998672934), [OWASP query strings](https://community.owasp.org/vulnerabilities/Information_exposure_through_query_strings_in_url). HTTPS no evita exposición de datos en URLs; `?text` opcional no equivale a envío.

## Anexo histórico — F2 conservado íntegro y aplazado

El texto siguiente conserva la especificación previa de #263, sin autorizarla ni mantenerla como próximo slice. [Versión inmutable anterior](https://github.com/geinersito/paris-luxe-journey/blob/8a45262572b1689a84098650a65a04b0b9568b78/docs/plan/F2_FAMILY_COMPATIBILITY_SCOPE.md). En caso de conflicto de prioridad prevalece v4.1 arriba; los controles F2 se mantienen para una futura reanudación.

# F2 — Exclusiones y compatibilidad familiar: alcance para aprobación

27/11/2026 · Europe/Paris · Plan item(s): DISNEY-FAMILY-BOOKING-01-F2.
**Solo propuesta documental. F2 NO autorizado ni implementado.** F1 ya integrado en [#261](https://github.com/geinersito/paris-luxe-journey/pull/261), main `d9619ddec927a336f2fdefd96e06985d71b30d39`.

## Objetivo y frontera

Función pura y tests junto al módulo, como el F2 «exclusiones» del [plan previo](https://github.com/geinersito/paris-luxe-journey/blob/dfafbfed7f4218c840612dee0d6e1afcef2e1b39/docs/audits/DOMAIN_DISNEY_DISCOVERY_2026_11_25.md). Resultado limitado a categorías candidatas o revisión humana; nunca vehículo confirmado, disponibilidad, precio ni reserva.
No conectar a BookingForm, hooks, rutas, storage, endpoints, ERP o mensajería. No modificar el contrato F1, añadir dependencias ni construir catálogo de vehículos.

## Entrada y salida propuestas

- Entrada: un `FamilyLeg`, sin contacto personal, y comprobación operativa opcional por categoría para ese mismo tramo/configuración: encaje real de plazas, equipaje y dispositivos, cada uno sí/no/desconocido. El módulo no obtiene ni inventa esa comprobación.
- Sin comprobación acreditada, o con datos críticos de compatibilidad desconocidos, devolver revisión. Los tests usarán comprobaciones sintéticas explícitas; actualmente no se acredita ninguna capacidad operativa real.
- Salida candidata: categorías ECO/VAN/VAN_XL no excluidas y con encaje expresamente comprobado; indicador obligatorio de confirmación humana pendiente. Puede haber más de una candidata; no elegir automáticamente.
- Salida revisión: motivos mediante códigos estables, sin volcar el input, datos personales o texto libre. Sin normalizar null a cero ni mutar el tramo.
- Este resultado orientativo no sustituye validación de servidor, verificación profesional de seguridad ni confirmación humana. F4 conserva la validación completa y DST.

## Reglas mínimas propuestas

| Situación | Resultado propuesto |
|---|---|
| Adultos/conteos inválidos, total 0 o >8, datos críticos desconocidos | Revisión; sin conversiones implícitas ni corrección silenciosa |
| Bandas objetivo 1–4 ECO, 4–5 VAN, 6–8 VAN_XL | Solo filtro comercial de candidatas; no prueba capacidad física ni activa tarifas |
| Una o más maletas grandes | Excluir ECO según oferta objetivo; no asumir encaje en VAN/XL |
| Menor con edad/dispositivo/proveedor indeterminado, o dispositivo no solicitado sin revisión acreditada | Revisión; no inferir seguridad por edad o por aportarlo el pasajero |
| Equipaje/carritos/especiales o configuración de dispositivos sin encaje acreditado | Revisión; sin umbrales de maletas, dimensiones o sillas inventados |
| Categoría dentro de banda, datos críticos conocidos y tres comprobaciones de encaje positivas | Candidata orientativa, siempre pendiente de confirmación humana |
| Menos de 4 viajeros que requieren VAN, o ninguna categoría acreditada | Revisión/presupuesto manual; alcance VAN <4 sigue pendiente, sin imponer precio |
| Ida/vuelta | Evaluar cada tramo con sus propios datos/comprobaciones; nunca reutilizar el resultado por defecto |

## Casos de aceptación antes de autorizar implementación

1. Cuatro viajeros y equipaje pequeño: sin comprobaciones => revisión; con ECO/VAN comprobados => ambas candidatas posibles.
2. Cuatro viajeros, dos dispositivos y dos carritos: ECO no compatible/VAN comprobado => solo VAN; sin comprobación => revisión.
3. Cinco viajeros => solo VAN si está comprobado; ocho => solo VAN_XL si está comprobado.
4. Dos viajeros que no caben en ECO => revisión, sin adjudicar VAN ni tarifa por analogía.
5. Conteo null frente a cero; negativos/fracciones/NaN, cero y nueve viajeros; edad o dispositivo desconocido.
6. Equipaje excesivo o especial sin encaje; dispositivo incompatible/no disponible; verificación del pasajero no acredita por sí sola seguridad.
7. Ida/vuelta con equipaje o encaje diferente; resultados independientes, entrada inmutable y salida sin precio/confirmación/contacto.

## Micro-PR técnica futura y controles

- R1 aislado, estimación 130–185 líneas netas; siempre <200 y ≤4 archivos. Si no cabe con claridad, dividir alcance para aprobación antes de implementar.
- Archivos previstos: `src/lib/booking/familyCompatibility.ts`, `src/lib/booking/familyCompatibility.test.ts`, `docs/STATUS.md`, `docs/plan/IMPROVEMENTS.md`.
- Tests unitarios de decisiones y límites anteriores; type-check, lint:changed, tests, build, CI y scan que confirme ausencia de integración en UI/rutas. Datos exclusivamente sintéticos; sin acceso a servicios reales.
- No heredar la dispensa de F1. SUPERVISOR.md sigue exigiendo smoke R1 A/B/C/D; el FAIL de limpieza conocido debe resolverse por un alcance autorizado o una decisión específica del propietario antes de declarar F2 listo para merge.
- P0 [BOOKING-POST-CONFIRMATION-CLEANUP-01 #262](https://github.com/geinersito/paris-luxe-journey/issues/262) permanece abierto y debe resolverse antes de reactivar legacy. Su corrección no forma parte de F2.

**Puerta siguiente: aprobación expresa de este alcance, sus entradas operativas y controles.** Sin F2–F11, cambios Supabase/Stripe, tarifas, publicación, comunicaciones o despliegue en esta revisión documental. ORLY FIRST · CONVERSION FIRST · LESS IS MORE.
