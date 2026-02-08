-- DOSSIER01A-DB: View for dossiers list with services/invoices counts.
-- Read-only view; relies on existing RLS on underlying tables.

CREATE OR REPLACE VIEW public.dispatch_dossiers_with_counts AS
SELECT
  d.id,
  d.title,
  d.status,
  d.created_at,
  d.updated_at,
  d.client_id,
  d.agency_id,
  d.archived_at,
  COALESCE(COUNT(DISTINCT s.id), 0)::int AS services_count,
  COALESCE(COUNT(DISTINCT i.id), 0)::int AS invoices_count
FROM public.dispatch_dossiers d
LEFT JOIN public.dispatch_services s
  ON s.dossier_id = d.id
  AND s.archived_at IS NULL
LEFT JOIN public.dispatch_invoices i
  ON i.dossier_id = d.id
GROUP BY
  d.id,
  d.title,
  d.status,
  d.created_at,
  d.updated_at,
  d.client_id,
  d.agency_id,
  d.archived_at;
NOTIFY pgrst, 'reload schema';
