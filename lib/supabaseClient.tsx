import { createClient, SupabaseClient } from '@supabase/supabase-js';



const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
}


export const supabase =
  createClient(process.env.supabaseUrl!, process.env.supabaseAnonKey!, options);


