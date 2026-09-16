import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.190.0/testing/asserts.ts";

const functionDir = new URL("./", import.meta.url);
const indexSource = await Deno.readTextFile(new URL("./index.ts", functionDir));
const archivedSource = await Deno.readTextFile(
  new URL("../../legacy-functions/stripe-webhooks-v312/index.ts", functionDir),
);
const compatEnvSource = await Deno.readTextFile(
  new URL("./_compat/env.ts", functionDir),
);
const compatErpSource = await Deno.readTextFile(
  new URL("./_compat/erpIngest.ts", functionDir),
);
const configSource = await Deno.readTextFile(
  new URL("../../config.toml", functionDir),
);

const LIVE_EVENT_TYPES = [
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "payment_intent.processing",
  "payment_intent.canceled",
  "setup_intent.succeeded",
  "setup_intent.setup_failed",
  "payment_intent.amount_capturable_updated",
  "charge.captured",
] as const;

function normalize(source: string): string {
  const legacyAdminImport = "";
  const legacyKeyRead = "const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');";
  const legacyGuard = `    if (!supabaseKey) {
      console.error('[stripe-webhooks-v312] FATAL: SUPABASE_SERVICE_ROLE_KEY not set');
      return new Response(JSON.stringify({ ok: false, code: 'CONFIG_ERROR', missing: 'SUPABASE_SERVICE_ROLE_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

`;

  return source
    .replaceAll("\r\n", "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(
      " * - payment_intent.processing (LIVE endpoint coverage; no state transition)\n",
      "",
    )
    .replace(
      "import { getAdminApiKey } from '../_shared/adminClient.ts';\n",
      legacyAdminImport,
    )
    .replace(
      "import { getEnv, getEnvBool } from './_compat/env.ts';",
      "import { getEnv, getEnvBool } from '../_shared/env.ts';",
    )
    .replace(
      "import { emitBookingConfirmedToERP as emitToERP } from './_compat/erpIngest.ts';",
      "import { emitBookingConfirmedToERP as emitToERP } from '../_shared/erpIngest.ts';",
    )
    .replace("const supabaseKey = getAdminApiKey();", legacyKeyRead)
    .replace(
      /[ ]{4}if \(!supabaseKey\) \{[\s\S]*?[ ]{4}\}\n\n {4}const stripe/,
      `${legacyGuard}    const stripe`,
    );
}

Deno.test("v312 uses the modern admin key and never reads the legacy key", () => {
  assertStringIncludes(indexSource, "getAdminApiKey");
  assert(!indexSource.includes("SUPABASE_SERVICE_ROLE_KEY"));
  assertStringIncludes(indexSource, "const supabaseKey = getAdminApiKey();");
});

Deno.test("v312 preserves the live verify_jwt=false contract", () => {
  assertStringIncludes(configSource, "[functions.stripe-webhooks-v312]");
  assertStringIncludes(configSource, "verify_jwt = false");
});

Deno.test("missing and invalid signatures are rejected before any DB write", () => {
  const signature = indexSource.indexOf("const signature = req.headers.get('stripe-signature');");
  const missingSignature = indexSource.indexOf("if (!signature)");
  const verification = indexSource.indexOf("constructEventAsync");
  const firstDbAccess = indexSource.indexOf(".from('stripe_webhook_events')");

  assert(signature >= 0);
  assert(missingSignature >= 0);
  assert(verification >= 0);
  assert(firstDbAccess >= 0);
  assert(missingSignature < firstDbAccess);
  assert(verification < firstDbAccess);
});

Deno.test("all eight Stripe LIVE event types remain supported", () => {
  for (const eventType of LIVE_EVENT_TYPES) {
    assertStringIncludes(indexSource, eventType);
    if (eventType !== "payment_intent.processing") {
      assertStringIncludes(indexSource, `case '${eventType}':`);
    }
  }
});

Deno.test("compatibility helpers are the recovered v51 helpers, not modern HMAC", () => {
  assertStringIncludes(compatEnvSource, "Deno.env.get(key)");
  assertStringIncludes(compatErpSource, "'x-ingest-secret': ingestSecret");
  assert(!compatErpSource.includes("x-ingest-signature"));
  assert(!compatErpSource.includes("crypto.subtle"));
  assertStringIncludes(compatErpSource, "event_type: 'booking_confirmed'");
  assertStringIncludes(compatErpSource, "payment_intent_id");
});

Deno.test("canonicalized v312 differs from the recovered entrypoint only at approved seams", () => {
  assertEquals(normalize(indexSource), normalize(archivedSource));
});
