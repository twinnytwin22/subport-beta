import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCollections() {
  try {
    const { data, error } = await supabase.from('collectibles').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    // handle the error
    console.error('Error getting collections:', error);
    return null;
  }
}
