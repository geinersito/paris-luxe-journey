# 🔍 VERIFICACIÓN: Variables de Entorno STRIPE_WORST_CASE_*

**Fecha:** 2025-12-17  
**Contexto:** Verificación pre-actualización de docs (Post PR #5)

---

## 📊 RESULTADO DE `git grep`

### **En `main` (antes de PR #5):**

```bash
$ git grep "STRIPE_WORST_CASE" -- "*.ts" "*.tsx" "*.js" "*.jsx"

src/services/pricing/calculatePricing.ts:    process.env.STRIPE_WORST_CASE_FEE_PERCENT || "3.5",
src/services/pricing/calculatePricing.ts:    process.env.STRIPE_WORST_CASE_FEE_FIXED_EUR || "0.25",
```

**Código en `main`:**
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

---

### **En `rev-b-remove-blocking-margin-validation` (después de PR #5):**

```bash
$ git grep "STRIPE_WORST_CASE" -- "*.ts" "*.tsx" "*.js" "*.jsx"

(sin resultados)
```

**Código en PR #5:**
```typescript
export const STRIPE_FEE_CONFIG = {
  WORST_CASE_PERCENT: 3.5,
  WORST_CASE_FIXED_EUR: 0.25,
};
```

---

## ✅ CONCLUSIÓN

### **ANTES (main):**
- ✅ Variables `STRIPE_WORST_CASE_FEE_PERCENT` y `STRIPE_WORST_CASE_FEE_FIXED_EUR` **SÍ se usan**
- ✅ Se leen de `process.env` con fallback a valores por defecto
- ✅ Documentación en `.env.deployment-checklist.md` y otros **ES CORRECTA**

### **DESPUÉS (PR #5):**
- ❌ Variables `STRIPE_WORST_CASE_*` **YA NO se usan**
- ✅ Valores hardcoded: `3.5` y `0.25`
- ⚠️ Documentación en `.env.deployment-checklist.md` y otros **QUEDA OBSOLETA**

---

## 🎯 IMPACTO EN DOCUMENTACIÓN

### **Documentos que quedarán obsoletos DESPUÉS de mergear PR #5:**

1. `.env.deployment-checklist.md` (líneas 51-52, 83-84, 148-149)
2. `DEPLOYMENT_V312.md` (líneas 110-111, 128-129)
3. `RUNBOOK_DEPLOYMENT_V312.md` (líneas 36-37)
4. `sistema de precios.md` (líneas 112-113)

### **Acción requerida:**
- ✅ **ESPERAR** a que PR #5 se mergee a `main`
- ✅ **LUEGO** crear PR de docs/cleanup para actualizar documentación
- ✅ **NO actualizar** docs antes del merge (estarían incorrectos en `main`)

---

## 📝 RECOMENDACIÓN

**Orden correcto:**
1. ✅ Mergear PR #5 a `main`
2. ✅ Crear PR de docs/cleanup desde `main` actualizado
3. ✅ Actualizar 4 documentos críticos
4. ✅ Marcar 2 documentos como LEGACY
5. ✅ Eliminar archivos temporales
6. ✅ Actualizar `.gitignore`

---

## 🔗 REFERENCIAS

- **PR #5:** https://github.com/geinersito/paris-luxe-journey/pull/5
- **Commit:** 913d975
- **Archivo modificado:** `src/services/pricing/calculatePricing.ts`

