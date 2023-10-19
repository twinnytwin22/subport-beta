import { supabase } from 'lib/constants';

export async function getArtistSettings(profileId: any) {
  if (profileId) {
    const { data } = await supabase
      .from('artist_settings')
      .select('*')
      .eq('user_id', profileId)
      .single();

    if (data) {
      return data;
    }
  }
}
