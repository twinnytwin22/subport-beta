import { supabase } from "lib/constants"

export const getProfileSettings = async (id: string) => {
    const { data: settings } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', id)
      .maybeSingle()
    //  .single()
    if (settings) {
      const { data: newUserPrefs } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: id,
          super_follow: true
        })
        .select()
        .single()
      return newUserPrefs
    } else {
      return settings
    }
  }


  
  