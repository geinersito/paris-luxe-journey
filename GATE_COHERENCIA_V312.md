# 🔒 GATE DE COHERENCIA V3.1.2

**CRÍTICO:** Ejecutar estas verificaciones ANTES de cualquier deployment.

---

## ✅ VERIFICACIÓN 1: ESTADOS CANÓNICOS

### **Problema detectado:**
En el código aparecen variaciones de nombres de estados que pueden causar inconsistencias.

### **Tabla Canónica de Estados (ÚNICA FUENTE DE VERDAD):**

```typescript
// Estados oficiales V3.1.2
export type BookingStatus =
  | 'pending_payment'      // Esperando pago/setup
  | 'confirmed'            // Pago confirmado
  | 'partner_assigned'     // Conductor asignado
  | 'hold_pending'         // Hold creado, esperando auth
  | 'hold_confirmed'       // Hold autenticado
  | 'in_progress'          // Servicio en curso
  | 'completed'            // Servicio completado
  | 'cancelled'            // Cancelado por cliente
  | 'failed';              // Pago fallido
```

### **Acción requerida:**

- [ ] **Verificar State Machine** (`BookingStateMachine.ts`)
  - Usar EXACTAMENTE estos nombres
  - No aliases ni variaciones

- [ ] **Verificar Base de Datos** (migración SQL)
  - Columna `status` debe aceptar solo estos valores
  - Crear ENUM o CHECK constraint

- [ ] **Verificar Webhooks** (`stripe-webhooks-v312-integrated/index.ts`)
  - Transiciones usan nombres exactos
  - No hay estados "huérfanos"

- [ ] **Verificar Frontend** (componentes)
  - UI muestra estos estados
  - No hay traducciones inconsistentes

### **Script de verificación:**

```bash
# Buscar todos los usos de estados en el código
grep -r "driver_assigned" src/ supabase/
grep -r "unconfirmed" src/ supabase/

# Si encuentra algo → CORREGIR antes de deployment
```

---

## ✅ VERIFICACIÓN 2: MONEDA Y UNIDADES

### **Regla única:**
- **Internamente:** SIEMPRE céntimos (integers)
- **API responses:** SIEMPRE euros (decimales)
- **UI:** SIEMPRE euros con formato `€XX.XX`

### **Acción requerida:**

- [ ] **Pricing API** (`/api/pricing/calculate`)
  ```typescript
  // ✅ CORRECTO
  return {
    prepaid_price: 85,      // euros
    flexible_price: 90,     // euros
    hold_amount: 30         // euros
  }
  
  // ❌ INCORRECTO
  return {
    prepaid_price: 8500,    // céntimos
  }
  ```

- [ ] **Edge Functions** (create-prepaid-payment, etc.)
  ```typescript
  // ✅ CORRECTO - Reciben euros, convierten a céntimos
  const amountCents = Math.round(amount_euros * 100);
  
  // Stripe siempre recibe céntimos
  await stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'eur'
  });
  ```

- [ ] **Frontend Hooks** (`usePricingV312.ts`)
  ```typescript
  // ✅ CORRECTO - Normalizar si API devuelve céntimos
  const normalizedData = {
    prepaid_price: data.prepaid_price > 1000 
      ? data.prepaid_price / 100 
      : data.prepaid_price
  };
  ```

- [ ] **UI Components**
  ```tsx
  // ✅ CORRECTO
  <span>€{pricing.prepaid_price.toFixed(2)}</span>
  
  // ❌ INCORRECTO
  <span>€{pricing.prepaid_price / 100}</span>
  ```

### **Script de verificación:**

```bash
# Buscar conversiones sospechosas
grep -r "* 100" src/
grep -r "/ 100" src/

# Verificar que Stripe siempre recibe céntimos
grep -r "amount:" supabase/functions/
```

---

## ✅ VERIFICACIÓN 3: BEAUVAIS PREPAID-ONLY

### **Regla especial:**
Beauvais NO soporta modo flexible (distancia muy larga).

### **Acción requerida:**

- [ ] **Pricing Config** (`pricing-v312.ts`)
  ```typescript
  // ✅ VERIFICAR
  BEAUVAIS_PARIS: {
    partner_floor: { sedan: 13000, van: 16900 },
    flexible_enabled: false,  // ← DEBE SER FALSE
    // ...
  }
  ```

- [ ] **Pricing API** (`calculatePricing.ts`)
  ```typescript
  // ✅ VERIFICAR que retorna
  {
    payment_modes_enabled: {
      prepaid: true,
      flexible: false  // ← Para Beauvais
    }
  }
  ```

- [ ] **Frontend** (`PaymentModeSelector.tsx`)
  ```tsx
  // ✅ VERIFICAR que NO muestra opción flexible
  {pricing.payment_modes_enabled.flexible && (
    <Card>Pago al Conductor</Card>
  )}
  ```

### **Test manual:**

```bash
# Test Beauvais
curl -X POST /api/pricing/calculate \
  -d '{"route_key":"BEAUVAIS_PARIS","vehicle_type":"sedan"}'

# Debe retornar:
# {
#   "prepaid_price": 145,
#   "flexible_price": 0,
#   "payment_modes_enabled": {
#     "prepaid": true,
#     "flexible": false
#   }
# }
```

---

## ✅ VERIFICACIÓN 4: IDEMPOTENCIA DE WEBHOOKS

### **Problema crítico:**
Webhooks pueden llegar duplicados → doble procesamiento.

### **Acción requerida:**

- [ ] **Tabla `stripe_webhook_events`** existe
  ```sql
  CREATE TABLE IF NOT EXISTS stripe_webhook_events (
    event_id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    processed_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```

- [ ] **Webhook handler** verifica antes de procesar
  ```typescript
  // ✅ VERIFICAR en stripe-webhooks-v312-integrated/index.ts
  const { data: existing } = await supabase
    .from('stripe_webhook_events')
    .select('id')
    .eq('event_id', event.id)
    .single();
  
  if (existing) {
    return { received: true, idempotent: true };
  }
  ```

---

## ✅ VERIFICACIÓN 5: TRANSICIONES DE ESTADO VÁLIDAS

### **Matriz de transiciones permitidas:**

```
pending_payment → confirmed (PAYMENT_SUCCEEDED / SETUP_SUCCEEDED)
pending_payment → failed (PAYMENT_FAILED / SETUP_FAILED)
pending_payment → cancelled (CANCEL_REQUESTED)

confirmed → partner_assigned (PARTNER_ASSIGNED)
confirmed → hold_pending (HOLD_CREATED) [solo flexible]
confirmed → cancelled (CANCEL_REQUESTED)

partner_assigned → in_progress (SERVICE_STARTED)
partner_assigned → cancelled (CANCEL_REQUESTED)

hold_pending → hold_confirmed (HOLD_CONFIRMED)
hold_pending → failed (HOLD_FAILED)

hold_confirmed → in_progress (SERVICE_STARTED)

in_progress → completed (SERVICE_COMPLETED)
in_progress → cancelled (HOLD_CAPTURED) [no-show]

completed → [FINAL]
cancelled → [FINAL]
failed → [FINAL]
```

### **Acción requerida:**

- [ ] Verificar que `BookingStateMachine.ts` implementa SOLO estas transiciones
- [ ] Verificar que webhooks NO intentan transiciones inválidas
- [ ] Agregar tests para transiciones inválidas (deben fallar)

---

## 🎯 CHECKLIST FINAL PRE-DEPLOYMENT

Marcar TODAS antes de proceder:

- [ ] Estados canónicos verificados en todos los archivos
- [ ] Moneda/unidades consistentes (céntimos ↔ euros)
- [ ] Beauvais prepaid-only configurado correctamente
- [ ] Idempotencia de webhooks implementada
- [ ] Transiciones de estado validadas
- [ ] Tests unitarios pasan (100%)
- [ ] No hay `console.log` en producción
- [ ] Variables de entorno documentadas en `.env.v312.example`
- [ ] Migración SQL revisada y testeada en staging

---

## 🚨 SI ALGUNA VERIFICACIÓN FALLA

**NO DEPLOYAR A PRODUCCIÓN**

1. Corregir el problema
2. Re-ejecutar todas las verificaciones
3. Commit de corrección
4. Re-testear en staging

---

**Fecha de verificación:** _____________  
**Verificado por:** _____________  
**Aprobado para deployment:** ☐ SÍ  ☐ NO

