-- Vehicle Categories Table
CREATE TABLE IF NOT EXISTS vehicle_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description JSONB,
    capacity_passengers INTEGER NOT NULL,
    capacity_suitcases INTEGER NOT NULL,
    capacity_carry_on INTEGER NOT NULL,
    images JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trigger for updated_at
CREATE TRIGGER update_vehicle_categories_updated_at
    BEFORE UPDATE ON vehicle_categories
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Initial data
INSERT INTO vehicle_categories (id, name, capacity_passengers, capacity_suitcases, capacity_carry_on, description) VALUES
('sedan', 'Premium Sedan', 3, 3, 3, '{
    "en": "Mercedes E-Class or similar premium vehicle",
    "es": "Mercedes Clase E o vehículo premium similar",
    "fr": "Mercedes Classe E ou véhicule premium similaire",
    "pt": "Mercedes Classe E ou veículo premium similar"
}'::jsonb),
('van', 'Luxury Van', 7, 7, 7, '{
    "en": "Mercedes V-Class or similar luxury van",
    "es": "Mercedes Clase V o van de lujo similar",
    "fr": "Mercedes Classe V ou van de luxe similaire",
    "pt": "Mercedes Classe V ou van de luxo similar"
}'::jsonb);

-- RLS Policies
ALTER TABLE vehicle_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vehicle categories are viewable by everyone" 
    ON vehicle_categories FOR SELECT 
    TO authenticated, anon
    USING (true);

CREATE POLICY "Vehicle categories are modifiable by admin" 
    ON vehicle_categories FOR ALL 
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
    ));
