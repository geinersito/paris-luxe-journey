import * as asserts from "https://deno.land/std@0.224.0/assert/mod.ts";
import { getPublishableApiKey } from "./publishableClient.ts";

Deno.test("publishable helper resolves the default named key", () => {
  Deno.env.set("SUPABASE_PUBLISHABLE_KEYS", JSON.stringify({ default: "test-publishable" }));
  asserts.assertEquals(getPublishableApiKey(), "test-publishable");
});

Deno.test("publishable helper fails closed for missing or malformed dictionaries", () => {
  const original = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  for (const value of [undefined, "", "not-json", "[]", JSON.stringify({ default: "" })]) {
    if (value === undefined) Deno.env.delete("SUPABASE_PUBLISHABLE_KEYS");
    else Deno.env.set("SUPABASE_PUBLISHABLE_KEYS", value);
    asserts.assertEquals(getPublishableApiKey(), null);
  }
  if (original === undefined) Deno.env.delete("SUPABASE_PUBLISHABLE_KEYS");
  else Deno.env.set("SUPABASE_PUBLISHABLE_KEYS", original);
});
