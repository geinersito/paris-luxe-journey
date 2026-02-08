-- Ensure Paris City Center exists in locations SSOT with canonical code PAR.
-- This migration is idempotent and safe to run in environments where PAR may
-- already exist.

INSERT INTO locations (name, name_es, name_en, name_fr, name_pt, type, code)
SELECT
  'París Centro',
  'París Centro',
  'Paris City Center',
  'Centre de Paris',
  'Centro de Paris',
  'city',
  'PAR'
WHERE NOT EXISTS (
  SELECT 1
  FROM locations
  WHERE UPPER(code) = 'PAR'
);

-- Normalize legacy code PARIS to canonical PAR when PAR does not exist yet.
UPDATE locations
SET code = 'PAR'
WHERE UPPER(code) = 'PARIS'
  AND NOT EXISTS (
    SELECT 1
    FROM locations
    WHERE UPPER(code) = 'PAR'
  );

-- Keep localized names aligned for the canonical PAR record.
UPDATE locations
SET
  name = 'París Centro',
  name_es = 'París Centro',
  name_en = 'Paris City Center',
  name_fr = 'Centre de Paris',
  name_pt = 'Centro de Paris',
  type = 'city',
  code = 'PAR'
WHERE UPPER(code) = 'PAR';
