'use client'
import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";
import { useAuthStore, AuthState } from "./store";
import { useRouter } from "next/navigation";
import { supabase } from "lib/constants";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());
const fetchProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, username, bio, website, avatar_url, wallet_address, city, state, country"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { signInWithGoogle, signInWithSpotify, signOut, unsubscribeAuthListener } = useAuthStore()
  const router = useRouter()

  const { data, isLoading } = useQuery(["user", "subscription", 'subscriptionData', 'authListener'], async () => {
    // Fetch user and authListener data concurrently
    const [
      { data: userSessionData },
      { data: { subscription: subscriptionData } },
    ] = await Promise.all([
      supabase.auth.getSession(),
      supabaseAdmin.auth.onAuthStateChange(
        async (event: string, currentSession: any) => {
          if (event === "SIGNED_IN") {
            const profile = await fetchProfile(currentSession.user.id);
            useAuthStore.setState({ user: currentSession.user, profile });
            router.refresh()
          } else if (event === "SIGNED_OUT") {
            refresh();
          }
          if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            const { data, error } = await supabaseAdmin.auth.updateUser({
              password: newPassword!,
            });

            if (data) alert("Password updated successfully!");
            if (error) alert("There was an error updating your password.");
            console.log(error);
          }
        }
      ),
    ]);

    if (userSessionData && userSessionData.session) {
      const { data: authUser } = await supabase.auth.getUser();

      if (authUser?.user) {
        const profile = await fetchProfile(authUser.user.id);
        useAuthStore.setState({ profile });
        useAuthStore.setState({ user: authUser.user });

        return { user: authUser.user, profile };
      }
    }
    return { subscription: subscriptionData };
  });

  const value = useMemo(
    () => ({
      user: data?.user || null,
      profile: data?.profile || null,
      isLoading,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener,
    }),
    [data, isLoading, signInWithGoogle, signInWithSpotify, signOut, unsubscribeAuthListener]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
