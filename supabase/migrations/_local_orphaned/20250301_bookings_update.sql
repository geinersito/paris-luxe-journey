-- Add new columns to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS service_level_id TEXT REFERENCES service_levels(id),
ADD COLUMN IF NOT EXISTS vehicle_category_id TEXT REFERENCES vehicle_categories(id),
ADD COLUMN IF NOT EXISTS passengers INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS large_suitcases INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS carry_on INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS special_requests TEXT,
ADD COLUMN IF NOT EXISTS calculated_price DECIMAL NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS booking_type TEXT NOT NULL DEFAULT 'transfer',
ADD COLUMN IF NOT EXISTS hours INTEGER,
ADD COLUMN IF NOT EXISTS pickup_details JSONB,
ADD COLUMN IF NOT EXISTS dropoff_details JSONB;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_bookings_service_level ON bookings(service_level_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_category ON bookings(vehicle_category_id);
CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(booking_type);

-- Update existing RLS policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own pending bookings" ON bookings;

CREATE POLICY "Users can view their own bookings" 
    ON bookings FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" 
    ON bookings FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending bookings" 
    ON bookings FOR UPDATE 
    TO authenticated
    USING (
        auth.uid() = user_id AND 
        status IN ('pending', 'pending_payment')
    )
    WITH CHECK (
        auth.uid() = user_id AND 
        status IN ('pending', 'pending_payment')
    );

CREATE POLICY "Staff can manage all bookings" 
    ON bookings FOR ALL 
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
    ));
