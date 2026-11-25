# Dominio y especialización Disneyland Paris — discovery
25/11/2026 · Europe/Paris · Plan item: SEO-DISNEY-DOMAIN-DISCOVERY-01.
**Estado: PENDIENTE de revisión CTO. R0 documental. Sin implementación ni despliegue.**

## Decisión estratégica del propietario

Conservar eliteparistransfer.com como dominio principal y Paris Elite Services como marca.
Especializar la captación Disneyland Paris mediante páginas comerciales dentro del dominio, reutilizando contenido, pricing y solicitud de traslado existentes.
No registrar dominios, cambiar DNS, migrar URLs, modificar identidad o presentar afiliación oficial con Disneyland Paris.
El nombre permite ampliar destinos; que “Elite” genere percepción de precio alto es una hipótesis comercial, no una medición.
“Económico” requiere tarifas competitivas comparables y margen sostenible: no se valida esa promesa en este discovery.

## Alcance y evidencia

Base del repositorio Booking: [94baae0](https://github.com/geinersito/paris-luxe-journey/commit/94baae0c228d8ad9cab40b5ab2bb9a273520a100).
SSOT verificado en el árbol GitHub de ese commit: IMPROVEMENTS 48286 B, STATUS 26880 B, SUPERVISOR 9880 B, BOOKING_MODEL 10960 B, BOOKING_STATUS 9102 B, BOOKING_RUNBOOK 18477 B.
Todos presentes y no vacíos; comprobación remota, sin inventar salida de un checkout local o de un script.
Se inspeccionaron rutas, idiomas, metadata, generador SEO, configuración de rutas Disney, metadatos del blog y formulario público.
También se abrieron la portada, /booking, /robots.txt y /sitemap.xml en el navegador el 25/11/2026.
El código de main y la web publicada se tratan como fuentes distintas: no se ha probado equivalencia de sus bundles.
No se enviaron formularios, presupuestos, mensajes o pagos ni se accedió a datos privados de viajeros.

## Inventario reutilizable

| Pieza | Hallazgo | Decisión |
|---|---|---|
| Marca/dominio | Paris Elite Services y eliteparistransfer.com ya usados | Conservar |
| Aeropuertos | /airports, /airports/cdg, /airports/orly, /airports/beauvais | Reutilizar |
| Excursiones | /excursions y detalles Versailles/Champagne/Loire/Giverny | Conservar expansión |
| Disneyland comercial | Sin landing dedicada en src/App.tsx revisado | Nueva página futura, no otro sitio |
| Disneyland editorial | Post transport/paris-airport-to-disneyland-transfer-guide-families | Reutilizar y enlazar, sin duplicar artículo |
| Destino/formulario | Disneyland Paris ya figura en los destinos públicos de /booking | Mantener solicitud existente |
| Pricing | Config contiene CDG_DISNEY, ORLY_DISNEY y DISNEY_PARIS | Existencia no valida tarifa pública ni coste operativo |
| Idiomas | Diccionarios EN/ES/FR/PT y selector existentes | Traducción de UI no equivale a URLs indexables por idioma |

[Router](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/src/App.tsx), [post](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/src/data/blog/posts.meta.ts#L168-L228), [pricing](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/src/config/pricing-v312.ts#L219-L272), [solicitud](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/src/pages/booking/index.tsx#L31-L79).

## Hallazgos SEO priorizados

| Prioridad | Evidencia | Implicación |
|---|---|---|
| P1 — artefactos publicados | /robots.txt y /sitemap.xml muestran la vista de aplicación “404 / Page not found”, no sus documentos esperados | Comprobar empaquetado, publicación y respuesta HTTP antes de ampliar páginas |
| P1 — idioma/URL | Selector mayormente cambia preferencia local; solo se encontró :lang/airports como variante de ruta general | Definir URLs estables para las nuevas páginas, sin asumir /es/ global existente |
| P1 — alternates | Sin link[hreflang] en DOM renderizado de Home y /booking; PR-SEO-HREFLANG-01 ya figura TODO | Reutilizar ese backlog, evitando otro helper paralelo o alternates ficticios a la misma URL |
| P2 — metadata | Home: canonical correcto al dominio raíz; dos meta description simultáneas | Revisar la base index.html y Helmet sin perder metadata de otras páginas |
| P2 — sitemap/inventario | Generador usa una lista estática que no incluye varias rutas comerciales actuales | Contrastar inventario antes de añadir rutas nuevas |
| Pendiente — cobertura real | Resultados públicos muestran Home/booking/FAQ; sin acceso a Search Console | No afirmar cobertura, posiciones, tráfico o conversiones |

La vista 404 es evidencia de navegador, no una medición del status HTTP ni diagnóstico definitivo del servidor.
La ausencia de un robots o sitemap válido no demuestra que Google tenga bloqueado o desindexado todo el sitio.
El generador existe y package.json lo ejecuta tras vite build; la causa exacta de la discrepancia publicada sigue pendiente.
El script genera base localhost:8082 si falta/está mal VITE_PUBLIC_SITE_URL: comprobar el artefacto de producción sin cambiar variables ahora.
La UI observada mostró selector FR mientras gran parte del contenido y document.lang estaban en EN; requiere reproducción por idioma. No se corrigió.
[index.html](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/index.html), [generador](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/scripts/generate-seo.mjs), [idioma](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/src/contexts/LanguageContext.tsx), [selector](https://github.com/geinersito/paris-luxe-journey/blob/94baae0c228d8ad9cab40b5ab2bb9a273520a100/src/components/LanguageSelector.tsx).

## Arquitectura comercial propuesta

1. Una página principal de traslados Disneyland Paris: familias, maletas, vehículos por capacidad y solicitud de presupuesto.
2. Desarrollar después CDG ↔ Disneyland, Orly ↔ Disneyland y París ↔ Disneyland si demanda y contenido propio lo justifican.
3. Integrar ida/vuelta y necesidades familiares en la oferta inicial; no multiplicar páginas casi idénticas solo por palabras clave.
4. Enlazar desde aeropuertos y guía familiar a la página comercial y de esta al formulario existente.
5. Mantener excursiones, aeropuertos y servicios premium bajo la misma marca.

La ruta sugerida antes /es/traslados-disneyland-paris era conceptual: hoy no hay router global /es/ que la soporte.
Decidir slugs y variantes de idioma antes de crear la landing; no sustituir ni redirigir URLs actuales en este alcance.
Hreflang deberá referir versiones reales, auto-referencia y enlaces recíprocos. Canonical y contenido coherentes por versión.
Las tarifas mostrarán total por vehículo, pasajeros/equipaje y condiciones comprobadas. No inventar descuentos, disponibilidad, idiomas, sillas o tiempos de respuesta.
Presentar Disneyland Paris como destino; no utilizar “oficial”, “partner” o elementos que sugieran afiliación no acreditada.
El formulario actual es quote-first: /booking deriva a /booking/pending. No reactivar checkout ni modificar pricing/Stripe para una campaña.

## PLAN por pasos y gates

| Paso | Entregable previsto | Archivos probables | Estimación |
|---|---|---|---|
| 1 — SEO-ASSET-DELIVERY-PREFLIGHT-01 | Preflight reproducible en preview/paquete, identificando causa de robots/sitemap antes de corregir | docs/runbooks/HOSTINGER_ROOT_ERP_DEPLOY.md; este audit; IMPROVEMENTS; STATUS | 40–90 líneas netas, R0 documental |
| 2 — PR-SEO-HREFLANG-01 (reutilizar) | Decisión de URLs/idiomas y alcance real de alternates | App.tsx, LanguageContext, helper SEO y diccionarios según decisión | PLAN detallado pendiente; routing R1, no tratar todo como R0 |
| 3 — Landing Disney | Una página comercial con CTA al formulario y metadata propias | Nueva página, App.tsx, i18n/types y SEO según diseño aprobado | Separar foundation/traducciones/UI en micro-PRs; sin estimación cerrada antes del paso 2 |

Cada implementación futura requiere aprobación, <200 líneas netas y ≤4 archivos salvo excepción explícita prevista por gobernanza.
No crear una PR grande que mezcle rutas, pricing, checkout y contenido. Esta PR solo publica auditoría, decisión y trazabilidad.
Para paso 1: comprobar existencia de dist/robots.txt y dist/sitemap.xml, base HTTPS correcta, sintaxis XML/texto y su conservación en el paquete de publicación.
Una futura validación pública requerirá comprobar respuesta HTTP y contenido servido; el deploy y los cambios de servidor necesitan autorización independiente.
Para una landing futura: enlace directo sin 404, idioma correcto tras refresh, H1/meta/canonical consistentes, CTA con contexto y ninguna nueva promesa no validada.
Gates runtime, smoke A/B/C/D si routing cambia y métricas de Search Console/conversión corresponden a fases posteriores.
No hay gasto adicional en este discovery; no se propone cambio de dominio como solución al SEO.

## Opportunity Radar

- **Conversion upside:** intención Disney más clara y transición a solicitud existente; sin uplift medido.
- **Average ticket upside:** ida/vuelta y vehículo adecuado a grupo, sujeto a coste y capacidad.
- **Trust/friction upside:** precio/condiciones coherentes, idioma fiable y destino claro.
- **Segment opened:** familias que buscan traslado privado con presupuesto controlado.
- **SEO/editorial upside:** conectar artículo ya existente con una landing útil y versiones reales.
- **Operational promise risk:** “económico”, 24/7, sillas, idiomas, disponibilidad y respuesta deben validarse.
- **Suggested micro-PR:** SEO-ASSET-DELIVERY-PREFLIGHT-01.
- **Risk class:** R0 documental ahora; R1 para futura ruta/idioma; R2 si alguien propone dinero/checkout.
- **Why now / why later:** resolver discrepancia publicada e idiomas antes de invertir en más páginas o anuncios.

## Cierre

- **Summary:** dominio y marca conservados; discovery identifica reutilización y prerrequisitos para la especialización.
- **Files touched:** audit + trazabilidad en IMPROVEMENTS/STATUS; ningún archivo runtime.
- **Non-goals:** DNS, dominios nuevos, migración, afiliación, precios, DB, checkout, cuentas o despliegue.
- **Risks / follow-ups:** status HTTP, causa de publicación, consistencia por idioma y métricas no verificadas.
- **Evidence Pack:** árbol SSOT remoto; revisión estática; navegación pública y metadata DOM. Gates de implementación pendientes.
- **Technical verdict:** HOLD para implementación; borrador documental para revisión.
- **Product verdict:** improves conversion (hipótesis, no resultado medido).
- **Commercial upside:** aprovechar marca, contenido y formulario existentes sin gasto en otro dominio.
- **Missed opportunity:** guía Disney existente sin landing comercial específica en el router.
- **Suggested next micro-PR:** preflight de entrega de artefactos SEO; luego aprobación del alcance comercial.
- **Do-not-promise guardrail:** sin afiliación oficial, “más barato”, disponibilidad o ROI no demostrados.

Referencias primarias: [idiomas](https://developers.google.com/search/docs/specialty/international/localized-versions), [robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
