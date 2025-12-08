-- ============================================================================
-- INSTRUCCIONES:
-- 1. Ve a: https://supabase.com/dashboard/project/urjsnguzzzwcnaxwghbo
-- 2. Click en "SQL Editor" en el menú izquierdo
-- 3. Click en "New Query"
-- 4. Copia y pega TODO este archivo
-- 5. Click en "Run" (o presiona Ctrl+Enter)
-- ============================================================================

-- ACTUALIZACIÓN DE PRECIOS PRODUCCIÓN V1.0
-- Basado en PROMPT SUPERVISOR MAESTRO v2.6
-- Fecha: 2025-03-08

-- Limpiar datos antiguos (precios incorrectos)
TRUNCATE TABLE fixed_routes CASCADE;

-- ============================================================================
-- 1. AEROPUERTOS → PARÍS
-- ============================================================================

INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7, description) VALUES
('cdg_paris', 'airport', 'city', 70, 90, '{"en": "CDG ↔ Paris Center", "es": "CDG ↔ Centro de París", "fr": "CDG ↔ Centre de Paris", "pt": "CDG ↔ Centro de Paris"}'::jsonb),
('orly_paris', 'airport', 'city', 60, 78, '{"en": "Orly ↔ Paris Center", "es": "Orly ↔ Centro de París", "fr": "Orly ↔ Centre de Paris", "pt": "Orly ↔ Centro de Paris"}'::jsonb),
('lebourget_paris', 'airport', 'city', 77, 99, '{"en": "Le Bourget ↔ Paris Center", "es": "Le Bourget ↔ Centro de París", "fr": "Le Bourget ↔ Centre de Paris", "pt": "Le Bourget ↔ Centro de Paris"}'::jsonb),
('beauvais_paris', 'airport', 'city', 130, 150, '{"en": "Beauvais ↔ Paris Center", "es": "Beauvais ↔ Centro de París", "fr": "Beauvais ↔ Centre de Paris", "pt": "Beauvais ↔ Centro de Paris"}'::jsonb);

-- ============================================================================
-- 2. TRANSFERS ENTRE AEROPUERTOS
-- ============================================================================

INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7, description) VALUES
('cdg_orly', 'airport', 'airport', 105, 135, '{"en": "CDG ↔ Orly", "es": "CDG ↔ Orly", "fr": "CDG ↔ Orly", "pt": "CDG ↔ Orly"}'::jsonb),
('cdg_lebourget', 'airport', 'airport', 77, 99, '{"en": "CDG ↔ Le Bourget", "es": "CDG ↔ Le Bourget", "fr": "CDG ↔ Le Bourget", "pt": "CDG ↔ Le Bourget"}'::jsonb),
('orly_lebourget', 'airport', 'airport', 85, 110, '{"en": "Orly ↔ Le Bourget", "es": "Orly ↔ Le Bourget", "fr": "Orly ↔ Le Bourget", "pt": "Orly ↔ Le Bourget"}'::jsonb);

-- ============================================================================
-- 3. ESTACIONES DE TREN → PARÍS
-- ============================================================================

INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7, description) VALUES
('garedunord_paris', 'station', 'city', 55, 72, '{"en": "Gare du Nord ↔ Paris Center", "es": "Gare du Nord ↔ Centro de París", "fr": "Gare du Nord ↔ Centre de Paris", "pt": "Gare du Nord ↔ Centro de Paris"}'::jsonb),
('garelyon_paris', 'station', 'city', 60, 78, '{"en": "Gare de Lyon ↔ Paris Center", "es": "Gare de Lyon ↔ Centro de París", "fr": "Gare de Lyon ↔ Centre de Paris", "pt": "Gare de Lyon ↔ Centro de Paris"}'::jsonb),
('garest_paris', 'station', 'city', 55, 72, '{"en": "Gare de l''Est ↔ Paris Center", "es": "Gare de l''Est ↔ Centro de París", "fr": "Gare de l''Est ↔ Centre de Paris", "pt": "Gare de l''Est ↔ Centro de Paris"}'::jsonb),
('garemontparnasse_paris', 'station', 'city', 60, 78, '{"en": "Gare Montparnasse ↔ Paris Center", "es": "Gare Montparnasse ↔ Centro de París", "fr": "Gare Montparnasse ↔ Centre de Paris", "pt": "Gare Montparnasse ↔ Centro de Paris"}'::jsonb),
('garelazare_paris', 'station', 'city', 60, 78, '{"en": "Gare Saint-Lazare ↔ Paris Center", "es": "Gare Saint-Lazare ↔ Centro de París", "fr": "Gare Saint-Lazare ↔ Centre de Paris", "pt": "Gare Saint-Lazare ↔ Centro de Paris"}'::jsonb);

-- ============================================================================
-- 4. ATRACCIONES TURÍSTICAS
-- ============================================================================

INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7, description) VALUES
('disney_paris', 'attraction', 'city', 95, 120, '{"en": "Disneyland ↔ Paris Center", "es": "Disneyland ↔ Centro de París", "fr": "Disneyland ↔ Centre de Paris", "pt": "Disneyland ↔ Centro de Paris"}'::jsonb),
('versailles_paris', 'attraction', 'city', 75, 98, '{"en": "Versailles ↔ Paris Center", "es": "Versalles ↔ Centro de París", "fr": "Versailles ↔ Centre de Paris", "pt": "Versalhes ↔ Centro de Paris"}'::jsonb);

-- ============================================================================
-- 5. AEROPUERTOS → DESTINOS TURÍSTICOS
-- ============================================================================

INSERT INTO fixed_routes (route_type, origin_type, destination_type, base_price_1_3, base_price_4_7, description) VALUES
('cdg_disney', 'airport', 'attraction', 95, 120, '{"en": "CDG → Disneyland", "es": "CDG → Disneyland", "fr": "CDG → Disneyland", "pt": "CDG → Disneyland"}'::jsonb),
('cdg_versailles', 'airport', 'attraction', 80, 104, '{"en": "CDG → Versailles", "es": "CDG → Versalles", "fr": "CDG → Versailles", "pt": "CDG → Versalhes"}'::jsonb),
('orly_disney', 'airport', 'attraction', 90, 117, '{"en": "Orly → Disneyland", "es": "Orly → Disneyland", "fr": "Orly → Disneyland", "pt": "Orly → Disneyland"}'::jsonb);

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Ver todos los precios insertados
SELECT 
  route_type,
  origin_type || ' → ' || destination_type as ruta,
  base_price_1_3 || '€ (1-3 pax)' as precio_bajo,
  base_price_4_7 || '€ (4-7 pax)' as precio_alto,
  description->>'en' as descripcion
FROM fixed_routes
ORDER BY 
  CASE origin_type
    WHEN 'airport' THEN 1
    WHEN 'station' THEN 2
    WHEN 'attraction' THEN 3
    ELSE 4
  END,
  base_price_1_3;

-- Contar rutas insertadas (debe ser 17)
SELECT COUNT(*) as total_rutas FROM fixed_routes;

