import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseClient } from "lib/providers/supabase/supabaseClient";
import { cache } from "react";

const supabase = createClientComponentClient();

export const fetchCollectibles = async () => {
  let { data: collectibles, error } = await supabase.from("drops").select("*");
  return collectibles;
};

export async function addPlaylist(userId: any, title: any, uri: any) {
  let { data: addPlaylist, error: addPlaylistError } = await supabase
    .from("playlists")
    .insert([{ title: title }, { user_id: userId }, { uri: uri }]);

  return { addPlaylist, addPlaylistError };
}

export async function getUsersPlaylist(userId: any) {
  let { data: addPlaylist, error: addPlaylistError } = await supabase
    .from("playlists")
    .select("*")
    .eq("userId", userId);

  return { addPlaylist, addPlaylistError };
}

export const fetchSingleCollectible = async (slug: any) => {
  let { data: drop, error } = await supabase
    .from("drops")
    .select("*")
    .eq("slug", slug);

  if (drop !== null && drop.length > 0) {
    return { error, drop: drop[0] };
  } else {
    return { error: "Not Found", drop: null };
  }
};

export const fetchProfilesForDrops = async (id: any) => {
  let { data: dropProfiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  return dropProfiles;
};

export async function getAllUsers() {
  let { data: users, error } = await supabaseClient
    .from("profiles")
    .select("username, id");
  if (error) {
    console.error("error", error);
  }
  return users;
}

export const checkUser = async (user: any) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select(
      "id, username, avatar_url, website, full_name, city, state, country, bio"
    )
    .eq("username", user);

  if (error) {
    console.error("error", error);
  }

  if (profiles !== null && profiles.length > 0) {
    return { exists: true, profile: profiles[0] };
  } else {
    return { exists: false, profile: null };
  }
};
