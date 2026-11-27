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
