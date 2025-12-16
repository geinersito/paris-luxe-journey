# 📊 RESUMEN EJECUTIVO: REV B — Observabilidad No Bloqueante

**Fecha:** 2025-12-16  
**Autor:** Equipo de Pricing & Engineering  
**Estado:** ✅ APROBADO PARA IMPLEMENTACIÓN  
**Prioridad:** P0 (Bloqueante para producción)

---

## 🎯 PROBLEMA IDENTIFICADO EN REV A

### El Bucle Infinito

REV A intentaba ajustar **Partner Floor (PF)** para garantizar margen mínimo de €2.00 después de fees de Stripe.

**Problema matemático:**
```
Margen = Prepaid - Fee_Stripe - PF
       = (PF + FC - PD) - Fee_Stripe - PF
       = FC - PD - Fee_Stripe
```

**Conclusión:** El margen **NO depende del PF**, solo de:
- FC (Comisión fija: €10 sedan / €13 van)
- PD (Descuento prepago: €5)
- Fee de Stripe (~3.5% del Prepaid)

**Resultado:** Cada vez que aumentábamos PF para mejorar el margen, el Prepaid aumentaba, lo que aumentaba el fee de Stripe, lo que **reducía el margen**. **Bucle infinito.**

### Ejemplo Real (CDG_PARIS sedan)

| PF | Prepaid | Fee Stripe | Margen | ¿Válido? |
|---:|--------:|-----------:|-------:|:--------:|
| €80 | €85 | €3.23 | €1.77 | ❌ |
| €94 | €99 | €3.72 | €1.28 | ❌ |
| €102 | €107 | €4.00 | €1.00 | ❌ |

**Imposible alcanzar €2.00 de margen con la fórmula actual.**

---

## ✅ SOLUCIÓN: REV B

### Cambio de Paradigma

**ANTES (REV A):**
```
Pricing Core calcula fee → Valida margen → Bloquea si < €2.00
                                                    ↓
                                          ❌ BUCLE INFINITO
```

**DESPUÉS (REV B):**
```
Pricing Core: Solo precios (PF, FC, PD) → SIEMPRE acepta booking
                                                    ↓
Payments Layer: Registra fee real → Calcula margen → Alerta si < €2.00
                                                    ↓
                                          ✅ NO BLOQUEANTE
```

### Principios REV B

1. **Pricing Core es agnóstico a PSP** (Stripe, Adyen, etc.)
2. **No valida margen** (solo rutas, vehículos, dinero en cents)
3. **Payments Layer registra costes reales** en `payment_cost_ledger`
4. **Monitoring Job alerta** si margen < €2.00 (no bloquea)
5. **Observabilidad fuerte** (dashboard, alertas, métricas)

---

## 🏗️ ARQUITECTURA REV B

```
┌─────────────────────────────────────────┐
│ PRICING CORE (determinista)             │
│ - Calcula: flexible, prepaid, hold      │
│ - Valida: rutas, vehículos, cents       │
│ - NO valida: margen, fees               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ PAYMENTS LAYER (registra costes)        │
│ - Estima fee según perfil (ENV/DB)      │
│ - Registra en payment_cost_ledger       │
│ - NO bloquea bookings                   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ MARGIN MONITORING (observabilidad)      │
│ - Job hourly: calcula net_margin        │
│ - Alerta si < 0 (CRITICAL) o < €2 (WARN)│
│ - Dashboard: rutas con margen bajo      │
└─────────────────────────────────────────┘
```

---

## 📋 COMPONENTES NUEVOS

### 1. Payment Cost Ledger (tabla)

```sql
CREATE TABLE payment_cost_ledger (
  id UUID PRIMARY KEY,
  booking_id UUID NOT NULL,
  provider VARCHAR(30),              -- 'stripe', 'adyen', ...
  method VARCHAR(30),                -- 'card', 'sepa', ...
  fee_estimated_cents INT NOT NULL,  -- Estimado al crear PI
  fee_actual_cents INT,              -- Real (webhook)
  details JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

**Cuándo se escribe:**
- Al crear PaymentIntent → `fee_estimated_cents`
- En webhook `charge.succeeded` → `fee_actual_cents` (si disponible)

### 2. Fee Estimator (servicio)

```typescript
interface FeeProfile {
  name: string;
  bps: number;         // Basis points (ej. 350 = 3.5%)
  fixed_cents: number; // Fee fijo (ej. 25 = €0.25)
}

function estimateFeeCents(amount_cents: number, profile: FeeProfile): number {
  return Math.floor((amount_cents * profile.bps + 9999) / 10000) + profile.fixed_cents;
}
```

**Configuración (ENV):**
```bash
FEE_STRIPE_BPS=350              # 3.5%
FEE_STRIPE_FIXED_CENTS=25       # €0.25
```

**Importante:** NO hardcodear perfiles. Deben venir de ENV/DB.

### 3. Margin Monitoring Job

```typescript
async function runMarginMonitoringJob() {
  const bookings = await getRecentBookings();
  
  for (const booking of bookings) {
    const net_margin = booking.prepaid_cents 
                     - booking.partner_floor_cents 
                     - booking.fee_estimated_cents;
    
    if (net_margin < 0) {
      await alert('CRITICAL', `Booking ${booking.id} has NEGATIVE margin`);
    } else if (net_margin < 200) {
      await alert('WARN', `Booking ${booking.id} has LOW margin`);
    }
  }
}
```

**Frecuencia:** Cada hora (cron)  
**Importante:** NO muta estado del booking. Solo alerta.

---

## 🚀 PLAN DE IMPLEMENTACIÓN

### PR (a): Documentación ✅ COMPLETADO

- ✅ `docs/pricing-v312-supervisor-guide-REV-B.md`
- ✅ `docs/CHANGELOG-V312.md`
- ✅ Nota de deprecación en REV A

### PR (b): Migración DB ⏳ PENDIENTE

- [ ] Crear migración `payment_cost_ledger`
- [ ] Añadir índices
- [ ] Test en staging
- [ ] Deploy

**Estimado:** 1-2 horas

### PR (c): Fee Estimator + Ledger ⏳ PENDIENTE

- [ ] Implementar `src/services/payments/feeEstimator.ts`
- [ ] Configurar ENV variables
- [ ] Integrar en `createPaymentIntent`
- [ ] Integrar en webhook `charge.succeeded`
- [ ] Tests unitarios

**Estimado:** 3-4 horas

### PR (d): Refactor Pricing Core ⏳ PENDIENTE

- [ ] Eliminar `validatePricingMargin`
- [ ] Actualizar tests (eliminar HTTP 400 por margen)
- [ ] Añadir `pricing_rev: 'B'` en outputs
- [ ] Tests de regresión

**Estimado:** 2-3 horas

### PR (e): Monitoring Job ⏳ PENDIENTE

- [ ] Implementar `MarginMonitoringJob`
- [ ] Configurar cron (hourly)
- [ ] Implementar alerting (Slack)
- [ ] Dashboard (opcional)
- [ ] Tests

**Estimado:** 2-3 horas

**Total estimado:** 8-12 horas

---

## ⚖️ VENTAJAS vs DESVENTAJAS

### ✅ Ventajas

1. **Elimina bucle infinito** → Delivery más rápido
2. **Agnóstico a PSP** → Fácil cambiar de Stripe a Adyen
3. **Observabilidad real** → Control financiero más preciso
4. **No rechaza bookings válidos** → Mejor UX
5. **Escalable** → Fácil añadir nuevos PSP o métodos de pago

### ⚠️ Desventajas / Riesgos

1. **Puede aceptar bookings con margen bajo** → Requiere monitoreo activo
2. **Requiere disciplina operativa** → Dashboards y alertas deben revisarse
3. **Si mix de pagos cambia** → Problema vuelve como alerta (no bloqueo)

### 🛡️ Mitigación de Riesgos

- ✅ Alertas CRITICAL para margen negativo
- ✅ Dashboard para visibilidad continua
- ✅ Job hourly para detección rápida
- ⚠️ **Opcional:** Marcar bookings con margen < 0 para revisión admin (sin bloquear)

---

## 📊 MÉTRICAS DE ÉXITO

### Corto plazo (1 semana)

- [ ] 0 bookings rechazados por validación de margen
- [ ] 100% de bookings registrados en `payment_cost_ledger`
- [ ] Alertas funcionando correctamente (test manual)

### Medio plazo (1 mes)

- [ ] Dashboard de margen operativo
- [ ] < 5% de bookings con margen < €2.00
- [ ] 0 bookings con margen negativo (o plan de acción si ocurre)

### Largo plazo (3 meses)

- [ ] Análisis de rentabilidad por ruta/PSP/método
- [ ] Optimización de perfiles de fee
- [ ] Posible ajuste de FC/PD basado en datos reales

---

## 🎯 DECISIÓN REQUERIDA

**¿Aprobamos REV B para implementación?**

- ✅ **SÍ** → Proceder con PR (b) - (e)
- ❌ **NO** → Proponer alternativa

**¿Qué hacemos con margen negativo?**

- **Opción A:** Solo alerta (no bloqueante) ← **Recomendado**
- **Opción B:** Marcar como `REQUIRES_ADMIN_REVIEW` (sin bloquear)
- **Opción C:** Bloquear (volvemos al problema original)

**¿Qué perfil de fee usamos por defecto?**

- **WORST_CASE** (3.5% + €0.25) ← **Recomendado (conservador)**
- **STANDARD** (2.9% + €0.25) ← Optimista

---

## 📞 PRÓXIMOS PASOS INMEDIATOS

1. ✅ **Revisar este documento** con equipo de producto
2. ⏳ **Aprobar REV B** (decisión go/no-go)
3. ⏳ **Asignar PRs (b)-(e)** a desarrolladores
4. ⏳ **Configurar ENV** para fee profiles
5. ⏳ **Configurar alerting** (Slack channel, emails)

---

**Documento generado:** 2025-12-16  
**Contacto:** pricing-v312@parisluxe.com  
**Escalación:** Equipo de Producto & Engineering

