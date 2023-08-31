'use client'
import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore, AuthState } from "./store";
import { getUserData, handleAuthChangeEvent } from "./actions";
import { supabaseAdmin } from "lib/constants";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { signInWithGoogle, signInWithSpotify, unsubscribeAuthListener, user, profile } = useAuthStore();
  // Inside your AuthContextProvider component
  const signOut = async () => {
    try {
      // Perform any necessary cleanup or log-out actions
      await supabaseAdmin.auth.signOut();

      // Update your user and profile state
      useAuthStore.setState({ user: null, profile: null });

      // Refresh the page or navigate to a different route
      refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const { data: authEventData, isLoading: authEventLoading } = useQuery({
    queryKey: ["subscription", "subscriptionData", 'session'],
    queryFn: handleAuthChangeEvent,
  });
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
    enabled: !!authEventData?.session,
    refetchOnMount: false
  });
  // console.log(authEventData?.session, "TEST")


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
    [userData, authEventLoading, authEventData, userDataLoading, signInWithGoogle, signInWithSpotify, signOut, unsubscribeAuthListener]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
