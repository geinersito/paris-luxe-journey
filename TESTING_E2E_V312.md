# 🧪 TESTING E2E V3.1.2

**Criterio de éxito:** 7/7 tests pasan sin intervención manual

**Ejecutar en:** STAGING (Stripe TEST MODE)

---

## 📋 PRE-REQUISITOS

- [ ] Staging deployado completamente (`RUNBOOK_DEPLOYMENT_V312.md`)
- [ ] Acceso a Stripe Dashboard (test mode)
- [ ] Acceso a Supabase Dashboard (staging)
- [ ] Tarjetas de prueba de Stripe disponibles

---

## 🧪 TEST 1: CDG PREPAID (EEA CARD)

### **Objetivo:**
Verificar flujo completo de pago anticipado con tarjeta europea.

### **Pasos:**

1. **Llamar Pricing API:**
   ```bash
   curl -X POST https://[staging].supabase.co/functions/v1/api/pricing/calculate \
     -H "Content-Type: application/json" \
     -d '{
       "route_key": "CDG_PARIS",
       "vehicle_type": "sedan"
     }'
   ```

   **Esperado:**
   ```json
   {
     "prepaid_price": 85,
     "flexible_price": 90,
     "hold_amount": 30,
     "payment_modes_enabled": {
       "prepaid": true,
       "flexible": true
     }
   }
   ```

2. **Crear booking en DB:**
   ```sql
   INSERT INTO bookings_v312 (
     id, status, payment_mode, route_key, vehicle_type,
     total_price_cents, customer_email, pickup_datetime
   ) VALUES (
     'test-prepaid-001',
     'pending_payment',
     'prepaid',
     'CDG_PARIS',
     'sedan',
     8500,
     'test@example.com',
     NOW() + INTERVAL '48 hours'
   );
   ```

3. **Crear PaymentIntent:**
   ```bash
   curl -X POST https://[staging].supabase.co/functions/v1/create-prepaid-payment-v312 \
     -H "Authorization: Bearer [anon-key]" \
     -H "Content-Type: application/json" \
     -d '{
       "amount_cents": 8500,
       "currency": "eur",
       "customer_email": "test@example.com",
       "metadata": {
         "booking_id": "test-prepaid-001",
         "route_key": "CDG_PARIS",
         "vehicle_type": "sedan"
       }
     }'
   ```

   **Esperado:** `client_secret` retornado

4. **Confirmar pago con tarjeta de prueba:**
   - Tarjeta: `4242 4242 4242 4242`
   - Fecha: cualquier futura
   - CVC: cualquier 3 dígitos
   - (Usar Stripe Elements o API directamente)

5. **Verificar webhook recibido:**
   ```bash
   # En Stripe Dashboard > Webhooks > [endpoint] > Events
   # Debe aparecer: payment_intent.succeeded
   ```

6. **Verificar estado del booking:**
   ```sql
   SELECT status FROM bookings_v312 WHERE id = 'test-prepaid-001';
   -- Esperado: 'confirmed'
   ```

7. **Verificar log de transición:**
   ```sql
   SELECT * FROM booking_state_logs 
   WHERE booking_id = 'test-prepaid-001'
   ORDER BY created_at DESC;
   
   -- Esperado:
   -- from_state: pending_payment
   -- to_state: confirmed
   -- event: PAYMENT_SUCCEEDED
   ```

### **✅ CRITERIO DE ÉXITO:**
- [ ] Pricing correcto (85/90/30)
- [ ] PaymentIntent creado
- [ ] Pago confirmado
- [ ] Webhook recibido
- [ ] Estado = `confirmed`
- [ ] Log de transición registrado

---

## 🧪 TEST 2: CDG FLEXIBLE (SETUPINTENT CON SCA)

### **Objetivo:**
Verificar flujo de guardar método de pago con autenticación SCA.

### **Pasos:**

1. **Crear booking:**
   ```sql
   INSERT INTO bookings_v312 (
     id, status, payment_mode, route_key, vehicle_type,
     total_price_cents, hold_amount_cents, customer_email, pickup_datetime
   ) VALUES (
     'test-flexible-001',
     'pending_payment',
     'flexible',
     'CDG_PARIS',
     'sedan',
     9000,
     3000,
     'test@example.com',
     NOW() + INTERVAL '48 hours'
   );
   ```

2. **Crear SetupIntent:**
   ```bash
   curl -X POST https://[staging].supabase.co/functions/v1/create-flexible-setup-v312 \
     -H "Authorization: Bearer [anon-key]" \
     -H "Content-Type: application/json" \
     -d '{
       "customer_email": "test@example.com",
       "customer_name": "Test User",
       "metadata": {
         "booking_id": "test-flexible-001",
         "route_key": "CDG_PARIS"
       }
     }'
   ```

3. **Confirmar SetupIntent:**
   - Usar tarjeta: `4000 0027 6000 3184` (requiere SCA)
   - Completar autenticación 3D Secure

4. **Verificar webhook:**
   - Evento: `setup_intent.succeeded`

5. **Verificar estado:**
   ```sql
   SELECT status, stripe_customer_id, saved_payment_method_id 
   FROM bookings_v312 
   WHERE id = 'test-flexible-001';
   
   -- Esperado:
   -- status: confirmed
   -- stripe_customer_id: cus_xxxxx
   -- saved_payment_method_id: pm_xxxxx
   ```

### **✅ CRITERIO DE ÉXITO:**
- [ ] SetupIntent creado
- [ ] SCA completado
- [ ] Webhook recibido
- [ ] Estado = `confirmed`
- [ ] Customer ID y Payment Method guardados

---

## 🧪 TEST 3: HOLD JOB (PICKUP <= 24H)

### **Objetivo:**
Verificar que el job crea holds automáticamente a T-24h.

### **Pasos:**

1. **Crear booking flexible confirmado (pickup en 23h):**
   ```sql
   INSERT INTO bookings_v312 (
     id, status, payment_mode, route_key, vehicle_type,
     total_price_cents, hold_amount_cents, 
     stripe_customer_id, saved_payment_method_id,
     customer_email, pickup_datetime
   ) VALUES (
     'test-hold-001',
     'confirmed',
     'flexible',
     'CDG_PARIS',
     'sedan',
     9000,
     3000,
     'cus_test123',  -- Usar customer real de test anterior
     'pm_test123',   -- Usar PM real de test anterior
     'test@example.com',
     NOW() + INTERVAL '23 hours'
   );
   ```

2. **Ejecutar hold job manualmente:**
   ```bash
   curl -X POST https://[staging].supabase.co/functions/v1/create-hold-job-v312 \
     -H "Authorization: Bearer [service-role-key]" \
     -H "Content-Type: application/json"
   ```

3. **Verificar que se creó hold:**
   ```sql
   SELECT hold_payment_intent_id, hold_status 
   FROM bookings_v312 
   WHERE id = 'test-hold-001';
   
   -- Esperado:
   -- hold_payment_intent_id: pi_xxxxx
   -- hold_status: 'pending' o 'confirmed'
   ```

4. **Verificar en Stripe:**
   - Dashboard > Payments > [PI creado]
   - Amount: €30.00
   - Capture method: Manual
   - Status: Requires capture (o Requires action si SCA)

5. **Si requires_action, completar SCA:**
   - Simular autenticación del cliente

6. **Verificar webhook:**
   - Evento: `payment_intent.amount_capturable_updated`

7. **Verificar estado:**
   ```sql
   SELECT status FROM bookings_v312 WHERE id = 'test-hold-001';
   -- Esperado: 'hold_confirmed'
   ```

### **✅ CRITERIO DE ÉXITO:**
- [ ] Job detecta booking
- [ ] Hold creado en Stripe
- [ ] Amount = €30
- [ ] Capture method = manual
- [ ] Estado actualizado correctamente

---

## 🧪 TEST 4: SCA TIMEOUT (2H)

### **Objetivo:**
Verificar que bookings con SCA no completado se cancelan a las 2h.

### **Pasos:**

1. **Crear hold que requiere SCA:**
   (Usar tarjeta `4000 0027 6000 3184`)

2. **NO completar la autenticación**

3. **Esperar 2 horas** (o simular con timestamp manual)

4. **Ejecutar job de timeout:**
   ```bash
   # Crear job temporal o ejecutar manualmente
   curl -X POST https://[staging].supabase.co/functions/v1/sca-timeout-check-v312
   ```

5. **Verificar estado:**
   ```sql
   SELECT status FROM bookings_v312 WHERE id = 'test-sca-timeout-001';
   -- Esperado: 'cancelled' o 'failed'
   ```

6. **Verificar PI cancelado en Stripe:**
   - Status: Canceled

### **✅ CRITERIO DE ÉXITO:**
- [ ] Booking cancelado después de 2h
- [ ] PaymentIntent cancelado en Stripe
- [ ] Notificación enviada (si configurado)

---

## 🧪 TEST 5: LATE CANCEL / NO-SHOW (CAPTURA HOLD)

### **Objetivo:**
Verificar que holds se capturan correctamente en caso de no-show.

### **Pasos:**

1. **Crear booking con hold confirmado:**
   (Usar resultado de TEST 3)

2. **Marcar como no-show:**
   ```sql
   UPDATE bookings_v312 
   SET status = 'cancelled', cancellation_reason = 'no_show'
   WHERE id = 'test-hold-001';
   ```

3. **Capturar hold (endpoint admin):**
   ```bash
   curl -X POST https://[staging].supabase.co/functions/v1/capture-hold-v312 \
     -H "Authorization: Bearer [service-role-key]" \
     -H "Content-Type: application/json" \
     -d '{"booking_id": "test-hold-001"}'
   ```

4. **Verificar captura en Stripe:**
   - Dashboard > Payments > [PI]
   - Status: Succeeded
   - Amount captured: €30.00

5. **Verificar webhook:**
   - Evento: `payment_intent.succeeded` (post-capture)

6. **Verificar registro:**
   ```sql
   SELECT hold_captured_at FROM bookings_v312 WHERE id = 'test-hold-001';
   -- Esperado: timestamp actual
   ```

### **✅ CRITERIO DE ÉXITO:**
- [ ] Hold capturado exitosamente
- [ ] €30 cobrados
- [ ] Webhook recibido
- [ ] Timestamp registrado

---

## 🧪 TEST 6: COMPLETION CANCELS HOLD

### **Objetivo:**
Verificar que holds se cancelan al completar servicio.

### **Pasos:**

1. **Crear booking con hold confirmado**

2. **Marcar servicio como completado:**
   ```sql
   UPDATE bookings_v312 
   SET status = 'completed'
   WHERE id = 'test-completion-001';
   ```

3. **Ejecutar cancelación de hold:**
   ```bash
   # Debe ser automático via webhook o job
   ```

4. **Verificar PI cancelado en Stripe:**
   - Status: Canceled

5. **Verificar webhook:**
   - Evento: `payment_intent.canceled`

### **✅ CRITERIO DE ÉXITO:**
- [ ] Hold cancelado
- [ ] Cliente no cobrado
- [ ] Estado = completed

---

## 🧪 TEST 7: BEAUVAIS PREPAID-ONLY

### **Objetivo:**
Verificar que Beauvais NO permite modo flexible.

### **Pasos:**

1. **Llamar Pricing API:**
   ```bash
   curl -X POST /api/pricing/calculate \
     -d '{"route_key":"BEAUVAIS_PARIS","vehicle_type":"sedan"}'
   ```

   **Esperado:**
   ```json
   {
     "prepaid_price": 145,
     "flexible_price": 0,
     "payment_modes_enabled": {
       "prepaid": true,
       "flexible": false
     }
   }
   ```

2. **Verificar UI no muestra opción flexible**

3. **Intentar crear SetupIntent para Beauvais (debe fallar):**
   ```bash
   curl -X POST /create-flexible-setup-v312 \
     -d '{"metadata":{"route_key":"BEAUVAIS_PARIS"}}'
   
   # Esperado: Error 400 "Flexible not available for this route"
   ```

### **✅ CRITERIO DE ÉXITO:**
- [ ] Pricing correcto (145/0)
- [ ] flexible = false
- [ ] UI no muestra opción
- [ ] API rechaza flexible

---

## 📊 RESUMEN DE TESTING

| Test | Status | Notas |
|------|--------|-------|
| 1. CDG Prepaid | ☐ | |
| 2. CDG Flexible + SCA | ☐ | |
| 3. Hold Job T-24h | ☐ | |
| 4. SCA Timeout 2h | ☐ | |
| 5. Capture Hold (no-show) | ☐ | |
| 6. Cancel Hold (completion) | ☐ | |
| 7. Beauvais prepaid-only | ☐ | |

**Resultado:** ___/7 tests pasados

**Aprobado para producción:** ☐ SÍ (7/7)  ☐ NO (<7/7)

---

**Fecha de testing:** _____________  
**Testeado por:** _____________

