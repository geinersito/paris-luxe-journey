/**
 * MIGRACIÓN V3.1.2 - SISTEMA DE PAGOS
 * 
 * Crea las tablas necesarias para el sistema de pagos V3.1.2
 * 
 * TABLAS:
 * 1. bookings_v312 - Bookings con nuevo sistema
 * 2. stripe_webhook_events - Idempotencia de webhooks
 * 3. booking_state_logs - Historial de cambios de estado
 * 4. stripe_fee_config - Configuración de fees
 */

-- ============================================================================
-- 1. TABLA: bookings_v312
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookings_v312 (
  -- Identificación
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Información de ruta
  route_key VARCHAR(50) NOT NULL,
  vehicle_type VARCHAR(10) NOT NULL CHECK (vehicle_type IN ('sedan', 'van')),
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  
  -- Información de pasajero
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers > 0),
  luggage_count INTEGER DEFAULT 0,
  special_instructions TEXT,
  
  -- Fechas
  pickup_datetime TIMESTAMPTZ NOT NULL,
  
  -- Pricing V3.1.2
  pricing_version VARCHAR(10) NOT NULL DEFAULT 'v3.1.2',
  prepaid_price_cents INTEGER NOT NULL CHECK (prepaid_price_cents > 0),
  flexible_price_cents INTEGER NOT NULL CHECK (flexible_price_cents >= 0),
  hold_amount_cents INTEGER NOT NULL CHECK (hold_amount_cents >= 0),
  partner_floor_cents INTEGER NOT NULL CHECK (partner_floor_cents > 0),
  
  -- Payment Mode
  payment_mode VARCHAR(10) NOT NULL CHECK (payment_mode IN ('prepaid', 'flexible')),
  
  -- Stripe IDs (Prepaid)
  stripe_payment_intent_id VARCHAR(255),
  
  -- Stripe IDs (Flexible)
  stripe_setup_intent_id VARCHAR(255),
  stripe_payment_method_id VARCHAR(255),
  hold_payment_intent_id VARCHAR(255),
  
  -- Stripe Customer
  stripe_customer_id VARCHAR(255) NOT NULL,
  
  -- Estados
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
    status IN (
      'pending',
      'payment_processing',
      'confirmed',
      'driver_assigned',
      'driver_departed',
      'in_progress',
      'completed',
      'cancelled',
      'payment_failed',
      'unconfirmed_no_contact'
    )
  ),
  
  payment_status VARCHAR(50),
  
  -- Sub-estados para Flexible
  flexible_sub_status VARCHAR(50) CHECK (
    flexible_sub_status IN (
      'awaiting_hold',
      'hold_pending',
      'hold_requires_action',
      'hold_confirmed',
      'hold_failed'
    )
  ),
  
  -- Hold status
  hold_status VARCHAR(50) CHECK (
    hold_status IN (
      'pending',
      'requires_action',
      'confirmed',
      'captured',
      'cancelled'
    )
  ),
  
  hold_auth_deadline TIMESTAMPTZ,
  hold_captured_at TIMESTAMPTZ,
  
  -- Índices
  CONSTRAINT bookings_v312_email_check CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_bookings_v312_status ON bookings_v312(status);
CREATE INDEX IF NOT EXISTS idx_bookings_v312_payment_mode ON bookings_v312(payment_mode);
CREATE INDEX IF NOT EXISTS idx_bookings_v312_pickup_datetime ON bookings_v312(pickup_datetime);
CREATE INDEX IF NOT EXISTS idx_bookings_v312_customer_email ON bookings_v312(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_v312_stripe_payment_intent ON bookings_v312(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_v312_hold_payment_intent ON bookings_v312(hold_payment_intent_id);

-- Índice compuesto para el job de holds
CREATE INDEX IF NOT EXISTS idx_bookings_v312_hold_job ON bookings_v312(
  payment_mode,
  status,
  hold_payment_intent_id,
  pickup_datetime
) WHERE payment_mode = 'flexible' AND status = 'confirmed' AND hold_payment_intent_id IS NULL;

-- ============================================================================
-- 2. TABLA: stripe_webhook_events (Idempotencia)
-- ============================================================================

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id VARCHAR(255) NOT NULL UNIQUE,
  event_type VARCHAR(100) NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Índices
  CONSTRAINT stripe_webhook_events_event_id_unique UNIQUE (event_id)
);

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_event_id ON stripe_webhook_events(event_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_processed_at ON stripe_webhook_events(processed_at);

-- ============================================================================
-- 3. TABLA: booking_state_logs (Historial)
-- ============================================================================

CREATE TABLE IF NOT EXISTS booking_state_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings_v312(id) ON DELETE CASCADE,
  
  -- Estado anterior y nuevo
  from_status VARCHAR(50),
  to_status VARCHAR(50) NOT NULL,
  
  -- Metadata
  changed_by VARCHAR(255), -- 'system', 'admin', 'webhook', etc.
  reason TEXT,
  metadata JSONB,
  
  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_state_logs_booking_id ON booking_state_logs(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_state_logs_created_at ON booking_state_logs(created_at);

-- ============================================================================
-- 4. TABLA: stripe_fee_config (Configuración)
-- ============================================================================

CREATE TABLE IF NOT EXISTS stripe_fee_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Fees
  worst_case_percent DECIMAL(5,2) NOT NULL DEFAULT 3.5 CHECK (worst_case_percent >= 0 AND worst_case_percent <= 10),
  worst_case_fixed_eur DECIMAL(5,2) NOT NULL DEFAULT 0.25 CHECK (worst_case_fixed_eur >= 0 AND worst_case_fixed_eur <= 2),
  
  -- Metadata
  updated_by VARCHAR(255),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Solo permitir una fila
  CONSTRAINT stripe_fee_config_singleton CHECK (id = '00000000-0000-0000-0000-000000000000'::UUID)
);

-- Insertar configuración por defecto
INSERT INTO stripe_fee_config (id, worst_case_percent, worst_case_fixed_eur, updated_by)
VALUES ('00000000-0000-0000-0000-000000000000'::UUID, 3.5, 0.25, 'system')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_v312_updated_at
  BEFORE UPDATE ON bookings_v312
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMENTARIOS
-- ============================================================================

COMMENT ON TABLE bookings_v312 IS 'Bookings con sistema de pagos V3.1.2 (Prepaid/Flexible)';
COMMENT ON TABLE stripe_webhook_events IS 'Registro de eventos de Stripe para idempotencia';
COMMENT ON TABLE booking_state_logs IS 'Historial de cambios de estado de bookings';
COMMENT ON TABLE stripe_fee_config IS 'Configuración de fees de Stripe (singleton)';

