# 🚀 GUÍA DE MIGRACIÓN FRONTEND V3.1.2

**Objetivo:** Migrar el frontend actual para usar el nuevo sistema de pricing y pagos V3.1.2

---

## 📋 RESUMEN DE CAMBIOS

### ❌ **ANTES (Sistema Antiguo)**
```typescript
// Cálculo de precio local
import { calculatePrice } from '@/config/pricing';
const price = calculatePrice(route, passengers);

// Pago directo
const { data } = await supabase.functions.invoke('create-payment-intent', {
  body: { amount: price * 100 }
});
```

### ✅ **DESPUÉS (Sistema V3.1.2)**
```typescript
// Pricing desde API
import { usePricingV312 } from '@/hooks/booking/usePricingV312';
const { pricing, fetchPricing } = usePricingV312();
await fetchPricing('CDG_PARIS', 'sedan');

// Pago con modo seleccionado
import { usePaymentV312 } from '@/hooks/booking/usePaymentV312';
const { createPrepaidPayment, createFlexibleSetup } = usePaymentV312();
```

---

## 🔧 PASO 1: Instalar Nuevos Componentes

### Archivos creados (ya disponibles):
- ✅ `src/hooks/booking/usePricingV312.ts` - Hook para pricing API
- ✅ `src/hooks/booking/usePaymentV312.ts` - Hook para pagos
- ✅ `src/components/booking/PaymentModeSelector.tsx` - Selector de modo
- ✅ `src/components/booking/BookingFlowV312.tsx` - Flujo completo

### No requiere instalación adicional
Todos los componentes usan dependencias existentes.

---

## 🔄 PASO 2: Migrar Cálculo de Precios

### 2.1. Reemplazar `calculatePrice` local

**ANTES:**
```typescript
// src/pages/booking/Details.tsx
import { calculatePrice } from '@/config/pricing';

const price = calculatePrice(route, passengers);
```

**DESPUÉS:**
```typescript
// src/pages/booking/Details.tsx
import { usePricingV312, getRouteKeyFromLocations } from '@/hooks/booking/usePricingV312';

const { pricing, fetchPricing, isLoading } = usePricingV312();

useEffect(() => {
  const routeKey = getRouteKeyFromLocations(pickup, dropoff);
  const vehicleType = passengers <= 3 ? 'sedan' : 'van';
  
  if (routeKey) {
    fetchPricing(routeKey, vehicleType);
  }
}, [pickup, dropoff, passengers]);

// Usar pricing.prepaid_price o pricing.flexible_price
```

### 2.2. Actualizar UI de precios

**ANTES:**
```tsx
<div>Precio: €{price}</div>
```

**DESPUÉS:**
```tsx
{isLoading ? (
  <Loader2 className="animate-spin" />
) : pricing ? (
  <div>
    <div>Pago anticipado: €{pricing.prepaid_price}</div>
    {pricing.payment_modes_enabled.flexible && (
      <div>Pago al conductor: €{pricing.flexible_price}</div>
    )}
  </div>
) : (
  <div>Error al calcular precio</div>
)}
```

---

## 💳 PASO 3: Migrar Flujo de Pago

### 3.1. Usar componente integrado (RECOMENDADO)

**Opción más simple:**
```tsx
// src/pages/booking/Payment.tsx
import { BookingFlowV312 } from '@/components/booking/BookingFlowV312';

<BookingFlowV312
  routeKey={routeKey}
  vehicleType={vehicleType}
  bookingId={bookingId}
  customerName={name}
  customerEmail={email}
  customerPhone={phone}
  onSuccess={() => navigate('/booking/success')}
  onError={(error) => console.error(error)}
/>
```

### 3.2. Implementación manual (AVANZADO)

Si necesitas más control:

```tsx
import { usePricingV312 } from '@/hooks/booking/usePricingV312';
import { usePaymentV312 } from '@/hooks/booking/usePaymentV312';
import { PaymentModeSelector } from '@/components/booking/PaymentModeSelector';

const [paymentMode, setPaymentMode] = useState<'prepaid' | 'flexible'>('prepaid');
const { pricing } = usePricingV312({ routeKey, vehicleType, autoFetch: true });
const { createPrepaidPayment, createFlexibleSetup } = usePaymentV312();

// Paso 1: Mostrar selector
<PaymentModeSelector
  pricing={pricing}
  selectedMode={paymentMode}
  onModeChange={setPaymentMode}
/>

// Paso 2: Crear payment/setup
const handlePay = async () => {
  if (paymentMode === 'prepaid') {
    const result = await createPrepaidPayment(
      pricing.prepaid_price * 100,
      { booking_id, route_key, ... }
    );
    setClientSecret(result.client_secret);
  } else {
    const result = await createFlexibleSetup({ booking_id, ... });
    setClientSecret(result.client_secret);
  }
};

// Paso 3: Confirmar con Stripe
<StripePaymentForm
  clientSecret={clientSecret}
  onSuccess={handleSuccess}
  onError={handleError}
/>
```

---

## 🗺️ PASO 4: Mapeo de Rutas

### Helper para determinar route_key

```typescript
import { getRouteKeyFromLocations } from '@/hooks/booking/usePricingV312';

const routeKey = getRouteKeyFromLocations(
  'Charles de Gaulle Airport',
  'Paris Center'
);
// Retorna: 'CDG_PARIS'
```

### Rutas soportadas:
- `CDG_PARIS` / `PARIS_CDG`
- `ORLY_PARIS` / `PARIS_ORLY`
- `DISNEY_PARIS` / `PARIS_DISNEY`
- `VERSAILLES_PARIS` / `PARIS_VERSAILLES`
- `BEAUVAIS_PARIS` / `PARIS_BEAUVAIS`
- `GARE_NORD_PARIS` / `PARIS_GARE_NORD`
- `GARE_EST_PARIS` / `PARIS_GARE_EST`
- `GARE_LYON_PARIS` / `PARIS_GARE_LYON`
- `GARE_MONTPARNASSE_PARIS` / `PARIS_GARE_MONTPARNASSE`

---

## ✅ PASO 5: Testing

### Checklist de pruebas:

- [ ] Pricing API responde correctamente
- [ ] Selector de modo de pago muestra ambas opciones
- [ ] Pago prepaid funciona (PaymentIntent)
- [ ] Pago flexible funciona (SetupIntent)
- [ ] Hold se crea a T-24h (verificar en Stripe Dashboard)
- [ ] Webhooks actualizan estado correctamente
- [ ] Notificaciones se envían

### Comandos de prueba:

```bash
# Test pricing API
curl -X POST http://localhost:5173/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{"route_key":"CDG_PARIS","vehicle_type":"sedan"}'

# Verificar Edge Functions
supabase functions list
supabase functions logs create-prepaid-payment-v312
```

---

## 🚨 ERRORES COMUNES

### Error: "No pricing available"
**Causa:** Route key no reconocida  
**Solución:** Verificar que `getRouteKeyFromLocations()` retorna un valor válido

### Error: "Payment mode not available"
**Causa:** Beauvais solo soporta prepaid  
**Solución:** Verificar `pricing.payment_modes_enabled.flexible`

### Error: "Hold not created"
**Causa:** Job de holds no está corriendo  
**Solución:** Verificar cron job `create-hold-job-v312`

---

## 📊 MIGRACIÓN GRADUAL (RECOMENDADO)

### Fase 1: Dual Mode (1 semana)
- Mantener sistema antiguo activo
- Agregar sistema nuevo en paralelo
- Feature flag para alternar

### Fase 2: Testing (1 semana)
- Probar con 10% de usuarios
- Monitorear errores
- Ajustar según feedback

### Fase 3: Full Migration (1 día)
- Migrar 100% de usuarios
- Deprecar sistema antiguo
- Limpiar código legacy

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Revisar esta guía
2. ⏳ Implementar en página de booking
3. ⏳ Testing en desarrollo
4. ⏳ Deploy a staging
5. ⏳ Testing E2E
6. ⏳ Deploy a producción

---

**¿Dudas?** Consultar `FRONTEND_INTEGRATION_GUIDE.md` para más detalles técnicos.

