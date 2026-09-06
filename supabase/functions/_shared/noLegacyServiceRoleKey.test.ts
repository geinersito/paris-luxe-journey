// SECURITY-SERVICE-ROLE-LEGACY-P0B-01B
// Static guard: no ACTIVE Edge Function entrypoint may read
// SUPABASE_SERVICE_ROLE_KEY directly. The admin client must be resolved
// via _shared/adminClient.ts (SUPABASE_SECRET_KEYS['default']) instead.
//
// DORMANT_NOT_MIGRATED: functions present in this repo but confirmed (via
// P0-B-01C inventory) NOT currently active on the remote project — they
// were explicitly out of scope for the P0-B-01B slice ("migrar
// exactamente las 6 funciones canónicas que hoy siguen leyendo la legacy
// key"), not silently skipped. Remove an entry here only alongside
// actually migrating that function, in its own authorized slice.
const DORMANT_NOT_MIGRATED = new Set([
  "create-exit-lead",
  "create-flexible-setup-v312",
  "create-hold-job-v312",
  "create-hold-v312",
  "create-prepaid-payment-v312",
  "partner-sla-job-v312",
  "sync-events-openagenda",
]);

import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";

const offenders: string[] = [];

for await (const entry of Deno.readDir(new URL("../", import.meta.url))) {
  if (!entry.isDirectory) continue;
  if (DORMANT_NOT_MIGRATED.has(entry.name)) continue;
  const indexPath = new URL(`../${entry.name}/index.ts`, import.meta.url);
  let text: string;
  try {
    text = await Deno.readTextFile(indexPath);
  } catch {
    continue;
  }
  if (text.includes("SUPABASE_SERVICE_ROLE_KEY")) {
    offenders.push(entry.name);
  }
}

Deno.test("no active Edge Function index.ts references SUPABASE_SERVICE_ROLE_KEY", () => {
  assertEquals(offenders, []);
});
