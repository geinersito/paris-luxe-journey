# ✅ PRECIOS ACTUALIZADOS - PRODUCCIÓN V1.0

## 📋 **RESUMEN DE CAMBIOS**

Se han actualizado **17 rutas** con los precios reales del **PROMPT SUPERVISOR MAESTRO v2.6**.

---

## 💰 **TABLA COMPLETA DE PRECIOS**

### **1. AEROPUERTOS → PARÍS**

| Ruta | 1-3 pax | 4-7 pax | Notas |
|------|---------|---------|-------|
| **CDG ↔ París** | €70 | €90 | Sweet spot validado ✅ |
| **Orly ↔ París** | €60 | €78 | -15% vs CDG |
| **Le Bourget ↔ París** | €77 | €99 | Segment business |
| **Beauvais ↔ París** | €130 | €150 | -40% vs taxi |

### **2. TRANSFERS ENTRE AEROPUERTOS**

| Ruta | 1-3 pax | 4-7 pax | Notas |
|------|---------|---------|-------|
| **CDG ↔ Orly** | €105 | €135 | Inter-aeropuerto |
| **CDG ↔ Le Bourget** | €77 | €99 | Corta distancia |
| **Orly ↔ Le Bourget** | €85 | €110 | Media lógica |

### **3. ESTACIONES DE TREN → PARÍS**

| Ruta | 1-3 pax | 4-7 pax | Notas |
|------|---------|---------|-------|
| **Gare du Nord ↔ París** | €55 | €72 | Urbana premium |
| **Gare de Lyon ↔ París** | €60 | €78 | Igual que Orly |
| **Gare de l'Est ↔ París** | €55 | €72 | Urbana premium |
| **Gare Montparnasse ↔ París** | €60 | €78 | Igual que Orly |
| **Gare Saint-Lazare ↔ París** | €60 | €78 | Igual que Orly |

### **4. ATRACCIONES TURÍSTICAS**

| Ruta | 1-3 pax | 4-7 pax | Notas |
|------|---------|---------|-------|
| **Disneyland ↔ París** | €95 | €120 | Turista + margen |
| **Versalles ↔ París** | €75 | €98 | Competitivo |

### **5. AEROPUERTOS → DESTINOS TURÍSTICOS**

| Ruta | 1-3 pax | 4-7 pax | Notas |
|------|---------|---------|-------|
| **CDG → Disneyland** | €95 | €120 | Directo |
| **CDG → Versalles** | €80 | €104 | Directo |
| **Orly → Disneyland** | €90 | €117 | +€5 vs CDG |

---

## 📊 **COMPARACIÓN ANTES/DESPUÉS**

| Ruta | ANTES (Incorrecto) | DESPUÉS (Correcto) | Diferencia |
|------|-------------------|-------------------|------------|
| **CDG → París (1-3 pax)** | €120 | €70 | ✅ **-42%** (precio real) |
| **CDG → París (4-7 pax)** | €140 | €90 | ✅ **-36%** (precio real) |

---

## 🎯 **ARCHIVOS CREADOS/MODIFICADOS**

### **1. Base de Datos:**
- ✅ `supabase/migrations/20250308_update_pricing_prod_v1.sql` - Migración SQL
- ✅ `EJECUTAR_EN_SUPABASE.sql` - Script para ejecutar en Dashboard

### **2. Código Frontend:**
- ✅ `src/config/pricing.ts` - Configuración de precios (snippet del PROMPT v2.6)

### **3. Documentación:**
- ✅ `PRECIOS_ACTUALIZADOS.md` - Este archivo
- ✅ `RESEND_SETUP.md` - Guía de configuración de emails (creado anteriormente)

---

## 🚀 **PRÓXIMOS PASOS (EN ORDEN)**

### **PASO 1: Actualizar Base de Datos (5 min) - CRÍTICO**

1. Ve a: https://supabase.com/dashboard/project/urjsnguzzzwcnaxwghbo
2. Click en **"SQL Editor"** (menú izquierdo)
3. Click en **"New Query"**
4. Abre el archivo `EJECUTAR_EN_SUPABASE.sql`
5. Copia TODO el contenido
6. Pégalo en el editor de Supabase
7. Click en **"Run"** (o Ctrl+Enter)
8. Verifica que aparezcan **17 rutas** en el resultado

**✅ Check de éxito:**
- Mensaje: "Success. No rows returned"
- Tabla de verificación muestra 17 rutas
- CDG → París muestra €70 (1-3 pax) y €90 (4-7 pax)

---

### **PASO 2: Integrar pricing.ts en BookingForm (30 min)**

**Archivos a modificar:**
- `src/components/BookingForm.tsx`
- `src/hooks/useBookingPrice.tsx`
- `src/contexts/BookingContext.tsx`

**Cambios necesarios:**
1. Importar `calculatePrice` de `src/config/pricing.ts`
2. Reemplazar llamadas a Supabase por `calculatePrice()`
3. Mantener lógica de recargos por maletas

**Ejemplo:**
```typescript
import { calculatePrice, PRICING } from '@/config/pricing';

// Antes:
const price = await supabase.from('fixed_routes').select('*')...

// Después:
const price = calculatePrice('cdg-paris', passengers, { extraBags: 2 });
```

---

### **PASO 3: Probar 3 Rutas Clave (15 min)**

**Rutas a validar:**

1. **CDG → París (1-3 pax):**
   - Esperado: **€70**
   - Screenshot del formulario

2. **Disneyland → París (4-7 pax):**
   - Esperado: **€120**
   - Screenshot del formulario

3. **Beauvais → París (1-3 pax):**
   - Esperado: **€130**
   - Screenshot del formulario

**✅ Check de éxito:**
- Los 3 precios coinciden exactamente
- No hay errores en consola
- El precio se actualiza al cambiar pasajeros

---

### **PASO 4: Configurar Resend API Key (2 min)**

Ver guía completa en: `RESEND_SETUP.md`

**Acción rápida:**
1. Ve a Supabase Dashboard → Settings → Edge Functions → Secrets
2. Busca `RESEND_API_KEY`
3. Si NO existe, agrégalo con tu API key de Resend

---

### **PASO 5: Deploy a Vercel (10 min)**

Una vez validados los precios:

```bash
git add -A
git commit -m "feat: actualizar precios producción v1.0 - 17 rutas

CAMBIOS:
✅ Migración SQL con precios reales del PROMPT v2.6
✅ Archivo pricing.ts con calculatePrice()
✅ CDG↔París: €70/€90 (antes €120/€140)
✅ 17 rutas totales configuradas

PRÓXIMO: Integrar pricing.ts en BookingForm"

git push origin main
```

Vercel desplegará automáticamente.

---

## 📋 **RECARGOS Y POLÍTICAS (MANUAL EN V1)**

Estos NO se aplican automáticamente en V1, pero están documentados:

| Concepto | Política | Aplicación |
|----------|----------|------------|
| **Equipaje extra** | €10/pieza | Manual (tú decides) |
| **Horario nocturno (23:00-06:00)** | +20% | Manual |
| **Tiempo espera aeropuerto** | 60 min gratis → €15/15 min | Manual |
| **Tiempo espera ciudad** | 15 min gratis → €15/15 min | Manual |
| **Silla bebé/booster** | Gratis | Petición en notas |

---

## ⚠️ **IMPORTANTE - NIVEL DE SERVICIO**

Según PROMPT v2.6:
- **Solo nivel "Standard"** visible en UI
- Nivel "Business" existe en BD pero está **oculto**
- Ya implementado en `useServiceLevels.ts` (commit fdf4b51)

---

## 🎯 **OBJETIVO FINAL**

**Antes del deploy, DEBES validar:**
- ✅ Base de datos actualizada con 17 rutas
- ✅ pricing.ts integrado en BookingForm
- ✅ 3 rutas clave probadas y funcionando
- ✅ Resend API Key configurada
- ✅ Screenshots de prueba guardados

**Tiempo total estimado:** 60 minutos

---

**¿Listo para empezar con el PASO 1?** 🚀

