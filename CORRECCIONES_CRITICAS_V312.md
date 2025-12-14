# 🔧 CORRECCIONES CRÍTICAS V3.1.2

**EJECUTAR ANTES DE DEPLOYMENT**

Estas correcciones arreglan inconsistencias detectadas en el Gate de Coherencia.

---

## ✅ CORRECCIÓN 1: ESTADOS CANÓNICOS

### **Problema:**
Algunos archivos usan `driver_assigned` en lugar de `partner_assigned`.

### **Archivos a corregir:**

#### 1. `src/services/state-machine/BookingStateMachine.ts`

Verificar que usa:
```typescript
export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'partner_assigned'  // ← NO 'driver_assigned'
  | 'hold_pending'
  | 'hold_confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'failed';
```

#### 2. `supabase/migrations/20251214_v312_payment_system.sql`

Agregar constraint:
```sql
-- Agregar al final de la migración
ALTER TABLE bookings_v312 
ADD CONSTRAINT valid_status CHECK (
  status IN (
    'pending_payment',
    'confirmed',
    'partner_assigned',
    'hold_pending',
    'hold_confirmed',
    'in_progress',
    'completed',
    'cancelled',
    'failed'
  )
);
```

#### 3. Frontend components

Buscar y reemplazar:
```bash
# Buscar usos incorrectos
grep -r "driver_assigned" src/

# Si encuentra algo, reemplazar por 'partner_assigned'
```

---

## ✅ CORRECCIÓN 2: PRICING API - UNIDADES

### **Problema:**
Asegurar que API retorna euros, no céntimos.

### **Archivo:** `src/api/pricing/calculate.ts`

```typescript
// ✅ VERIFICAR que retorna así:
export async function POST(request: Request) {
  const { route_key, vehicle_type } = await request.json();
  
  const result = calculatePricing(route_key, vehicle_type);
  
  // IMPORTANTE: calculatePricing retorna céntimos internamente
  // Convertir a euros para la respuesta
  return Response.json({
    currency: 'EUR',
    pricing_version: 'v3.1.2',
    prepaid_price: result.prepaid_price / 100,      // ← Convertir a euros
    flexible_price: result.flexible_price / 100,    // ← Convertir a euros
    hold_amount: result.hold_amount / 100,          // ← Convertir a euros
    payment_modes_enabled: result.payment_modes_enabled,
  });
}
```

### **Archivo:** `src/services/pricing/calculatePricing.ts`

```typescript
// ✅ VERIFICAR que retorna céntimos internamente
export function calculatePricing(
  routeKey: RouteKey,
  vehicleType: VehicleType
): PricingResult {
  // ...
  
  return {
    currency: 'EUR',
    pricing_version: 'v3.1.2',
    prepaid_price: prepaidPrice,      // En céntimos
    flexible_price: flexiblePrice,    // En céntimos
    hold_amount: holdAmount,          // En céntimos
    payment_modes_enabled: {
      prepaid: true,
      flexible: flexibleEnabled,
    },
  };
}
```

---

## ✅ CORRECCIÓN 3: BEAUVAIS FLEXIBLE DISABLED

### **Archivo:** `src/config/pricing-v312.ts`

```typescript
// ✅ VERIFICAR configuración de Beauvais
export const ROUTE_CONFIG: Record<RouteKey, RouteConfig> = {
  // ...
  
  BEAUVAIS_PARIS: {
    partner_floor: {
      sedan: 13000,  // €130 en céntimos
      van: 16900,    // €169 en céntimos
    },
    flexible_enabled: false,  // ← CRÍTICO: debe ser false
    hold_amount: {
      sedan: 0,  // No hay hold si no hay flexible
      van: 0,
    },
    distance_category: 'extra_long',
  },
  
  PARIS_BEAUVAIS: {
    partner_floor: {
      sedan: 13000,
      van: 16900,
    },
    flexible_enabled: false,  // ← CRÍTICO: debe ser false
    hold_amount: {
      sedan: 0,
      van: 0,
    },
    distance_category: 'extra_long',
  },
  
  // ...
};
```

### **Archivo:** `src/services/pricing/calculatePricing.ts`

```typescript
// ✅ VERIFICAR que maneja Beauvais correctamente
export function calculatePricing(
  routeKey: RouteKey,
  vehicleType: VehicleType
): PricingResult {
  const config = ROUTE_CONFIG[routeKey];
  
  if (!config) {
    throw new Error(`Invalid route: ${routeKey}`);
  }
  
  const flexibleEnabled = config.flexible_enabled;
  
  // Si flexible no está habilitado, flexible_price = 0
  const flexiblePrice = flexibleEnabled 
    ? partnerFloor + flexibleCommission 
    : 0;
  
  return {
    // ...
    flexible_price: flexiblePrice,
    payment_modes_enabled: {
      prepaid: true,
      flexible: flexibleEnabled,  // ← false para Beauvais
    },
  };
}
```

---

## ✅ CORRECCIÓN 4: IDEMPOTENCIA WEBHOOKS

### **Archivo:** `supabase/functions/stripe-webhooks-v312-integrated/index.ts`

```typescript
// ✅ VERIFICAR que implementa idempotencia

serve(async (req) => {
  // ...
  
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  
  // CRÍTICO: Verificar idempotencia ANTES de procesar
  const { data: existingEvent } = await supabase
    .from('stripe_webhook_events')
    .select('id')
    .eq('event_id', event.id)
    .single();
  
  if (existingEvent) {
    console.log(`[Webhook] Event ${event.id} already processed (idempotent)`);
    return new Response(
      JSON.stringify({ received: true, idempotent: true }),
      { headers: corsHeaders, status: 200 }
    );
  }
  
  // Guardar evento ANTES de procesar
  await supabase.from('stripe_webhook_events').insert({
    event_id: event.id,
    event_type: event.type,
    processed_at: new Date().toISOString(),
  });
  
  // Ahora sí procesar...
  // ...
});
```

---

## ✅ CORRECCIÓN 5: TRANSICIONES INVÁLIDAS

### **Archivo:** `src/services/state-machine/BookingStateMachine.ts`

```typescript
// ✅ VERIFICAR que NO permite transiciones inválidas

const VALID_TRANSITIONS: Record<BookingStatus, Partial<Record<BookingEvent, BookingStatus>>> = {
  pending_payment: {
    PAYMENT_SUCCEEDED: 'confirmed',
    SETUP_SUCCEEDED: 'confirmed',
    PAYMENT_FAILED: 'failed',
    SETUP_FAILED: 'failed',
    CANCEL_REQUESTED: 'cancelled',
  },
  
  confirmed: {
    PARTNER_ASSIGNED: 'partner_assigned',
    HOLD_CREATED: 'hold_pending',  // Solo si payment_mode = flexible
    CANCEL_REQUESTED: 'cancelled',
  },
  
  partner_assigned: {
    SERVICE_STARTED: 'in_progress',
    CANCEL_REQUESTED: 'cancelled',
  },
  
  hold_pending: {
    HOLD_CONFIRMED: 'hold_confirmed',
    HOLD_FAILED: 'failed',
  },
  
  hold_confirmed: {
    SERVICE_STARTED: 'in_progress',
  },
  
  in_progress: {
    SERVICE_COMPLETED: 'completed',
    HOLD_CAPTURED: 'cancelled',  // No-show
  },
  
  // Estados finales - NO permiten transiciones
  completed: {},
  cancelled: {},
  failed: {},
};

export function executeTransition(
  currentState: BookingStatus,
  event: BookingEvent
): TransitionResult {
  const nextState = VALID_TRANSITIONS[currentState]?.[event];
  
  if (!nextState) {
    return {
      success: false,
      from_state: currentState,
      to_state: currentState,
      event,
      error: `Invalid transition: ${currentState} -> ${event}`,
    };
  }
  
  // Transición válida
  return {
    success: true,
    from_state: currentState,
    to_state: nextState,
    event,
  };
}
```

---

## 🧪 VERIFICACIÓN POST-CORRECCIÓN

Ejecutar estos comandos para verificar:

```bash
# 1. Buscar estados incorrectos
grep -r "driver_assigned" src/ supabase/
grep -r "unconfirmed" src/ supabase/

# 2. Verificar conversiones de moneda
grep -r "/ 100" src/api/
grep -r "* 100" src/hooks/

# 3. Verificar Beauvais
grep -A5 "BEAUVAIS" src/config/pricing-v312.ts

# 4. Verificar idempotencia
grep -A10 "stripe_webhook_events" supabase/functions/

# 5. Ejecutar tests
npm test
```

---

## ✅ CHECKLIST DE CORRECCIONES

- [ ] Estados canónicos unificados
- [ ] Constraint de DB agregado
- [ ] Pricing API retorna euros
- [ ] Beauvais flexible = false
- [ ] Idempotencia implementada
- [ ] Transiciones validadas
- [ ] Tests pasan
- [ ] No hay console.log en producción

---

**Correcciones aplicadas:** _____________  
**Verificado por:** _____________  
**Fecha:** _____________

