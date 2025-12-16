# 📋 PRICING V3.1.2 — SUPERVISOR GUIDE (REV B)

**Documento Único - Fuente de Verdad para Desarrollo & QA**  
**Versión:** V3.1.2 — **REV B**  
**Última actualización:** 2025-12-16  
**Estado:** ✅ APROBADO PARA IMPLEMENTACIÓN  
**Propósito:** Especificación completa de Pricing V3.1.2 con observabilidad no bloqueante

---

## 📖 ÍNDICE

1. [Scope y Principios](#1-scope-y-principios)
2. [Contrato del Pricing Core](#2-contrato-del-pricing-core)
3. [Payment Cost Ledger](#3-payment-cost-ledger)
4. [Fee Estimator](#4-fee-estimator)
5. [Margin Monitoring Job](#5-margin-monitoring-job)
6. [Snapshot de Rutas](#6-snapshot-de-rutas)
7. [Checklist de Implementación](#7-checklist-de-implementación)
8. [Criterios de Aceptación](#8-criterios-de-aceptación)

---

## 1. SCOPE Y PRINCIPIOS

### 1.1 Cambio Fundamental vs REV A

**REV A (deprecated):** Pricing Core calculaba fee de Stripe y bloqueaba bookings con margen < €2.00 → **Bucle infinito**.

**REV B (actual):** Pricing Core es **agnóstico a PSP** (Payment Service Provider). El control de rentabilidad se hace por **observabilidad no bloqueante**.

### 1.2 Principios Inviolables

1. **Pricing Core NO calcula ni valida fees de PSP** (Stripe, Adyen, etc.)
2. **Pricing Core solo define precios al cliente y compromisos al partner** (PF)
3. **Todo dinero en `*_cents` (int)** — Sin floats, nunca
4. **Rentabilidad neta se controla en Payments/Margin Monitoring** — Logs, métricas, alertas (no bloqueante)
5. **El snapshot de rutas es la fuente de verdad** — Conteo dinámico, no hardcodeado

### 1.3 Arquitectura de Capas

```
┌─────────────────────────────────────────────────────────────┐
│ PRICING CORE (determinista, sin PSP)                        │
│ - Calcula: flexible, prepaid, hold                          │
│ - Valida: rutas, vehículos, dinero en cents                 │
│ - NO valida: margen, fees                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PAYMENTS LAYER (registra costes reales/estimados)           │
│ - Estima fee según perfil configurable                      │
│ - Registra en payment_cost_ledger                           │
│ - NO bloquea bookings                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ MARGIN MONITORING (observabilidad, alertas)                 │
│ - Job hourly: calcula net_margin_estimated                  │
│ - Alerta si < 0 (CRITICAL) o < €2 (WARN)                   │
│ - Dashboard: rutas con margen bajo                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. CONTRATO DEL PRICING CORE

### 2.1 Inputs

```typescript
interface PricingInput {
  route_key: RouteKey;           // ej. 'CDG_PARIS'
  vehicle: 'sedan' | 'van';
  payment_mode: 'prepaid' | 'flexible';
  add_ons?: AddOn[];             // opcional
}

type RouteKey = 
  | 'CDG_PARIS' | 'ORLY_PARIS' | 'BEAUVAIS_PARIS'
  | 'GAREDUNORD_PARIS' | 'GARELYON_PARIS' | 'GAREST_PARIS'
  | 'GAREMONTPARNASSE_PARIS' | 'GARELAZARE_PARIS'
  | 'DISNEY_PARIS' | 'VERSAILLES_PARIS'
  // ... (total: N dinámico, actualmente 18)
```

### 2.2 Outputs

```typescript
interface PricingOutput {
  // Precios al cliente (cents)
  flexible_price_cents: number | null;  // null si ruta es Beauvais
  prepaid_price_cents: number;
  
  // Compromisos internos (cents)
  partner_floor_cents: number;
  platform_commission_cents: number;    // FC
  hold_amount_cents: number;
  
  // Metadata
  pricing_version: 'v3.1.2';
  pricing_rev: 'B';
  route_key: RouteKey;
  vehicle: 'sedan' | 'van';
  
  // Add-ons (si aplica)
  add_ons_total_cents: number;
}
```

### 2.3 Fórmulas (sin fee)

#### RUTAS STANDARD (no Beauvais):

```typescript
const PF = ROUTES_V312[route_key].partnerFloor[vehicle];
const FC = vehicle === 'sedan' ? 1000 : 1300;  // €10 / €13
const PD = 500;  // €5

flexible_price_cents = PF + FC;
prepaid_price_cents = PF + FC - PD;
platform_commission_cents = FC;
partner_floor_cents = PF;
```

#### RUTAS BEAUVAIS:

```typescript
const PF = ROUTES_V312['BEAUVAIS_PARIS'].partnerFloor[vehicle];
const BUFFER = vehicle === 'sedan' ? 1500 : 1600;  // €15 / €16

flexible_price_cents = null;  // No disponible
prepaid_price_cents = PF + BUFFER;
platform_commission_cents = 0;  // Beauvais no tiene FC
partner_floor_cents = PF;
```

### 2.4 Hold Amount

```typescript
const distance = ROUTES_V312[route_key].distance;

if (distance === 'short') {
  hold_amount_cents = 2000;  // €20
} else if (distance === 'medium') {
  hold_amount_cents = 3000;  // €30
} else {
  hold_amount_cents = 0;  // No hold
}
```

### 2.5 Invariantes (validaciones bloqueantes)

```typescript
// ✅ VALIDAR (HTTP 400 si falla):
1. route_key existe en ROUTES_V312
2. vehicle es 'sedan' o 'van'
3. Todos los *_cents son integers (no floats)
4. PF > 0
5. prepaid_price_cents > 0

// ❌ NO VALIDAR:
- Margen neto (se hace en Monitoring)
- Fee de PSP (se hace en Payments)
```

---

## 3. PAYMENT COST LEDGER

### 3.1 Esquema SQL

```sql
CREATE TABLE payment_cost_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  
  -- PSP info
  provider VARCHAR(30) NOT NULL,        -- 'stripe', 'adyen', 'paypal', etc.
  method VARCHAR(30) NOT NULL,          -- 'card', 'sepa_debit', 'cash', etc.
  
  -- Costes (cents)
  fee_estimated_cents INT NOT NULL,     -- Estimado al crear PaymentIntent
  fee_actual_cents INT,                 -- Real cuando se conoce (puede ser NULL)
  currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
  
  -- Metadata
  details JSONB,                        -- { bps, fixed_cents, profile, country, card_brand, ... }
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Índices
  CONSTRAINT fk_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE INDEX idx_payment_cost_ledger_booking ON payment_cost_ledger(booking_id);
CREATE INDEX idx_payment_cost_ledger_provider ON payment_cost_ledger(provider);
CREATE INDEX idx_payment_cost_ledger_created ON payment_cost_ledger(created_at DESC);
```

### 3.2 Cuándo se escribe/actualiza

#### Escritura inicial (`fee_estimated_cents`):

**Momento:** Al crear o confirmar PaymentIntent

```typescript
// En src/services/payments/createPaymentIntent.ts
async function createPaymentIntent(booking: Booking) {
  const feeProfile = await getFeeProfile(booking.payment_provider);
  const fee_estimated = estimateFeeCents(booking.prepaid_price_cents, feeProfile);
  
  // Crear PI en Stripe/Adyen
  const paymentIntent = await stripe.paymentIntents.create({...});
  
  // Registrar en ledger
  await db.payment_cost_ledger.insert({
    booking_id: booking.id,
    provider: 'stripe',
    method: 'card',  // o detectar del payment_method
    fee_estimated_cents: fee_estimated,
    fee_actual_cents: null,  // Aún no conocido
    details: { profile: feeProfile.name, bps: feeProfile.bps, fixed_cents: feeProfile.fixed_cents },
  });
}
```

#### Actualización (`fee_actual_cents`):

**Momento:** Al recibir webhook `charge.succeeded` o `payment_intent.succeeded`

```typescript
// En src/webhooks/stripe/handleChargeSucceeded.ts
async function handleChargeSucceeded(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge;
  const booking = await findBookingByPaymentIntent(charge.payment_intent);
  
  // Obtener fee real del Balance Transaction
  const balanceTransaction = await stripe.balanceTransactions.retrieve(charge.balance_transaction);
  const fee_actual_cents = balanceTransaction.fee;  // Ya viene en cents
  
  // Actualizar ledger
  await db.payment_cost_ledger.update({
    where: { booking_id: booking.id },
    data: {
      fee_actual_cents,
      updated_at: new Date(),
    },
  });
}
```

**Nota:** Si no es posible obtener `fee_actual_cents` (ej. PSP no lo expone), dejar en `NULL` y usar solo `fee_estimated_cents` para monitoring.

---

## 4. FEE ESTIMATOR

### 4.1 Interfaz (sin perfiles hardcodeados)

```typescript
// src/services/payments/feeEstimator.ts

/**
 * Perfil de fee configurable (NO hardcodear valores)
 */
export interface FeeProfile {
  name: string;              // ej. 'STRIPE_STANDARD', 'STRIPE_WORST_CASE'
  bps: number;               // Basis points (ej. 290 = 2.9%)
  fixed_cents: number;       // Fee fijo en céntimos (ej. 25 = €0.25)
}

/**
 * Estima el fee de PSP usando basis points (sin floats)
 * 
 * Fórmula: ceil(amount * bps / 10000) + fixed
 */
export function estimateFeeCents(amount_cents: number, profile: FeeProfile): number {
  if (amount_cents < 0) {
    throw new Error('amount_cents must be >= 0');
  }
  
  // ceil(amount * bps / 10000) usando floor + 9999
  const variable_fee = Math.floor((amount_cents * profile.bps + 9999) / 10000);
  return variable_fee + profile.fixed_cents;
}

/**
 * Carga perfiles desde ENV o DB (NO hardcodear)
 */
export async function getFeeProfile(provider: string): Promise<FeeProfile> {
  // Opción 1: Desde ENV
  const bps = parseInt(process.env[`FEE_${provider.toUpperCase()}_BPS`] || '0');
  const fixed = parseInt(process.env[`FEE_${provider.toUpperCase()}_FIXED_CENTS`] || '0');
  
  if (bps === 0 || fixed === 0) {
    throw new Error(`Fee profile not configured for provider: ${provider}`);
  }
  
  return {
    name: `${provider.toUpperCase()}_PROFILE`,
    bps,
    fixed_cents: fixed,
  };
  
  // Opción 2: Desde DB (futuro)
  // return await db.fee_profiles.findUnique({ where: { provider } });
}
```

### 4.2 Configuración (ENV)

```bash
# .env
FEE_STRIPE_BPS=350              # 3.5% (worst-case para European cards)
FEE_STRIPE_FIXED_CENTS=25       # €0.25

FEE_ADYEN_BPS=290               # 2.9% (ejemplo)
FEE_ADYEN_FIXED_CENTS=10        # €0.10 (ejemplo)
```

**Importante:** Los valores deben ser configurables por el equipo de finanzas, NO hardcodeados en el código.

---

## 5. MARGIN MONITORING JOB

### 5.1 Propósito

Calcular el **margen neto estimado** de cada booking y alertar si está por debajo de thresholds, **sin bloquear ni mutar estado del booking**.

### 5.2 Definición de Margen Neto

```typescript
net_margin_estimated_cents = prepaid_price_cents - partner_floor_cents - fee_estimated_cents
```

**Nota:** Para bookings flexible (pago al driver), el margen puede ser 0 o basado en add-ons. Ajustar lógica según modelo de negocio.

### 5.3 Implementación

```typescript
// src/jobs/MarginMonitoringJob.ts

interface MarginAlert {
  level: 'CRITICAL' | 'WARN';
  booking_id: string;
  route_key: string;
  vehicle: string;
  net_margin_cents: number;
  prepaid_cents: number;
  partner_floor_cents: number;
  fee_estimated_cents: number;
}

export async function runMarginMonitoringJob() {
  const since = new Date(Date.now() - 60 * 60 * 1000);  // Última hora
  
  const bookings = await db.bookings.findMany({
    where: {
      created_at: { gte: since },
      payment_mode: 'prepaid',  // Solo prepaid tiene margen directo
    },
    include: {
      payment_cost_ledger: true,
    },
  });
  
  const alerts: MarginAlert[] = [];
  
  for (const booking of bookings) {
    const ledger = booking.payment_cost_ledger[0];  // Asumimos 1 ledger por booking
    if (!ledger) continue;
    
    const net_margin = booking.prepaid_price_cents 
                     - booking.partner_floor_cents 
                     - ledger.fee_estimated_cents;
    
    // CRITICAL: Margen negativo
    if (net_margin < 0) {
      alerts.push({
        level: 'CRITICAL',
        booking_id: booking.id,
        route_key: booking.route_key,
        vehicle: booking.vehicle,
        net_margin_cents: net_margin,
        prepaid_cents: booking.prepaid_price_cents,
        partner_floor_cents: booking.partner_floor_cents,
        fee_estimated_cents: ledger.fee_estimated_cents,
      });
    }
    
    // WARN: Margen bajo (< €2.00)
    else if (net_margin < 200) {
      alerts.push({
        level: 'WARN',
        booking_id: booking.id,
        route_key: booking.route_key,
        vehicle: booking.vehicle,
        net_margin_cents: net_margin,
        prepaid_cents: booking.prepaid_price_cents,
        partner_floor_cents: booking.partner_floor_cents,
        fee_estimated_cents: ledger.fee_estimated_cents,
      });
    }
  }
  
  // Enviar alertas
  if (alerts.length > 0) {
    await sendAlertsToSlack(alerts);
    await logAlertsToDatabase(alerts);
  }
  
  // Actualizar dashboard metrics
  await updateDashboardMetrics(bookings);
}
```

### 5.4 Frecuencia y Thresholds

```typescript
// Configuración
const JOB_CONFIG = {
  frequency: '0 * * * *',  // Cada hora (cron)
  thresholds: {
    critical: 0,           // Margen negativo
    warn: 200,             // < €2.00
  },
};
```

### 5.5 Alerting (NO muta estado del booking)

```typescript
async function sendAlertsToSlack(alerts: MarginAlert[]) {
  const critical = alerts.filter(a => a.level === 'CRITICAL');
  const warn = alerts.filter(a => a.level === 'WARN');
  
  if (critical.length > 0) {
    await slack.send({
      channel: '#pricing-alerts',
      text: `🚨 CRITICAL: ${critical.length} bookings with NEGATIVE margin`,
      attachments: critical.map(a => ({
        color: 'danger',
        text: `Booking ${a.booking_id}: ${a.route_key} ${a.vehicle} → Margin: €${(a.net_margin_cents/100).toFixed(2)}`,
      })),
    });
  }
  
  if (warn.length > 0) {
    await slack.send({
      channel: '#pricing-alerts',
      text: `⚠️ WARN: ${warn.length} bookings with LOW margin (< €2.00)`,
      attachments: warn.slice(0, 5).map(a => ({  // Solo primeros 5
        color: 'warning',
        text: `Booking ${a.booking_id}: ${a.route_key} ${a.vehicle} → Margin: €${(a.net_margin_cents/100).toFixed(2)}`,
      })),
    });
  }
}
```

**Importante:** El job **NO cambia el estado del booking**. Solo alerta y registra métricas.

---

## 6. SNAPSHOT DE RUTAS

### 6.1 Conteo Dinámico (NO hardcodear)

```typescript
// ❌ MAL (hardcodeado):
expect(Object.keys(ROUTES_V312).length).toBe(19);

// ✅ BIEN (dinámico):
const EXPECTED_ROUTE_COUNT = Object.keys(ROUTES_V312).length;
expect(actualRoutes.length).toBe(EXPECTED_ROUTE_COUNT);
```

### 6.2 Rutas Actuales (N = 18)

```typescript
export const ROUTES_V312 = {
  CDG_PARIS: { partnerFloor: { sedan: 10200, van: 10400 }, distance: 'medium', ... },
  ORLY_PARIS: { partnerFloor: { sedan: 9600, van: 9800 }, distance: 'medium', ... },
  BEAUVAIS_PARIS: { partnerFloor: { sedan: 13300, van: 16900 }, distance: 'medium', ... },
  GAREDUNORD_PARIS: { partnerFloor: { sedan: 6000, van: 7800 }, distance: 'short', ... },
  GARELYON_PARIS: { partnerFloor: { sedan: 6000, van: 7800 }, distance: 'short', ... },
  GAREST_PARIS: { partnerFloor: { sedan: 6000, van: 7800 }, distance: 'short', ... },
  GAREMONTPARNASSE_PARIS: { partnerFloor: { sedan: 6000, van: 7800 }, distance: 'short', ... },
  GARELAZARE_PARIS: { partnerFloor: { sedan: 6000, van: 7800 }, distance: 'short', ... },
  DISNEY_PARIS: { partnerFloor: { sedan: 9700, van: 10400 }, distance: 'medium', ... },
  VERSAILLES_PARIS: { partnerFloor: { sedan: 9400, van: 9800 }, distance: 'medium', ... },
  // ... (total: 18 rutas actualmente)
} as const;
```

**Nota:** Si se añade/retira una ruta, incrementar REV (B → C) y documentar en changelog.

---

## 7. CHECKLIST DE IMPLEMENTACIÓN

### PR (a): Documentación ✅

- [ ] Crear `docs/pricing-v312-supervisor-guide-REV-B.md`
- [ ] Actualizar `docs/pricing-v312-supervisor-guide-REV-A.md` con nota de deprecación
- [ ] Crear `docs/CHANGELOG-V312.md` con cambios REV A → REV B
- [ ] Review y merge

### PR (b): Migración DB

- [ ] Crear migración `payment_cost_ledger` (schema 3.1)
- [ ] Añadir índices (booking_id, provider, created_at)
- [ ] Test en staging
- [ ] Deploy y merge

### PR (c): Fee Estimator + Ledger Integration

- [ ] Implementar `src/services/payments/feeEstimator.ts` (interfaz 4.1)
- [ ] Configurar ENV variables (FEE_STRIPE_BPS, etc.)
- [ ] Integrar en `createPaymentIntent`: registrar `fee_estimated_cents`
- [ ] Integrar en webhook `charge.succeeded`: actualizar `fee_actual_cents`
- [ ] Tests unitarios para `estimateFeeCents`
- [ ] Tests de integración para ledger
- [ ] Review y merge

### PR (d): Refactor Pricing Core (eliminar validación de margen)

- [ ] Eliminar `validatePricingMargin` de `src/services/pricing/`
- [ ] Actualizar tests: eliminar expectativas de HTTP 400 por margen
- [ ] Mantener solo validaciones de: rutas, vehículos, dinero en cents
- [ ] Actualizar `PricingOutput` con `pricing_rev: 'B'`
- [ ] Tests de regresión
- [ ] Review y merge

### PR (e): Margin Monitoring Job

- [ ] Implementar `src/jobs/MarginMonitoringJob.ts` (spec 5.3)
- [ ] Configurar cron (hourly)
- [ ] Implementar alerting (Slack/email)
- [ ] Implementar dashboard metrics (opcional: Grafana)
- [ ] Tests unitarios para cálculo de margen
- [ ] Test manual en staging
- [ ] Review y merge

---

## 8. CRITERIOS DE ACEPTACIÓN

### PR (a): Documentación
- ✅ REV B existe y está completo
- ✅ REV A tiene nota de deprecación
- ✅ CHANGELOG documenta cambios

### PR (b): Migración
- ✅ Tabla `payment_cost_ledger` existe en staging/prod
- ✅ Índices creados correctamente
- ✅ No errores en logs de migración

### PR (c): Fee Estimator
- ✅ `estimateFeeCents` calcula correctamente (tests unitarios)
- ✅ Perfiles se cargan desde ENV (no hardcodeados)
- ✅ Ledger se escribe al crear PI
- ✅ Ledger se actualiza en webhook (si `fee_actual_cents` disponible)
- ✅ No errores en logs de pagos

### PR (d): Pricing Core
- ✅ `validatePricingMargin` eliminado
- ✅ Tests NO esperan HTTP 400 por margen
- ✅ `pricing_rev: 'B'` en outputs
- ✅ Todos los tests de pricing pasan

### PR (e): Monitoring
- ✅ Job se ejecuta cada hora
- ✅ Alertas se envían correctamente (CRITICAL/WARN)
- ✅ NO muta estado del booking
- ✅ Dashboard muestra métricas (si implementado)

---

## 📞 CONTACTO Y ESCALACIÓN

**Preguntas técnicas:** pricing-v312@parisluxe.com  
**Escalación:** Equipo de Producto & Engineering  
**Alertas críticas:** #pricing-alerts (Slack)

---

**Documento generado:** 2025-12-16  
**Versión:** REV B  
**Próxima revisión:** Al añadir/modificar rutas o cambiar modelo de pricing

