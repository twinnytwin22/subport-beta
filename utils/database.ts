import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "app/supabase-admin";
import { supabase as supabaseClient } from "lib/providers/supabase/supabaseClient";

const supabase = createClientComponentClient();

const fetchCollectibles = async () => {
  let { data: collectibles, error } = await supabase.from("drops").select("*");
  return collectibles;
};

async function addPlaylist(userId: any, title: any, uri: any) {
  let { data: addPlaylist, error: addPlaylistError } = await supabase
    .from("playlists")
    .insert([{ title: title, user_id: userId, uri: uri }]);

  return { addPlaylist, addPlaylistError };
}

async function getUsersPlaylist(userId: any) {
  let { data: addPlaylist, error: addPlaylistError } = await supabase
    .from("playlists")
    .select("*")
    .eq("userId", userId);

  return { addPlaylist, addPlaylistError };
}

const fetchSingleCollectible = async (slug: any) => {
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

const fetchProfilesForDrops = async (id: any) => {
  let { data: dropProfiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  return dropProfiles;
};

async function getAllUsers() {
  let { data: users, error } = await supabaseClient
    .from("profiles")
    .select("username, id");
  if (error) {
    console.error("error", error);
  }
  return users;
}

async function getProfilesWithDrops() {
  const { data: users, error } = await supabase.from("profiles").select(`
    id, city, state, country,
     drops (
      userId
    )`);

  if (error) {
    console.error(error);
    return;
  }

  const filteredProfiles = users?.filter((user) => user.drops.length > 1);
  return filteredProfiles;
}
const checkUser = async (user: any) => {
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

async function addReaction(
  dropId: string,
  reactionType: string,
  userId: string
) {
  if (userId && dropId && reactionType) {
    let { data, error } = await supabase
      .from("drop_reactions")
      .insert([
        { drop_id: dropId, reaction_type: reactionType, user_id: userId },
      ]);

    if (error) {
      throw error;
    }
    return data;
  }
}

async function checkUserReactions(dropId: string, userId: string) {
  const { data, error } = await supabase
    .from("drop_reactions")
    .select()
    .eq("drop_id", dropId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
  return data;
}

async function deleteReaction(dropId: string, userId: string) {
  let { data, error } = await supabaseAdmin
    .from("drop_reactions")
    .delete()
    .eq("drop_id", dropId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
}
async function getTotalReactions(dropId: string) {
  try {
    const { count, error } = await supabase
      .from("drop_reactions")
      .select("count", { count: "exact", head: true })
      .eq("drop_id", dropId)
      .single();

    if (error) {
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error("Error:", error);
    // Handle error
    return 0;
  }
}

export {
  deleteReaction, // delete reaction from drop
  addReaction, // add reaction to drop
  checkUserReactions, // check if reaction and which on drop
  fetchCollectibles, // getting all drops
  addPlaylist, // create playlist name and row in db
  getUsersPlaylist, // getting the users playlist
  fetchSingleCollectible, // fetch drop for page
  fetchProfilesForDrops, // getting related profile to drops
  getAllUsers, // getting all the profiles
  getProfilesWithDrops, // getting profiles that have drops
  checkUser, // check if the user exists
  getTotalReactions, // reaction count for each drop
};
