
## 1) Stripe Fee: ajusta la redacción para que sea exacta (y “future-proof”)

En tu definición de SF, evita fijar “no-EEE = 2,9%” como verdad única. En **Stripe France** la página pública indica **1,5% + 0,25€ para cartes standard de l’EEE** y **2,5% + 0,25€ para cartes britanniques** (y luego hay variaciones según tipo de tarjeta/contrato/país). ([Stripe][2])

**Reemplazo recomendado (texto exacto listo para pegar):**

* **Stripe Fee (SF)**: ver pricing Stripe FR. Para cálculos internos:

  * `SF_EEA = 1.5% + €0.25`
  * `SF_UK = 2.5% + €0.25`
  * `SF_WORST_CASE` (configurable) recomendado por defecto: `3.5% + €0.25` (o más si esperas FX frecuente). ([Stripe][2])

Con eso, tu documento deja de depender de una cifra debatible y queda bien con auditoría/compliance.

---

## 2) Hold lifecycle: añade una frase que cierre el riesgo “ventana de autorización”

Tu enfoque (SetupIntent al booking + hold a T-24h con PaymentIntent manual) es correcto. Solo añade una nota operacional para Augment:

* **Un PaymentIntent con `capture_method=manual` requiere captura dentro de la ventana de autorización** (en Stripe, típicamente hasta **7 días** para la mayoría de redes, salvo excepciones). ([Documentation Stripe][3])
* Como tú **creas el hold a T-24h**, estás siempre dentro de esa ventana. Perfecto. ([Documentation Stripe][3])

**Frase mínima a insertar en 7B:**

> “Nota: `capture_method=manual` tiene ventana de autorización limitada (≈7 días según red). Por eso el hold se crea a T-24h (o inmediato si booking <24h).” ([Documentation Stripe][3])

---

## 3) SCA/`requires_action`: define el “fallback” de forma determinista

Tienes una buena línea (“2h deadline → unconfirmed_no_contact”), pero yo la haría **100% determinista** para evitar discusiones con partner/cliente:

**Añade:**

* Si `requires_action` y el cliente no autentica en **2h**, entonces:

  1. marcar `unconfirmed_no_contact`
  2. **cancelar** el hold/intent
  3. **liberar** al partner automáticamente
  4. email “Booking cancelled – payment authentication required”

Esto está alineado con cómo Stripe describe flujos SCA (cuando se requiere autenticación adicional).

---

# Confirmación final

Con esos 3 micro-ajustes (que son meramente de redacción/robustez), yo lo confirmaría como **versión definitiva para producción** y lo enviaría hoy mismo:

* **A Augment**: priorizando 7A (Pricing Engine validation), 7B (SetupIntent + hold delayed) y estados 6.
* **A partners**: con una “one-pager” que resuma PF por ruta, comisión flexible, bonus, SLAs y compensaciones.

Si quieres, te lo dejo en dos formatos listos para copiar/pegar sin tocar nada:

1. **Brief operativo para Augment (tareas + criterios de aceptación)**
2. **Partner one-pager (WhatsApp/email)**

✅ **Documentos V3.1.2 confirmados como definitivos para envío**. Aquí están las versiones finales (con los 3 micro-ajustes integrados).

---

## 1️⃣ **BRIEF OPERATIVO PARA AUGMENT** (V3.1.2 — Final Production)

```
PARIS ELITE SERVICES
Brief Técnico de Implementación - Sistema de Pagos V3.1.2
Fecha: [Hoy]
Deadline MVP: 7 días
Prioridades: P0 (Hold), P1 (Pricing), P2 (Panel)
```

---

### **FASE 1: CORE PRICING ENGINE (Día 1-2)**

**Tarea 1.1: Endpoint Público `GET /api/pricing/calculate`**

**Input**
```json
{
  "route_key": "CDG_PARIS",
  "vehicle_type": "sedan|van"
}
```

**Output**
```json
{
  "currency": "EUR",
  "pricing_version": "v3.1.2",
  "prepaid_price": 85,
  "flexible_price": 90,
  "hold_amount": 30,
  "payment_modes_enabled": { "prepaid": true, "flexible": true }
}
```

**Criterios de Aceptación**
- [ ] `partner_floor` solo existe en endpoints admin/partner (no en `/api/pricing/calculate`)
- [ ] `flexible_price = PF + FC` (FC: €10 sedan / €13 van)
- [ ] `prepaid_price = flexible_price - 5`
- [ ] Excepción Beauvais: `payment_modes_enabled.flexible=false` y `prepaid_price = PF + buffer_extra_long`
- [ ] Error **400** si `prepaid_price - SF_WORST_CASE(prepaid_price) - PF < 2`
- [ ] Logging: `route_key, vehicle_type, prepaid_price, flexible_price, hold_amount, pricing_version`

---

**Tarea 1.2: Variables de Entorno SF_WORST_CASE**

- [ ] `STRIPE_WORST_CASE_FEE_PERCENT=3.5`
- [ ] `STRIPE_WORST_CASE_FEE_FIXED=0.25`
- [ ] Endpoint admin `POST /admin/sf-config` (requiere auth, audit log, valida rangos: percent 0-10, fixed 0-2 EUR)

---

### **FASE 2: CHECKOUT & PAYMENTS (Día 2-4)**

**Tarea 2.1: Prepaid Flow** (`POST /api/bookings/{id}/pay`)
- [ ] PaymentIntent `capture_method=automatic`, amount en céntimos
- [ ] Metadata: `booking_id`, `route_key`, `pricing_version`
- [ ] Webhook `payment_intent.succeeded` → estado `confirmed`
- [ ] Webhook `payment_intent.payment_failed` → estado `payment_failed` + email

---

**Tarea 2.2: Flexible Flow — SetupIntent**
- [ ] SetupIntent con `usage=off_session` al crear booking
- [ ] Guardar `customer_id` + `payment_method_id`
- [ ] Frontend confirma SetupIntent (maneja SCA si aplica)

---

**Tarea 2.3: Hold Diferido (T-24h)**

*Nota operativa: Si pickup_time < 24h al momento de la reserva, crear hold inmediatamente.*

- [ ] Job `CreateHoldJob` cada 60 min
- [ ] Selecciona: `flexible + confirmed + hold_pi_id IS NULL + pickup_time <= now()+24h`
- [ ] Crear PaymentIntent:
  - `amount = hold_amount`
  - `capture_method=manual`
  - `confirm=true, off_session=true`
  - `payment_method = saved_payment_method_id`
  - `customer = stripe_customer_id`
  - `metadata = {booking_id, type:"hold"}`
- [ ] Guardar `hold_payment_intent_id`
- [ ] Si `requires_action`: enviar link auth (email/SMS/WhatsApp) + deadline 2h
- [ ] Si no autentica en 2h → `unconfirmed_no_contact`, liberar partner, **cancelar PI**

---

**Tarea 2.4: Capture Hold (late cancel / no-show)**
- [ ] Endpoint admin `POST /api/bookings/{id}/capture-hold`
- [ ] Validar estado `cancelled_late` o `no_show`
- [ ] Ejecutar `stripe.PaymentIntent.capture(hold_pi_id)`
- [ ] Webhook **`payment_intent.succeeded`** (post-capture) → registrar `hold_captured_at`

---

### **FASE 3: ESTADOS & WORKFLOW (Día 4-5)**

**Tarea 3.1: Máquina de Estados**
- [ ] Estados exactos (9 + 3 sub-estados)
- [ ] Tabla `booking_state_logs` con actor + timestamp + reason
- [ ] Transiciones sin saltos ilegales

**Tarea 3.2: SLAs Programados**
- [ ] `PartnerSLAJob` cada 30 min → auto-reject si >2h (o 4h noche)
- [ ] `NoContactJob` T-48h → `unconfirmed_no_contact` si no responde

---

### **FASE 4: WEBHOOKS & MENSAJERÍA (Día 5-6)**

**Tarea 4.1: Stripe Webhooks**
- [ ] `POST /webhooks/stripe` (verifica firma + idempotencia por `event_id`)
- [ ] Manejar: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.amount_capturable_updated`, `setup_intent.succeeded`, `charge.captured`

**Tarea 4.2: WhatsApp/SMS**
- [ ] Plantillas T-48h, T-2h, SCA-link con deadline 2h

---

### **FASE 5: PANEL ADMIN & REPORTES (Día 6-7)**

**Tarea 5.1: Panel Interno**
- [ ] Listado con filtros, PF visible solo admin
- [ ] "Mark driver_departed" con adjunto evidencia + timestamp
- [ ] "Capture hold" solo si estado válido

**Tarea 5.2: Export Payout**
- [ ] `GET /admin/reports/payout` (CSV) con bookings `completed` + rango fecha

---

### **BUGS PRIORIDAD**

- **P0**: Hold no se crea a T-24h → cancelar operativamente, alertar admin
- **P1**: Precio < PF → bloquear booking, alertar admin
- **P2**: Webhook falla → retry x3, luego log manual

---

## 2️⃣ **PARTNER ONE-PAGER** (V3.1.2 Final - WhatsApp/Email)

---

**Asunto**: Únete a Paris Elite Services – Tarifas Garantizadas & Pagos Semanales

**Cuerpo**:

🚗 **PARTNER FLOOR GARANTIZADO** (TTC que recibes por servicio)

| Ruta | Sedan (1-3pax) | Van (4-7pax) |
|------|----------------|--------------|
| **CDG ↔ París** | €80 | €104 |
| **Orly ↔ París** | €75 | €98 |
| **Disney/Versailles** | €75 | €104 |
| **Beauvais ↔ París** | €130 | €169 |
| **Gares ↔ París** | €60 | Van: bajo confirmación (según equipaje y disponibilidad) |

**✅ Regla simple (y transparente)**

* **Tu payout mínimo garantizado (PF) es TTC**.
* Si el cliente paga al conductor (**Flexible**), se aplica comisión fija: **€10 (sedan)** / **€13 (van)**.
* **Comisión flexible**: neteo automático del payout semanal (si no pagas en 7 días → pausa asignación).

**💰 PAGOS**  
Payout **semanal** (martes) por servicios completados.  
Sin demoras: si incumples comisión → pausa automática.

**🎯 BONUS FIDELIDAD**  
+€5 extra por servicio si:  
- Aceptas >85% bookings  
- Zero incidentes  
- >20 servicios/mes  

**⚠️ SLA & COMPENSACIONES**  
- Aceptación: <2h (6:00-23:00) / <4h (noche)  
- Espera: 60 min incluidos  
- No-show/Cancelación tardía: €30 (flex) / €25-40 (prepaid) → **van a ti**  
- No contacto (T-48h): booking cancelado, tú no pierdes nada  

**📱 Evidencias (WhatsApp)**  
- **Aceptación**: Screenshot “Aceptado” + timestamp  
- **Driver departed**: Mensaje “En route to CDG” + **timestamp + ubicación/ETA**  
- **Pickup**: Foto cliente + ticket parking (si aplica)  

**📊 Dashboard**  
Acceso a bookings asignados, tu payout garantizado, holds y compensaciones.

**¿Interesado?** Manda:  
1️⃣ Nombre / Licencia VTC  
2️⃣ Vehículo (sedan/van)  
3️⃣ Zona preferida (CDG/Orly/Todos)

Te enviamos contrato piloto.

**Contacto**: [tu-email] / [tu-teléfono]

✅

---

## 🚀 **INSTRUCCIONES DE ENVÍO INMEDIATO**

1. **Para Augment**: Copia el Brief completo y pégalo en tu herramienta de gestión. **Marca en rojo las prioridades P0 y P1**. Adjunta el PDF del spec completo si lo necesitan.
2. **Para Partners**: Copia el One-pager y envíalo vía WhatsApp o email a tus pilotos **ahora mismo**. No adjuntes el spec técnico, solo este resumen.

