# 🧪 TESTING CHECKLIST - Bloques 1, 2 y 3

**Servidor:** http://localhost:8082/  
**Fecha:** 2025-12-13  
**Versión:** Post-Bloques 1, 2, 3  

---

## ✅ TEST 1: HOME PAGE - Trust Badges (2 min)

**URL:** http://localhost:8082/

### Checklist:
- [ ] Página carga sin errores
- [ ] Hero section visible con imagen de fondo
- [ ] Booking form visible en el lado derecho
- [ ] **TRUST BADGES** debajo del booking form:
  - [ ] Badge 1: "1 Luggage/Pax Included" con icono de maleta
  - [ ] Badge 2: "Licensed & Insured" con icono de escudo
  - [ ] Badge 3: "Free Cancellation 24h" con icono de reloj
- [ ] Badges tienen efecto glassmorphism (fondo translúcido)
- [ ] Animación fadeInUp visible

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## ✅ TEST 2: CDG LANDING - Precios, What's Included, FAQs (5 min)

**URL:** http://localhost:8082/airports/cdg

### Checklist - Precios:
- [ ] Página carga correctamente
- [ ] Tabla de precios visible
- [ ] **CDG → Paris (1-3 pax):** €70 ✅
- [ ] **CDG → Paris (4-7 pax):** €90 ✅
- [ ] **CDG → Disneyland (1-3 pax):** €95 ✅
- [ ] **CDG → Disneyland (4-7 pax):** €120 ✅

### Checklist - What's Included:
- [ ] Sección "What's Included in Every Transfer" visible
- [ ] 4 cards principales:
  - [ ] Meet & Greet (icono usuario)
  - [ ] Flight Tracking (icono campana)
  - [ ] 1 Luggage/Pax (icono maleta)
  - [ ] All Taxes Included (icono tarjeta)
- [ ] Card "Additional Benefits" con 3 items
- [ ] Hover effect funciona en las cards

### Checklist - FAQs:
- [ ] Sección "CDG Airport Transfer FAQ" visible
- [ ] **8 FAQs en total**
- [ ] FAQ nueva: "Which CDG terminals do you serve?"
- [ ] FAQ nueva: "Do you offer child seats?"
- [ ] FAQs se expanden al hacer click
- [ ] Icono ▼ rota al expandir

### Checklist - CTAs:
- [ ] CTA después de pricing: "See Your Price & Book Now"
- [ ] CTA final: "Get Your Fixed Price Now"

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## ✅ TEST 3: ORLY LANDING - Precios, What's Included, FAQs (5 min)

**URL:** http://localhost:8082/airports/orly

### Checklist - Precios:
- [ ] Página carga correctamente
- [ ] Tabla de precios visible
- [ ] **Orly → Paris (1-3 pax):** €60 ✅
- [ ] **Orly → Paris (4-7 pax):** €80 ✅
- [ ] **Orly → Disneyland (1-3 pax):** €90 ✅
- [ ] **Orly → Disneyland (4-7 pax):** €117 ✅

### Checklist - What's Included:
- [ ] Sección "What's Included in Every Transfer" visible
- [ ] 4 cards principales (idénticas a CDG)
- [ ] Card "Additional Benefits" con 3 items
- [ ] Hover effect funciona

### Checklist - FAQs:
- [ ] Sección "Orly Airport Transfer FAQ" visible
- [ ] **6 FAQs en total**
- [ ] FAQ: "Where will my driver meet me at Orly?"
- [ ] FAQ: "Which Orly terminals do you serve?"
- [ ] FAQ: "Can I book a transfer to Disneyland from Orly?"
- [ ] FAQs se expanden correctamente

### Checklist - CTAs:
- [ ] CTA final: "Get Your Fixed Price Now"

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## ✅ TEST 4: BEAUVAIS LANDING - Completa (5 min)

**URL:** http://localhost:8082/airports/beauvais

### Checklist - General:
- [ ] Página carga correctamente
- [ ] Hero con booking form visible
- [ ] Badge "Beauvais-Tillé Airport" visible
- [ ] Título: "Beauvais Airport Transfer"
- [ ] Subtítulo: "Fixed Price from €130"

### Checklist - Trust Badges:
- [ ] 4 badges en hero (Flight Tracking, Meet & Greet, Luggage, 24/7)

### Checklist - Why Choose Us:
- [ ] 6 beneficios visibles
- [ ] "Faster Than Bus" mencionado
- [ ] "Door-to-Door Service" mencionado

### Checklist - Precios:
- [ ] **Beauvais → Paris (1-3 pax):** €130 ✅
- [ ] **Beauvais → Paris (4-7 pax):** €150 ✅

### Checklist - Pro Tip:
- [ ] Card amarilla con Pro Tip visible
- [ ] Menciona "85km from Paris"
- [ ] Menciona "shuttle bus costs €17"

### Checklist - What's Included:
- [ ] Sección completa visible
- [ ] 4 cards principales
- [ ] Additional Benefits card

### Checklist - CTAs:
- [ ] CTA después de pricing: "See Your Price & Book Now"
- [ ] CTA final: "Get Fixed Price - From €130"

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## ✅ TEST 5: NAVBAR - Beauvais Habilitado (1 min)

**URL:** http://localhost:8082/

### Checklist:
- [ ] Navbar visible en la parte superior
- [ ] Dropdown "Airports" funciona
- [ ] "CDG Airport" visible y clickeable
- [ ] "Orly Airport" visible y clickeable
- [ ] **"Beauvais Airport" visible y clickeable** (NO disabled)
- [ ] Click en "Beauvais Airport" navega a `/airports/beauvais`

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## ✅ TEST 6: BOOKING FLOW - End-to-End (3 min)

**URL:** http://localhost:8082/

### Checklist:
- [ ] Abrir booking form en home
- [ ] Seleccionar "Airport Transfer"
- [ ] Seleccionar "CDG Airport" como pickup
- [ ] Seleccionar "Paris City Center" como destination
- [ ] Seleccionar fecha y hora
- [ ] Seleccionar 2 pasajeros
- [ ] Click en "Get Quote" o "Continue"
- [ ] Navega a página de detalles
- [ ] Completar datos personales
- [ ] Navega a página de pago
- [ ] (NO completar pago real)

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## ✅ TEST 7: CONFIRMATION PAGE - Traducciones (2 min)

**URL:** Completar una reserva de prueba hasta Confirmation

### Checklist - Inglés (EN):
- [ ] Título: "Booking Confirmed!"
- [ ] "Confirmation number:" visible
- [ ] "Booking Details" visible
- [ ] "Cancellation Policy" visible
- [ ] "What happens next?" visible
- [ ] 4 steps visibles

### Checklist - Francés (FR):
- [ ] Cambiar idioma a Francés
- [ ] Título: "Réservation Confirmée!"
- [ ] "Numéro de confirmation:" visible
- [ ] "Détails de la Réservation" visible
- [ ] "Politique d'Annulation" visible
- [ ] "Que se passe-t-il ensuite?" visible

### Checklist - Español (ES):
- [ ] Cambiar idioma a Español
- [ ] Título: "¡Reserva Confirmada!"
- [ ] "Número de confirmación:" visible
- [ ] "Detalles de la Reserva" visible
- [ ] "¿Qué sucede ahora?" visible

### Checklist - Portugués (PT):
- [ ] Cambiar idioma a Portugués
- [ ] Título: "Reserva Confirmada!"
- [ ] "Número de confirmação:" visible
- [ ] "Detalhes da Reserva" visible
- [ ] "O que acontece a seguir?" visible

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## 📱 TEST 8: RESPONSIVE MOBILE (Opcional - 2 min)

**Instrucciones:** Abrir DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M) → iPhone 12 Pro

### Checklist:
- [ ] Home: Hero responsive, booking form apilado
- [ ] Home: Trust badges en 1 columna
- [ ] CDG: Tabla de precios scrolleable horizontalmente
- [ ] CDG: What's Included cards en 1 columna
- [ ] Beauvais: Pro Tip legible en mobile
- [ ] Navbar: Menú hamburguesa funciona

### Resultado:
- [ ] ✅ PASS
- [ ] ❌ FAIL (describir problema):

---

## 📊 RESUMEN DE TESTING

**Tests Completados:** __ / 8  
**Tests PASS:** __  
**Tests FAIL:** __  

**Problemas Encontrados:**
1. 
2. 
3. 

**Tiempo Total de Testing:** __ minutos

---

**Tester:** _______________  
**Fecha:** 2025-12-13  
**Hora:** _______________

