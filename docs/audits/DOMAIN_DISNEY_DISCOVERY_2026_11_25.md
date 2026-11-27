# Runbook v3.1 — ORLY FIRST · CONVERSION FIRST · MVP EXECUTION
27/11/2026 · Europe/Paris · Plan item(s): DISNEY-PRICE-SCOPE-01; DISNEY-FAMILY-BOOKING-01 (global R2); DISNEY-FAMILY-BOOKING-01-F1 (R1); DISNEY-LANDING-01.
**Fase A autorizada: reconciliación R0 documental; F1 ya implementado y aceptado técnicamente en borrador #261, pendiente de merge.** Esta PR no introduce código ni autoriza F2–F11; [camino mínimo anterior conservado](https://github.com/geinersito/paris-luxe-journey/blob/dfafbfed7f4218c840612dee0d6e1afcef2e1b39/docs/audits/DOMAIN_DISNEY_DISCOVERY_2026_11_25.md).

## 0. Cronología y puerta actual
- [v3.1 original, dfb21145](https://github.com/geinersito/paris-luxe-journey/blob/dfb21145e439aa42cc7ecc56541fb09dc50c0058/docs/audits/DOMAIN_DISNEY_DISCOVERY_2026_11_25.md): proponía autorizar F1; se conserva como referencia histórica.
- 27/11: GO posterior del propietario solo para F1 aislado; [#261, c7109273](https://github.com/geinersito/paris-luxe-journey/pull/261) implementó tipos/documentación: 4 archivos, +91/-3, 88 netas; sin consumidores runtime.
- 27/11: CTO acepta técnicamente F1; merge HOLD hasta reconciliar SSOT y cerrar controles R1. Proyecto global DISNEY-FAMILY-BOOKING-01 conserva R2; subítem DISNEY-FAMILY-BOOKING-01-F1 conserva R1.
- 27/11: GO solo para Fase A en #260. Siguiente puerta: revisión y autorización específica de merge #260; todavía no actualizar #261 desde main ni iniciar F2–F11.

## 1. Decisiones vigentes y propuestas: estados separados
Vigente como estrategia: Orly primero; CDG/París complementarios con precio por confirmar; una landing y un formulario universal /es/reserva-disney sin cuenta; revisión humana; publicidad 0 EUR; ERP #1465 P3. Los tres importes son objetivos adoptados, no tarifas productivas aprobadas. No consta aprobación para activar tarifas/prestaciones ni aceptación operativa de colaboradores; no interpretar este runbook como esa autorización.
| Oferta objetivo Orly↔Disney por vehículo/trayecto | Pasajeros, niños incluidos | Alcance |
|---|---|---|
| ECO 70 EUR | 1–4 | Sin maletas grandes; verificar dispositivos y resto de bultos |
| VAN 80 EUR | 4–5 | Equipaje/configuración comprobados; menos de 4 que requieran VAN por decidir |
| VAN XL 100 EUR | 6–8 | Capacidad y configuración homologadas; 8 pasajeros requieren 9 plazas con conductor |
| Ida/vuelta sin descuento inicial | Dos tramos revisados | 140/160/200 EUR solo si misma categoría/condiciones; sin confirmación automática |

| Condición | Propuesta del CTO, NO aprobada para publicación | Pendiente concreto |
|---|---|---|
| Sillas/alzadores, peajes, cartel y seguimiento de vuelo | Incluidos; dispositivos previa confirmación; seguimiento humano inicialmente | Respaldo operativo/costes, montaje/cantidad y punto de encuentro, sin API nueva |
| Espera Orly→Disney | 60 min desde aterrizaje real | Fuente operativa de hora real, contacto/exceso/equipaje retrasado; no usar hora aportada por cliente como hecho verificado |
| Espera hotel→Orly | 15 min | Referencia propuesta: hora de recogida confirmada; procedimiento/contacto por aprobar |
| Espera adicional | 10 EUR por cada 15 min completos | Propuesta concreta, sin redondear al bloque empezado; aceptación previa y registro, sin automatizar cargos |
| Noche | Presupuesto manual inicialmente | Aprobar definición de franja; no inventar suplemento ni aplicar tarifa por analogía |
| Cancelación con 24 h o más | Gratuita | Nueva propuesta incluye exactamente 24 h; referencia por tramo: recogida confirmada, tratamiento de vuelta por validar |
| Cancelación tardía / no-show | Sin tarifa acordada | Definición, contacto/evidencia y condiciones contractuales por validar; no inventar penalización |
| Pago al conductor | Efectivo o tarjeta según medios confirmados | Medio aceptado por el transportista concreto, identidad y factura; no prometer tarjeta universal |
Sin aprobación previa no publicar estas condiciones como incluidas. [DGCCRF: información sobre precios](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/linformation-sur-les-prix) exige informar de costes adicionales antes del contrato; no autoriza nuestro suplemento ni sustituye la validación de condiciones. Acordar modo de cálculo/alcance y total publicable, sin sorpresas.

Información en tres niveles: landing con oferta/ventajas/precio y condiciones esenciales; CGV completas mediante enlace discreto, visible y legible; confirmación humana con total, transportista, inclusiones y extras aplicables antes de contratar. No poner penalizaciones en primer plano ni ocultar costes. Fotos reales autorizadas, preguntas condicionales y contacto WhatsApp complementario, sin checkout.
Auditoría estática: App.tsx ya publica rutas /terms y /privacy. TermsPage.tsx está en inglés: exige pago online/Stripe, confirmación por email y espera extra 15 EUR/15 min, anuncia ajuste automático de recogida y equipaje genérico. PrivacyPage.tsx también describe pagos Stripe; TermsAndPayment es un paso de pago, no reutilizarlo para solicitar. Adaptar estas páginas existentes de forma compatible al MVP español (sin nueva página jurídica), sin adoptar sus penalizaciones tardías como aprobadas. No se comprobó su versión desplegada.

## 2. Dos puertas operativas distintas
| Requisito | Servicios propios ejecutados por el propietario | Reservas intermediadas con conductor independiente |
|---|---|---|
| Prestación/capacidad | Verificar habilitaciones, seguro, vehículo/dispositivos y capacidad propios | Verificar colaborador, documentación/seguro, vehículo/dispositivos y aceptación de condiciones |
| Precio y cobro | Validar costes propios y condiciones; propietario transportista cobra/factura | Colaborador transportista cobra/factura; gestión y economía interna privadas, sin reventa presumida |
| Jurídico | Requisitos de actividad propia, información/condiciones, privacidad y mediación por validar | Además, clasificación/declaración/RC/contratos/responsabilidad de intermediación y fiscalidad por profesional |
| Activación | Solo tras gates propios, comerciales y técnicos y autorización de publicación | Bloqueada hasta cerrar también los requisitos específicos de intermediación; no habilitarla al aprobar ejecución propia |
No se declara conformidad administrativa de ninguno. Mantener separados Latins (ejecución personal, nunca redistribuir), propio personal e intermediado. Si solo se aprueba ejecución propia, el circuito intermediado permanece deshabilitado.

## 3. F1 — Family Booking Contract, paquete concreto de revisión
**Especificación de referencia; implementación aprobada en #261, no en esta PR.** F1 fue autorizado aisladamente del cierre comercial y aceptado técnicamente por CTO; sigue en borrador, con merge pendiente. Su alcance permanece src/types/familyBooking.ts, docs/BOOKING_MODEL.md, docs/STATUS.md y docs/plan/IMPROVEMENTS.md, 88 líneas netas, R1. Contrato íntegro, sin importación en rutas, componentes, hooks, functions o DB. F2–F11 no iniciados; publicación conserva todos sus bloqueos.
Contrato de solicitud F1; formatos/rangos documentados, validación runtime reservada a F4. null significa desconocido, nunca cero implícito. No cambia BookingFormData ni el payload legacy; no enviarlo al endpoint actual, que todavía no lo admite.
```ts
type Count = number | null;
type Place = { code: "ORY" | "CDG" | "PARIS" | "DISNEY" | "other"; address?: string };
type ParisTime = { date: string; time: string | null; zone: "Europe/Paris" };
type Child = {
  age: { value: number; unit: "years" | "months" } | null;
  heightCm?: number | null; weightKg?: number | null;
  restraint: { type: "child_seat" | "booster" | "not_requested" | "undetermined";
    provider: "operator" | "passenger" | "undetermined" };
};
type Bags = {
  large: Count; cabin: Count; backpacks: Count;
  foldableStrollers: Count; nonFoldableStrollers: Count;
  special?: { description: string; dimensionsCm?: [length: number, width: number, height: number] }[];
};
export type FamilyLeg = {
  pickup: Place; dropoff: Place; requestedPickup: ParisTime;
  flight?: { movement: "arrival" | "departure"; number: string | null;
    scheduled: ParisTime | null };
  adults: number; children: Child[]; baggage: Bags;
};
export type FamilyBookingContractV1 = {
  schemaVersion: 1; requestKey: string;
  legs: [FamilyLeg] | [FamilyLeg, FamilyLeg];
  contact: { name: string; phone: string; email?: string };
};
```
Reglas F1: fecha YYYY-MM-DD, hora HH:mm/null en París; una o dos piernas independientes; total derivado adultos+children.length, 1–8 incluyendo menores; contadores conocidos enteros ≥0; edades coherentes con unidad y menores de 18. Talla/peso solo cuando necesarios para dispositivo; sin nombres/DOB/documentos de menores. Tipo de dispositivo y proveedor son distintos; not_requested o asiento del pasajero no acreditan seguridad. Datos críticos desconocidos requieren revisión; no permiten confirmar.
Criterio obligatorio F4: rechazar o enviar a revisión humana horas locales inexistentes o ambiguas por cambio horario; nunca convertirlas silenciosamente. Presentación Europe/Paris, UTC solo en persistencia; datos críticos desconocidos => pending_review, nunca confirmación. No implementar F4 ahora.
requestKey es nonce técnico por intención, no identidad ni autorización de lectura; idempotencia DB/API pertenece a F3/F5. Horas reales, precio confirmado, esperas facturables, cobros, comisión, driver_id y confirmación NO forman parte del input de solicitud. Origen de captación/finanzas avanzadas no bloquean F1. Respuesta futura: referencia servidor + pending_review, nunca confirmed desde el cliente.
Contacto: teléfono/WhatsApp principal, email opcional; sin email ficticio. Auditoría: Pending exige email, submit-booking-request lo valida/trimmea y la migración 20260531000000 lo define NOT NULL. F3–F5 deberán adaptar almacenamiento/validación/notificación y auditar consumidores para admitir solicitud familiar sin email, manteniendo el contrato legacy. F1 no cambia nada de ello.
Mapeo futuro: name/phone/email opcional a customer_*; email ausente no puede enviarse al flujo actual ni convertirse en dato ficticio; primer tramo a columnas legacy, vuelta si existe; ficha completa en family_details versionado, sin usar notes como contenedor de 500 caracteres. El servidor debe proyectar columnas y detalle desde un contrato canónico; F1 no crea columna, migración, envío ni validador. Datos familiares/contacto fuera de URL, analytics, logs, fixtures reales, history.state y snapshot local; [minimización CNIL](https://www.cnil.fr/fr/definition/minimisation). Avanzar/retroceder entre etapas conserva datos en memoria durante la sesión del formulario; no prometer recuperación tras cerrar/refrescar si no existe.
Aceptación F1: contrato/export declarativo y documentación coherentes; ejemplos sintéticos 4 viajeros/2 menores/2 carritos y 8 viajeros; ida/vuelta independiente, teléfono sin email, vuelo de llegada/salida, asiento del operador/pasajero, ausencia≠cero. Evidence Pack #261 registra gates locales y CI #639 verde sobre c7109273; no sustituye los controles del HEAD reconciliado.

Mantener R1 y SUPERVISOR.md sin cambios: smoke A/B/C/D obligatorio en entorno seguro, sin cobros reales ni efectos operativos. No declarar N/A ni dispensa unilateral; si un impedimento técnico lo impide, documentarlo y solicitar dispensa expresa al propietario. Control pendiente para Fase B.

## 4. Secuencia cerrada y Evidence Pack
Puerta actual: cerrar Fase A documental de #260 con revisión, CI y Evidence Pack. Solo tras autorización específica de merge #260 y su integración, Fase B actualizará #261 desde el main resultante mediante merge, sin force-push ni reescritura; conservar contrato F1, resolver SSOT/IDs y verificar ≤4 archivos/<200 netas frente al nuevo main. Repetir CI, type-check, lint:changed, tests, build y scan sin consumidores sobre el HEAD reconciliado; ejecutar smoke A/B/C/D seguro y detenerse ante la puerta separada de merge #261.
Puerta de publicación: recorrido completo solicitud → persistencia única → ficha/aviso privado → confirmación humana, precios/condiciones, capacidad, seguridad y requisitos jurídicos aprobados según circuito. Landing/formulario siguen inactivos; no nuevo bot/cuenta/API de vuelos ni envío a red de chóferes.
Booking→ERP NOT LIVE; ERP #1465 P3. Sin F2–F11, src, DB, publicidad, comunicaciones, pagos, merge o despliegue en esta revisión. Investigación, visual y once hitos F1–F11 se conservan; no añadir módulos ni repetir discovery. Adaptación de CGV dentro del trabajo existente de contenido/publicación; dividir PRs de ese hito si lo exigen <200 líneas/≤4 archivos, sin ampliar funcionalidad.
Evidence Pack de esta Fase A: Booking main 94baae0 y ERP 4c6e624, seis SSOT presentes/no vacíos; diff, comprobaciones y CI del nuevo HEAD registrados en la descripción #260. Sin nueva investigación ni actualización del informe económico privado en esta fase. Mantener gates de email legacy, CGV/privacidad, comerciales, jurídicos y de publicación; no declarar merge autorizado.
Operations & Revenue Radar: conversión neutra ahora; futuro ida/vuelta y menos errores de recogida para familias españolas. Sin cambios SEO ni promesas de capacidad. Objetivo primeras 10 reservas propias, no previsión; no usar cartera Latins ni publicar economía interna. Next Best Slice: cerrar Fase A; F2 es el siguiente desarrollo funcional, HOLD sin GO separado.
**Estado: F1 aceptado técnicamente como draft; Fase A documental en revisión. Merge #260 HOLD hasta autorización específica; Fase B y merge #261 pendientes de sus puertas; F2–F11, publicación e intermediación HOLD.**
