# 🎯 GUÍA DE JERARQUÍA DE CTAs - PARIS ELITE SERVICES

**Fecha:** 2025-12-10  
**Decisión:** Opción A - Jerarquía Visual  
**Objetivo:** Diferenciar CTAs por importancia en el funnel de conversión

---

## 🏆 FILOSOFÍA DE DISEÑO

**Principio:** No todos los CTAs son iguales. La jerarquía visual guía al usuario hacia acciones de alto valor.

**Paleta de CTAs:**
- **Dorado (#C2A033):** Acciones de conversión directa (booking, reservas)
- **Navy (#1F2D42):** Acciones de soporte (contacto, consultas)
- **Outline:** Acciones terciarias (cancelar, volver)

---

## 📊 CLASIFICACIÓN DE CTAs

### **🥇 CTAs PRIMARIOS (Dorado - Alta Conversión)**

**Uso:** Acciones que generan ingresos directos o leads calificados

**Ejemplos:**
- ✅ "See Your Fixed Price" (booking form)
- ✅ "Book Now" (fleet section)
- ✅ "Request a group quote" (8+ passengers)
- ✅ "Confirm Booking" (checkout)
- ✅ "Pay Now" (payment)

**Implementación:**
```tsx
<Button className="silk-button">
  See Your Fixed Price
</Button>

// O directamente:
<Button className="bg-primary hover:bg-primary/90 text-white">
  Book Now
</Button>
```

---

### **🥈 CTAs SECUNDARIOS (Navy - Soporte)**

**Uso:** Acciones de soporte, consultas, información adicional

**Ejemplos:**
- ✅ "Send Message" (contact form)
- ✅ "Subscribe" (newsletter)
- ✅ "Learn More" (informational)
- ✅ "Download Brochure"
- ✅ "Request Information"

**Implementación:**
```tsx
<Button className="bg-secondary hover:bg-secondary/90 text-white">
  Send Message
</Button>
```

---

### **🥉 CTAs TERCIARIOS (Outline - Navegación)**

**Uso:** Acciones de navegación, cancelación, retroceso

**Ejemplos:**
- ✅ "Cancel"
- ✅ "Go Back"
- ✅ "Skip"
- ✅ "View Details"

**Implementación:**
```tsx
<Button variant="outline">
  Cancel
</Button>
```

---

## 🎨 EJEMPLOS VISUALES

### **Hero Section (Booking Form)**
```
┌─────────────────────────────────────┐
│  [Pickup] [Dropoff] [Date] [Time]  │
│                                     │
│  [See Your Fixed Price] ← DORADO   │
└─────────────────────────────────────┘
```

### **Contact Section**
```
┌─────────────────────────────────────┐
│  Name: [____________]               │
│  Email: [___________]               │
│  Message: [_________]               │
│                                     │
│  [Send Message] ← NAVY              │
└─────────────────────────────────────┘
```

### **Fleet Section**
```
┌─────────────────────────────────────┐
│  Mercedes E-Class                   │
│  3 passengers | 2 luggage           │
│                                     │
│  [Book Now] ← DORADO                │
└─────────────────────────────────────┘
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### **CTAs Primarios (Dorado)** ✅
- [x] BookingForm - "See Your Fixed Price"
- [x] PassengerCount - "Request a group quote"
- [ ] FleetSection - "Book Now" (verificar)
- [ ] ExcursionsPage - "Book This Tour" (verificar)
- [ ] PaymentPage - "Confirm Payment" (verificar)

### **CTAs Secundarios (Navy)** ✅
- [x] ContactSection - "Send Message"
- [ ] Newsletter - "Subscribe" (verificar)
- [ ] Footer - "Learn More" (verificar)

### **CTAs Terciarios (Outline)** ⏳
- [ ] Modals - "Cancel" (verificar)
- [ ] Forms - "Go Back" (verificar)

---

## 🚀 BENEFICIOS DE ESTA JERARQUÍA

### **1. Conversión Optimizada**
- Dorado atrae la mirada hacia acciones de alto valor
- Navy no compite visualmente con booking
- Usuario sabe instintivamente qué hacer

### **2. Profesionalismo**
- Diseño sofisticado y pensado
- No saturación visual (no todo dorado)
- Coherente con servicios premium

### **3. Mantenibilidad**
- Reglas claras para nuevos componentes
- Fácil de documentar y enseñar
- Consistencia a largo plazo

---

## 📖 REFERENCIAS DE INDUSTRIA

**Booking.com:**
- Azul primario: "Reserve ahora"
- Gris: "Contactar propiedad"

**Airbnb:**
- Rosa: "Reservar"
- Blanco outline: "Guardar", "Compartir"

**Uber:**
- Negro: "Request ride"
- Blanco: "Schedule", "Options"

**Conclusión:** La jerarquía de CTAs es **estándar en UX de conversión** para servicios premium.

---

## ⚠️ ERRORES COMUNES A EVITAR

❌ **NO hacer:**
- Usar dorado para "Cancel" o "Go Back"
- Usar navy para "Book Now" o "Pay Now"
- Mezclar colores sin criterio

✅ **SÍ hacer:**
- Dorado = dinero/conversión
- Navy = información/soporte
- Outline = navegación/cancelación

---

## 🔄 PRÓXIMOS PASOS

1. ✅ Mantener "Send Message" en navy (ya implementado)
2. ⏳ Auditar todos los CTAs de la app
3. ⏳ Actualizar componentes que no sigan la guía
4. ⏳ Documentar en Storybook (futuro)

---

**Última actualización:** 2025-12-10  
**Responsable:** Equipo de Diseño  
**Estado:** ✅ Implementado y documentado

