-- Agregar París Centro como ubicación
-- Esta es la ubicación más importante que faltaba en la BD

INSERT INTO locations (name, name_es, name_en, name_fr, name_pt, type, code)
VALUES 
    ('París Centro', 'París Centro', 'Paris Center', 'Centre de Paris', 'Centro de Paris', 'city', 'PAR')
ON CONFLICT (id) DO NOTHING;

-- Actualizar ubicaciones existentes para asegurar que tienen todos los nombres traducidos
UPDATE locations
SET 
    name_fr = 'Aéroport Charles de Gaulle (CDG)',
    name_pt = 'Aeroporto Charles de Gaulle (CDG)'
WHERE code = 'CDG';

UPDATE locations
SET 
    name_fr = 'Aéroport d''Orly (ORY)',
    name_pt = 'Aeroporto de Orly (ORY)'
WHERE code = 'ORY';

UPDATE locations
SET 
    name_fr = 'Aéroport de Beauvais (BVA)',
    name_pt = 'Aeroporto de Beauvais (BVA)'
WHERE code = 'BVA';

UPDATE locations
SET 
    name_fr = 'Disneyland Paris',
    name_pt = 'Disneyland Paris'
WHERE code = 'DLP';

UPDATE locations
SET 
    name_fr = 'Gare de Lyon',
    name_pt = 'Estação Gare de Lyon'
WHERE code = 'GDL';

UPDATE locations
SET 
    name_fr = 'Gare Montparnasse',
    name_pt = 'Estação Montparnasse'
WHERE code = 'GDM';

UPDATE locations
SET 
    name_fr = 'Gare du Nord',
    name_pt = 'Estação Gare du Nord'
WHERE code = 'GDN';

UPDATE locations
SET 
    name_fr = 'Musée du Louvre',
    name_pt = 'Museu do Louvre'
WHERE code = 'LVR';

UPDATE locations
SET 
    name_fr = 'Château de Versailles',
    name_pt = 'Palácio de Versalhes'
WHERE code = 'VRS';

