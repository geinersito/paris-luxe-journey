-- ========================================
-- AGREGAR PARÍS CENTRO A LA BASE DE DATOS
-- ========================================
-- 
-- INSTRUCCIONES:
-- 1. Abre Supabase Dashboard → SQL Editor
-- 2. Copia y pega este script completo
-- 3. Click en "RUN"
-- 4. Verifica que se agregó correctamente
--
-- ========================================

-- Agregar París Centro (la ubicación más importante que faltaba)
INSERT INTO locations (name, name_es, name_en, name_fr, name_pt, type, code)
VALUES 
    ('París Centro', 'París Centro', 'Paris Center', 'Centre de Paris', 'Centro de Paris', 'city', 'PAR')
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    name_es = EXCLUDED.name_es,
    name_en = EXCLUDED.name_en,
    name_fr = EXCLUDED.name_fr,
    name_pt = EXCLUDED.name_pt;

-- Verificar que se agregó correctamente
SELECT code, name, name_en, name_es, name_fr, name_pt, type
FROM locations
WHERE code = 'PAR';

-- Mostrar todas las ubicaciones disponibles
SELECT code, name_en, type
FROM locations
ORDER BY type, name_en;

