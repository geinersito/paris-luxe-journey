-- ============================================================================
-- OPTIMIZACIÓN DE PERFORMANCE: ÍNDICES ADICIONALES
-- Fecha: 2025-03-08
-- Descripción: Añade índices para mejorar el rendimiento de queries frecuentes
-- ============================================================================

-- Índice compuesto para búsqueda de disponibilidad de vehículos
-- Usado en: useBookingCreation.ts para verificar conflictos de horarios
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_status_datetime 
ON bookings(vehicle_id, status, pickup_datetime)
WHERE status = 'confirmed';

-- Índice para búsqueda de ubicaciones por código
-- Usado en: useLocationDetails.ts para obtener detalles de ubicaciones
CREATE INDEX IF NOT EXISTS idx_locations_code 
ON locations(code);

-- Índice para búsqueda de pagos por booking_id
-- Usado en: Payment.tsx y funciones de pago
CREATE INDEX IF NOT EXISTS idx_payments_booking_id 
ON payments(booking_id);

-- Índice para búsqueda de pagos por stripe_payment_intent_id
-- Usado en: stripe-webhooks para actualizar estado de pagos
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent 
ON payments(stripe_payment_intent_id);

-- Índice para búsqueda de reservas por email del cliente
-- Usado en: Admin panel y búsqueda de reservas
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email 
ON bookings(customer_email);

-- Índice para búsqueda de reservas por fecha de pickup
-- Usado en: Dashboard y reportes
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_datetime 
ON bookings(pickup_datetime DESC);

-- Índice compuesto para búsqueda de pagos por estado y fecha
-- Usado en: Reportes financieros
CREATE INDEX IF NOT EXISTS idx_payments_status_created 
ON payments(status, created_at DESC);

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Ver todos los índices creados en la tabla bookings
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'bookings'
ORDER BY indexname;

-- Ver todos los índices creados en la tabla payments
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'payments'
ORDER BY indexname;

-- Ver todos los índices creados en la tabla locations
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'locations'
ORDER BY indexname;

