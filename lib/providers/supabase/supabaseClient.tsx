import { createClient } from '@supabase/supabase-js';
import { supabase } from 'lib/constants';
export { supabase }

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
   // detectSessionInUrl: true
  },
}

export const supabaseApi = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const supabaseClient =
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options
  );


