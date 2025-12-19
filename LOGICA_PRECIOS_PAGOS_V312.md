# 💰 LÓGICA DE PRECIOS, PAGOS Y ACOMPTE - SISTEMA V3.1.2

**Versión:** V3.1.2 Final  
**Fecha:** 2025-12-15  
**Estado:** Producción

---

## 📊 **1. CONCEPTOS FUNDAMENTALES**

### **Partner Floor (PF)**
- **Definición:** Precio mínimo garantizado al conductor (TTC - Toutes Taxes Comprises)
- **Propósito:** Retener conductores garantizando ingresos mínimos
- **Ejemplo:** CDG → París sedan = €80 PF

### **Flexible Commission (FC)**
- **Definición:** Comisión que cobra la plataforma en modo flexible
- **Valores:**
  - Sedan: €10.00 (1000 céntimos)
  - Van: €13.00 (1300 céntimos)

### **Prepaid Discount (PD)**
- **Definición:** Descuento por pagar por adelantado
- **Valor:** €5.00 (500 céntimos) - **FIJO para todas las rutas**
- **Propósito:** Incentivar pagos anticipados (mejor flujo de caja)

### **Hold Amount (HA)**
- **Definición:** Retención temporal en tarjeta para protección contra cancelaciones tardías
- **Valores según distancia:**
  - Short (Gares): €15.00
  - Medium (CDG, Orly, Disney, Versailles): €30.00
  - Long: €30.00
  - Extra Long (Beauvais): €0.00 (no tiene flexible)

---

## 🧮 **2. FÓRMULAS DE CÁLCULO**

### **Caso Normal (todas las rutas excepto Beauvais):**

```
flexible_price = PF + FC
prepaid_price = flexible_price - PD
prepaid_price = PF + FC - PD
```

**Ejemplo CDG → París (Sedan):**
```
PF = €80.00
FC = €10.00
PD = €5.00

flexible_price = €80 + €10 = €90.00
prepaid_price = €90 - €5 = €85.00
```

### **Caso Especial: Beauvais (Prepaid-Only):**

```
prepaid_price = PF + BEAUVAIS_BUFFER
flexible_price = 0 (NO DISPONIBLE)
```

**Ejemplo Beauvais → París (Sedan):**
```
PF = €130.00
BEAUVAIS_BUFFER = €10.00

prepaid_price = €130 + €10 = €140.00
flexible_price = NO DISPONIBLE
```

**Razón:** Beauvais es una ruta extra larga (80+ km) con alto riesgo de cancelación, por lo que solo se permite pago anticipado.

---

## 💳 **3. MODOS DE PAGO**

### **A. PREPAID (Pago Anticipado)**

**Características:**
- ✅ Pago 100% por adelantado
- ✅ Descuento de €5
- ✅ Captura automática en Stripe
- ✅ Disponible para TODAS las rutas
- ✅ Precio más bajo

**Flujo técnico:**
1. Cliente selecciona "Prepaid"
2. Se crea `PaymentIntent` con `capture_method: 'automatic'`
3. Cliente ingresa tarjeta y paga
4. Stripe captura el dinero inmediatamente
5. Reserva confirmada

**Ejemplo CDG → París (Sedan):**
- Precio: **€85.00**
- Cliente paga: **€85.00** ahora
- Conductor recibe: **€80.00** (PF)
- Plataforma gana: **€5.00** (€10 FC - €5 PD)

---

### **B. FLEXIBLE (Pago Posterior)**

**Características:**
- ✅ Pago después del servicio
- ❌ NO tiene descuento (€5 más caro)
- ✅ Hold temporal a T-24h
- ⚠️ NO disponible para Beauvais
- ✅ Más flexibilidad para el cliente

**Flujo técnico:**
1. Cliente selecciona "Flexible"
2. Se crea `SetupIntent` (guarda método de pago)
3. Cliente autoriza tarjeta (sin cargo)
4. **A T-24h del pickup:** Se crea automáticamente un `PaymentIntent` con:
   - `capture_method: 'manual'`
   - `amount: hold_amount` (€15 o €30 según ruta)
5. **Después del servicio:** Se captura el monto total
6. **Si cancela tarde:** Se captura solo el hold

**Ejemplo CDG → París (Sedan):**
- Precio: **€90.00**
- Cliente paga: **€0.00** ahora
- A T-24h: Hold de **€30.00** (retención temporal)
- Después del servicio: Cargo de **€90.00**
- Conductor recibe: **€80.00** (PF)
- Plataforma gana: **€10.00** (FC)

---

## 🔒 **4. SISTEMA DE HOLDS (Retenciones)**

### **¿Qué es un Hold?**
Un hold es una **autorización temporal** en la tarjeta del cliente que:
- ✅ Reserva fondos sin cobrarlos
- ✅ Protege contra cancelaciones tardías
- ✅ Se libera automáticamente si no se captura en 7 días

### **Cuándo se crea el Hold:**
- **Timing:** T-24h antes del pickup
- **Método:** Job automático (`create-hold-job-v312`)
- **Condición:** Solo para reservas en modo "Flexible"

### **Montos de Hold según distancia:**

| Distancia | Rutas | Hold Amount |
|-----------|-------|-------------|
| Short | Gares (GDN, GDL, GDE, GDM, GSL) | €15.00 |
| Medium | CDG, Orly, Disney, Versailles | €30.00 |
| Long | (reservado) | €30.00 |
| Extra Long | Beauvais | €0.00 (no tiene flexible) |

### **Escenarios de Hold:**

**Escenario 1: Servicio completado**
```
1. T-24h: Hold de €30 creado
2. Servicio completado
3. Hold se captura por €90 (precio total)
4. Cliente paga €90
```

**Escenario 2: Cancelación tardía (< 24h)**
```
1. T-24h: Hold de €30 creado
2. Cliente cancela a T-12h
3. Hold se captura por €30 (penalización)
4. Cliente paga €30
```

**Escenario 3: Cancelación temprana (> 24h)**
```
1. Cliente cancela a T-48h
2. NO se crea hold
3. Cliente paga €0
```

---

## 📝 **5. ACOMPTE (DEPÓSITO)**

### **⚠️ IMPORTANTE: NO HAY DEPÓSITO EN V3.1.2**

El sistema V3.1.2 **NO utiliza depósitos del 30%**. En su lugar:

**Prepaid:**
- Pago 100% por adelantado
- NO hay concepto de "depósito + saldo"

**Flexible:**
- Pago 0% por adelantado
- Hold temporal a T-24h
- Pago 100% después del servicio

### **Texto en FAQ (DESACTUALIZADO):**

Los textos en `src/i18n/*.ts` que mencionan "depósito del 30%" son **legacy** y deben actualizarse:

```typescript
// ❌ DESACTUALIZADO (de sistema antiguo)
deposit: {
  question: "¿Se requiere un depósito para reservar?",
  answer: "Para la mayoría de los servicios, se requiere un depósito del 30%..."
}

// ✅ CORRECTO (V3.1.2)
deposit: {
  question: "¿Cómo funciona el pago?",
  answer: "Ofrecemos dos opciones: Prepaid (pago 100% anticipado con €5 de descuento) o Flexible (pago después del servicio con hold temporal a 24h del pickup)."
}
```

---

## 💡 **6. EJEMPLOS COMPLETOS**

### **Ejemplo 1: CDG → París, 2 pasajeros, Prepaid**

```
Ruta: CDG_PARIS
Vehículo: Sedan (≤3 pasajeros)
Modo: Prepaid

Cálculo:
PF = €80.00
FC = €10.00
PD = €5.00
prepaid_price = €80 + €10 - €5 = €85.00

Cliente paga: €85.00 (ahora)
Conductor recibe: €80.00
Plataforma gana: €5.00
Hold: NO (prepaid no usa hold)
```

### **Ejemplo 2: CDG → París, 5 pasajeros, Flexible**

```
Ruta: CDG_PARIS
Vehículo: Van (≥4 pasajeros)
Modo: Flexible

Cálculo:
PF = €104.00
FC = €13.00
flexible_price = €104 + €13 = €117.00
hold_amount = €30.00 (medium distance)

Cliente paga: €0.00 (ahora)
A T-24h: Hold de €30.00
Después del servicio: Cargo de €117.00
Conductor recibe: €104.00
Plataforma gana: €13.00
```

### **Ejemplo 3: Beauvais → París, 3 pasajeros**

```
Ruta: BEAUVAIS_PARIS
Vehículo: Sedan
Modo: SOLO Prepaid (flexible NO disponible)

Cálculo:
PF = €130.00
BEAUVAIS_BUFFER = €10.00
prepaid_price = €130 + €10 = €140.00

Cliente paga: €140.00 (ahora)
Conductor recibe: €130.00
Plataforma gana: €10.00
Hold: NO (Beauvais no tiene flexible)
```

---

## 🔧 **7. IMPLEMENTACIÓN TÉCNICA**

### **Archivos clave:**

1. **`src/config/pricing-v312.ts`**
   - Definición de Partner Floors
   - Constantes (FC, PD, HA)
   - Configuración de rutas

2. **`src/services/pricing/calculatePricing.ts`**
   - Motor de cálculo
   - Validación de márgenes
   - Fórmulas de pricing

3. **`src/hooks/booking/useBookingPrice.tsx`**
   - Hook para calcular precios en frontend
   - Integración con Supabase
   - Conversión de UUIDs a RouteKeys

4. **`supabase/functions/create-prepaid-payment-v312/`**
   - Crear PaymentIntent para prepaid
   - Captura automática

5. **`supabase/functions/create-hold-v312/`**
   - Crear Hold para flexible
   - Captura manual

6. **`supabase/functions/create-hold-job-v312/`**
   - Job automático a T-24h
   - Crea holds para reservas flexible

---

## ✅ **8. VALIDACIONES**

### **Margen Mínimo:**
```
prepaid_price - STRIPE_FEE - PF >= €2.00
```

**Razón:** Garantizar que después de pagar Stripe y el conductor, la plataforma gane mínimo €2.

### **Stripe Fee (Worst Case):**
```
fee = (amount * 0.014) + 25¢
```

**Ejemplo CDG → París Sedan:**
```
prepaid_price = €85.00 (8500¢)
stripe_fee = (8500 * 0.014) + 25 = 119 + 25 = 144¢ (€1.44)
margin = 8500 - 144 - 8000 = 356¢ (€3.56) ✅ > €2.00
```

---

## 📊 **9. TABLA RESUMEN DE PRECIOS**

| Ruta | Sedan Prepaid | Sedan Flexible | Van Prepaid | Van Flexible |
|------|---------------|----------------|-------------|--------------|
| CDG → París | €85 | €90 | €110 | €117 |
| Orly → París | €80 | €85 | €105 | €111 |
| Beauvais → París | €140 | ❌ | €180 | ❌ |
| Disney → París | €80 | €85 | €110 | €117 |
| Versailles → París | €80 | €85 | €105 | €111 |
| Louvre → París | €60 | €65 | €77 | €85 |
| Eiffel → París | €60 | €65 | €77 | €85 |

**Diferencia Prepaid vs Flexible:** Siempre €5 (descuento prepaid)

---

## 🎯 **10. CONCLUSIÓN**

**Sistema V3.1.2 = "Partner Floor First"**

✅ Garantiza ingresos mínimos a conductores (PF)  
✅ Incentiva pagos anticipados (descuento €5)  
✅ Protege contra cancelaciones tardías (holds)  
✅ Cumple PSD2 (SCA en todos los pagos)  
✅ Márgenes validados (mínimo €2 después de fees)  

**NO hay depósitos del 30%** - Es todo o nada (100% prepaid o 0% flexible).

