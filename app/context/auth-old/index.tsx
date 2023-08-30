'use client'
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore, AuthState } from "./store";
import { useRouter, usePathname } from "next/navigation";

import { getUserData, handleAuthChangeEvent } from "./actions";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());


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

  const { data: authEventData, isLoading: authEventLoading, isSuccess } = useQuery({
    queryKey: ["subscription", "subscriptionData"],
    queryFn: handleAuthChangeEvent,
  });


  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
   enabled: !!authEventData?.subscription.id,
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
      user: user,
      profile: profile,
      isLoading: authEventLoading || userDataLoading,
      signInWithGoogle,
      signInWithSpotify,
      signInWithEmail,
      signOut,
      unsubscribeAuthListener,
    }),
    [
    
    //  authEventLoading,
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
