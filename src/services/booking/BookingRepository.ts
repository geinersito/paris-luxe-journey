/**
 * BOOKING REPOSITORY V3.1.2
 * 
 * Capa de acceso a datos para bookings
 * Maneja todas las operaciones de base de datos
 */

import { createClient } from '@supabase/supabase-js';
import type { BookingContext } from './BookingOrchestrator';
import type { BookingStatus, BookingEvent } from '../state-machine/BookingStateMachine';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Obtener booking por ID
 */
export async function getBookingById(bookingId: string): Promise<BookingContext | null> {
  const { data, error } = await supabase
    .from('bookings_v312')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (error) {
    console.error('[Repository] Error fetching booking:', error);
    return null;
  }

  return mapDatabaseToContext(data);
}

/**
 * Actualizar estado del booking
 */
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  metadata?: Record<string, any>
): Promise<boolean> {
  const { error } = await supabase
    .from('bookings_v312')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
      ...metadata,
    })
    .eq('id', bookingId);

  if (error) {
    console.error('[Repository] Error updating booking:', error);
    return false;
  }

  return true;
}

/**
 * Registrar transición de estado en logs
 */
export async function logStateTransition(
  bookingId: string,
  fromState: BookingStatus,
  toState: BookingStatus,
  event: BookingEvent,
  metadata?: Record<string, any>
): Promise<boolean> {
  const { error } = await supabase
    .from('booking_state_logs')
    .insert({
      booking_id: bookingId,
      from_state: fromState,
      to_state: toState,
      event,
      metadata: {
        timestamp: new Date().toISOString(),
        ...metadata,
      },
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('[Repository] Error logging transition:', error);
    return false;
  }

  return true;
}

/**
 * Obtener historial de transiciones de un booking
 */
export async function getBookingStateHistory(
  bookingId: string
): Promise<Array<{
  from_state: BookingStatus;
  to_state: BookingStatus;
  event: BookingEvent;
  created_at: string;
  metadata?: any;
}>> {
  const { data, error } = await supabase
    .from('booking_state_logs')
    .select('*')
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Repository] Error fetching history:', error);
    return [];
  }

  return data || [];
}

/**
 * Buscar bookings por estado
 */
export async function getBookingsByStatus(
  status: BookingStatus,
  limit = 100
): Promise<BookingContext[]> {
  const { data, error } = await supabase
    .from('bookings_v312')
    .select('*')
    .eq('status', status)
    .limit(limit)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Repository] Error fetching bookings:', error);
    return [];
  }

  return (data || []).map(mapDatabaseToContext);
}

/**
 * Buscar bookings que necesitan hold (T-24h)
 */
export async function getBookingsNeedingHold(): Promise<BookingContext[]> {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in25h = new Date(now.getTime() + 25 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('bookings_v312')
    .select('*')
    .eq('payment_mode', 'flexible')
    .eq('status', 'confirmed')
    .is('hold_payment_intent_id', null)
    .gte('pickup_datetime', in24h.toISOString())
    .lt('pickup_datetime', in25h.toISOString());

  if (error) {
    console.error('[Repository] Error fetching bookings needing hold:', error);
    return [];
  }

  return (data || []).map(mapDatabaseToContext);
}

/**
 * Mapear datos de base de datos a BookingContext
 */
function mapDatabaseToContext(data: any): BookingContext {
  return {
    id: data.id,
    status: data.status,
    payment_mode: data.payment_mode,
    pickup_datetime: data.pickup_datetime,
    hold_status: data.hold_status,
    partner_id: data.partner_id,
    customer_name: data.customer_name,
    customer_email: data.customer_email,
    customer_phone: data.customer_phone,
    route_key: data.route_key,
    vehicle_type: data.vehicle_type,
    total_price_cents: data.total_price_cents,
    hold_amount_cents: data.hold_amount_cents,
    confirmation_number: data.confirmation_number,
  };
}

