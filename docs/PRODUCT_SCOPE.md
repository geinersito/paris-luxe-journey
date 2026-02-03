# PRODUCT SCOPE — Booking (Paris Elite Services)

## One-liner
Marketing + booking SPA para transfers; funnel /booking → /details → /payment → /confirmation.

## Rutas SSOT (lista completa)

### Públicas (no requieren auth)
- `/` - Home (HeroSection + CompactBookingForm)
- `/excursions` - Excursions page
- `/events` - Events page
- `/blog` - Blog index
- `/blog/:category` - Blog category
- `/blog/:category/:slug` - Blog post
- `/airports/cdg` - CDG airport guide
- `/airports/orly` - Orly airport guide
- `/airports/beauvais` - Beauvais airport guide
- `/guides/avoid-fake-taxis` - Fake taxis guide
- `/faq` - FAQ page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Booking Funnel (requiere RequireBookingData)
- `/booking` - Booking form (CompactBookingForm → modal con BookingForm)
- `/booking/details` - Booking details review
- `/booking/payment` - Stripe payment form
- `/booking/confirmation` - Booking confirmation + email

## Funnel SSOT (paso a paso)

### Paso 1: /booking (Captura inicial)
**Componentes:** CompactBookingForm → BookingForm (modal)
**Datos capturados:**
- Origen/destino (string)
- Fecha/hora (DateTime)
- Pasajeros (number)
- Equipaje (number)
- Tipo vehículo (sedan/van)
**Persistencia:** BookingContext (local state)
**Edge functions:** Ninguna

### Paso 2: /booking/details (Revisión)
**Componentes:** BookingDetails
**Datos capturados:** Ninguno (solo revisión)
**Persistencia:** BookingContext
**Edge functions:** Ninguna
**Validación:** Datos completos del paso 1

### Paso 3: /booking/payment (Pago)
**Componentes:** BookingPayment + StripePaymentFormContent
**Datos capturados:**
- Email, nombre, teléfono
- Payment method (Stripe)
**Persistencia:** Supabase bookings_v312 table
**Edge functions:**
- `stripe-webhooks-v312-integrated` (webhook processing)
- `create-hold-job-v312` (flexible payments)
**Estado:** booking_status = 'confirmed' cuando pago capturado

### Paso 4: /booking/confirmation (Confirmación)
**Componentes:** BookingConfirmation
**Datos capturados:** Ninguno
**Persistencia:** Email enviado
**Edge functions:** Email sending (Resend)
**Estado final:** booking_status = 'confirmed'

## Out of scope (por ahora)

### Admin UI
- Dashboard de bookings
- Gestión de drivers
- Cancelaciones/refunds backend

### Advanced Features
- Multi-stop bookings
- Recurring bookings
- Loyalty program
- Real-time driver tracking

### Legacy Compatibility
- v312 flow completo (experimental)
- Old booking schema migration

## DoD por release (Ready to sell checklist)
- ✅ No secrets in VITE_* env vars
- ✅ Idempotent webhook processing
- ✅ Anti double-booking guarantee (DB-level)
- ✅ Timezone Europe/Paris display
- ✅ Confirmation email sent
- ✅ Stripe payment captured
- ✅ Booking data persisted in Supabase</content>
</xai:function_call name="Write">
<parameter name="file_path">c:\Users\basur\Paris Elite Services Nuevo\docs/BOOKING_MODEL.md