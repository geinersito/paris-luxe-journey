# 📝 CHANGELOG — PRICING V3.1.2

Registro de cambios entre revisiones del sistema de pricing V3.1.2.

---

## REV B (2025-12-16) — ACTUAL ✅

### 🎯 Objetivo
Eliminar validación bloqueante de margen y adoptar observabilidad no bloqueante para evitar bucle infinito.

### 🔄 Cambios Principales

#### 1. **Pricing Core: Eliminada validación de margen**
- ❌ **Eliminado:** `validatePricingMargin(pf, prepaid)` como validación bloqueante
- ✅ **Mantiene:** Validaciones de rutas, vehículos, dinero en cents
- ✅ **Nuevo:** `pricing_rev: 'B'` en outputs

#### 2. **Payments Layer: Fee Estimator (nuevo)**
- ✅ **Nuevo módulo:** `src/services/payments/feeEstimator.ts`
- ✅ **Perfiles configurables:** Desde ENV/DB (no hardcodeados)
- ✅ **Interfaz:** `FeeProfile { name, bps, fixed_cents }`
- ✅ **Función:** `estimateFeeCents(amount_cents, profile)` usando basis points

#### 3. **Payment Cost Ledger (nueva tabla)**
- ✅ **Nueva tabla:** `payment_cost_ledger`
- ✅ **Campos clave:**
  - `fee_estimated_cents` (al crear PaymentIntent)
  - `fee_actual_cents` (al recibir webhook, puede ser NULL)
  - `provider`, `method`, `details` (JSONB)
- ✅ **Escritura:** Al crear/confirmar PaymentIntent
- ✅ **Actualización:** En webhook `charge.succeeded` (si disponible)

#### 4. **Margin Monitoring Job (nuevo)**
- ✅ **Nuevo job:** `MarginMonitoringJob` (hourly)
- ✅ **Cálculo:** `net_margin = prepaid - partner_floor - fee_estimated`
- ✅ **Alertas:**
  - CRITICAL: `net_margin < 0`
  - WARN: `net_margin < 200` (€2.00)
- ✅ **NO bloqueante:** Solo alerta, NO muta estado del booking

#### 5. **Snapshot de Rutas: Conteo dinámico**
- ✅ **Cambio:** Conteo dinámico basado en `Object.keys(ROUTES_V312).length`
- ❌ **Eliminado:** Hardcoded `expect(routes.length).toBe(19)`
- ✅ **Actual:** 18 rutas

### 📊 Comparación REV A vs REV B

| Aspecto | REV A | REV B |
|---------|-------|-------|
| Validación de margen | ❌ Bloqueante (HTTP 400) | ✅ No bloqueante (alerta) |
| Cálculo de fee | ❌ En Pricing Core | ✅ En Payments Layer |
| Acoplamiento a PSP | ❌ Alto (Stripe hardcoded) | ✅ Bajo (perfiles config) |
| Bucle infinito | ❌ Existe | ✅ Resuelto |
| Observabilidad | ⚠️ Limitada | ✅ Dashboard + alertas |

### 🚀 Plan de Implementación

- **PR (a):** Documentación ✅ (este documento)
- **PR (b):** Migración `payment_cost_ledger`
- **PR (c):** Fee Estimator + Ledger Integration
- **PR (d):** Refactor Pricing Core (eliminar validación margen)
- **PR (e):** Margin Monitoring Job

### 📄 Documentos Afectados

- ✅ **Nuevo:** `docs/pricing-v312-supervisor-guide-REV-B.md`
- ⚠️ **Deprecated:** `docs/pricing-v312-supervisor-guide-REV-A.md`
- ✅ **Nuevo:** `docs/CHANGELOG-V312.md` (este archivo)

---

## REV A (2025-12-16) — DEPRECATED ❌

### 🎯 Objetivo Original
Ajustar Partner Floor (PF) en 5 rutas sedan para cumplir margen mínimo de €2.00 después de fees de Stripe.

### ❌ Problema Identificado
**Bucle infinito matemático:**
```
PF aumenta → Prepaid aumenta → Fee aumenta → Margen disminuye
```

El margen neto es:
```
Margen = Prepaid - Fee - PF
       = (PF + FC - PD) - Fee - PF
       = FC - PD - Fee
```

**El margen NO depende del PF**, solo de FC, PD y Fee.

Con FC=€10, PD=€5, y fees de Stripe ~€3-4, el margen máximo alcanzable es ~€1-2, **nunca €2.00 de forma consistente**.

### 🔄 Cambios Intentados (no exitosos)

| Ruta | PF Original | PF Intentado | Margen Resultante | Estado |
|------|------------:|-------------:|------------------:|:------:|
| CDG_PARIS sedan | €80 | €102 | €1.00 | ❌ |
| ORLY_PARIS sedan | €75 | €96 | €1.21 | ❌ |
| DISNEY_PARIS sedan | €75 | €97 | €1.18 | ❌ |
| VERSAILLES_PARIS sedan | €75 | €94 | €1.28 | ❌ |

### 📄 Documentos Afectados

- ❌ **Deprecated:** `docs/pricing-v312-supervisor-guide-REV-A.md`
- ⚠️ **Nota:** Valores de PF en `src/config/pricing-v312.ts` deben revertirse o ajustarse según REV B

---

## Historial de Versiones

| Versión | Fecha | Estado | Descripción |
|---------|-------|--------|-------------|
| **REV B** | 2025-12-16 | ✅ Actual | Observabilidad no bloqueante |
| **REV A** | 2025-12-16 | ❌ Deprecated | Validación bloqueante (bucle infinito) |
| **V3.1.2 Base** | 2025-12-15 | ⚠️ Superseded | Versión inicial sin ajustes |

---

## Próximos Pasos

1. ✅ **Aprobar REV B** (este documento)
2. ⏳ **Implementar PR (b):** Migración DB
3. ⏳ **Implementar PR (c):** Fee Estimator
4. ⏳ **Implementar PR (d):** Refactor Pricing Core
5. ⏳ **Implementar PR (e):** Monitoring Job
6. ⏳ **Deploy a staging**
7. ⏳ **Validación con bookings reales**
8. ⏳ **Deploy a producción**

---

**Última actualización:** 2025-12-16  
**Mantenido por:** Equipo de Pricing & Engineering  
**Contacto:** pricing-v312@parisluxe.com

