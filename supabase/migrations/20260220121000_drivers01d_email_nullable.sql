-- DRIVERS01D-DB: Allow drivers without email (align UI + ops reality)
-- RLS unchanged.

ALTER TABLE public.dispatch_drivers
  ALTER COLUMN email DROP NOT NULL;
NOTIFY pgrst, 'reload schema';
