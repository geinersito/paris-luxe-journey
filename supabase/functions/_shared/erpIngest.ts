const ERP_INGEST_TIMEOUT_MS = 2000;

function truncate(s: string, max = 200): string {
  return s.length <= max ? s : `${s.slice(0, max)}…`;
}

/**
 * Compute HMAC-SHA256 over signingMsg using secret as key.
 * Returns lowercase hex string.
 *
 * Signing message format: `${timestamp}.${rawBody}`
 * This matches the verification in ingest-booking-confirmed-v1/index.ts.
 */
async function computeHmac(secret: string, signingMsg: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(signingMsg),
  );
  return Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Emit booking_confirmed event to ERP (RGPD-safe: no PII in payload)
 * Fire-and-forget: never throws, never blocks webhook
 *
 * Auth scheme (as of INGEST-AUTH-HARDENING-01):
 *   x-ingest-timestamp: Unix ms epoch (string)
 *   x-ingest-signature: hmacSha256Hex(BOOKING_INGEST_SECRET, `${timestamp}.${rawBody}`)
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

    // Serialise once — rawBody is signed and sent as body (consistent bytes)
    const rawBody = JSON.stringify(payload);
    const timestamp = Date.now().toString();
    const signature = await computeHmac(ingestSecret, `${timestamp}.${rawBody}`);

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
        'x-ingest-timestamp': timestamp,
        'x-ingest-signature': signature,
      },
      body: rawBody,
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = truncate(await res.text());
      console.error('[ERP] ingest failed', { bookingId, status: res.status, body });
      return; // never throw
    }

    console.log('[ERP] ingest ok', { bookingId, status: res.status });
  } catch (err: unknown) {
    const e = err as { name?: string; message?: string } | null;
    if (e?.name === 'AbortError') {
      console.warn('[ERP] ingest timeout', { bookingId });
      return;
    }
    console.error('[ERP] ingest exception', { bookingId, message: truncate(String(e?.message ?? e)) });
    return;
  } finally {
    clearTimeout(timeout);
  }
}
