# 🚀 RUNBOOK DE DEPLOYMENT V3.1.2

**Orden obligatorio:** STAGING → TESTING E2E → PRODUCCIÓN

---

## 📋 PRE-REQUISITOS

### ✅ Antes de empezar:

- [ ] `GATE_COHERENCIA_V312.md` completado al 100%
- [ ] Acceso a Supabase Dashboard (staging + producción)
- [ ] Acceso a Stripe Dashboard (test + live mode)
- [ ] Supabase CLI instalado (`supabase --version`)
- [ ] Git en branch limpio (sin cambios pendientes)

---

## 🧪 FASE 1: DEPLOYMENT STAGING (2-3 horas)

### **Paso 1.1: Configurar variables de entorno**

En Supabase Dashboard > Project Settings > Edge Functions > Secrets:

```bash
# Stripe (TEST MODE)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET_V312=whsec_xxxxx

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx
VITE_SUPABASE_ANON_KEY=eyJxxxxx

# Pricing
STRIPE_WORST_CASE_FEE_PERCENT=3.5
STRIPE_WORST_CASE_FEE_FIXED_EUR=0.25

# Notificaciones (opcional para staging)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

**Verificación:**
```bash
supabase secrets list --project-ref [staging-ref]
```

---

### **Paso 1.2: Migrar base de datos**

```bash
# Opción A: Con CLI
supabase db push --project-ref [staging-ref]

# Opción B: Manual en Dashboard
# 1. Ir a SQL Editor
# 2. Copiar contenido de: supabase/migrations/20251214_v312_payment_system.sql
# 3. Ejecutar
# 4. Verificar que no hay errores
```

**Verificación:**
```sql
-- En SQL Editor, verificar tablas creadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%v312%';

-- Debe mostrar:
-- bookings_v312
-- stripe_webhook_events
-- booking_state_logs
-- notifications
```

---

### **Paso 1.3: Deploy Edge Functions**

```bash
# Conectar a staging
supabase link --project-ref [staging-ref]

# Deploy todas las funciones
supabase functions deploy create-prepaid-payment-v312
supabase functions deploy create-flexible-setup-v312
supabase functions deploy create-hold-v312
supabase functions deploy create-hold-job-v312
supabase functions deploy partner-sla-job-v312
supabase functions deploy stripe-webhooks-v312-integrated

# Verificar deployment
supabase functions list
```

**Verificación:**
```bash
# Test básico de cada función
curl -X POST https://[staging].supabase.co/functions/v1/create-prepaid-payment-v312 \
  -H "Authorization: Bearer [anon-key]" \
  -H "Content-Type: application/json" \
  -d '{"amount_cents":8500,"currency":"eur","customer_email":"test@test.com"}'

# Debe retornar client_secret (no error 500)
```

---

### **Paso 1.4: Configurar Webhooks en Stripe**

**En Stripe Dashboard (TEST MODE):**

1. Ir a: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. **Endpoint URL:**
   ```
   https://[staging].supabase.co/functions/v1/stripe-webhooks-v312-integrated
   ```
4. **Eventos a seleccionar:**
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `setup_intent.succeeded`
   - ✅ `setup_intent.setup_failed`
   - ✅ `payment_intent.amount_capturable_updated`
   - ✅ `charge.captured`
   - ✅ `payment_intent.canceled`

5. Click "Add endpoint"
6. **Copiar "Signing secret"** (empieza con `whsec_`)
7. Actualizar en Supabase Secrets:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET_V312=whsec_xxxxx
   ```

**Verificación:**
```bash
# En Stripe Dashboard > Webhooks > [tu endpoint]
# Click "Send test webhook" > payment_intent.succeeded
# Verificar que aparece como "succeeded" (no failed)
```

---

### **Paso 1.5: Configurar Cron Jobs**

**En Supabase Dashboard > Database > Extensions:**

1. Habilitar extensión `pg_cron`:
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_cron;
   ```

2. Crear jobs:
   ```sql
   -- Job 1: Create Holds (cada 60 minutos)
   SELECT cron.schedule(
     'create-holds-v312-staging',
     '0 * * * *',  -- Cada hora en punto
     $$
     SELECT net.http_post(
       url := 'https://[staging].supabase.co/functions/v1/create-hold-job-v312',
       headers := jsonb_build_object(
         'Content-Type', 'application/json',
         'Authorization', 'Bearer [SERVICE_ROLE_KEY]'
       )
     );
     $$
   );

   -- Job 2: Partner SLA (cada 30 minutos)
   SELECT cron.schedule(
     'partner-sla-v312-staging',
     '*/30 * * * *',  -- Cada 30 minutos
     $$
     SELECT net.http_post(
       url := 'https://[staging].supabase.co/functions/v1/partner-sla-job-v312',
       headers := jsonb_build_object(
         'Content-Type', 'application/json',
         'Authorization', 'Bearer [SERVICE_ROLE_KEY]'
       )
     );
     $$
   );
   ```

**Verificación:**
```sql
-- Ver jobs programados
SELECT * FROM cron.job;

-- Ver ejecuciones recientes
SELECT * FROM cron.job_run_details 
ORDER BY start_time DESC 
LIMIT 10;
```

---

## ✅ STAGING DEPLOYMENT COMPLETADO

**Checklist final:**
- [ ] Variables de entorno configuradas
- [ ] Base de datos migrada
- [ ] 6 Edge Functions deployadas
- [ ] Webhook de Stripe configurado
- [ ] 2 Cron jobs activos
- [ ] Logs no muestran errores críticos

**Siguiente paso:** Ejecutar Testing E2E (ver `TESTING_E2E_V312.md`)

---

## 🏭 FASE 2: DEPLOYMENT PRODUCCIÓN (1-2 horas)

**⚠️ SOLO después de Testing E2E 7/7 en staging**

### **Diferencias vs Staging:**

1. **Stripe:** Usar LIVE MODE keys
2. **Webhook secret:** Diferente (crear nuevo endpoint)
3. **Cron jobs:** Nombres sin "-staging"
4. **Monitoreo:** Configurar alertas

### **Pasos:**

Repetir FASE 1 (Pasos 1.1 a 1.5) pero:
- Project ref: `[production-ref]`
- Stripe: LIVE MODE
- Cron job names: sin "-staging"

### **Post-deployment:**

```bash
# Verificar logs en tiempo real
supabase functions logs stripe-webhooks-v312-integrated --tail

# Monitorear primeros bookings
# Dashboard > Database > bookings_v312
```

---

## 🔄 ROLLBACK (si algo falla)

```bash
# 1. Deshabilitar cron jobs
SELECT cron.unschedule('create-holds-v312');
SELECT cron.unschedule('partner-sla-v312');

# 2. Deshabilitar webhook en Stripe
# Dashboard > Webhooks > [endpoint] > Disable

# 3. Revertir frontend a versión anterior
git revert [commit-hash]
git push

# 4. Investigar logs
supabase functions logs [function-name] --limit 100
```

---

**Deployment completado:** ☐ Staging  ☐ Producción  
**Fecha:** _____________  
**Deployado por:** _____________

