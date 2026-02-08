-- DRIVERS01E-DB: default user_id to auth.uid() on dispatch_drivers inserts
-- RLS unchanged.

ALTER TABLE public.dispatch_drivers
  ALTER COLUMN user_id SET DEFAULT auth.uid();
NOTIFY pgrst, 'reload schema';
