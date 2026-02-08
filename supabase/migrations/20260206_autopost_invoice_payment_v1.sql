-- LEDGER05B - Autopost invoice payments to counterparty ledger (DB-only).

CREATE OR REPLACE FUNCTION public.dispatch_autopost_invoice_payment(p_payment_id uuid)
RETURNS TABLE(entry_id uuid, inserted boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_payment record;
  v_invoice record;
  v_amount_cents bigint;
  v_occurred_at timestamptz;
BEGIN
  SELECT id, invoice_id, amount, paid_at
    INTO v_payment
    FROM public.dispatch_invoice_payments
    WHERE id = p_payment_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Payment not found.';
  END IF;

  SELECT id, billing_entity_id, counterparty_id
    INTO v_invoice
    FROM public.dispatch_invoices
    WHERE id = v_payment.invoice_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invoice not found for payment %.', p_payment_id;
  END IF;

  IF v_invoice.counterparty_id IS NULL THEN
    RAISE EXCEPTION 'Invoice has no counterparty_id; cannot autopost payment.';
  END IF;

  IF v_invoice.billing_entity_id IS NULL THEN
    RAISE EXCEPTION 'Invoice has no billing_entity_id; cannot autopost payment.';
  END IF;

  v_amount_cents := round(abs(v_payment.amount) * 100)::bigint;
  IF v_amount_cents = 0 THEN
    RAISE EXCEPTION 'Payment amount is zero; cannot autopost.';
  END IF;

  v_occurred_at := COALESCE(v_payment.paid_at, now());

  RETURN QUERY
  SELECT entry_id, inserted
  FROM public.dispatch_post_counterparty_ledger_entry(
    v_invoice.billing_entity_id,
    v_invoice.counterparty_id,
    format('invoice_payment:%s:posted:v1', p_payment_id),
    'payout_received',
    -v_amount_cents,
    v_occurred_at,
    'EUR',
    'Autopost invoice payment',
    'invoice_payment',
    p_payment_id::text
  );
END;
$$;
GRANT EXECUTE ON FUNCTION public.dispatch_autopost_invoice_payment(uuid) TO authenticated;
