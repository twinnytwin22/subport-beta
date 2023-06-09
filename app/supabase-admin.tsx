
import { createClient } from "@supabase/supabase-js";

const options = {

    auth: {
        autoRefreshToken: true,
        persistSession: false,
        detectSessionInUrl: true
    },
}


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, options)