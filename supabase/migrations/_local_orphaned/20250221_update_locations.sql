-- Crear la tabla locations si no existe
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    name_es VARCHAR(255),
    name_en VARCHAR(255),
    name_fr VARCHAR(255),
    name_pt VARCHAR(255),
    type VARCHAR(50) NOT NULL,
    code VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear el trigger para updated_at
CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Insertar las ubicaciones iniciales si no existen
INSERT INTO locations (name, name_es, name_en, type, code)
VALUES 
    ('Aeropuerto Charles de Gaulle (CDG)', 'Aeropuerto Charles de Gaulle (CDG)', 'Charles de Gaulle Airport (CDG)', 'airport', 'CDG'),
    ('Aeropuerto de Orly (ORY)', 'Aeropuerto de Orly (ORY)', 'Orly Airport (ORY)', 'airport', 'ORY'),
    ('Aeropuerto de Beauvais (BVA)', 'Aeropuerto de Beauvais (BVA)', 'Beauvais Airport (BVA)', 'airport', 'BVA'),
    ('Disneyland Paris', 'Disneyland Paris', 'Disneyland Paris', 'attraction', 'DLP'),
    ('Estación Gare de Lyon', 'Estación Gare de Lyon', 'Gare de Lyon Station', 'station', 'GDL'),
    ('Estación Gare de Montparnasse', 'Estación Gare de Montparnasse', 'Montparnasse Station', 'station', 'GDM'),
    ('Estación Gare du Nord', 'Estación Gare du Nord', 'Gare du Nord Station', 'station', 'GDN'),
    ('Museo del Louvre', 'Museo del Louvre', 'The Louvre Museum', 'attraction', 'LVR'),
    ('Palacio de Versalles', 'Palacio de Versalles', 'Palace of Versailles', 'attraction', 'VRS')
ON CONFLICT (id) DO NOTHING;

-- Eliminar las ubicaciones duplicadas y mantener solo las que tienen código
DELETE FROM locations 
WHERE id IN (
    SELECT l1.id
    FROM locations l1
    JOIN locations l2 ON l1.name LIKE l2.name || '%'
    WHERE l1.code = '' AND l2.code != ''
);

-- Actualizar los nombres de los aeropuertos para asegurarnos de que tienen el código
UPDATE locations
SET 
    name = 'Aeropuerto Charles de Gaulle (CDG)',
    name_es = 'Aeropuerto Charles de Gaulle (CDG)',
    name_en = 'Charles de Gaulle Airport (CDG)',
    code = 'CDG'
WHERE type = 'airport' AND code = 'CDG';

UPDATE locations
SET 
    name = 'Aeropuerto de Orly (ORY)',
    name_es = 'Aeropuerto de Orly (ORY)',
    name_en = 'Orly Airport (ORY)',
    code = 'ORY'
WHERE type = 'airport' AND code = 'ORY';

-- Asegurarnos de que todos los aeropuertos tienen un código
ALTER TABLE locations 
ADD CONSTRAINT airport_must_have_code 
CHECK (
    (type = 'airport' AND code != '') OR 
    type != 'airport'
);

-- Habilitar RLS en la tabla locations
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir que todos los usuarios puedan ver las ubicaciones
CREATE POLICY "Locations are viewable by everyone" 
ON locations FOR SELECT 
TO authenticated, anon
USING (true);

-- Crear política para permitir que solo los administradores puedan modificar las ubicaciones
CREATE POLICY "Locations are modifiable by admin" 
ON locations FOR ALL 
TO authenticated
USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
));
