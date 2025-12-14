# 🗄️ GUÍA DE MIGRACIÓN SUPABASE V3.1.2

**Migración crítica:** `20251214_v312_payment_system.sql`

---

## 📋 ¿QUÉ CREA ESTA MIGRACIÓN?

### **5 Tablas nuevas:**

1. **`bookings_v312`** - Bookings con sistema de pagos V3.1.2
   - Estados canónicos (9 estados)
   - Soporte para Prepaid y Flexible
   - Integración con Stripe
   - Campos para holds y payment methods

2. **`stripe_webhook_events`** - Idempotencia de webhooks
   - Evita procesamiento duplicado
   - Registra todos los eventos de Stripe

3. **`booking_state_logs`** - Historial de cambios
   - Auditoría completa de transiciones
   - Metadata de cada cambio
   - Trazabilidad total

4. **`stripe_fee_config`** - Configuración de fees
   - Singleton (solo 1 fila)
   - Fees configurables
   - Valores por defecto: 3.5% + €0.25

5. **`notifications`** - Historial de notificaciones
   - Email, SMS, WhatsApp
   - Estado de envío
   - Trazabilidad de comunicaciones

---

## 🚀 CÓMO EJECUTAR LA MIGRACIÓN

### **OPCIÓN 1: Con Supabase CLI (Recomendado)**

```bash
# 1. Asegurarte de tener Supabase CLI instalado
supabase --version

# 2. Conectar a tu proyecto
supabase link --project-ref [tu-project-ref]

# 3. Ejecutar la migración
supabase db push

# 4. Verificar que se aplicó correctamente
supabase db diff
```

### **OPCIÓN 2: Manual en Dashboard**

1. Ir a: https://supabase.com/dashboard/project/[tu-proyecto]
2. Click en **SQL Editor** (menú izquierdo)
3. Click en **New Query**
4. Copiar TODO el contenido de `supabase/migrations/20251214_v312_payment_system.sql`
5. Pegar en el editor
6. Click en **Run** (o Ctrl+Enter)
7. Verificar que dice "Success" sin errores

---

## ✅ VERIFICACIÓN POST-MIGRACIÓN

### **1. Verificar que las tablas existen:**

```sql
-- En SQL Editor de Supabase
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%v312%'
ORDER BY table_name;

-- Debe mostrar:
-- bookings_v312
-- stripe_webhook_events
-- booking_state_logs
-- stripe_fee_config
-- notifications
```

### **2. Verificar estructura de bookings_v312:**

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings_v312'
ORDER BY ordinal_position;

-- Verificar que existe columna 'status' con CHECK constraint
```

### **3. Verificar estados permitidos:**

```sql
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'bookings_v312'::regclass
AND conname LIKE '%status%';

-- Debe mostrar los 9 estados canónicos:
-- pending_payment, confirmed, partner_assigned, hold_pending,
-- hold_confirmed, in_progress, completed, cancelled, failed
```

### **4. Verificar índices creados:**

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'bookings_v312'
ORDER BY indexname;

-- Debe mostrar al menos 7 índices
```

### **5. Verificar configuración de fees:**

```sql
SELECT * FROM stripe_fee_config;

-- Debe mostrar 1 fila:
-- worst_case_percent: 3.5
-- worst_case_fixed_eur: 0.25
```

---

## 🔧 TROUBLESHOOTING

### **Error: "relation already exists"**

Si ya ejecutaste la migración antes:

```sql
-- Opción 1: Verificar si ya existe
SELECT * FROM bookings_v312 LIMIT 1;

-- Si existe y tiene datos, NO re-ejecutar
-- Si existe pero está vacía, puedes DROP y re-crear:
DROP TABLE IF EXISTS bookings_v312 CASCADE;
DROP TABLE IF EXISTS stripe_webhook_events CASCADE;
DROP TABLE IF EXISTS booking_state_logs CASCADE;
DROP TABLE IF EXISTS stripe_fee_config CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

-- Luego re-ejecutar la migración
```

### **Error: "permission denied"**

Asegúrate de estar usando el usuario correcto:

```sql
-- Verificar usuario actual
SELECT current_user;

-- Debe ser 'postgres' o tener permisos de superuser
```

### **Error: "syntax error"**

Verifica que copiaste TODO el archivo completo, incluyendo:
- Comentarios iniciales
- Todas las tablas
- Todos los índices
- Triggers
- Comentarios finales

---

## 📊 DATOS DE PRUEBA (OPCIONAL)

Para testing, puedes insertar un booking de prueba:

```sql
-- Insertar booking de prueba
INSERT INTO bookings_v312 (
  route_key,
  vehicle_type,
  origin,
  destination,
  customer_name,
  customer_email,
  customer_phone,
  passengers,
  pickup_datetime,
  prepaid_price_cents,
  flexible_price_cents,
  hold_amount_cents,
  partner_floor_cents,
  payment_mode,
  stripe_customer_id,
  status
) VALUES (
  'CDG_PARIS',
  'sedan',
  'Charles de Gaulle Airport',
  'Paris Center',
  'Test User',
  'test@example.com',
  '+33612345678',
  2,
  NOW() + INTERVAL '48 hours',
  8500,  -- €85
  9000,  -- €90
  3000,  -- €30
  7000,  -- €70
  'prepaid',
  'cus_test123',
  'pending_payment'
);

-- Verificar que se insertó
SELECT id, status, payment_mode, customer_email 
FROM bookings_v312 
WHERE customer_email = 'test@example.com';
```

---

## 🔄 ROLLBACK (Si algo sale mal)

```sql
-- CUIDADO: Esto elimina TODAS las tablas y datos
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS booking_state_logs CASCADE;
DROP TABLE IF EXISTS stripe_webhook_events CASCADE;
DROP TABLE IF EXISTS stripe_fee_config CASCADE;
DROP TABLE IF EXISTS bookings_v312 CASCADE;

-- Eliminar función del trigger
DROP FUNCTION IF EXISTS update_updated_at_column();
```

---

## 📝 NOTAS IMPORTANTES

### **Estados Canónicos (CRÍTICO):**

La migración define 9 estados que DEBEN coincidir con:
- `src/services/state-machine/BookingStateMachine.ts`
- `supabase/functions/stripe-webhooks-v312-integrated/index.ts`
- Frontend components

**Estados:**
1. `pending_payment` - Esperando pago/setup
2. `confirmed` - Pago confirmado
3. `partner_assigned` - Conductor asignado
4. `hold_pending` - Hold creado, esperando auth
5. `hold_confirmed` - Hold autenticado
6. `in_progress` - Servicio en curso
7. `completed` - Servicio completado
8. `cancelled` - Booking cancelado
9. `failed` - Pago/setup fallido

### **NO usar estos estados (obsoletos):**
- ❌ `pending`
- ❌ `payment_processing`
- ❌ `driver_assigned` (usar `partner_assigned`)
- ❌ `driver_departed`
- ❌ `payment_failed` (usar `failed`)
- ❌ `unconfirmed_no_contact`

---

## ✅ CHECKLIST DE MIGRACIÓN

- [ ] Migración ejecutada sin errores
- [ ] 5 tablas creadas
- [ ] Índices creados (verificar con query)
- [ ] Constraint de estados verificado
- [ ] Configuración de fees insertada
- [ ] Trigger de updated_at funciona
- [ ] Datos de prueba insertados (opcional)
- [ ] Rollback testeado en staging (opcional)

---

**Migración ejecutada:** ☐ Staging  ☐ Producción  
**Fecha:** _____________  
**Ejecutado por:** _____________  
**Resultado:** ☐ Éxito  ☐ Error (ver logs)

