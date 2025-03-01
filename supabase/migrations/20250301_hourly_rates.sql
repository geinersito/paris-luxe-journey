-- Hourly Rates Table
CREATE TABLE IF NOT EXISTS hourly_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_type TEXT NOT NULL,
    base_rate DECIMAL NOT NULL,
    min_hours INTEGER NOT NULL DEFAULT 3,
    description JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trigger for updated_at
CREATE TRIGGER update_hourly_rates_updated_at
    BEFORE UPDATE ON hourly_rates
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Initial data
INSERT INTO hourly_rates (service_type, base_rate, min_hours, description) VALUES
('standard', 70, 3, '{
    "en": "Standard hourly service",
    "es": "Servicio por hora estándar",
    "fr": "Service horaire standard",
    "pt": "Serviço por hora padrão"
}'::jsonb),
('shopping', 70, 3, '{
    "en": "Shopping tour service",
    "es": "Servicio para compras",
    "fr": "Service shopping",
    "pt": "Serviço para compras"
}'::jsonb),
('events', 70, 3, '{
    "en": "Events and ceremonies service",
    "es": "Servicio para eventos y ceremonias",
    "fr": "Service pour événements et cérémonies",
    "pt": "Serviço para eventos e cerimônias"
}'::jsonb);

-- RLS Policies
ALTER TABLE hourly_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hourly rates are viewable by everyone" 
    ON hourly_rates FOR SELECT 
    TO authenticated, anon
    USING (true);

CREATE POLICY "Hourly rates are modifiable by admin" 
    ON hourly_rates FOR ALL 
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
    ));
