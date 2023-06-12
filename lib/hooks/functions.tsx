import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
export const revalidate = 0

const supabase = createClientComponentClient()
export async function fetchCollectibles() {

  let { data: collectibles, error } = await supabase
    .from('drops')
    .select('*')
  return collectibles
}

