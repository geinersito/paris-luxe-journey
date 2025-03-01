
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://urjsnguzzzwcnaxwghbo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyanNuZ3V6enp3Y25heHdnaGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0OTEwNDcsImV4cCI6MjA1NDA2NzA0N30.KmJcDNQxCjdk0-5DG6qG3pbZ78Nw0zheMq7_FfT5Qk8';

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
