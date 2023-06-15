import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "app/supabase-admin";
import { supabase as supabaseClient } from "lib/providers/supabase/supabaseClient";

const supabase = createClientComponentClient();

export async function fetchCollectibles() {
  let { data: collectibles, error } = await supabase.from("drops").select("*");
  return collectibles;
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
  console.log(users, "users from function");
  return users;
}

export async function checkUser(user: any) {
  console.log(user, "username string");
  let {
    data: profiles,
    error,
    status,
  } = await supabaseAdmin.from("profiles").select("id, username");

  const exists = profiles?.some((u) => u.username === user);

  console.log(exists, "exists?");
  console.log(profiles);
  if (error) {
    console.error("error", error);
  }
  if (exists) {
    return true;
  } else {
    return false;
  }
}
