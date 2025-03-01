-- Service Levels Table
CREATE TABLE IF NOT EXISTS service_levels (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description JSONB,  -- Multilingual descriptions
    features JSONB,     -- List of included features
    multiplier DECIMAL NOT NULL DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trigger for updated_at
CREATE TRIGGER update_service_levels_updated_at
    BEFORE UPDATE ON service_levels
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Initial data
INSERT INTO service_levels (id, name, multiplier, features) VALUES
('standard', 'Standard', 0.85, '{
    "wifi": "on request",
    "water": false,
    "meet_greet": false,
    "flight_tracking": false
}'::jsonb),
('business', 'Business', 1.0, '{
    "wifi": true,
    "water": true,
    "meet_greet": true,
    "flight_tracking": true
}'::jsonb);

-- RLS Policies
ALTER TABLE service_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service levels are viewable by everyone" 
    ON service_levels FOR SELECT 
    TO authenticated, anon
    USING (true);

CREATE POLICY "Service levels are modifiable by admin" 
    ON service_levels FOR ALL 
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
    ));
