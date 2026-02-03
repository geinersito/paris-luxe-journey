-- Create vehicles table to match the Vehicle interface used in the application
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    technical_specs TEXT,
    passenger_capacity INTEGER NOT NULL,
    luggage_capacity INTEGER NOT NULL,
    base_price INTEGER NOT NULL DEFAULT 0,
    features TEXT[] DEFAULT '{}',
    image_url TEXT,
    interior_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to update updated_at timestamp (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- RLS Policies
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vehicles are viewable by everyone"
    ON vehicles FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "Vehicles are modifiable by admin"
    ON vehicles FOR ALL
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
    ));

-- Insert fallback vehicle data
INSERT INTO vehicles (id, type, name, description, technical_specs, passenger_capacity, luggage_capacity, base_price, image_url, interior_image_url, features) VALUES
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'berline', 'Berlina Mercedes', 'Vehículo elegante y confortable para 1-3 pasajeros', 'Motor 2.0L Turbo, Transmisión automática 9G-TRONIC, Interior en cuero', 3, 2, 0, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&q=80', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80', ARRAY['wifi', 'water', 'airConditioning', 'leatherSeats', 'cleaning']),
('d290f1ee-6c54-4b01-90e6-d701748f0852', 'van', 'Van Mercedes', 'Espacioso y versátil para grupos de hasta 7 pasajeros', 'Motor 2.0L Diesel, Configuración flexible de asientos, WiFi a bordo', 7, 7, 0, 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop&q=80', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop&q=80', ARRAY['wifi', 'water', 'airConditioning', 'leatherSeats', 'cleaning']);