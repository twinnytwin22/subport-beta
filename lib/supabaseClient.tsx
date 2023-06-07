import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface Global {
  supabase: SupabaseClient;
}

declare const global: Global;

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
}


export const supabase =
  global.supabase ||
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, options
  );

if (process.env.NODE_ENV !== 'production') {
  global.supabase = supabase;
}
