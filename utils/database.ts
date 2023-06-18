import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase as supabaseClient } from "lib/providers/supabase/supabaseClient";

const supabase = createClientComponentClient();

export async function fetchCollectibles() {
  let { data: collectibles, error } = await supabase.from("drops").select("*");
  return collectibles;
}

export async function fetchSingleCollectible(slug: any) {
  let { data: drop, error } = await supabase
    .from("drops")
    .select("*")
    .eq("slug", slug);

  if (drop !== null && drop.length > 0) {
    return { error, drop: drop[0] };
  } else {
    return { error: "Not Found", drop: null };
  }
}

export async function fetchProfilesForDrops(id: any) {
  let { data: dropProfiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  return dropProfiles;
}

export async function getAllUsers() {
  let { data: users, error } = await supabaseClient
    .from("profiles")
    .select("username, id");
  if (error) {
    console.error("error", error);
  }
  return users;
}

export async function checkUser(user: any) {
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
}
