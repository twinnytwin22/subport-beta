
import { createServerClient } from 'lib/supabase-server'


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hlrcgzujgosmqgepcemj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)
export const revalidate = 0
export async function fetchCollectibles(){
   
    let { data } = await supabase.from('').select('*') 
    return data
}