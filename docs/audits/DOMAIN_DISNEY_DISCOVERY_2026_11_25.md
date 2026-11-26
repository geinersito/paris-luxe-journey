# Disney Transfer Growth v3 — ORLY FIRST / cierre comercial
26/11/2026 · Europe/Paris · Plan item(s): DISNEY-PRICE-SCOPE-01; DISNEY-FAMILY-BOOKING-01; DISNEY-LANDING-01.
**Validación estratégica favorable; condiciones y ejecución PENDIENTES de aprobación. R0 documental. Sin implementación ni despliegue.**
Esta revisión reduce el camino crítico; no abre otro discovery ni nuevas funcionalidades. [Detalle anterior conservado en Git](https://github.com/geinersito/paris-luxe-journey/blob/283c619d43e60977618c684758a6e5e144ee7413/docs/audits/DOMAIN_DISNEY_DISCOVERY_2026_11_25.md).

## 1. Matriz Orly ↔ Disneyland Paris preparada para aprobación
| Categoría | Objetivo por vehículo/trayecto | Pasajeros, niños incluidos | Compatibilidad |
|---|---:|---|---|
| ECO | 70 EUR | 1–4 | Sin maletas grandes; demás equipaje/dispositivos deben caber |
| VAN | 80 EUR | 4–5 | Equipaje familiar según configuración comprobada |
| VAN XL | 100 EUR | 6–8 | Vehículo homologado/configuración comprobada; 8 pasajeros requieren 9 plazas con conductor |
Orly→Disney y Disney→Orly se validan por separado con los mismos objetivos. Cuatro viajeros con sillas/carritos no son ECO por defecto. Sin capacidad acreditada: revisión/presupuesto, no promesa de VAN/XL. Menos de 4 que requieran VAN: alcance por decidir.

| Condición comercial | Propuesta inicial, todavía no aprobada | Comprobación antes de publicar/confirmar |
|---|---|---|
| Sillas infantiles y alzadores | Incluidos en precio, bajo solicitud y confirmación | Tipo, cantidad, compatibilidad, disponibilidad, instalación y quién soporta su coste |
| Peajes | Incluidos | Aceptación del conductor en ruta/ámbito acordado; sin extra inventado |
| Seguimiento del vuelo | Incluido | Procedimiento humano inicialmente; sin nueva API de vuelos |
| Recogida con cartel | Incluida | Punto de encuentro y procedimiento aceptados; datos mínimos en cartel |
| Espera en aeropuerto | 60 min desde aterrizaje real, en recogidas Orly→Disney | Fuente de hora real, contacto, retraso de equipaje/control, exceso y no-show; no cobrar automáticamente |
| Espera en hotel | Pendiente | Fijar margen y procedimiento para Disney→Orly; no aplicar por analogía los 60 min de aeropuerto |
| Pago | Directamente al conductor que realiza el traslado | Medio de pago, identidad del transportista y factura antes de confirmar; sin checkout nuevo |
| Ida y vuelta | Dos tarifas, sin descuento inicial | Si misma categoría/condiciones: 140/160/200 EUR; si cambian, sumar tramos revisados y extras aprobados |
| Noche | Franja y suplemento pendientes | Propuesta conservadora: solicitudes nocturnas con presupuesto manual hasta acordar ambos; sin inventar franja/importe |
| Cancelación | Pendiente | Aprobar plazo, importe si procede, aviso, retraso/no-show y quién gestiona; no anunciar gratuidad o penalización sin validar |
La inclusión de sillas/cartel/espera no está acreditada por una tarifa de otro operador. El precio debe ser aceptado por colaboradores con esas condiciones; no basta comparar categorías comerciales distintas. Fiscalidad y totales publicables pendientes; economía interna solo en informe privado.
**Decisiones de cierre:** A) aprobar precios e inclusiones; B) confirmar ámbito/hoteles/horarios y espera de vuelta; C) acordar noche, exceso de espera, cancelaciones y pago; D) verificar vehículo/dispositivos y aceptación del conductor; E) validar clasificación jurídica, seguro y contratos antes de intermediación. No constan cerradas por este documento.

## 2. Alcance mínimo de lanzamiento: cinco resultados, en este orden
1. **Landing española:** /es/traslados-disneyland-paris, Orly primero, tres categorías y condiciones aprobadas. Conservar dominio, otras páginas e idiomas. CDG/París en el mismo recorrido, **precio por confirmar**, sin nuevas páginas por aeropuerto.
2. **Formulario universal:** /es/reserva-disney sin cuenta; mismo componente en landing. Cuatro etapas con trayecto/aterrizaje/recogida, vuelta independiente, adultos/edades necesarias, dispositivos, bultos/carritos y contacto. Categoría candidata/revisión humana, sin motor de asignación ni cálculo físico de capacidad inventado.
3. **Persistencia segura:** reutilizar public_booking_requests/pending_review y submit-booking-request. family_details versionado aditivo, validación servidor y clave idempotente; no esconder ficha en notes de 500 caracteres ni perder campos. Sin acceso directo cliente a tabla ni escrituras dispatch_*.
4. **Ficha y aviso al operador:** formatear datos normalizados y reutilizar aviso privado existente solo si destinatario/configuración están autorizados/verificados. No crear bot/canal/cuenta ni enviar a red de conductores. Fallo de aviso no borra solicitud ni provoca duplicado; comprobar recuperación de la ficha por operador antes de abrir el flujo.
5. **Confirmación manual:** operador comprueba capacidad, condiciones, precio final y transportista; comunica aceptación por procedimiento humano. Solicitud recibida ≠ reserva confirmada. Sin pago, asignación, factura o ledger automáticos.
No son cinco PR: son cinco resultados. Los cambios se dividen debajo por límites y responsabilidad, sin reconstruir módulos ni añadir pantallas administrativas por defecto. Nada se activa mientras el camino completo no esté validado.

## 3. Micro-PRs mínimos propuestos, cada uno <200 líneas netas y ≤4 archivos
Cada fila incluye docs/STATUS.md + docs/plan/IMPROVEMENTS.md, dejando hasta dos archivos adicionales. R0 ahora; implementación posterior bajo aprobación. Los paths nuevos se proponen, no existen todavía.
| Secuencia | Archivos adicionales / resultado | Riesgo; estimación total |
|---|---|---|
| C0 cierre | Este audit: decisiones y matriz; aceptación/economía privadas | R0; 50–90 |
| F1 contrato | src/types/familyBooking.ts; docs/BOOKING_MODEL.md | R1; 100–160 |
| F2 exclusiones | src/lib/booking/familyCompatibility.ts y test junto a módulo; solo candidata/revisión | R1; 130–185 |
| F3 almacenamiento | supabase/migrations/<timestamp>_family_request_v1.sql; supabase/tests/database/family_request_v1.sql | R2 DB-only; 110–185; aditivo, RLS, unicidad y rollback lógico sin borrar solicitudes |
| F4 validación/ficha | supabase/functions/_shared/familyRequest.ts y test; contrato completo y resumen normalizado | R2 functions-only; 130–190 |
| F5 recepción/aviso | supabase/functions/submit-booking-request/index.ts y test; persistencia, idempotencia, fallo de aviso y legacy | R2 functions-only; 120–190 |
| F6 viaje/viajeros | src/components/booking/family/JourneyStep.tsx; PartyStep.tsx | R1; 140–190; controles existentes compatibles |
| F7 equipaje/contacto | src/components/booking/family/BaggageStep.tsx; ContactStep.tsx | R1; 130–190; sin duplicar captura de contacto |
| F8 composición/envío | src/components/booking/family/FamilyBookingForm.tsx y test del recorrido; reutilizar endpoint/control UI | R1; 140–190; cuatro etapas, back/revisión/retry |
| F9 oferta aprobada | src/config/disneyOffer.ts y test de ámbito/versionado; una SSOT de precio informativo, sin total confirmado automático | R2; 80–140 |
| F10 URL universal | src/pages/FamilyRequestPage.tsx; src/App.tsx | R1; 60–120; misma FamilyBookingForm sin login |
| F11 landing | src/pages/DisneyTransfers.tsx; src/App.tsx | R1; 130–185; consumir oferta aprobada, misma solicitud y aviso de revisión |
Los límites incluyen pruebas/SSOT; si no cabe una fila, dividir antes de codificar. F1–F9 se integran sin activar ruta nueva; F10/F11 solo tras gates completos y aprobación de publicación. Fichas, tarifas y contrato no se duplican por canal; el backend no confía en precio/categoría del cliente.

## 4. Gates de aprobación y aceptación
Comercial: matriz e inclusiones aceptadas para ambos sentidos; ámbito, espera, noche/cancelación y disponibilidad resueltos por escrito; rentabilidad propia/intermediada separada. Jurídico: centrale de réservation/RC/contratos/habilitaciones, identidad transportista, fiscalidad, cancelación, privacidad y mediación revisados por profesional; no se declara conformidad del propietario.
Técnico: SSOT, CI, lint:changed, type-check, pruebas de dominio/contrato/DB/functions y build; móvil/escritorio, teclado/errores; legacy conservado. Casos: 4 con equipaje pequeño; 4 con 2 sillas/2 carritos; 5; 8 con configuración verificada; exceso/incompatibilidad; datos desconocidos; ida/vuelta diferente; vuelo retrasado; doble clic/retry; fallo de aviso/envío. Revisión manual evita confirmar con datos críticos pendientes.
Privacidad: sin datos personales en URL/analytics/logs/fixtures ni fichas abiertas; no persistir datos familiares/contacto en snapshot local. Refresh/back vuelve a revisión/reentrada explícita si falta información. La operación completa debe llegar una sola vez al intake y al operador autorizado con referencia trazable.
**Fuera del lanzamiento:** Booking→ERP permanece NOT LIVE; ERP #1465 en P3; comisiones/cuentas a cobrar R2 posterior; liquidaciones, red automática, Telegram de distribución, WhatsApp API/Flows, VPS, pagos y APIs de vuelos. Presupuesto publicitario 0 EUR; investigación/creadores/atribución avanzada no bloquean este camino y no se repiten.
**Evidence Pack:** bases Booking 94baae0 y ERP 4c6e624 sin cambios; seis SSOT presentes/no vacíos y gobernanza previa conservada; esquema/endpoint auditados en v3 reutilizados. Solo PLAN documental, sin pruebas runtime, envíos, DB o despliegue. Diff/lectura remota se verifican al publicar; las condiciones propuestas no son una prueba operativa.
**Operations & Revenue Radar:** conversión: precio e inclusiones legibles; confianza: capacidad/transportista confirmados; tiempo: ficha sin transcripción; margen: aceptación y costes por circuito; cashflow: cobro directo al conductor, gestión posterior separada; riesgo: noche/espera/cancelación no cerradas; micro-PR sugerida: DISNEY-PRICE-SCOPE-01 (R0), antes de implementar.
**Next Best Slice: DISNEY-PRICE-SCOPE-01 — cierre comercial R0. Technical verdict HOLD para implementación.** Entregable listo para aprobar/ajustar decisiones A–E; no ampliar discovery. Tras su cierre y aprobación jurídica/comercial, solicitar autorización concreta de implementación del camino mínimo.
