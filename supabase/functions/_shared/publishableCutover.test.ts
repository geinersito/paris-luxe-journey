import { assert } from "https://deno.land/std@0.224.0/assert/mod.ts";

Deno.test("reservation fee function uses the hosted publishable dictionary", async () => {
  const source = await Deno.readTextFile(new URL("../create-reservation-fee-session/index.ts", import.meta.url));
  assert(!source.includes("SUPABASE_ANON_KEY"));
  assert(source.includes("getPublishableApiKey"));
  assert(source.includes("getAdminApiKey"));
});

Deno.test("active Luxe browser surfaces use the publishable key", async () => {
  const files = [
    "../../../src/integrations/supabase/client.ts",
    "../../../src/components/ExitIntentPopup.tsx",
    "../../../src/components/blog/NewsletterCTA.tsx",
    "../../../src/contexts/BookingContext.tsx",
  ];
  for (const path of files) {
    const source = await Deno.readTextFile(new URL(path, import.meta.url));
    assert(!source.includes("VITE_SUPABASE_ANON_KEY"), `${path} still reads the legacy browser key`);
    assert(source.includes("VITE_SUPABASE_PUBLISHABLE_KEY"), `${path} does not read the publishable browser key`);
  }
});

Deno.test("reservation fee keeps the platform JWT gate enabled", async () => {
  const config = await Deno.readTextFile(new URL("../../config.toml", import.meta.url));
  const block = config.match(/\[functions\.create-reservation-fee-session\][\s\S]*?(?=\n\[|$)/)?.[0] ?? "";
  assert(!/verify_jwt\s*=\s*false/.test(block));
});
