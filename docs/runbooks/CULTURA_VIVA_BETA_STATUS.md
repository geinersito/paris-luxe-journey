# Cultura Viva — beta mínima, candidata local

2 de noviembre de 2026 · `CULTURA-VIVA-BETA-MINIMA` · R1 · **Preparación local cerrada y aceptada por CTO / lanzamiento público NO-GO**.

**Dictamen CTO recibido el 2/11:** GO beta local de cinco actividades y GO circuito editorial/Cockpit local. Migraciones de `reservavtc` HOLD. No se reabre el piloto, no se añaden funciones ni se generan paquetes técnicos. Los resultados que siguen son los comunicados por Codex; el CTO no los ha reproducido independientemente.

## Listo

Previsualización en el ordenador de Boris: `http://127.0.0.1:8083/events`. cinco tarjetas ordenadas por fecha, con título, lugar, precio/acceso y extracto. Cada una abre una ficha individual con el relato completo, condiciones y fuente oficial. El presupuesto de transporte se solicita desde la ficha vigente, bajo confirmación de disponibilidad y tarifa.

El piloto aprobado está congelado en `cultura-viva-piloto-editorial-aprobado.md`; la referencia técnica 08 permanece intacta. La valoración favorable es el retorno comunicado por Boris; no se presenta como una prueba independiente, asistencia real o conversión medida.

| Actividad candidata | Fecha o período | Fuente comprobada |
|---|---|---|
| Seokguram, Centre culturel coréen | Exposición hasta 13/03/2027; próximos horarios reales, sin 11/11 | [Programa](https://www.coree-culture.org/exposition-la-grotte-de-seokguram,6714.html) y [acceso](https://www.coree-culture.org/-infos-pratiques,218-.html) |
| Žižek Says!, Institut finlandais | 12/11, 20h; fin desconocida; 15 € annoncés | [Organizador y billetterie](https://www.institut-finlandais.fr/boutique/produit/concert-dessine-zizek-says/) |
| Grands Lacs, apertura excepcional | 14/11, 14h–20h30; última entrada 20h; visitas reservadas | [Programa del centro en Paris.fr](https://www.paris.fr/evenements/ouverture-exceptionnelle-et-visites-guidees-exposition-robert-burley-grands-lacs-l-horizon-commun-des-mers-interieures-117373) |
| Redoubt, Le Grand Action | 17/11, 20h; 11,60 € plein tarif; fin del encuentro sin confirmar | [Instituto organizador](https://paris.si.se/agenda/cine-club-nordique-redoubt/) y [billetterie de la sesión](https://pariscinemagrandaction.cine.boutique/media/2479?showId=38831&title=REDOUBT&visanumber=2026006652) |
| Jazzycolors, Linda Fredriksson y Tuomo Prättälä | 19/11, 20h; puertas 19h; 10 € annoncés | [Organizador y billetterie](https://www.institut-finlandais.fr/boutique/produit/jazzycolors-2026-linda-fredriksson-tuomo-prattala/) |


Fuentes contrastadas de nuevo el 2/11. Cuatro relatos proceden del piloto; Jazzycolors es una ficha breve preparada desde otro candidato ya importado. Las cinco versiones están en el sandbox local, revisadas/aprobadas/publicadas mediante los RPC existentes y una cuenta desechable. Ninguna está publicada remotamente. Cocina y encuentro literario quedan fuera por inscripción no confirmada y contradicción de lugar. No se promete stock de entradas ni admisión de menores sin evidencia.

## Proyecto compartido confirmado

**`urjsnguzzzwcnaxwghbo` (`reservavtc`)** coincide en `supabase/config.toml`, `src/integrations/supabase/client.ts` y el JavaScript público servido actualmente por `https://eliteparistransfer.com`. La comprobación fue de lectura, sin exportar claves; no se eligió por el nombre. Se prepara `/events` en el dominio existente, sin crear otro proyecto.

Cultura Viva conserva sus tablas `content_event_*`, RPC `content_event_editor_*` y auxiliares `cultura_viva_private`, con GRANT restringidos y RLS. El gateway valida usuario, sesión y pertenencia editorial; el público recibe solo la proyección publicada. Auth y recursos del proyecto siguen compartidos con Booking. Este incremento no cambia migraciones SQL, permisos de tablas ni lógica de reservas/pagos. Reutiliza la base editorial aceptada y sus pruebas locales. **El bloqueo de migraciones productivas sigue vigente: no ejecutar `db push` ni aplicar en bloque las migraciones.**

## Preparación y comprobaciones

- Entrada remota `cultura-viva-beta` preparada, apagada por defecto; reutiliza el handler existente. Orígenes HTTPS exactos, prefijo de función y secretos solo en servidor. `verify_jwt=false` afecta únicamente a esa función para permitir el feed público; sus rutas privadas conservan Auth y autorización SQL. Las funciones de Booking no se modifican. [Referencia oficial de autenticación](https://supabase.com/docs/guides/functions/auth).
- Caché de 20 s por instancia con relectura de base; SSE acotado a 120 s y 32 canales por instancia. Retirada/restauración entre dos gateways comprobada en local, sin broker nuevo. Vigencia live de cliente de 45 s y respaldo de cinco minutos solo para consulta. El funcionamiento alojado aún debe verificarse; no se promete retirada instantánea. [Límites del runtime](https://supabase.com/docs/guides/functions/limits).
- **195 tests frontend, 117 backend y 22 controles HTTP de acceso PASS**; un harness histórico de integración ignorado intencionalmente. Retirada y recuperación probadas con Auth/RPC locales reales, conservando la verificación factual. Type-check, lint explícito y builds normal/beta PASS. Build beta con origen SEO correcto; configuración pública en `scripts/cultura-viva/beta.env.example`, flags apagados.
- Navegador de escritorio: cinco tarjetas, navegación y recarga de ficha; JSON-LD solo en la ficha correspondiente, sin fin inventado. Al detener el gateway quedan relato y aviso de consulta, con cero CTA contextual y cero Event JSON-LD; ambos recuperan al reiniciarlo. Ancho medido de 1000 px sin desbordamiento. La herramienta no aplicó los 390 px solicitados: no se declara QA móvil superada.

Código principal: `PublishedEvents.tsx`, `PublishedEventTeaser.tsx`, rutas `Events.tsx`/`App.tsx`, configuración de entrega, `cultura-viva-editorial/gateway.ts`, `cultura-viva-beta/index.ts` y cinco revisiones en `scripts/cultura-viva/beta/`. Evidencia en `work/beta-minima/`. Sin nuevo paquete CTO.

## Secuencia única hasta la autorización de lanzamiento

1. **Recuperación e historial de `reservavtc`: pendiente.** Identificar una copia recuperable (fecha/punto, alcance, acceso y responsable), ensayar su restauración en un destino aislado autorizado y registrar tiempos, integridad y reconciliación de cambios posteriores. La recuperación del feed probada en local no acredita una restauración de la base compartida. La documentación de Supabase explica alcance y limitaciones de las copias; el estado real de las copias de este proyecto no se ha verificado en esta preparación. [Copias y restauración](https://supabase.com/docs/guides/platform/backups).

   Comparar el historial local/remoto actual en modo lectura y delimitar el lote de Cultura Viva. El registro `docs/ops/MIGRATIONS_RECONCILIATION.md` describe una reconciliación histórica; no acredita sincronización actual. `docs/db-governance/PLJ-DB-001-CROSSREPO-AUDIT.md` conserva bloqueos históricos sobre objetos ERP `dispatch_*`: cualquier reparación global requiere coordinar su propiedad y alcance. No incluir esas reparaciones en la beta cultural. No ejecutar `db push`, `migration repair`, restauraciones ni SQL remoto sin autorización específica. [Gestión de migraciones](https://supabase.com/docs/guides/deployment/database-migrations).
2. **Una validación integral alojada: pendiente de entorno autorizado.** Con la beta inicialmente desactivada, comprobar permisos/Auth/sesión revocada, GRANT/RLS, aislamiento de borradores, publicación/retirada, caducidad/JSON-LD, desconexión/recarga/recuperación, proxy/SSE, móvil y reservas A/B/C/D en modo de prueba. Reconfirmar las cinco fichas al activar; verificación factual máxima de siete días y operación manual con Cron apagado. No se ha enviado una reserva o pago productivo.
3. **Una decisión final GO/NO-GO.** Presentar resultado integral, riesgos residuales, responsable de operación y reversión; Boris autoriza el lanzamiento. La preparación local queda cerrada y se conserva la candidata actual.

Reversión prevista: detener la exposición beta y sus streams; el cliente pasa a consulta y caduca la copia. Restaurar el artefacto anterior del sitio si falla la integración, conservando el historial editorial privado. Una restauración de la base compartida afecta también a reservas y ERP: requiere su propio procedimiento autorizado, con tratamiento de cambios posteriores al punto de recuperación. No ejecutar rollback destructivo como parte de una retirada de Cultura Viva.

**HOLD:** código/commits/push/PR de la candidata, migraciones remotas, despliegues, lanzamiento y Cron. La subida solicitada de este único resumen a una rama documental de GitHub queda separada del código; `main` no cambia y no se abre PR. No MERGE-READY. Sin nuevas funcionalidades o paquetes técnicos.

## OPPORTUNITY RADAR

- Conversion upside: elección rápida y relato antes de solicitar transporte; conversión sin medir.
- Average ticket upside: no demostrado.
- Trust/friction upside: fechas, precio y condiciones visibles.
- Segment opened: observar visitantes culturales durante la beta.
- SEO/editorial upside: fichas específicas; beta noindex.
- Operational promise risk: entradas, horarios y disponibilidad VTC requieren confirmación.
- Suggested micro-PR: ninguno nuevo; únicamente compartir el resumen solicitado, sin PR.
- Risk class: R1, proyecto compartido con Booking.
- Why now / why later: examinar cinco salidas ahora; escalar después.

Technical verdict: GO local aceptado y cerrado / NO-GO lanzamiento. Product verdict: dos niveles de lectura disponibles; utilidad por observar durante la beta. Do-not-promise guardrail: aprobación editorial favorable no equivale a conversión ni validación remota.
