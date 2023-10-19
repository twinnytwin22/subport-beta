import { supabase } from 'lib/constants';
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
