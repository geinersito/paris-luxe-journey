# Disney Transfer Growth - PLAN para aprobación
25/11/2026 · Europe/Paris · Plan item: SEO-DISNEY-DOMAIN-DISCOVERY-01 (refinado). **PENDIENTE, R0 documental; sin implementación ni publicidad.**
Este PLAN sustituye el enfoque de captación generalista por una landing específica para familias residentes en España. Conservar eliteparistransfer.com, Paris Elite Services, los cuatro idiomas y todas las páginas/servicios existentes. No cambiar DNS, migrar URLs, contratar anuncios ni presentar afiliación oficial con Disney.

![Propuesta estática de escritorio y móvil](../design/disney-transfer-growth-2026-11-25.svg)
Propuesta visual sin formularios funcionales, fotos artificiales, tarifas publicables o reseñas ficticias. Los huecos de precio y foto deben completarse con datos y material reales.

## 1. Oferta y comunicación
Producto: traslados privados CDG, Orly y París ↔ Disneyland Paris, con ida/vuelta y hotel/dirección concreta. Público inicial: familias de España con niños; edad 25–50 y estancias 3–5 días son hipótesis, no requisitos excluyentes.
Copy propuesto: “Traslados privados a Disneyland Paris”; “Precio total por vehículo”; CTA “Consultar disponibilidad y precio”. Atención en español solo con cobertura operativa validada; no equivale a garantizar conductor hispanohablante.
Diseño: móvil primero, fondo claro, tipografía legible, tres trayectos, total/inclusiones y una acción principal. WhatsApp como ayuda secundaria. Sin VIP, eventos, excursiones o B2B en esta landing; conservarlos en la web general.
Usar fotos reales propias/autorizadas y opiniones trazables; si faltan, omitir la sección. No publicar “más barato”, sillas gratis, flota/plazas concretas, tiempo de respuesta o cancelación sin validación.

## 2. Qué reutilizar y qué no asumir
Base auditada: [main 94baae0](https://github.com/geinersito/paris-luxe-journey/commit/94baae0c228d8ad9cab40b5ab2bb9a273520a100). [Auditoría técnica anterior conservada](https://github.com/geinersito/paris-luxe-journey/blob/a0a0f36abfb66607a3cf338ec389cc305979300b/docs/audits/DOMAIN_DISNEY_DISCOVERY_2026_11_25.md): seis SSOT presentes/no vacíos; robots/sitemap mostraron vista 404; Home/booking sin hreflang en DOM. No equivale a desindexación. No se repite una comprobación HTTP que no se hizo.
Reutilizar destinos, formulario /booking → /booking/pending, validación, viaje ida/vuelta, cálculo existente y guía familiar Disney del blog. La ruta /es/traslados-disneyland-paris sería nueva: no existe un prefijo /es/ global. Evaluar una ruta española exacta, sin migrar el resto del router.
[BookingForm](../../src/components/BookingForm.tsx) usa useBookingForm/useBookingPrice; el hook puede caer en precios de respaldo. No convertir cualquier estimación o fallback en una tarifa fija publicada ni crear otra fórmula de precios en la landing.
[submit-booking-request](../../supabase/functions/submit-booking-request/index.ts) guarda public_booking_requests con pending_review y prepara notificación Telegram; no demuestra creación automática de servicio ERP. [Contrato Booking→ERP](../integrations/erp.md) lo marca NOT LIVE: el webhook canónico no llama al ingest; la integración antigua está archivada. No reactivarla ni prometer sincronización automática en esta campaña.

## 3. Competidores contrastados el 25/11/2026
| Web | CDG→Disney, grupo pequeño | Grupo de 6 | Diferencias que impiden igualar sin revisar |
|---|---|---|---|
| [Paris Disney Ride](https://parisdisneyride.com/) | 75 EUR, berlina 1–4 | 100 EUR, Clase V 5–8 | Publicita sillas y 1 h de espera incluidas |
| [Paris Shuttle](https://www.parisshuttle.es/preciosdisneyshuttle.php) | 95 EUR, 1–4 | 110 EUR, 5–7 | Publicita 1.ª silla incluida; otras +10 EUR; nocturno +30 EUR |
| [StarClass Paris](https://starclassparis.com/es) | 120 EUR, Clase V hasta 7 | 120 EUR | Vehículo/servicios distintos; anuncia conductor en inglés; reserva online figuraba en pausa |
| [Traslado Disneyland Paris](https://trasladodisneylandparis.com/) | 70 EUR, 1–4 | 100 EUR, 5–6 | Anuncia suplementos/condiciones propios: revisar total final |
Son tarifas anunciadas, no presupuestos obtenidos ni disponibilidad probada. No adoptar sus garantías, fiscalidad, capacidades, fotos o reseñas. Comparar también sentido, fecha, hotel, equipaje, espera, silla y total con suplementos; 100 EUR no demuestra ser el precio más bajo para todos los grupos.

## 4. Demanda mensual y costes publicitarios
[Paris Region, balance 2025](https://pro.visitparisregion.com/presse/presse/communiques-de-presse/communique-de-presse-bilan-annuel-2025-frequentation-touristique-a-paris-ile-de-france) informa de 1,4 millones de visitantes españoles a la región. Es contexto anual, no familias Disney, solicitudes de transfer ni demanda mensual de nuestro servicio.
No se obtuvo una serie mensual verificable del nicho ni CPC/CPM de cuentas publicitarias. No afirmar demanda continua fuera de vacaciones ni un coste de captación esperado. [Trends](https://support.google.com/trends/answer/4365533?hl=es) mide interés relativo 0–100, no volumen ni reservas.
Validación pendiente: exportar meses completos nov-2024/oct-2026 de Keyword Planner, ubicación España, red Google, términos españoles y cercanos: “traslado disneyland paris”, “transfer cdg disneyland”, “orly disneyland”, “traslado paris disneyland”. Conservar mes, keyword/grupo de variantes, ubicación, red, búsquedas y rangos de puja; no sumar variantes duplicadas.
[Keyword Planner](https://support.google.com/google-ads/answer/3022575?hl=es) ofrece históricos y previsiones condicionadas a ubicación/puja/presupuesto; una puja superior de página no es el CPC real. Falta acceso/export autorizado; no crear cuenta, introducir facturación ni activar campaña para obtenerlo. Meta requiere estimación propia, no extrapolar CPC de Google.
Antes de invertir: contrastar estacionalidad y plazos de antelación con consultas propias, Search Console y capacidad real. El dato regional y la existencia de competidores justifican investigar, no una previsión de ventas.

## 5. Precio, coste y rentabilidad
Los importes de venta y coste aportados por el propietario se analizan en su informe privado. Este repositorio es público: no publicar costes internos ni márgenes reales. Falta confirmar ruta/sentido, plazas, tratamiento fiscal e inclusiones; **no hay una tarifa autorizada para publicar**.
La diferencia nominal venta−chófer no es beneficio neto ni margen de contribución disponible. Normalizar bases fiscales y descontar comisiones/cobro, gestión, incidencias y costes que no estén ya incluidos en el chófer; con vehículo propio incluir tiempo, desgaste y kilómetros en vacío sin doble contabilizar.
Definir M = ingreso comparable − costes variables reales; B = M − contribución mínima que se desea conservar. CAC máximo = B; CPC máximo = B × conversión de clic a reserva confirmada. Si B≤0 no hay presupuesto económico de adquisición pagada.
| Conversión hipotética clic→reserva | CPC máximo con B=10 EUR ficticios | CPC máximo con B=5 EUR ficticios |
|---|---:|---:|
| 2% | 0,20 EUR | 0,10 EUR |
| 4% | 0,40 EUR | 0,20 EUR |
| 6% | 0,60 EUR | 0,30 EUR |
Sensibilidad matemática con presupuestos ficticios B, no costes del propietario, CPC de mercado ni conversión esperada. Ida/vuelta solo se evalúa con ingreso y coste de ambos trayectos confirmados, sin asumir descuento o coste lineal.

## 6. Recorrido simplificado propuesto
1. Trayecto/sentido, hotel o dirección, fechas/horas de París, viajeros incluyendo niños y vuelta condicional; recoger equipaje/carrito y necesidades infantiles sin ocultar capacidad.
2. Resumen con total o estimación correctamente identificada, inclusiones/suplementos, contacto y aceptación de condiciones; enviar mediante el contrato existente. Dos pasos visuales no autorizan cambiar payload ni suprimir validaciones.
3. “Solicitud recibida, pendiente de confirmación”; revisión humana de precio, disponibilidad y necesidades; confirmación con condiciones y proceso vigente. No confundir solicitud, clic WhatsApp o estimación con reserva confirmada, ni llevar a checkout/pago inactivo.
Mantener los datos al volver/refrescar, errores claros y alternativa de contacto. Prefill/hotel exacto/sillas no se suponen soportados: auditar y planificar adaptación separada antes de implementarlos.

## 7. Métricas y aceptación
| Medición | Definición / criterio propuesto |
|---|---|
| Comprensión móvil | Prueba exploratoria con 5 personas: objetivo 4/5 identifican oferta, precio/consulta y siguiente paso sin ayuda; no prueba de mercado |
| Conversión | Solicitudes cualificadas únicas / visitas elegibles; reservas confirmadas / solicitudes y / clics; deduplicar, separar canal y mes de visita/servicio |
| Rentabilidad | M real por trayecto y por ida/vuelta; CAC por reserva atribuida ≤ B aprobado; no optimizar solo WhatsApp o leads baratos |
| Operación | Cero discrepancias de precio/condiciones en los casos ensayados; medir mediana/p90 de respuesta sin prometer SLA nuevo |
| Rendimiento/SEO | Prueba móvil real; objetivos [Core Web Vitals](https://web.dev/articles/vitals) p75 LCP≤2,5 s, INP≤200 ms, CLS≤0,1 cuando haya campo suficiente; canonical, idioma y ruta accesibles |
Reutilizar [analytics](../../src/lib/analytics.ts), booking_trip_submit y eventos de pending existentes antes de añadir otros. Respetar consentimiento, evitar PII y enlazar solicitud/reserva deduplicada; no inventar precisión de atribución ni “purchase” al recibir una solicitud.

## 8. PLAN de ejecución futura
| Orden | Alcance y archivos previstos | Clase / tamaño |
|---|---|---|
| 1 - DISNEY-PRICE-SCOPE-01 | Matriz de tarifas/costes/inclusiones y criterio de precio publicable: este documento, IMPROVEMENTS y STATUS | R0 documental, 40–70 netas |
| 2 - SEO-ASSET-DELIVERY-PREFLIGHT-01 | Revisar paquete/preview de robots/sitemap y URLs; runbook Hostinger, audit y SSOT | R0 documental, 40–90 netas; deploy aparte |
| 3 - Landing española | src/pages/DisneyTransfers.tsx, ruta exacta en src/App.tsx y dos SSOT; pantalla centrada en Disney, fuera de navegación generalista | R1, 140–190 netas por micro-PR; solo tras diseño/tarifas aprobados |
| 4 - Adaptador de solicitud | Componentes/formulario, guard de intención y tests según audit; reutilizar pricing/contrato, sin tocar pagos o ERP | R1, 120–190 netas por micro-PR; PLAN exacto pendiente |
La landing completa excederá una sola micro-PR: separar presentación, validaciones/prefill, métricas y SEO con <200 líneas netas y ≤4 archivos por PR. Hreflang reutiliza PR-SEO-HREFLANG-01 solo para variantes reales. Cualquier cambio en precio calculado/checkout o integración ERP es R2 separado, no implícito en este PLAN.
Gates futuros: CI, lint de cambios, TypeScript y build; smoke A/B/C/D para routing/estado; escritorio/móvil, ida/vuelta, equipaje/sillas y fallo de envío con datos sintéticos. No se ejecutó el funnel real ni se envió solicitud en este discovery.

## 9. Next Best Slice y dictamen
**Next Best Slice: DISNEY-PRICE-SCOPE-01.** Validar rentabilidad real y alcance de tarifa tiene prioridad sobre captar tráfico. Aceptación: precio/coste por ruta/plazas/sentido, bases comparables, inclusiones, M y B conocidos; checkout y ERP intactos. No comenzar implementación hasta aprobación.
**Opportunity Radar:** conversión: oferta única; ticket: ida/vuelta si rentable; confianza: total e inclusiones; segmento: familias España; SEO: guía existente→landing; riesgo: precio/idioma/sillas no acreditados; micro-PR: matriz económica; R0 ahora/R1 flujo/R2 dinero; validar antes de invertir.
**Cierre:** documento + propuesta visual + trazabilidad, sin runtime, DNS, anuncios, precios publicados, DB o despliegue. Technical verdict HOLD; product verdict improves conversion (hipótesis). Mayor oportunidad pendiente: margen y atribución fiables. Gates de implementación pendientes; borrador para revisión del CTO.
