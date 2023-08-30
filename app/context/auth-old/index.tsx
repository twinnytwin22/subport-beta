'use client'
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useQuery, } from "@tanstack/react-query";
import { useAuthStore, AuthState } from "./store";
import { getUserData, handleAuthChangeEvent } from "./actions"
import { supabaseAdmin } from "lib/constants";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext(useAuthStore.getState());

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, session } = useAuthStore();


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
    queryKey: ["subscription", "subscriptionData"],
    queryFn: handleAuthChangeEvent,
  });


  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
   enabled: !!authEventLoading
   // refetchOnMount: !!USER
     // Enable the query only when auth event data is loaded
  });

  console.log('session:',userData)

  useEffect(() => {
    if (!authEventLoading) {
      // Auth event data is available, you can trigger further actions here
      // For example, you might want to fetch user data once the auth event data is loaded
    }
  }, [authEventLoading]);

  const value = useMemo(
    () => ({
      user: user,
      profile: profile,
      isLoading: authEventLoading || userDataLoading,
      signOut,
      session
    }),
    [userData, authEventLoading, userDataLoading, signOut, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
