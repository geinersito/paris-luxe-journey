// ... existing imports ...

let supabaseInstance: SupabaseClient | null = null;

export const createSupabaseClient = () => {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  supabaseInstance = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  return supabaseInstance;
};

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    return createSupabaseClient();
  }
  return supabaseInstance;
};