import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { getAdminApiKey } from "./adminClient.ts";

function withEnv(value: string | undefined, fn: () => void) {
  const original = Deno.env.get("SUPABASE_SECRET_KEYS");
  try {
    if (value === undefined) Deno.env.delete("SUPABASE_SECRET_KEYS");
    else Deno.env.set("SUPABASE_SECRET_KEYS", value);
    fn();
  } finally {
    if (original === undefined) Deno.env.delete("SUPABASE_SECRET_KEYS");
    else Deno.env.set("SUPABASE_SECRET_KEYS", original);
  }
}

Deno.test("getAdminApiKey returns the default key when SUPABASE_SECRET_KEYS is valid", () => {
  withEnv(JSON.stringify({ default: "test-admin-key" }), () => {
    assertEquals(getAdminApiKey(), "test-admin-key");
  });
});

Deno.test("getAdminApiKey returns null when SUPABASE_SECRET_KEYS is unset", () => {
  withEnv(undefined, () => {
    assertEquals(getAdminApiKey(), null);
  });
});

Deno.test("getAdminApiKey returns null when the requested name is absent", () => {
  withEnv(JSON.stringify({ other: "some-key" }), () => {
    assertEquals(getAdminApiKey(), null);
  });
});

Deno.test("getAdminApiKey returns null when SUPABASE_SECRET_KEYS is invalid JSON", () => {
  withEnv("{not valid json", () => {
    assertEquals(getAdminApiKey(), null);
  });
});

Deno.test("getAdminApiKey returns null when the named value is an empty string", () => {
  withEnv(JSON.stringify({ default: "" }), () => {
    assertEquals(getAdminApiKey(), null);
  });
});

Deno.test("getAdminApiKey resolves a non-default named secret", () => {
  withEnv(JSON.stringify({ default: "d", other: "o" }), () => {
    assertEquals(getAdminApiKey("other"), "o");
  });
});
