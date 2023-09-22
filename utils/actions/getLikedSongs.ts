import { Song } from "lib/types";;
import { createServerClient } from "lib/providers/supabase/supabase-server";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerClient()


  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
