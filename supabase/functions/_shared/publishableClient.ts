// Resolves the Supabase publishable API key from the hosted runtime's
// SUPABASE_PUBLISHABLE_KEYS dictionary. Missing or malformed values fail
// closed; there is deliberately no legacy anon-key fallback.

export function getPublishableApiKey(keyName = "default"): string | null {
  const raw = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  if (!raw) return null;

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const key = parsed[keyName];
  return typeof key === "string" && key.length > 0 ? key : null;
}
