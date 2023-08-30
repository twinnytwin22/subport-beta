import { refresh, useAuthStore } from "./store";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { supabase, supabaseAdmin, supabaseAuth } from "lib/constants";
import { toast } from "react-toastify";

export const fetchProfile = async (id: string) => {
  let { data: profile, error } = await supabase
    .from("profiles").select("*").eq("id", id).single();
  if (profile) {
    return profile;
  }
  if (error) { throw error };
};

export async function updatePassword() {
  const newPassword = prompt("What would you like your new password to be?");
  let { data, error } = await supabaseAuth.auth.updateUser({
    password: newPassword!,
  });

  if (data) toast.success("Password updated successfully!");
  if (error) toast.error("There was an error updating your password.");
  console.log(error);
}

export async function handleAuthChangeEvent() {
  // Fetch user and authListener data concurrently
  const [
    { data: userSessionData },
    { data: { subscription: subscriptionData } },
  ] = await Promise.all([
    supabase.auth.getSession(),
    supabaseAdmin.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        if (currentSession && event === "SIGNED_IN") {
          const profile = await getUserData(userSessionData);
          useAuthStore.setState({ user: currentSession?.user, profile });
          refresh()
        } else if (event === "SIGNED_OUT") {
          refresh()
        }
        if (event === "PASSWORD_RECOVERY") {
          await updatePassword()
        }

      }
    )
  ])


  return { subscription: subscriptionData, };
}


export const getUserData = async (session: any) => {
  if (session && session.session) {
    const profile = await fetchProfile(session.session.user.id);
    useAuthStore.setState({ profile });
    return { user: session.session.user, profile };
  } else {
    useAuthStore.setState({ profile: null, user: null });
    return { user: null, profile: null };
  }
}
