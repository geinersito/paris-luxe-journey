-- DRIVERS01F-DB: Remove incorrect UNIQUE constraint on user_id
-- A user can have multiple drivers (internal + partners), so user_id should NOT be unique

-- Drop the unique constraint if it exists
ALTER TABLE public.dispatch_drivers
  DROP CONSTRAINT IF EXISTS dispatch_drivers_user_id_key;
-- Ensure the index is not unique (recreate as non-unique if needed)
DROP INDEX IF EXISTS dispatch_drivers_user_id_key;
-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
