# 🚀 GUÍA DE DEPLOYMENT - SISTEMA V3.1.2

**Versión:** v3.1.2  
**Fecha:** 2025-12-14  
**Autor:** Paris Elite Services - Tech Team

---

## 📋 PRE-REQUISITOS

Antes de comenzar el deployment, asegúrate de tener:

- ✅ Acceso a Stripe Dashboard (modo producción)
- ✅ Acceso a Supabase Dashboard
- ✅ Acceso al repositorio Git
- ✅ Variables de entorno configuradas
- ✅ Base de datos de respaldo (backup)

---

## 🔧 PASO 1: CONFIGURACIÓN DE STRIPE

### 1.1 Crear Webhook Endpoint

1. Ir a [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click en "Add endpoint"
3. Configurar:
   ```
   Endpoint URL: https://your-project.supabase.co/functions/v1/stripe-webhooks-v312
   Description: Paris Elite V3.1.2 Webhooks
   Version: Latest API version
   ```

4. Seleccionar eventos:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `setup_intent.succeeded`
   - ✅ `setup_intent.setup_failed`
   - ✅ `payment_intent.amount_capturable_updated`
   - ✅ `charge.captured`
   - ✅ `payment_intent.canceled`

5. Copiar el **Signing secret** (whsec_...)

### 1.2 Verificar API Keys

```bash
# Test mode (desarrollo)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Live mode (producción)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 🗄️ PASO 2: MIGRACIÓN DE BASE DE DATOS

### 2.1 Crear Backup

```bash
# Backup de la base de datos actual
supabase db dump > backup_pre_v312_$(date +%Y%m%d).sql
```

### 2.2 Ejecutar Migración

```bash
# Aplicar migración V3.1.2
supabase db push

# O manualmente:
psql $DATABASE_URL < supabase/migrations/20251214_v312_payment_system.sql
```

### 2.3 Verificar Tablas

```sql
-- Verificar que las tablas se crearon correctamente
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE '%v312%';

-- Resultado esperado:
-- bookings_v312
-- stripe_webhook_events
-- booking_state_logs
-- stripe_fee_config
```

---

## ⚙️ PASO 3: CONFIGURAR VARIABLES DE ENTORNO

### 3.1 Copiar Template

```bash
cp .env.v312.example .env.local
```

### 3.2 Completar Variables Críticas

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET_V312=whsec_...
STRIPE_WORST_CASE_FEE_PERCENT=3.5
STRIPE_WORST_CASE_FEE_FIXED_EUR=0.25

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Pricing
PRICING_VERSION=v3.1.2
ENABLE_V312_SYSTEM=true
```

### 3.3 Configurar en Supabase

1. Ir a **Supabase Dashboard > Settings > Edge Functions**
2. Agregar variables de entorno:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET_V312`
   - `STRIPE_WORST_CASE_FEE_PERCENT`
   - `STRIPE_WORST_CASE_FEE_FIXED_EUR`

---

## 📦 PASO 4: DEPLOY DE EDGE FUNCTIONS

### 4.1 Instalar Supabase CLI

```bash
npm install -g supabase
supabase login
```

### 4.2 Deploy Functions

```bash
# Deploy todas las funciones V3.1.2
supabase functions deploy create-prepaid-payment-v312
supabase functions deploy create-flexible-setup-v312
supabase functions deploy create-hold-v312
supabase functions deploy create-hold-job-v312
supabase functions deploy stripe-webhooks-v312
```

### 4.3 Verificar Deployment

```bash
# Listar funciones deployadas
supabase functions list

# Test de función
curl -X POST https://your-project.supabase.co/functions/v1/create-prepaid-payment-v312 \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## ⏰ PASO 5: CONFIGURAR CRON JOBS

### 5.1 Create Hold Job (cada 60 minutos)

1. Ir a **Supabase Dashboard > Edge Functions > Cron**
2. Crear nuevo cron job:
   ```
   Name: create-hold-job-v312
   Function: create-hold-job-v312
   Schedule: */60 * * * *
   Timezone: Europe/Paris
   ```

### 5.2 Verificar Ejecución

```bash
# Ver logs del cron job
supabase functions logs create-hold-job-v312 --tail
```

---

## 🧪 PASO 6: TESTING EN PRODUCCIÓN

### 6.1 Test Prepaid Flow

```bash
# Crear booking de prueba
curl -X POST https://api.pariselite.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "route_key": "CDG_PARIS",
    "vehicle_type": "sedan",
    "payment_mode": "prepaid",
    "customer_email": "test@pariselite.com"
  }'
```

### 6.2 Test Flexible Flow

```bash
# Crear booking flexible
curl -X POST https://api.pariselite.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "route_key": "ORLY_PARIS",
    "vehicle_type": "sedan",
    "payment_mode": "flexible",
    "customer_email": "test@pariselite.com"
  }'
```

### 6.3 Test Webhook

```bash
# Usar Stripe CLI para simular webhook
stripe trigger payment_intent.succeeded
```

---

## 📊 PASO 7: MONITOREO

### 7.1 Configurar Alertas

- ✅ Webhook failures
- ✅ Payment failures
- ✅ Hold creation failures
- ✅ SCA timeout

### 7.2 Dashboards

- Stripe Dashboard: Monitorear pagos
- Supabase Dashboard: Monitorear funciones
- Logs: Revisar errores

---

## 🔄 PASO 8: ROLLBACK (Si es necesario)

### 8.1 Deshabilitar V3.1.2

```bash
# Cambiar variable de entorno
ENABLE_V312_SYSTEM=false
```

### 8.2 Restaurar Base de Datos

```bash
# Restaurar desde backup
psql $DATABASE_URL < backup_pre_v312_YYYYMMDD.sql
```

---

## ✅ CHECKLIST FINAL

Antes de considerar el deployment completo:

- [ ] Webhooks de Stripe configurados y verificados
- [ ] Base de datos migrada correctamente
- [ ] Edge Functions deployadas y funcionando
- [ ] Cron jobs configurados
- [ ] Variables de entorno configuradas
- [ ] Tests de prepaid exitosos
- [ ] Tests de flexible exitosos
- [ ] Monitoreo configurado
- [ ] Equipo notificado
- [ ] Documentación actualizada

---

## 📞 SOPORTE

En caso de problemas durante el deployment:

1. Revisar logs: `supabase functions logs --tail`
2. Verificar webhooks en Stripe Dashboard
3. Contactar al equipo técnico

---

**¡Deployment completado! 🎉**

