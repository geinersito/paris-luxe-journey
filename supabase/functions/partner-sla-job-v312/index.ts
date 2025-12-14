/**
 * PARTNER SLA JOB V3.1.2
 * 
 * Job programado que asigna conductores a bookings según SLAs:
 * - T-48h: Primera notificación a conductores disponibles
 * - T-24h: Asignación automática si no hay asignación manual
 * - T-12h: Escalación a admin si no hay conductor
 * 
 * Ejecutar cada 30 minutos
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface SLAWindow {
  name: string;
  hours_before: number;
  action: 'notify' | 'auto_assign' | 'escalate';
}

const SLA_WINDOWS: SLAWindow[] = [
  { name: 'T-48h', hours_before: 48, action: 'notify' },
  { name: 'T-24h', hours_before: 24, action: 'auto_assign' },
  { name: 'T-12h', hours_before: 12, action: 'escalate' },
];

serve(async (req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log('[Partner SLA Job] Starting execution...');

    const results = {
      processed: 0,
      notified: 0,
      assigned: 0,
      escalated: 0,
      errors: 0,
    };

    // Procesar cada ventana de SLA
    for (const window of SLA_WINDOWS) {
      console.log(`[Partner SLA Job] Processing ${window.name}...`);

      // Calcular timestamp de la ventana
      const windowTime = new Date();
      windowTime.setHours(windowTime.getHours() + window.hours_before);

      // Buscar bookings en esta ventana sin conductor asignado
      const { data: bookings, error } = await supabase
        .from('bookings_v312')
        .select('*')
        .eq('status', 'confirmed')
        .is('partner_id', null)
        .gte('pickup_datetime', windowTime.toISOString())
        .lt('pickup_datetime', new Date(windowTime.getTime() + 60 * 60 * 1000).toISOString())
        .eq(`sla_${window.name.toLowerCase().replace('-', '_')}_processed`, false);

      if (error) {
        console.error(`[Partner SLA Job] Error fetching bookings for ${window.name}:`, error);
        results.errors++;
        continue;
      }

      if (!bookings || bookings.length === 0) {
        console.log(`[Partner SLA Job] No bookings found for ${window.name}`);
        continue;
      }

      console.log(`[Partner SLA Job] Found ${bookings.length} bookings for ${window.name}`);

      // Procesar cada booking según la acción del SLA
      for (const booking of bookings) {
        results.processed++;

        try {
          if (window.action === 'notify') {
            // T-48h: Notificar a conductores disponibles
            await notifyAvailablePartners(supabase, booking);
            results.notified++;
          } else if (window.action === 'auto_assign') {
            // T-24h: Asignación automática
            await autoAssignPartner(supabase, booking);
            results.assigned++;
          } else if (window.action === 'escalate') {
            // T-12h: Escalar a admin
            await escalateToAdmin(supabase, booking);
            results.escalated++;
          }

          // Marcar ventana como procesada
          await supabase
            .from('bookings_v312')
            .update({
              [`sla_${window.name.toLowerCase().replace('-', '_')}_processed`]: true,
              [`sla_${window.name.toLowerCase().replace('-', '_')}_at`]: new Date().toISOString(),
            })
            .eq('id', booking.id);

        } catch (error) {
          console.error(`[Partner SLA Job] Error processing booking ${booking.id}:`, error);
          results.errors++;
        }
      }
    }

    console.log('[Partner SLA Job] Execution completed:', results);

    return new Response(
      JSON.stringify({
        success: true,
        results,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('[Partner SLA Job] Fatal error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

/**
 * T-48h: Notificar a conductores disponibles
 */
async function notifyAvailablePartners(supabase: any, booking: any) {
  console.log(`[Notify] Sending notifications for booking ${booking.id}`);
  
  // TODO: Implementar lógica de notificación
  // - Buscar conductores disponibles en la zona
  // - Enviar notificación push/SMS/WhatsApp
  // - Registrar en tabla de notificaciones
}

/**
 * T-24h: Asignación automática de conductor
 */
async function autoAssignPartner(supabase: any, booking: any) {
  console.log(`[Auto-Assign] Assigning partner for booking ${booking.id}`);
  
  // TODO: Implementar lógica de asignación automática
  // - Buscar conductor con mejor score/disponibilidad
  // - Asignar y actualizar estado
  // - Notificar al conductor y cliente
}

/**
 * T-12h: Escalar a admin por falta de conductor
 */
async function escalateToAdmin(supabase: any, booking: any) {
  console.log(`[Escalate] Escalating booking ${booking.id} to admin`);
  
  // TODO: Implementar lógica de escalación
  // - Crear ticket de escalación
  // - Notificar a admin
  // - Marcar booking como urgente
}

