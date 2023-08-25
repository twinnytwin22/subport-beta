import { useAuthStore } from "../auth/store";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { supabaseAuth } from "lib/constants";
import { toast } from "react-toastify";

export const fetchProfile = async (id: string) => {
  let { data: profile, error } = await supabaseAuth
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
  let
    { data: { subscription: subscriptionData } }
      = supabaseAuth.auth.onAuthStateChange(
        async (event: AuthChangeEvent, currentSession: Session | null) => {
          if (currentSession && event === "SIGNED_IN" || event === 'TOKEN_REFRESHED') {
            await supabaseAuth.auth.setSession(currentSession!)
            await getUserData();

           // supabaseAuth.auth.startAutoRefresh()
         //   const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
        //    document.cookie = `my-access-token=${currentSession?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
         //   document.cookie = `my-refresh-token=${currentSession?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`

            // router.refresh()
          } else if (event === "SIGNED_OUT") {
            useAuthStore.setState({ user: null, profile: null })
           // const expires = new Date(0).toUTCString()
         //   document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
          //  document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
            //alert('Signed Out Event')
          }
          if (event === "PASSWORD_RECOVERY") {
            await updatePassword()
          }
          
        }
      )


  return { subscription: subscriptionData };
}


export const getUserData = async () => {
  const { data: session } = await supabaseAuth.auth.getSession()
  if (session && session?.session) {
    let { data: authUser } = await supabaseAuth.auth.getUser();
    if (authUser?.user) {
      useAuthStore.setState({ user: authUser?.user })
      const profile = await fetchProfile(authUser.user.id);
      useAuthStore.setState({ profile });

      return { user: authUser.user, profile, session };
    }
  } else {
    useAuthStore.setState({ profile: null, user:null });
    return { user: '', profile: '', session };
  }
}
