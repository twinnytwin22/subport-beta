import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from 'lib/types';
import { createServerClient } from 'lib/providers/supabase/supabase-server';

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs;
