# 🎨 GUÍA DE INTEGRACIÓN FRONTEND - V3.1.2

**Para:** Equipo de Frontend  
**Fecha:** 2025-12-14  
**Versión:** v3.1.2

---

## 📋 RESUMEN

El sistema V3.1.2 introduce dos modos de pago:
- **Prepaid:** Cliente paga online con descuento (€5 menos)
- **Flexible:** Cliente paga al conductor (precio estándar)

---

## 🔧 CAMBIOS NECESARIOS EN EL FRONTEND

### 1. REEMPLAZAR PRICING LEGACY

**ANTES (❌ Deprecado):**
```typescript
import { PRICING } from '@/config/pricing';

const price = PRICING.standard['cdg-paris']['1-3']; // €70
```

**DESPUÉS (✅ Nuevo):**
```typescript
import { calculatePricing } from '@/services/pricing/calculatePricing';

const result = calculatePricing('CDG_PARIS', 'sedan');
// result.prepaid_price = 8500 (€85.00 en céntimos)
// result.flexible_price = 9000 (€90.00 en céntimos)
```

---

### 2. CONSUMIR ENDPOINT PÚBLICO

**Endpoint:** `GET /api/pricing/calculate`

**Request:**
```typescript
interface PricingRequest {
  route_key: string;  // 'CDG_PARIS', 'ORLY_PARIS', etc.
  vehicle_type: 'sedan' | 'van';
}
```

**Response:**
```typescript
interface PricingResponse {
  currency: 'EUR';
  pricing_version: 'v3.1.2';
  prepaid_price: number;      // en céntimos
  flexible_price: number;     // en céntimos
  hold_amount: number;        // en céntimos
  payment_modes_enabled: {
    prepaid: boolean;
    flexible: boolean;
  };
}
```

**Ejemplo de uso:**
```typescript
const fetchPricing = async (routeKey: string, vehicleType: 'sedan' | 'van') => {
  const response = await fetch('/api/pricing/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ route_key: routeKey, vehicle_type: vehicleType }),
  });
  
  const data = await response.json();
  
  return {
    prepaid: data.prepaid_price / 100,  // Convertir a euros
    flexible: data.flexible_price / 100,
    holdAmount: data.hold_amount / 100,
    modesEnabled: data.payment_modes_enabled,
  };
};
```

---

### 3. MOSTRAR OPCIONES DE PAGO

**UI Recomendada:**

```tsx
<div className="payment-options">
  {/* Opción Prepaid */}
  <div className="option prepaid">
    <div className="badge">Best Price 💰</div>
    <h3>Prepaid - Pay Now</h3>
    <p className="price">€{prepaidPrice}</p>
    <p className="description">Pay online and save €5</p>
    <ul>
      <li>✅ Instant confirmation</li>
      <li>✅ Best price guarantee</li>
      <li>✅ Secure payment</li>
    </ul>
  </div>
  
  {/* Opción Flexible (si está habilitada) */}
  {modesEnabled.flexible && (
    <div className="option flexible">
      <div className="badge">Standard Rate</div>
      <h3>Flexible - Pay Driver</h3>
      <p className="price">€{flexiblePrice}</p>
      <p className="description">Pay cash or card to driver</p>
      <ul>
        <li>✅ Booking guarantee (€{holdAmount} hold)</li>
        <li>✅ Pay at the end of service</li>
        <li>✅ Flexible payment method</li>
      </ul>
    </div>
  )}
</div>
```

---

### 4. CASO ESPECIAL: BEAUVAIS

**Beauvais es PREPAID-ONLY:**

```typescript
if (routeKey === 'BEAUVAIS_PARIS') {
  // Solo mostrar opción prepaid
  // flexible_price será 0
  // payment_modes_enabled.flexible será false
}
```

**UI para Beauvais:**
```tsx
{routeKey === 'BEAUVAIS_PARIS' && (
  <div className="notice">
    ℹ️ Beauvais transfers are prepaid only due to distance
  </div>
)}
```

---

### 5. INTEGRAR PAYMENT SERVICE

**Importar servicio:**
```typescript
import { 
  createPrepaidPayment, 
  createFlexibleSetupIntent 
} from '@/services/payments/PaymentServiceV312';
```

**Flujo Prepaid:**
```typescript
const handlePrepaidPayment = async () => {
  try {
    const result = await createPrepaidPayment({
      booking_id: bookingId,
      customer_email: email,
      customer_name: name,
      amount_cents: prepaidPrice * 100, // Convertir a céntimos
      metadata: {
        booking_id: bookingId,
        route_key: routeKey,
        vehicle_type: vehicleType,
        pricing_version: 'v3.1.2',
        payment_mode: 'prepaid',
      },
    });
    
    // Usar client_secret con Stripe Elements
    const stripe = await getStripe();
    const { error } = await stripe.confirmPayment({
      clientSecret: result.client_secret,
      confirmParams: {
        return_url: `${window.location.origin}/booking/success`,
      },
    });
    
    if (error) {
      console.error('Payment failed:', error);
    }
  } catch (error) {
    console.error('Error creating payment:', error);
  }
};
```

**Flujo Flexible:**
```typescript
const handleFlexibleSetup = async () => {
  try {
    const result = await createFlexibleSetupIntent({
      booking_id: bookingId,
      customer_email: email,
      customer_name: name,
      metadata: {
        booking_id: bookingId,
        route_key: routeKey,
        vehicle_type: vehicleType,
        pricing_version: 'v3.1.2',
        payment_mode: 'flexible',
        hold_amount_cents: holdAmount * 100,
      },
    });
    
    // Usar client_secret con Stripe Elements
    const stripe = await getStripe();
    const { error } = await stripe.confirmSetup({
      clientSecret: result.client_secret,
      confirmParams: {
        return_url: `${window.location.origin}/booking/success`,
      },
    });
    
    if (error) {
      console.error('Setup failed:', error);
    }
  } catch (error) {
    console.error('Error creating setup:', error);
  }
};
```

---

## 🎨 TEXTOS RECOMENDADOS

### Prepaid
- **Título:** "Pay Now - Best Price"
- **Precio:** "€85" (con badge "Save €5")
- **Descripción:** "Pay online and get instant confirmation"
- **CTA:** "Pay Now"

### Flexible
- **Título:** "Pay Driver - Standard Rate"
- **Precio:** "€90"
- **Descripción:** "Pay cash or card to driver at the end of service"
- **Nota:** "A €30 booking guarantee will be held on your card"
- **CTA:** "Book with Flexible Payment"

---

## ⚠️ IMPORTANTE

1. **Céntimos:** Todos los precios del backend vienen en céntimos. Dividir por 100 para mostrar.
2. **Beauvais:** Siempre prepaid-only. Ocultar opción flexible.
3. **Hold Amount:** Mostrar claramente en flexible que es una retención temporal.
4. **Stripe Elements:** Usar los mismos componentes de Stripe que actualmente.

---

## 📞 SOPORTE

Para dudas técnicas:
- Ver ejemplos en: `src/services/payments/PaymentServiceV312.ts`
- Tests: `src/services/pricing/__tests__/calculatePricing.test.ts`
- Documentación: `RESUMEN_EJECUTIVO_V312.md`

---

**¡Listo para integrar! 🚀**

