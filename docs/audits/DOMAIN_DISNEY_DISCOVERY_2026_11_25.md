# ORLY FIRST — cierre del PLAN y F1 para aprobación
26/11/2026 · Europe/Paris · Plan item(s): DISNEY-PRICE-SCOPE-01; DISNEY-FAMILY-BOOKING-01 (F1); DISNEY-LANDING-01.
**Dictamen estratégico favorable. Actualización R0 documental; implementación pendiente de autorización.** No se inicia F1 en src ni F2–F11; [camino mínimo anterior conservado](https://github.com/geinersito/paris-luxe-journey/blob/dfafbfed7f4218c840612dee0d6e1afcef2e1b39/docs/audits/DOMAIN_DISNEY_DISCOVERY_2026_11_25.md).

## 1. Decisiones vigentes y propuestas: estados separados
Vigente como estrategia: Orly primero; CDG/París complementarios con precio por confirmar; una landing y un formulario universal /es/reserva-disney sin cuenta; revisión humana; publicidad 0 EUR; ERP #1465 P3. Los tres importes son objetivos adoptados, no tarifas productivas aprobadas. No consta aprobación del propietario para publicar nuevas inclusiones ni aceptación operativa de colaboradores.
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
| Espera adicional | 10 EUR cada 15 min | Bloque empezado/completo o prorrata y registro por decidir; aceptación previa, sin cargo automático |
| Noche | Presupuesto manual inicialmente | Aprobar definición de franja; no inventar suplemento ni aplicar tarifa por analogía |
| Cancelación con más de 24 h | Gratuita | Referencia por tramo propuesta: recogida confirmada; frontera exactamente 24 h y tratamiento de vuelta por decidir |
| Cancelación tardía / no-show | Sin tarifa acordada | Definición, contacto/evidencia y condiciones contractuales por validar; no inventar penalización |
| Pago al conductor | Efectivo o tarjeta según medios confirmados | Medio aceptado por el transportista concreto, identidad y factura; no prometer tarjeta universal |
Sin aprobación previa no publicar estas condiciones como incluidas. [DGCCRF: información sobre precios](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/linformation-sur-les-prix) exige informar de costes adicionales antes del contrato; no autoriza nuestro suplemento ni sustituye la validación de condiciones. Acordar modo de cálculo/alcance y total publicable, sin sorpresas.

## 2. Dos puertas operativas distintas
| Requisito | Servicios propios ejecutados por el propietario | Reservas intermediadas con conductor independiente |
|---|---|---|
| Prestación/capacidad | Verificar habilitaciones, seguro, vehículo/dispositivos y capacidad propios | Verificar colaborador, documentación/seguro, vehículo/dispositivos y aceptación de condiciones |
| Precio y cobro | Validar costes propios y condiciones; propietario transportista cobra/factura | Colaborador transportista cobra/factura; gestión y economía interna privadas, sin reventa presumida |
| Jurídico | Requisitos de actividad propia, información/condiciones, privacidad y mediación por validar | Además, clasificación/declaración/RC/contratos/responsabilidad de intermediación y fiscalidad por profesional |
| Activación | Solo tras gates propios, comerciales y técnicos y autorización de publicación | Bloqueada hasta cerrar también los requisitos específicos de intermediación; no habilitarla al aprobar ejecución propia |
No se declara conformidad administrativa de ninguno. Mantener separados Latins (ejecución personal, nunca redistribuir), propio personal e intermediado. Si solo se aprueba ejecución propia, el circuito intermediado permanece deshabilitado.

## 3. F1 — Family Booking Contract, paquete concreto de revisión
**Preparado aquí como especificación; no se crea ni importa código.** Tras cierre de DISNEY-PRICE-SCOPE-01 y autorización explícita de F1, micro-PR técnica con src/types/familyBooking.ts, docs/BOOKING_MODEL.md, docs/STATUS.md y docs/plan/IMPROVEMENTS.md: 100–160 líneas netas estimadas, ≤4 archivos, R1 conservador. Sin importación en rutas, componentes, hooks, functions o DB. F2–F11 conservan el alcance del PLAN anterior, sin iniciarlos.
Contrato propuesto de solicitud; formatos/rangos se documentan ahora, validación de runtime se implementaría en F4. null significa desconocido, nunca cero implícito. No cambia BookingFormData ni el payload legacy; no enviarlo al endpoint actual, que todavía no lo admite.
```ts
type Count = number | null;
type Place = { code: "ORY" | "CDG" | "PARIS" | "DISNEY" | "other"; address?: string };
type ParisTime = { date: string; time: string | null; zone: "Europe/Paris" };
type Child = {
  age: { value: number; unit: "years" | "months" } | null;
  heightCm?: number | null; weightKg?: number | null;
  restraint: "child_seat" | "booster" | "own" | "not_requested" | "undetermined";
};
type Bags = {
  large: Count; cabin: Count; backpacks: Count;
  foldableStrollers: Count; nonFoldableStrollers: Count;
  special?: { description: string; dimensionsCm?: [number, number, number] }[];
};
type FamilyLeg = {
  pickup: Place; dropoff: Place; requestedPickup: ParisTime;
  arrival?: { flightNumber: string | null; scheduledLanding: ParisTime | null };
  adults: number; children: Child[]; baggage: Bags;
};
type FamilyBookingContractV1 = {
  schemaVersion: 1; requestKey: string;
  legs: [FamilyLeg] | [FamilyLeg, FamilyLeg];
  contact: { name?: string; email: string; phone?: string };
};
```
Reglas F1: fecha YYYY-MM-DD, hora HH:mm/null en París; una o dos piernas independientes; total derivado adultos+children.length, 1–8 incluyendo menores; contadores conocidos enteros ≥0; edades coherentes con unidad y menores de 18. Talla/peso solo cuando necesarios para dispositivo; sin nombres/DOB/documentos de menores. not_requested/own no acreditan seguridad. Datos críticos desconocidos requieren revisión; no permiten confirmar.
requestKey es nonce técnico por intención, no identidad ni autorización de lectura; idempotencia DB/API pertenece a F3/F5. Horas reales, precio confirmado, esperas facturables, cobros, comisión, driver_id y confirmación NO forman parte del input de solicitud. Origen de captación/finanzas avanzadas no bloquean F1. Respuesta futura: referencia servidor + pending_review, nunca confirmed desde el cliente.
Mapeo futuro: email/name/phone a campos customer_*; primer tramo a columnas legacy, vuelta si existe; ficha completa en family_details versionado, sin usar notes como contenedor de 500 caracteres. El servidor debe proyectar columnas y detalle desde un contrato canónico; F1 no crea columna, migración, envío ni validador. Datos familiares/contacto fuera de URL, analytics, logs, fixtures reales, history.state y snapshot local.
Aceptación F1: contrato/export declarativo y documentación coherentes; ejemplos sintéticos 4 viajeros/2 menores/2 carritos y 8 viajeros; ida/vuelta independiente, ausencia≠cero y no perder vuelo/horario/dispositivos. Gates futuros de esa PR: SSOT, CI, lint:changed, type-check y build; revisar que no aparece import runtime ni cambia legacy. No tests de runtime que solo repitan interfaces; no se ejecutan hoy.

## 4. Secuencia cerrada y Evidence Pack
Puerta inmediata: propietario decide precios/condiciones, alcance y excepciones; operación verifica capacidad/medios y costes; validación profesional según circuito. Después autorizar F1 aislado. Landing y formulario nuevos siguen sin rutas activas hasta validar recorrido completo: solicitud → persistencia única → ficha/aviso privado al operador → confirmación humana. Sin nuevo bot/cuenta/API de vuelos ni envío a red de chóferes.
Booking→ERP NOT LIVE; ERP #1465 P3. Sin F2–F11, src, DB, publicidad, comunicaciones, pagos, merge o despliegue en esta revisión. Investigación, visual y resto de micro-PRs se conservan; no se añade otro proyecto ni se repite discovery.
Evidence Pack: Booking main 94baae0 sin cambios; seis SSOT presentes/no vacíos, gobernanza conservada; código/esquema auditados reutilizados; fuente DGCCRF leída 26/11. Solo especificación documental, sin gates runtime ejecutados. Diff y lectura remota al publicar; informe económico privado actualizado por separado.
Operations & Revenue Radar: claridad de condiciones reduce reclamaciones; contrato evita perder datos; ejecución propia puede evaluarse separadamente de intermediación; ingreso/coste por circuito sin beneficio supuesto; riesgo: espera/cancelación/tarjeta prometidas sin respaldo. Suggested micro-PR: F1 — Family Booking Contract, R1, únicamente tras precio/alcance cerrados y autorización de esa fase.
**Next Best Slice técnico: F1 — Family Booking Contract, preparado para aprobación. Estado actual: HOLD de implementación, pendiente de cerrar DISNEY-PRICE-SCOPE-01 y autorización de F1.** Dictamen estratégico favorable no satisface esas dos puertas.
