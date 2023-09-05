import { supabase, supabaseAuth } from "lib/constants";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { supabaseAdmin } from "lib/constants";
import { toast } from "react-toastify";

export const fetchProfile = async (id: string) => {
    let { data:profile, error } = await supabaseAuth
      .from("profiles").select("*").eq("id", id).single();
      if(profile) {
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
  console.log(error);  }

export async function handleAuthChangeEvent(router: any) {
let [
      { data: userSessionData },
      { data: { subscription: subscriptionData } },
    ] = await Promise.all([
      supabaseAuth.auth.getSession(),
      supabaseAuth.auth.onAuthStateChange(
        async (event: AuthChangeEvent, currentSession: Session | null) => {
          if (currentSession && event === "SIGNED_IN") {
         //   const profile = await fetchProfile(currentSession?.user.id);
           // useAuthStore.setState({ user: currentSession?.user});
           router.refresh()
          } else if (event === "SIGNED_OUT") {
          //  refresh()
          }
          if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            let { data, error } = await supabaseAuth.auth.updateUser({
              password: newPassword!,
            });

            if (data) toast.success("Password updated successfully!");
            if (error) toast.error("There was an error updating your password.");
            console.log(error);
          }
        }
      ),
    ]);
  return {subscription: subscriptionData, session: userSessionData.session, unsubscribe: (() => subscriptionData?.unsubscribe())}
  }
  export const getUserData = async () => {
    const {data: session} = await supabaseAuth.auth.getSession()
    if (session && session?.session) {
      let { data: authUser } = await supabaseAuth.auth.getUser();
      if (authUser?.user) {
      const profile  =  await fetchProfile(authUser.user.id);
        return { user: authUser.user, profile };
      } return { user:undefined, profile: undefined };

    }
  }
  