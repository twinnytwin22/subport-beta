'use client'
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useQuery, } from "@tanstack/react-query";
import { useAuthStore, AuthState } from "./store";
import { getUserData, handleAuthChangeEvent } from "../new-auth/actions";
import { supabase } from "lib/constants";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { signInWithGoogle, signInWithSpotify, unsubscribeAuthListener } = useAuthStore();
// Inside your AuthContextProvider component
const signOut = async () => {
  try {
    await supabaseAdmin.auth.signOut();
    useAuthStore.setState({ user: null, profile: null });
    refresh();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

  const { data: authEventData, isLoading: authEventLoading, isSuccess } = useQuery({
    queryKey: ["subscription", "subscriptionData", 'session'],
    queryFn: handleAuthChangeEvent,
  });

  const USER = authEventData?.session

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
    enabled: !!USER,
    refetchOnMount: false
     // Enable the query only when auth event data is loaded
  });

  useEffect(() => {
    if (!authEventLoading) {
      // Auth event data is available, you can trigger further actions here
      // For example, you might want to fetch user data once the auth event data is loaded
    }
  }, [authEventLoading]);

  const value = useMemo(
    () => ({
      user: userData?.user,
      profile: userData?.profile,
      isLoading: authEventLoading || userDataLoading,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener,
    }),
    [userData, authEventLoading, userDataLoading, signInWithGoogle, signInWithSpotify, signOut, unsubscribeAuthListener]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
