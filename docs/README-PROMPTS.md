# 🚀 GUÍA RÁPIDA: SISTEMA DE PROMPTS PARA AUGMENT

**Versión:** 1.2  
**Última actualización:** 2025-12-10

---

## 📁 **ARCHIVOS DEL SISTEMA**

1. **`prompts-architecto.md`** - Sistema completo con ejemplos y contexto
2. **`prompts-snippets.md`** - Snippets copia-pega para uso diario
3. **`README-PROMPTS.md`** - Esta guía rápida

---

## ⚡ **INICIO RÁPIDO (5 minutos)**

### **Paso 1: Abre Augment Chat**
- **Windows/Linux**: `Ctrl+Shift+P` → "Augment: Open Chat"
- **Mac**: `Cmd+Shift+P` → "Augment: Open Chat"

### **Paso 2: Pega el Prompt Base**
1. Abre `docs/prompts-snippets.md`
2. Copia **SNIPPET 1: PROMPT BASE** (completo)
3. Pégalo en el chat de Augment
4. Presiona Enter

### **Paso 3: Pega una Task**
Según lo que necesites:

| Necesito... | Snippet a usar |
|-------------|----------------|
| Ver qué páginas faltan | SNIPPET 2: AUDIT FUNNEL |
| Ver qué componentes faltan | SNIPPET 3: AUDIT COMPONENTES |
| Mejorar estética de un componente | SNIPPET 4: REFACTOR UI |
| Crear componente nuevo | SNIPPET 6: CREAR COMPONENTE |
| Arreglar un bug | SNIPPET 7: DEBUGGING |

### **Paso 4: Copia y aplica los cambios**
1. Augment te dará código exacto con rutas completas
2. Copia el código
3. Aplica los cambios en VSCode
4. Testea con `npm run dev`
5. Commit

---

## 🎯 **EJEMPLO PRÁCTICO**

### **Quiero saber qué componentes me faltan para mejorar conversión**

**1. Pega SNIPPET 1 (Prompt Base)**
```markdown
# SYSTEM: ARQUITECTO TÉCNICO VTC PREMIUM v1.2
...
```

**2. Pega SNIPPET 3 (Audit Componentes)**
```markdown
# TASK: AUDIT COMPONENTES & COHERENCIA
...
```

**3. Augment responde:**
```markdown
**Objetivo HOY**: Crear TrustBar para aumentar confianza en /booking

**Radiografía**:
- ✅ Booking funciona técnicamente
- ❌ No hay señales de confianza (badges de seguridad, licencias)
- ❌ No hay indicador de progreso (Step 1/3)
- ⚠️ Botón WhatsApp no es flotante (difícil de encontrar)
- ⚠️ Precio no muestra desglose (genera desconfianza)

**Acción ≤60min**:
- **Archivo**: `src/components/TrustBar.tsx` (crear)
- **Cambios**:
  - Componente con 4 badges: ShieldCheck, CreditCard, Car, Clock
  - Clases: `flex gap-6 justify-center py-4 px-6 bg-slate-50 border-t border-gray-100`
  - Importar en `src/pages/Booking.tsx` línea 45 (antes del formulario)
- **Motivo**: Aumenta conversión +15% según benchmarks VTC

**Cómo comprobar**: Ver TrustBar en /booking, móvil 375px, sin romper layout

**Tiempo estimado**: 45 min
```

**4. Copias el código que Augment te da y lo aplicas**

---

## 📋 **CASOS DE USO FRECUENTES**

### **Caso 1: "No sé qué hacer hoy para mejorar conversión"**
→ Usa **SNIPPET 2: AUDIT FUNNEL**

### **Caso 2: "Este componente se ve feo"**
→ Usa **SNIPPET 4: REFACTOR UI** + pega el código del componente

### **Caso 3: "Necesito crear un componente nuevo"**
→ Usa **SNIPPET 6: CREAR COMPONENTE**

### **Caso 4: "Algo no funciona y no sé por qué"**
→ Usa **SNIPPET 7: DEBUGGING**

### **Caso 5: "Quiero optimizar performance antes del deploy"**
→ Usa **SNIPPET 5: PERFORMANCE AUDIT**

---

## ✅ **REGLAS DE ORO**

1. **Siempre pega el Prompt Base primero** (1 vez por sesión)
2. **Luego pega 1 Task específico** (no mezcles tasks)
3. **Copia el código exacto** que Augment te da (rutas completas)
4. **Testea antes de commitear** (`npm run dev`)
5. **Si Augment dice "VANIDAD"**, escucha y usa la alternativa

---

## 🎨 **VISUAL BIBLE (Recordatorio)**

Estos son los estándares que Augment aplicará:

- **Colores**: Emerald-500 (#10b981) para CTAs, neutral-900 para texto
- **Tipografía**: Playfair Display (H1/H2), Inter (UI/body)
- **Espaciado**: Grid de 4px (4, 8, 12, 16, 24, 32, 48, 64px)
- **Sombras**: Ligeras (shadow-sm/md)
- **Prohibido**: Gradientes, >1 CTA primario por vista, hover scale >105%

---

## 🚨 **TROUBLESHOOTING**

### **Augment da respuestas genéricas**
→ Asegúrate de haber pegado el **Prompt Base completo** primero

### **Augment no da rutas completas**
→ Recuérdale: "Dame la ruta completa desde src/, ej: src/components/booking/BookingForm.tsx"

### **Augment propone algo que no vende**
→ Pregúntale: "¿Esto aumenta conversión o es VANIDAD?"

### **No sé qué Task usar**
→ Empieza con **SNIPPET 2: AUDIT FUNNEL** para ver el panorama completo

---

## 📊 **ESTADO ACTUAL DEL PROYECTO**

**Completado (85%):**
- ✅ Sistema de precios centralizado
- ✅ Límite 7 pasajeros + flujo grupos 8+
- ✅ Unificación de colores a emerald-500
- ✅ Refactor PassengerCount.tsx
- ✅ Traducciones completas (EN/FR/ES/PT)

**Pendiente (15%):**
- ⚠️ Señales de confianza en funnel (TrustBar)
- ⚠️ Landings SEO (CDG, Orly)
- ⚠️ Indicador de progreso (Step 1/3)
- ⚠️ Botón flotante WhatsApp
- ⚠️ Página FAQ

---

## 🎯 **PRÓXIMOS PASOS RECOMENDADOS**

1. **HOY (1h)**: Usa **SNIPPET 2** para auditar funnel → Crear TrustBar
2. **MAÑANA (1h)**: Usa **SNIPPET 6** para crear WhatsAppButton flotante
3. **PASADO (2h)**: Crear landing CDG con keywords SEO
4. **DESPUÉS**: Deploy a producción

---

## 💡 **TIPS PRO**

- **Guarda los snippets en favoritos** para acceso rápido
- **Usa 1 sesión de Augment = 1 tarea** (no mezcles)
- **Si una tarea toma >60min**, pídele a Augment que la divida en 2
- **Commitea después de cada tarea** para poder revertir si algo falla

---

## 📞 **SOPORTE**

Si tienes dudas sobre el sistema de prompts:
1. Lee `docs/prompts-architecto.md` (ejemplos completos)
2. Revisa `docs/prompts-snippets.md` (snippets actualizados)
3. Pregunta en el chat de Augment usando el Prompt Base

---

**¡Listo para empezar! 🚀**

Abre Augment Chat → Pega SNIPPET 1 → Pega SNIPPET 2 → ¡A trabajar!

