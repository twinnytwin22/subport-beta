import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
export const revalidate = 0

const supabase = createClientComponentClient()
export async function fetchCollectibles() {

  let { data: collectibles, error } = await supabase
    .from('drops')
    .select('*')
  return collectibles
}

export async function fetchProfilesForDrops(id: any) {
  let { data: dropProfiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
  return dropProfiles
}