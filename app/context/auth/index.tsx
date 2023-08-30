'use client'
import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore, AuthState } from "./store";
import { useRouter, usePathname } from "next/navigation";
import { supabase, supabaseAdmin } from "lib/constants";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { toast } from "react-toastify";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());
const fetchProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    signInWithGoogle,
    signInWithSpotify,
    signOut,
    signInWithEmail,
    unsubscribeAuthListener,
  user, 
profile }
    = useAuthStore()

  const router = useRouter()
  const pathname = usePathname()

  const { data, isLoading }
    = useQuery(["user", "subscription", 'subscriptionData', 'authListener'], async () => {
      // Fetch user and authListener data concurrently
      const [
        { data: userSessionData },
        { data: { subscription: subscriptionData } },
      ] = await Promise.all([
        supabase.auth.getSession(),
        supabaseAdmin.auth.onAuthStateChange(
          async (event: AuthChangeEvent, currentSession: Session | null) => {
            if (currentSession && event === "SIGNED_IN") {
              useAuthStore.setState({user: currentSession.user})
              const profile = await fetchProfile(currentSession.user.id)
              useAuthStore.setState({profile})
            } else if (event === "SIGNED_OUT") {
              refresh()
            }
            if (event === "PASSWORD_RECOVERY") {
              const newPassword = prompt("What would you like your new password to be?");
              const { data, error } = await supabaseAdmin.auth.updateUser({
                password: newPassword!,
              });

              if (data) toast.success("Password updated successfully!");
              if (error) toast.error("There was an error updating your password.");
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
      return { subscription: subscriptionData, };
    });

  const value = useMemo(
    () => ({
      user: user,
      profile: profile,
      isLoading,
      signInWithGoogle,
      signInWithSpotify,
      signInWithEmail,
      signOut,
      unsubscribeAuthListener,
    }),
    [
      isLoading,
      signInWithEmail,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener
    ]
  );
  // console.log(pathname)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
