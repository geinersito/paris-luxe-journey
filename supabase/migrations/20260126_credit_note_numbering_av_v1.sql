-- Credit Note AV Numbering: counters table + allocator function
-- DB-only, concurrency-safe, does NOT impact invoice numbering

-- 1) Document counters table (annual, per doc_type)
CREATE TABLE IF NOT EXISTS public.dispatch_document_counters (
  year int NOT NULL,
  doc_type text NOT NULL CHECK (doc_type IN ('invoice', 'credit_note')),
  next_number int NOT NULL DEFAULT 1 CHECK (next_number >= 1),
  PRIMARY KEY (year, doc_type)
);
-- 2) RLS
ALTER TABLE public.dispatch_document_counters ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='dispatch_document_counters' AND policyname='counters_select_auth'
  ) THEN
    CREATE POLICY counters_select_auth ON public.dispatch_document_counters
      FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='dispatch_document_counters' AND policyname='counters_insert_auth'
  ) THEN
    CREATE POLICY counters_insert_auth ON public.dispatch_document_counters
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='dispatch_document_counters' AND policyname='counters_update_auth'
  ) THEN
    CREATE POLICY counters_update_auth ON public.dispatch_document_counters
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
-- 3) Allocator function for credit notes only
CREATE OR REPLACE FUNCTION public.next_credit_note_number(p_year int DEFAULT EXTRACT(YEAR FROM now())::int)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_n int;
BEGIN
  -- Ensure row exists for this year
  INSERT INTO public.dispatch_document_counters (year, doc_type, next_number)
  VALUES (p_year, 'credit_note', 1)
  ON CONFLICT (year, doc_type) DO NOTHING;

  -- Lock and get current number
  SELECT next_number INTO v_n
  FROM public.dispatch_document_counters
  WHERE year = p_year AND doc_type = 'credit_note'
  FOR UPDATE;

  -- Increment counter
  UPDATE public.dispatch_document_counters
  SET next_number = v_n + 1
  WHERE year = p_year AND doc_type = 'credit_note';

  -- Return formatted AV number: AV-YYYY-####
  RETURN 'AV-' || p_year::text || '-' || LPAD(v_n::text, 4, '0');
END;
$$;
-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.next_credit_note_number(int) TO authenticated;
-- 4) Generic stub that blocks invoice usage (safety)
CREATE OR REPLACE FUNCTION public.next_document_number(p_doc_type text, p_year int DEFAULT EXTRACT(YEAR FROM now())::int)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_doc_type = 'credit_note' THEN
    RETURN public.next_credit_note_number(p_year);
  ELSIF p_doc_type = 'invoice' THEN
    RAISE EXCEPTION 'Invoice numbering not handled here; use existing invoice numbering logic';
  ELSE
    RAISE EXCEPTION 'Unknown document type: %', p_doc_type;
  END IF;
END;
$$;
GRANT EXECUTE ON FUNCTION public.next_document_number(text, int) TO authenticated;
