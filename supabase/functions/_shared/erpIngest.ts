const ERP_INGEST_TIMEOUT_MS = 2000;

function truncate(s: string, max = 200): string {
  return s.length <= max ? s : `${s.slice(0, max)}…`;
}

/**
 * Emit booking_confirmed event to ERP (RGPD-safe: no PII in payload)
 * Fire-and-forget: never throws, never blocks webhook
 */
export async function emitBookingConfirmedToERP(args: {
  bookingId: string;
  erpIngestUrl: string;
  ingestSecret: string;
  paymentIntentId?: string;
}): Promise<void> {
  const { bookingId, erpIngestUrl, ingestSecret, paymentIntentId } = args;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ERP_INGEST_TIMEOUT_MS);

  try {
    const payload: Record<string, unknown> = {
      event_type: 'booking_confirmed',
      version: 'v1',
      booking_id: bookingId,
      idempotency_key: `booking_confirmed:${bookingId}:v1`,
    };
    if (paymentIntentId) {
      payload.payment_intent_id = paymentIntentId;
    }

    // Normalizar ERP_INGEST_URL para soportar origin base o ruta completa
    const base = erpIngestUrl.replace(/\/+$/, '');
    let endpoint = base;
    if (/\/functions\/v1\/ingest-booking-confirmed-v1$/.test(base)) {
      endpoint = base;
    } else if (/\/functions\/v1\/?$/.test(base)) {
      endpoint = `${base}/ingest-booking-confirmed-v1`;
    } else {
      endpoint = `${base}/functions/v1/ingest-booking-confirmed-v1`;
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ingest-secret': ingestSecret,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = truncate(await res.text());
      console.error('[ERP] ingest failed', { bookingId, status: res.status, body });
      return; // never throw
    }

    console.log('[ERP] ingest ok', { bookingId, status: res.status });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      console.warn('[ERP] ingest timeout', { bookingId });
      return;
    }
    console.error('[ERP] ingest exception', { bookingId, message: truncate(String(err?.message ?? err)) });
    return;
  } finally {
    clearTimeout(timeout);
  }
}
