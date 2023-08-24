import { supabase } from "lib/constants";
import { useAuthStore } from "../auth/store";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";
import { toast } from "react-toastify";

export const fetchProfile = async (id: string) => {
    let { data:profile, error } = await supabase
      .from("profiles").select("*").eq("id", id).single();
      if(profile) {
        return profile;

      }
    if (error) { throw error };
  };

export async function updatePassword() {
  const newPassword = prompt("What would you like your new password to be?");
  let { data, error } = await supabaseAdmin.auth.updateUser({
    password: newPassword!,
  });

  if (data) toast.success("Password updated successfully!");
  if (error) toast.error("There was an error updating your password.");
  console.log(error);  }

export async function handleAuthChangeEvent() {
    // Fetch user and authListener data concurrently
    let 
      { data: { subscription: subscriptionData } }
     = supabaseAdmin.auth.onAuthStateChange(
        async (event: AuthChangeEvent, currentSession: Session | null) => {
          if (currentSession && event === "SIGNED_IN") {
           useAuthStore.setState({ user: currentSession?.user });
            supabaseAdmin.auth.startAutoRefresh()
       //    await fetchProfile(currentSession?.user.id);
           // router.refresh()
          } else if (event === "SIGNED_OUT") {
            useAuthStore.setState({user:null, profile: null})
          //alert('Signed Out Event')
          }
          if (event === "PASSWORD_RECOVERY") {
              await updatePassword()
          }
       //   subscriptionData.unsubscribe()
        }
      )


    return { subscription: subscriptionData };
  }
  

  export const getUserData = async () => {
    const {data: session} = await supabaseAdmin.auth.getSession()
    if (session && session?.session) {
      let { data: authUser } = await supabaseAdmin.auth.getUser();

      if (authUser?.user) {
      const profile  =  await fetchProfile(authUser.user.id);
        return { user: authUser.user, profile };
      } return { user: null, profile: null };

    }
  }
  