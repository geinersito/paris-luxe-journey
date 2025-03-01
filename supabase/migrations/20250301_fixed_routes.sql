-- Fixed Routes Table
CREATE TABLE IF NOT EXISTS fixed_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_type TEXT NOT NULL,
    origin_type TEXT NOT NULL,
    destination_type TEXT NOT NULL,
    base_price_1_3 DECIMAL NOT NULL,
    base_price_4_7 DECIMAL NOT NULL,
    description JSONB,
    estimated_duration INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trigger for updated_at
CREATE TRIGGER update_fixed_routes_updated_at
    BEFORE UPDATE ON fixed_routes
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Initial data
INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7, description) VALUES
('airport_paris', 'airport', 'city', 120, 140, '{
    "en": "Airport to Paris transfer",
    "es": "Traslado aeropuerto a París",
    "fr": "Transfert aéroport vers Paris",
    "pt": "Transfer aeroporto para Paris"
}'::jsonb),
('station_paris', 'station', 'city', 85, 105, '{
    "en": "Train station to Paris transfer",
    "es": "Traslado estación a París",
    "fr": "Transfert gare vers Paris",
    "pt": "Transfer estação para Paris"
}'::jsonb),
('disney_paris', 'attraction', 'city', 130, 150, '{
    "en": "Disneyland to Paris transfer",
    "es": "Traslado Disneyland a París",
    "fr": "Transfert Disneyland vers Paris",
    "pt": "Transfer Disneyland para Paris"
}'::jsonb),
('airport_airport', 'airport', 'airport', 135, 155, '{
    "en": "Airport to airport transfer",
    "es": "Traslado entre aeropuertos",
    "fr": "Transfert entre aéroports",
    "pt": "Transfer entre aeroportos"
}'::jsonb);

-- RLS Policies
ALTER TABLE fixed_routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fixed routes are viewable by everyone" 
    ON fixed_routes FOR SELECT 
    TO authenticated, anon
    USING (true);

CREATE POLICY "Fixed routes are modifiable by admin" 
    ON fixed_routes FOR ALL 
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
    ));
