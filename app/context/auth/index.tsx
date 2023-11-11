"use client";
import { supabase } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useMemo } from "react";
import { toast } from "react-toastify";
import { AuthState, useAuthStore } from "./store";

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
  //console.log(data)
  if (error) {
    throw error;
  }

  return data;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    signInWithGoogle,
    signInWithSpotify,
    signOut,
    signInWithEmail,
    unsubscribeAuthListener,
    user,
    profile,
    setUserRole, 
    userRole
  } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();

  const onAuthStateChange = async () => {
    const [
      { data: userSessionData },
      {
        data: { subscription: subscriptionData },
      },
    ] = await Promise.all([
      supabase.auth.getSession(),
      supabaseAdmin.auth.onAuthStateChange(
        async (event: AuthChangeEvent, currentSession: Session | null) => {
          if (currentSession && event === "SIGNED_IN") {
            const profile = await fetchProfile(currentSession?.user.id);
            useAuthStore.setState({ user: currentSession?.user, profile });
            router.refresh();
          } else if (event === "SIGNED_OUT") {
            refresh();
          }
          if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt(
              "What would you like your new password to be?",
            );
            const { data, error } = await supabaseAdmin.auth.updateUser({
              password: newPassword!,
            });

            if (data) toast.success("Password updated successfully!");
            if (error)
              toast.error("There was an error updating your password.");
            console.log(error);
          }
        },
      ),
    ]);

    if (userSessionData && userSessionData.session) {
      const { data: authUser } = await supabase.auth.getUser();

      if (authUser?.user) {
        const profile = await fetchProfile(authUser.user.id);
        useAuthStore.setState({ profile });
        useAuthStore.setState({ user: authUser.user });
        subscriptionData?.unsubscribe()

        return { user: authUser.user, profile };
      }
    }
    subscriptionData?.unsubscribe()

    return { subscription: subscriptionData };
  }
  

  const { data, isLoading } = useQuery({
    queryKey:["user", "subscription", "subscriptionData", "authListener"],
    queryFn: () =>  onAuthStateChange(),
     
    });

  const value = useMemo(
    () => ({
      user: user || data?.user || null,
      profile: profile || data?.profile || null,
      isLoading,
      signInWithGoogle,
      signInWithSpotify,
      signInWithEmail,
      signOut,
      unsubscribeAuthListener,
      userRole, 
      setUserRole
    }),
    [
      data,
      userRole, 
      setUserRole,
      user,
      profile,
      isLoading,
      signInWithEmail,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener,
    ],
  );
  // console.log(pathname)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
