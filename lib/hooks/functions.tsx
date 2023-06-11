import { supabase } from "lib/providers/supabase/supabaseClient"

export const revalidate = 0
export async function fetchCollectibles() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  let { data: collectibles, error } = await supabase
    .from('collectibles')
    .select('*')
  return collectibles
}

