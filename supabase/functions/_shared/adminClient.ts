// SECURITY-SERVICE-ROLE-LEGACY-P0B-01B
//
// Resolves the Supabase admin API key from the modern SUPABASE_SECRET_KEYS
// dictionary (a JSON string, keyed by named secret key, auto-injected by
// the Edge Functions runtime) instead of the legacy SUPABASE_SERVICE_ROLE_KEY.
// https://supabase.com/docs/guides/functions/secrets
//
// Returns null if the dictionary is absent, malformed, or missing the
// requested key — callers must fail closed rather than construct a
// privileged client with an empty key.

export function getAdminApiKey(secretName = "default"): string | null {
  const raw = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (!raw) return null;
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  const key = parsed[secretName];
  return typeof key === "string" && key.length > 0 ? key : null;
}
