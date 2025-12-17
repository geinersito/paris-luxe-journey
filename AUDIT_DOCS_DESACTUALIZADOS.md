# 🔍 AUDIT DE DOCUMENTACIÓN - DESACTUALIZADA

**Fecha:** 2025-12-17
**Contexto:** Post REV B (PR #5 - Remove blocking margin validation)

⚠️ **IMPORTANTE:** Este audit identifica documentos que quedarán obsoletos **DESPUÉS** de mergear PR #5.
📋 **Ver:** `VERIFICACION_ENV_VARS.md` para detalles de `git grep`

---

## 📊 RESUMEN EJECUTIVO

### ✅ **Documentos ACTUALIZADOS (No requieren cambios)**
- `PROMPT_CTO.md` - ✅ Actualizado, no menciona validación bloqueante
- `FRONTEND_INTEGRATION_GUIDE.md` - ✅ Correcto, no menciona margen
- `GATE_COHERENCIA_V312.md` - ✅ Correcto, solo estados canónicos
- `PLAN_ACCION_INMEDIATO.md` - ✅ Correcto, plan de deployment
- `TESTING_E2E_V312.md` - ✅ Correcto, tests E2E

### ⚠️ **Documentos DESACTUALIZADOS (Requieren actualización)**

#### **CRÍTICOS (Impactan deployment):**
1. ❌ `.env.deployment-checklist.md` - Menciona `STRIPE_WORST_CASE_FEE_PERCENT` (ya no se usa)
2. ❌ `DEPLOYMENT_V312.md` - Menciona variables de entorno obsoletas
3. ❌ `RUNBOOK_DEPLOYMENT_V312.md` - Menciona variables de entorno obsoletas
4. ❌ `sistema de precios.md` - Menciona variables de entorno obsoletas

#### **INFORMATIVOS (No bloquean deployment):**
5. ⚠️ `PRECIOS_ACTUALIZADOS.md` - Versión antigua (v1.0), debería ser v3.1.2
6. ⚠️ `CORRECCIONES_CRITICAS_V312.md` - Puede tener referencias obsoletas

### 🗑️ **Documentos OBSOLETOS (Candidatos a eliminar)**
- `baseline-main-new.txt` - Archivo temporal de testing
- `baseline-main-updated.txt` - Archivo temporal de testing
- `commit-msg.txt` - Archivo temporal de commit
- `type-check-*.txt` - Archivos temporales de type-check (8 archivos)

---

## 🔧 ACCIONES REQUERIDAS

### **PRIORIDAD 1: Variables de Entorno (CRÍTICO)**

**Problema:** Varios documentos mencionan variables de entorno que ya no se usan:
- `STRIPE_WORST_CASE_FEE_PERCENT`
- `STRIPE_WORST_CASE_FEE_FIXED_EUR`

**Razón:** Después de REV B (PR #5), estos valores están hardcoded en el código:
```typescript
export const STRIPE_FEE_CONFIG = {
  WORST_CASE_PERCENT: 3.5,
  WORST_CASE_FIXED_EUR: 0.25,
};
```

**Archivos a actualizar:**
1. `.env.deployment-checklist.md`
2. `DEPLOYMENT_V312.md`
3. `RUNBOOK_DEPLOYMENT_V312.md`
4. `sistema de precios.md`

**Acción:** Eliminar referencias a estas variables o marcarlas como "OBSOLETAS (REV B)"

---

### **PRIORIDAD 2: Documentos Informativos**

#### **PRECIOS_ACTUALIZADOS.md**
- **Estado:** Versión v1.0 (antigua)
- **Problema:** No refleja V3.1.2 (prepaid/flexible)
- **Acción:** Actualizar o marcar como "LEGACY - Ver PROMPT_CTO.md para V3.1.2"

#### **CORRECCIONES_CRITICAS_V312.md**
- **Estado:** Puede tener referencias a validación de margen
- **Acción:** Revisar y actualizar si menciona `validateMargin` o `MIN_MARGIN`

---

### **PRIORIDAD 3: Limpieza de Archivos Temporales**

**Archivos a eliminar:**
```
baseline-main-new.txt
baseline-main-updated.txt
commit-msg.txt
type-check-complete.txt
type-check-final-complete.txt
type-check-final.txt
type-check-i18n-after.txt
type-check-i18n-final.txt
type-check-i18n.txt
```

**Comando:**
```powershell
Remove-Item baseline-main-*.txt, commit-msg.txt, type-check-*.txt
```

---

## 📋 CHECKLIST DE ACTUALIZACIÓN

### **Fase 1: Variables de Entorno (30 min)**
- [ ] Revisar `.env.deployment-checklist.md`
- [ ] Revisar `DEPLOYMENT_V312.md`
- [ ] Revisar `RUNBOOK_DEPLOYMENT_V312.md`
- [ ] Revisar `sistema de precios.md`
- [ ] Marcar variables como "OBSOLETAS (REV B)" o eliminarlas

### **Fase 2: Documentos Informativos (20 min)**
- [ ] Actualizar `PRECIOS_ACTUALIZADOS.md` o marcarlo como LEGACY
- [ ] Revisar `CORRECCIONES_CRITICAS_V312.md`

### **Fase 3: Limpieza (5 min)**
- [ ] Eliminar archivos temporales (*.txt)
- [ ] Commit: "docs: cleanup obsolete files and update env vars (REV B)"

---

## 🎯 IMPACTO

### **Si NO se actualiza:**
- ⚠️ Desarrolladores intentarán configurar variables de entorno que no se usan
- ⚠️ Confusión en deployment (variables inexistentes)
- ⚠️ Documentación inconsistente con código actual

### **Si SÍ se actualiza:**
- ✅ Documentación alineada con REV B
- ✅ Deployment más claro (sin variables obsoletas)
- ✅ Menos confusión para futuros desarrolladores

---

## 📝 NOTAS

- Este audit se realizó después de PR #5 (REV B)
- Cambio principal: Eliminación de validación bloqueante de margen
- Variables de entorno `STRIPE_WORST_CASE_*` ya no se usan (valores hardcoded)

---

## 🔍 DETALLES POR ARCHIVO

### **1. .env.deployment-checklist.md**

**Líneas afectadas:** 51-52, 83-84, 148-149

**Problema:**
```bash
STRIPE_WORST_CASE_FEE_PERCENT=3.5
STRIPE_WORST_CASE_FEE_FIXED_EUR=0.25
```

**Solución:**
Agregar nota:
```markdown
⚠️ **OBSOLETO (REV B):** Estos valores ahora están hardcoded en `calculatePricing.ts`.
No es necesario configurarlos como variables de entorno.
```

---

### **2. DEPLOYMENT_V312.md**

**Líneas afectadas:** 110-111, 128-129

**Problema:**
```bash
STRIPE_WORST_CASE_FEE_PERCENT=3.5
STRIPE_WORST_CASE_FEE_FIXED_EUR=0.25
```

**Solución:**
Eliminar estas líneas o marcarlas como obsoletas.

---

### **3. RUNBOOK_DEPLOYMENT_V312.md**

**Líneas afectadas:** 36-37

**Problema:**
```bash
STRIPE_WORST_CASE_FEE_PERCENT=3.5
STRIPE_WORST_CASE_FEE_FIXED_EUR=0.25
```

**Solución:**
Eliminar estas líneas del checklist de variables de entorno.

---

### **4. sistema de precios.md**

**Líneas afectadas:** 112-113

**Problema:**
```bash
STRIPE_WORST_CASE_FEE_PERCENT=3.5
STRIPE_WORST_CASE_FEE_FIXED=0.25
```

**Solución:**
Marcar como obsoleto o eliminar.

---

### **5. PRECIOS_ACTUALIZADOS.md**

**Problema:**
- Título dice "V1.0"
- No menciona prepaid/flexible de V3.1.2
- Usa estructura antigua de precios

**Solución:**
Agregar header:
```markdown
⚠️ **LEGACY DOCUMENT - V1.0**

Este documento describe el sistema de precios antiguo.
Para V3.1.2 (prepaid/flexible), ver `PROMPT_CTO.md` sección "Arquitectura de Pagos".
```

---

## 📊 ESTADÍSTICAS

- **Total documentos revisados:** 35+
- **Actualizados:** 5 (14%)
- **Desactualizados críticos:** 4 (11%)
- **Desactualizados informativos:** 2 (6%)
- **Obsoletos (temporales):** 10 (29%)
- **Sin cambios necesarios:** 14+ (40%)

---

## ⏱️ TIEMPO ESTIMADO DE ACTUALIZACIÓN

- **Fase 1 (Críticos):** 30 minutos
- **Fase 2 (Informativos):** 20 minutos
- **Fase 3 (Limpieza):** 5 minutos
- **Total:** ~55 minutos

