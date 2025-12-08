# 📧 Configuración de Resend API Key

## ✅ Estado Actual

| **Componente** | **Estado** | **Ubicación** |
|----------------|-----------|---------------|
| **Edge Function** | ✅ Implementada | `supabase/functions/send-booking-emails/` |
| **Template Email** | ✅ Creado | React Email con diseño profesional |
| **Integración** | ✅ Conectada | Payment.tsx invoca la función |
| **API Key** | ⚠️ **PENDIENTE** | Debe configurarse en Supabase |

---

## 🔑 Paso 1: Obtener tu Resend API Key

1. Ve a [Resend Dashboard](https://resend.com/api-keys)
2. Inicia sesión con tu cuenta
3. Crea una nueva API Key:
   - **Name:** `Paris Elite Services - Production`
   - **Permission:** `Full Access` o `Sending Access`
4. **Copia la API Key** (empieza con `re_...`)
   - ⚠️ **IMPORTANTE:** Solo se muestra una vez!

---

## 🚀 Paso 2: Configurar en Supabase (3 opciones)

### **Opción A: Supabase Dashboard (RECOMENDADO - 2 minutos)**

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard/project/urjsnguzzzwcnaxwghbo)
2. Navega a: **Settings** → **Edge Functions** → **Secrets**
3. Click en **"Add new secret"**
4. Configura:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxx` (tu API key)
5. Click **"Save"**

✅ **Listo!** La Edge Function ya puede enviar emails.

---

### **Opción B: Supabase CLI (si lo tienes instalado)**

```bash
# Instalar Supabase CLI (si no lo tienes)
npm install -g supabase

# Login a Supabase
supabase login

# Link al proyecto
supabase link --project-ref urjsnguzzzwcnaxwghbo

# Configurar el secret
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Verificar que se configuró
supabase secrets list
```

---

### **Opción C: Verificar si ya está configurado**

Si ya configuraste la API Key antes, puedes verificarlo:

1. Ve a Supabase Dashboard → Settings → Edge Functions → Secrets
2. Busca `RESEND_API_KEY` en la lista
3. Si aparece, ✅ **ya está configurado**

---

## 🧪 Paso 3: Probar que funciona

### **Test Manual:**

1. Completa una reserva de prueba en tu sitio
2. Llega hasta el pago
3. Usa una tarjeta de prueba de Stripe:
   - **Número:** `4242 4242 4242 4242`
   - **Fecha:** Cualquier fecha futura
   - **CVC:** Cualquier 3 dígitos
4. Completa el pago
5. **Verifica:**
   - ✅ Email recibido en el correo del cliente
   - ✅ BCC recibido en `borisgeiner@gmail.com`

### **Test desde Supabase:**

1. Ve a Supabase Dashboard → Edge Functions
2. Click en `send-booking-emails`
3. Click en **"Invoke function"**
4. Pega este JSON de prueba:

```json
{
  "customerName": "Test User",
  "customerEmail": "tu-email@gmail.com",
  "bookingId": "test-123",
  "pickupLocation": "Charles de Gaulle Airport",
  "dropoffLocation": "Eiffel Tower",
  "pickupDateTime": "2025-12-15 14:30",
  "passengers": 2,
  "vehicleType": "Mercedes Classe E",
  "totalPrice": 85.50,
  "flightNumber": "AF1234"
}
```

5. Click **"Run"**
6. Verifica que recibes el email

---

## 📋 Configuración de Dominio (Opcional pero Recomendado)

Para enviar emails desde `info@eliteparistransfer.com` en lugar de `onboarding@resend.dev`:

1. Ve a [Resend Dashboard → Domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Ingresa: `eliteparistransfer.com`
4. Sigue las instrucciones para agregar los registros DNS:
   - **SPF:** `v=spf1 include:_spf.resend.com ~all`
   - **DKIM:** (Resend te dará los valores específicos)
5. Espera 24-48 horas para propagación DNS
6. Verifica el dominio en Resend

✅ **Después de verificar:** Los emails se enviarán desde `info@eliteparistransfer.com`

---

## 🔍 Troubleshooting

### **Error: "RESEND_API_KEY no está configurada"**

**Causa:** El secret no está configurado en Supabase.

**Solución:** Sigue el Paso 2 - Opción A.

---

### **Error: "Invalid API key"**

**Causa:** La API key es incorrecta o expiró.

**Solución:**
1. Ve a Resend Dashboard → API Keys
2. Verifica que la key esté activa
3. Si no, crea una nueva y actualiza el secret en Supabase

---

### **Emails no llegan**

**Posibles causas:**
1. **Dominio no verificado:** Usa `onboarding@resend.dev` temporalmente
2. **Spam folder:** Revisa la carpeta de spam
3. **Email inválido:** Verifica que el email del cliente sea correcto

**Solución:**
1. Revisa los logs en Supabase Dashboard → Edge Functions → send-booking-emails → Logs
2. Busca errores específicos
3. Verifica en Resend Dashboard → Logs que el email se envió

---

## 📊 Monitoreo

### **Ver emails enviados:**
1. Ve a [Resend Dashboard → Emails](https://resend.com/emails)
2. Verás todos los emails enviados con su estado:
   - ✅ **Delivered:** Email entregado exitosamente
   - ⏳ **Queued:** En cola para envío
   - ❌ **Failed:** Error al enviar

### **Ver logs de Edge Function:**
1. Ve a Supabase Dashboard → Edge Functions
2. Click en `send-booking-emails`
3. Click en **"Logs"**
4. Verás todos los intentos de envío

---

## ✅ Checklist Final

- [ ] API Key de Resend obtenida
- [ ] Secret `RESEND_API_KEY` configurado en Supabase
- [ ] Test manual completado (email recibido)
- [ ] BCC a `borisgeiner@gmail.com` funcionando
- [ ] (Opcional) Dominio verificado en Resend

---

## 🎯 Próximos Pasos

Una vez configurado Resend:

1. **Deploy a Vercel** → Ver todo en producción
2. **Hacer reserva de prueba real** → Verificar flujo completo
3. **Monitorear primeros emails** → Asegurar que todo funciona

---

**¿Necesitas ayuda?** Revisa los logs en Supabase o Resend Dashboard.

