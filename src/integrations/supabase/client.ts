import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get Supabase credentials from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://urjsnguzzzwcnaxwghbo.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'temporary_key';

// Validate that environment variables are set
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using temporary values.');
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);
