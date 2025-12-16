# ⚠️ DEPRECATED: PRICING V3.1.2 — SUPERVISOR GUIDE (REV A)

**⚠️ ESTE DOCUMENTO ESTÁ OBSOLETO. Ver [REV B](./pricing-v312-supervisor-guide-REV-B.md)**

**Versión:** V3.1.2 — **REV A**
**Última actualización:** 2025-12-16
**Estado:** ❌ DEPRECATED (2025-12-16)
**Razón:** REV A introducía validación bloqueante de margen que causaba bucle infinito. REV B adopta observabilidad no bloqueante.

---

## A) PRICING CORE (INVIOLABLE)

### A1. Unidades de dinero (obligatorio)

* **Interno (cálculos):** `amount_cents` (int). **Prohibido float** para importes.
* **Stripe API:** siempre montos en céntimos (`amount: 8500` = €85.00).
* **UI/Frontend:** mostrar `amount_eur = (amount_cents / 100)` solo para display.

**P0:** Si aparece `number` con decimales, `parseFloat()` para importes, o cálculos monetarios con float.

### A2. Fórmulas base (leyes)

**Rutas STANDARD (excepto Beauvais):**

```typescript
// CONSTANTES (céntimos)
const FC_SEDAN = 1000; // €10
const FC_VAN   = 1300; // €13
const PD       = 500;  // €5

flexible_price_cents = PF_cents + FC_cents;
prepaid_price_cents  = flexible_price_cents - PD;
```

**Rutas EXTRA-LARGA (Beauvais):**

```typescript
const BUFFER_BEAUVAIS_SEDAN = 1500; // €15
const BUFFER_BEAUVAIS_VAN   = 1600; // €16

prepaid_price_cents  = PF_cents + buffer_cents;
flexible_price_cents = null; // NO DISPONIBLE
```

**Hold amounts (solo flexible):**

```typescript
const HOLD_SHORT_CENTS  = 1500; // €15 (Gares)
const HOLD_MEDIUM_CENTS = 3000; // €30 (Aeropuertos/Atracciones)
```

### A3. Validación de margen (bloqueante)

Debe existir `validatePricingMargin(routeKey, vehicle, prepaid_price_cents)`.

**Worst-case fee sin floats (basis points):**

```typescript
// bps = basis points, 350 = 3.50%
function computeWorstCaseFeeCents(amount_cents: number): number {
  const bps   = parseInt(process.env.STRIPE_WORST_CASE_FEE_BPS ?? "350", 10);
  const fixed = parseInt(process.env.STRIPE_WORST_CASE_FEE_FIXED_CENTS ?? "25", 10);
  // ceil(amount * bps / 10000) + fixed
  return Math.floor((amount_cents * bps + 9999) / 10000) + fixed;
}

function validateMargin(pf_cents: number, prepaid_cents: number): boolean {
  const fee = computeWorstCaseFeeCents(prepaid_cents);
  return (prepaid_cents - fee - pf_cents) >= 200; // mínimo €2.00
}
```

**Si validate = false → HTTP 400 + log estructurado + alerta admin.**
**P0:** Si hay booking confirmado con margen < €2.

---

## B) TABLA DE RUTAS APROBADAS (SNAPSHOT V3.1.2 — REV A)

**Regla:** Este snapshot debe reflejar EXACTAMENTE `src/config/pricing-v312.ts` en producción/staging.
**Si se ajusta PF para cumplir margen, se actualiza esta tabla y se incrementa `REV`.**

**Estas son las 18 rutas que deben existir:**

```typescript
// PRICING_V312_REV_A (2025-12-16)
// Cada entrada: { sedan: { floor, commission, hold, buffer }, van: {...} }

export const PRICING_V312 = {
  CDG_PARIS:           { sedan: { floor: 9400,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 10400, commission: 1300, hold: 3000, buffer: 0    } },
  ORLY_PARIS:          { sedan: { floor: 8800,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 9800,  commission: 1300, hold: 3000, buffer: 0    } },
  BEAUVAIS_PARIS:      { sedan: { floor: 13300, commission: null, hold: null, buffer: 1500 }, van: { floor: 16900, commission: null, hold: null, buffer: 1600 } },
  DISNEY_PARIS:        { sedan: { floor: 8900,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 10400, commission: 1300, hold: 3000, buffer: 0    } },
  VERSAILLES_PARIS:    { sedan: { floor: 8600,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 9800,  commission: 1300, hold: 3000, buffer: 0    } },
  CDG_DISNEY:          { sedan: { floor: 7500,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 10400, commission: 1300, hold: 3000, buffer: 0    } },
  ORLY_VERSAILLES:     { sedan: { floor: 7000,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 9100,  commission: 1300, hold: 3000, buffer: 0    } },

  GAREDUNORD_PARIS:    { sedan: { floor: 6000,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7800,  commission: 1300, hold: 1500, buffer: 0    } },
  GARELYON_PARIS:      { sedan: { floor: 6000,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7800,  commission: 1300, hold: 1500, buffer: 0    } },
  GAREST_PARIS:        { sedan: { floor: 6000,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7800,  commission: 1300, hold: 1500, buffer: 0    } },
  GAREMONTPARNASSE_PARIS:{ sedan:{ floor: 6000,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7800,  commission: 1300, hold: 1500, buffer: 0    } },
  GARELAZARE_PARIS:    { sedan: { floor: 6000,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7800,  commission: 1300, hold: 1500, buffer: 0    } },

  LOUVRE_PARIS:        { sedan: { floor: 5500,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7200,  commission: 1300, hold: 1500, buffer: 0    } },
  EIFFEL_PARIS:        { sedan: { floor: 5500,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7200,  commission: 1300, hold: 1500, buffer: 0    } },
  ARC_PARIS:           { sedan: { floor: 5500,  commission: 1000, hold: 1500, buffer: 0    }, van: { floor: 7200,  commission: 1300, hold: 1500, buffer: 0    } },

  CDG_ORLY:            { sedan: { floor: 7500,  commission: 1000, hold: 3000, buffer: 0    }, van: { floor: 9800,  commission: 1300, hold: 3000, buffer: 0    } },
  ORLY_BEAUVAIS:       { sedan: { floor: 14000, commission: null, hold: null, buffer: 0    }, van: { floor: 18200, commission: null, hold: null, buffer: 0    } },
  CDG_BEAUVAIS:        { sedan: { floor: 15000, commission: null, hold: null, buffer: 0    }, van: { floor: 19500, commission: null, hold: null, buffer: 0    } },
} as const;
```

**Comando de validación (obligatorio):**

```bash
grep -E "^\s*[A-Z_]+:" src/config/pricing-v312.ts | wc -l
# Debe devolver 18
```

**P0:** Si no coincide key por key y valor por valor con este snapshot.

---

## C) ADD-ONS (SEPARADOS — NO ALTERAN PRECIO BASE)

**Recargos operativos se calculan aparte y se agregan al total del cliente. No modifican `PF_cents`, `FC_cents`, `PD`.**

| Add-on | Monto (céntimos) | Reparto | Lógica |
|--------|------------------|---------|--------|
| **Maleta grande extra** | `1500` (€15.00) | 100% partner | Coste real del conductor |
| **Nocturno (+20%)** | `round(prepaid_cents * 20 / 100)` | 80% partner / 20% plataforma | Definido en policy |
| **Espera extra** | `1500 * ceil(minutos_extra / 15)` | 100% plataforma | Compensa tiempo ocioso |

**P1:** Si algún add-on altera `PF_cents`, `FC_cents` o `PD`.

---

## D) HOLD LIFECYCLE (FLEXIBLE — SECUENCIA OBLIGATORIA)

### D1. Booking: SetupIntent

```typescript
const setupIntent = await stripe.setupIntents.create({
  usage: "off_session",
  customer: customerId,
});
// Guardar: setupIntent.payment_method, setupIntent.customer
```

### D2. Job T-24h (CreateHoldJob — cada 60 min)

```sql
SELECT * FROM bookings_v312
WHERE payment_mode = 'flexible'
  AND status = 'confirmed'
  AND hold_pi_id IS NULL
  AND pickup_time BETWEEN NOW() AND NOW() + INTERVAL '24 hours';
```

### D3. Crear PaymentIntent hold (manual capture)

```typescript
const hold = await stripe.paymentIntents.create({
  amount: holdAmountCents, // 1500 o 3000
  currency: "eur",
  capture_method: "manual",
  confirm: true,
  off_session: true,
  payment_method: savedPaymentMethod,
  customer: customerId,
  metadata: { booking_id: booking.id, type: "hold" },
});
// Guardar: hold.id en bookings.hold_pi_id
```

### D4. Manejo de SCA (si requires_action)

```typescript
if (hold.status === 'requires_action') {
  // Enviar link de autenticación (email/SMS/WhatsApp)
  // Payload: { auth_url: hold.next_action.redirect_to_url, deadline: '2h' }

  // Programar timeout de 2h
  setTimeout(async () => {
    const pi = await stripe.paymentIntents.retrieve(hold.id);
    if (pi.status !== 'succeeded') {
      await stripe.paymentIntents.cancel(hold.id);
      await updateBookingStatus(booking.id, 'unconfirmed_no_contact');
    }
  }, 2 * 60 * 60 * 1000);
}
```

### D5. Cancelación (determinista)

**Reglas claras:**

* **Cancelación >24h antes del pickup:**
  - NO crear hold
  - SetupIntent queda sin usar (no hay "release", simplemente no se usa)
  - `status = 'cancelled'`

* **Cancelación ≤24h antes del pickup:**
  - **Si existe `hold_pi_id` y está `requires_capture`:** → **capturar** el hold
  - **Si NO existe `hold_pi_id` (cron no ejecutó):** → **crear hold y capturar** inmediatamente
    - Aplicar misma lógica SCA
    - Si falla SCA → `status = 'unconfirmed_no_contact'`

### D6. Servicio completado

```typescript
// Liberar hold si existe y no fue capturado
if (booking.hold_pi_id) {
  await stripe.paymentIntents.cancel(booking.hold_pi_id);
}
// El cliente paga al conductor en efectivo/tarjeta
```

---

## E) STRIPE WEBHOOKS (IDEMPOTENTES)

**Endpoint:** `POST /webhooks/stripe`

**Validación obligatoria:**
- [ ] Firma verificada: `stripe.webhooks.constructEvent(...)`
- [ ] Idempotencia: `event.id` guardado en tabla `webhook_events`

**Eventos mínimos a manejar:**

| Evento | Acción |
|--------|--------|
| `payment_intent.succeeded` | Prepaid ok o hold capturado |
| `payment_intent.payment_failed` | Prepaid falló |
| `setup_intent.succeeded` | Método guardado ok |
| `payment_intent.amount_capturable_updated` | Hold listo para capturar |
| `charge.captured` | Hold capturado confirmado |
| `payment_intent.canceled` | Hold liberado |

**P0:** Si aparece `payment_intent.captured` (evento inexistente en Stripe API).

---

## F) STATE MACHINE & LOGS (AUDITORÍA)

**Estados obligatorios (lista cerrada):**

`created`, `pending_partner`, `partner_accepted`, `confirmed`, `driver_assigned`, `driver_departed`, `service_started`, `completed`, `cancelled`, `no_show`, `unconfirmed_no_contact`, `payment_failed`, `hold_pending`, `hold_confirmed`

**Tabla de logs obligatoria:**

```sql
CREATE TABLE booking_state_logs_v312 (
  id UUID PRIMARY KEY,
  booking_id UUID NOT NULL,
  from_state VARCHAR(50),
  to_state VARCHAR(50),
  actor VARCHAR(50), -- 'system', 'admin', 'partner', 'customer', 'stripe'
  reason TEXT,
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Cada transición debe loggear:**

```json
{
  "booking_id": "bkg_123",
  "from_state": "pending_partner",
  "to_state": "partner_accepted",
  "actor": "partner",
  "reason": "partner_accepted_booking",
  "payload": { "partner_id": "drv_456", "sla_seconds": 5400 }
}
```

**Cada cálculo de precio debe loggear:**

```json
{
  "booking_id": "bkg_123",
  "route_key": "CDG_PARIS",
  "vehicle_type": "sedan",
  "payment_mode": "prepaid",
  "prepaid_price_cents": 9900,
  "flexible_price_cents": 10400,
  "partner_floor_cents": 9400,
  "commission_cents": 1000,
  "pricing_version": "v3.1.2",
  "rev": "A"
}
```

---



## G) CRON JOBS (MONITOREO)

### Job 1: CreateHoldJob
- **Frecuencia:** Cada 60 min
- **Query:** Ver D2
- **Timeout:** 5 min por ejecución
- **Alerta:** Si falla >2 veces consecutivas → P1

### Job 2: PartnerSLAJob
- **Frecuencia:** Cada 30 min
- **Query:** Rechazar bookings >2h/4h sin respuesta
- **Alerta:** Si tasa de rechazo >15% → P2 (revisar floors)

### Job 3: PricingAuditJob
- **Frecuencia:** Cada 1 hora
- **Query:** Contar bookings con margen <200 cents
- **Alerta:** Si count >0 → CRITICAL P0

---

## H) QA: PRUEBAS QUE DEBES EJECUTAR Y REPORTAR

### H1. Unit Tests (Obligatorios)

Para cada ruta (18 rutas × 2 vehículos × 2 métodos = **72 tests mínimo**):

```typescript
test('CDG_PARIS sedan prepaid', () => {
  const res = calculatePrice('CDG_PARIS', 'sedan', 'prepaid');
  expect(res.prepaid_price_cents).toBe(9900);
  expect(res.flexible_price_cents).toBe(10400);
  expect(res.hold_amount_cents).toBe(3000);
});

test('CDG_PARIS sedan margin', () => {
  const margin = validateMargin(9400, 9900);
  expect(margin).toBe(true); // ≥ €2
});
```

### H2. E2E Tests (Staging - Obligatorios)

**Casos mínimos (8 tests):**
1. Prepaid con tarjeta EEA válida → `payment_intent.succeeded`
2. Prepaid con tarjeta rechazada → `payment_intent.payment_failed`
3. Flexible setup ok → `setup_intent.succeeded`
4. Hold creado T-24h → `payment_intent.amount_capturable_updated`
5. SCA required + auth en 2h → `hold_confirmed`
6. SCA timeout → `unconfirmed_no_contact` + PI canceled
7. Beauvais solo muestra prepaid → `payment_modes_enabled.flexible=false`
8. Cancelación <24h → hold capturado

**Entrega:** IDs de logs de Stripe + estado final del booking.

---

## I) RESULTADO DEL AUDIT

**Devuelve:**

1. **PASS/FAIL** por sección (A–H)
2. **Lista de desviaciones** con:
   - archivo + línea
   - severidad (P0/P1/P2)
   - fix propuesto (código exacto)
3. **PR plan** con archivos a modificar
4. **Tests a escribir** para garantizar no-regresión

**Si encuentras 0 desviaciones → aprueba para staging. Si encuentras P0 → bloquea deploy.**

---

## J) DELTA DE CAMBIOS (ORIGINAL vs REV A)

**Solo cambió `floor` (PF) en sedan para 5 rutas; todo lo demás se mantiene idéntico:**

| Route | Sedan floor (orig) | Sedan floor (REV A) | Δ Sedan | Razón |
|-------|-------------------:|--------------------:|--------:|-------|
| CDG_PARIS | 8000 | 9400 | +1400 | Margen insuficiente |
| ORLY_PARIS | 7500 | 8800 | +1300 | Margen insuficiente |
| BEAUVAIS_PARIS | 13000 | 13300 | +300 | Margen insuficiente |
| DISNEY_PARIS | 7500 | 8900 | +1400 | Margen insuficiente |
| VERSAILLES_PARIS | 7500 | 8600 | +1100 | Margen insuficiente |

**Todas las demás rutas (13) mantienen valores originales.**

**Razón del ajuste:** La especificación original V3.1.2 no validó los márgenes con `computeWorstCaseFee()` antes de aprobar las tarifas. Estos ajustes garantizan rentabilidad mínima de €2.00 sin renegociar con partners (el incremento se traslada al cliente final).

---

## K) CHECKLIST DE IMPLEMENTACIÓN

### Backend
- [ ] `src/config/pricing-v312.ts` con 18 rutas exactas (REV A)
- [ ] `src/services/pricing/calculatePricing.ts` con fórmulas A2
- [ ] `src/services/pricing/validateMargin.ts` con validación A3 (sin floats)
- [ ] Webhooks de Stripe (6 eventos mínimos)
- [ ] Jobs: CreateHoldJob, PartnerSLAJob, PricingAuditJob
- [ ] Tabla `booking_state_logs_v312` creada
- [ ] Tabla `webhook_events` para idempotencia

### Frontend
- [ ] Mostrar precios en euros (no céntimos)
- [ ] Mostrar "Best Price" (prepaid) y "Standard Rate" (flexible)
- [ ] Beauvais solo muestra opción prepaid
- [ ] Add-ons se muestran separados del precio base

### Testing
- [ ] 72 unit tests (18 rutas × 2 vehículos × 2 modos)
- [ ] 8 E2E tests en Stripe Test Mode
- [ ] Cobertura >90% en motor de pricing

### Documentación
- [ ] README con instrucciones de setup
- [ ] API docs con ejemplos de requests/responses
- [ ] Runbook para operaciones (capturar hold, etc.)

---

**Última actualización:** 2025-12-16
**Mantenedor:** Equipo de Producto & Engineering
**Contacto:** pricing-v312@parisluxe.com