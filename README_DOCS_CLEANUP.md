# ⏸️ PR DOCS/CLEANUP - PAUSADO

**Fecha:** 2025-12-17  
**Estado:** PAUSADO - No mergear

---

## 🚫 RAZÓN DEL PAUSE

Este PR fue creado asumiendo que PR #5 hardcodeaba los fees de Stripe.

**PR #5 fue corregido** para mantener la lectura de variables de entorno:
```typescript
export const STRIPE_FEE_CONFIG = {
  WORST_CASE_PERCENT: parseFloat(
    process.env.STRIPE_WORST_CASE_FEE_PERCENT || "3.5",
  ),
  WORST_CASE_FIXED_EUR: parseFloat(
    process.env.STRIPE_WORST_CASE_FEE_FIXED_EUR || "0.25",
  ),
};
```

Por lo tanto, **la documentación actual sigue siendo correcta**.

---

## 📋 CONTENIDO DE ESTE PR (OBSOLETO)

Este PR marcaba como obsoletas las siguientes variables:
- `STRIPE_WORST_CASE_FEE_PERCENT`
- `STRIPE_WORST_CASE_FEE_FIXED_EUR`

**Pero estas variables SIGUEN SIENDO VÁLIDAS** después de la corrección de PR #5.

---

## ✅ CAMBIOS ÚTILES DE ESTE PR

Algunos cambios siguen siendo útiles:

### 1. Archivos temporales eliminados (9)
```
✅ baseline-main-new.txt
✅ baseline-main-updated.txt
✅ commit-msg.txt
✅ type-check-*.txt (6 archivos)
```

### 2. `.gitignore` actualizado
```gitignore
# Temporary files (testing, type-check, etc.)
baseline-*.txt
type-check-*.txt
commit-msg.txt
```

### 3. Documentos de audit agregados
- `AUDIT_DOCS_DESACTUALIZADOS.md` (útil como referencia)
- `VERIFICACION_ENV_VARS.md` (útil como referencia)

### 4. `PRECIOS_ACTUALIZADOS.md` marcado como LEGACY
- Sigue siendo correcto (es V1.0, no V3.1.2)

---

## 🔄 PRÓXIMOS PASOS

### Opción 1: Cerrar este PR y crear uno nuevo
- Cerrar este PR
- Crear nuevo PR solo con cambios útiles (#1, #2, #3, #4)
- Eliminar cambios obsoletos sobre env vars

### Opción 2: Actualizar este PR
- Revertir cambios en:
  - `.env.deployment-checklist.md`
  - `DEPLOYMENT_V312.md`
  - `RUNBOOK_DEPLOYMENT_V312.md`
  - `sistema de precios.md`
- Mantener solo cambios útiles

### Opción 3: Esperar decisión sobre config de fees
- Si se decide mover fees a DB/tabla
- Entonces este PR volvería a ser relevante
- Pero con ajustes según la nueva fuente de verdad

---

## 🎯 RECOMENDACIÓN

**Cerrar este PR** y crear uno nuevo más simple:

```
docs: cleanup - remove temp files, update gitignore, mark legacy docs

- Remove 9 temporary files (baseline-*.txt, type-check-*.txt)
- Update .gitignore to prevent temp files
- Add audit documents for reference
- Mark PRECIOS_ACTUALIZADOS.md as LEGACY V1.0
```

**NO incluir** cambios sobre variables de entorno (siguen siendo válidas).

---

## 📊 ESTADÍSTICAS

**Cambios totales en este PR:**
```
8 files changed, 384 insertions(+), 21 deletions(-)
```

**Cambios útiles (estimado):**
```
4 files changed, ~250 insertions(+), ~10 deletions(-)
```

**Cambios obsoletos (estimado):**
```
4 files changed, ~134 insertions(+), ~11 deletions(-)
```

---

## 🔗 REFERENCIAS

- **PR #5 (corregido):** https://github.com/geinersito/paris-luxe-journey/pull/5
- **Commit PR #5:** `93f8886`
- **Este PR:** https://github.com/geinersito/paris-luxe-journey/pull/new/docs/cleanup-post-rev-b
- **Resumen corrección:** `RESUMEN_CORRECCION_PR5.md`

