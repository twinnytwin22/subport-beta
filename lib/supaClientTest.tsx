
import { createClient } from '@supabase/supabase-js'

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
}
export const supabase = createClient("https://xyzcompany.supabase.co", "public-anon-key", options)
