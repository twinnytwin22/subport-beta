import { supabase } from "lib/constants";

export async function getArtistSettings(profileId: any) {
  try {
    if (profileId) {
      const { data } = await supabase
        .from('artist_settings')
        .select('*')
        .eq('user_id', profileId)
        .single();

      if (data) {
        return data;
      } else {
        return 'false';
      }
    }
  } catch (error) {
    // Handle any errors that occur during the execution of the code in the try block
    console.error("An error occurred:", error);
    // You can choose to return an error message or handle it as needed
    return 'An error occurred while fetching artist settings.';
  }
}
