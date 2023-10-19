import { Song } from 'lib/types';
import getSongs from './getSongs';
import { createServerClient } from 'lib/providers/supabase/supabase-server';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerClient();

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
