# ✅ CORRECCIÓN PR #5 - REV B

**Fecha:** 2025-12-17  
**Acción:** Revertir hardcodeo de fees, mantener solo eliminación de validación bloqueante

---

## 🎯 PROBLEMA DETECTADO

PR #5 original hacía **DOS cambios**:
1. ✅ Eliminar validación bloqueante de margen (CORRECTO)
2. ❌ Hardcodear fees de Stripe (INCORRECTO)

**Código problemático:**
```typescript
export const STRIPE_FEE_CONFIG = {
  WORST_CASE_PERCENT: 3.5,
  WORST_CASE_FIXED_EUR: 0.25,
};
```

---

## ✅ SOLUCIÓN APLICADA

**Revertir solo el cambio #2**, manteniendo lectura de `process.env`:

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

## 📊 DIFF FINAL (main vs PR #5)

```diff
diff --git a/src/services/pricing/calculatePricing.ts b/src/services/pricing/calculatePricing.ts
index 1d6eb02..debbbb8 100644
--- a/src/services/pricing/calculatePricing.ts
+++ b/src/services/pricing/calculatePricing.ts
@@ -117,19 +117,9 @@ export const calculatePricing = (
     prepaidPrice = flexiblePrice - prepaidDiscount;
   }
 
-  // VALIDACIÓN DE MARGEN
-  // prepaid_price - SF_WORST_CASE(prepaid_price) - PF >= 2€ (200 céntimos)
+  // REV B: Cálculo de margen (informativo, no bloqueante)
   const stripeFee = computeWorstCaseFee(prepaidPrice);
   const marginAfterFees = prepaidPrice - stripeFee - partnerFloor;
-  const MIN_MARGIN = 200; // €2.00
-
-  if (marginAfterFees < MIN_MARGIN) {
-    throw new Error(
-      `Insufficient margin for ${routeKey} ${vehicleType}: ` +
-        `margin=${marginAfterFees}¢ (min=${MIN_MARGIN}¢). ` +
-        `prepaid=${prepaidPrice}¢, fee=${stripeFee}¢, pf=${partnerFloor}¢`,
-    );
-  }

   // Construir resultado
   const result: PricingResult = {
```

**Cambios:**
- ✅ Solo elimina validación bloqueante (`if (marginAfterFees < MIN_MARGIN)`)
- ✅ Mantiene lectura de variables de entorno
- ✅ Mantiene comentario "REV B: Cálculo de margen (informativo, no bloqueante)"

---

## 🧪 TESTS

**Corrección adicional:** Test de CDG_PARIS van tenía valores incorrectos.

**Antes:**
```typescript
expect(result?.prepaid_price).toBe(10800); // INCORRECTO
expect(result?.flexible_price).toBe(11300); // INCORRECTO
```

**Después:**
```typescript
expect(result?.prepaid_price).toBe(11200); // €112.00 (PF 104 + FC 13 - PD 5)
expect(result?.flexible_price).toBe(11700); // €117.00 (PF 104 + FC 13)
```

**Resultado:** ✅ 14/14 tests passing

---

## 📝 COMMITS

**Commit anterior:** `913d975` (hardcodeaba fees)  
**Commit nuevo:** `93f8886` (mantiene env vars)

**Mensaje:**
```
revb(pricing): remove blocking margin validation only - keep env vars
```

---

## 🔗 PR ACTUALIZADO

**URL:** https://github.com/geinersito/paris-luxe-journey/pull/5  
**Estado:** ✅ Actualizado con force-push  
**Tests:** ✅ 14/14 passing

---

## 📋 PRÓXIMOS PASOS

1. ✅ **PR #5 corregido** - Listo para review/merge
2. ⏸️ **PR docs/cleanup** - PAUSADO hasta que PR #5 se mergee
3. 🔄 **Después del merge:** Recrear PR de docs/cleanup alineado con la fuente real de verdad (env vars)

---

## 🎯 CONCLUSIÓN

PR #5 ahora hace **exactamente lo que debe hacer**:
- ✅ Elimina validación bloqueante de margen
- ✅ Mantiene configuración de fees desde variables de entorno
- ✅ No introduce cambios innecesarios
- ✅ Todos los tests pasan

**Documentación actual sigue siendo correcta** hasta que se decida mover la config a DB/tabla.

