'use client'
import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData, handleAuthChangeEvent } from "./actions";
import { supabaseAdmin } from "lib/constants";
import { useRouter } from "next/navigation";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  // Inside your AuthContextProvider component
  const signOut = async () => {
    try {
      // Perform any necessary cleanup or log-out actions
      await supabaseAdmin.auth.signOut();
      refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const { data: authEventData, isLoading: authEventLoading } = useQuery({
    queryKey: ["subscription", "subscriptionData", 'session', router],
    queryFn: ({ queryKey }) => handleAuthChangeEvent(queryKey[3]),
  });
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
    enabled: !!authEventData?.session!,
    refetchOnMount: false
  });


  const value = useMemo(
    () => ({
      user: userData?.user,
      profile: userData?.profile,
      isLoading: authEventLoading || userDataLoading,
      signOut,
    }),
    [
      userData,
      authEventLoading,
      authEventData, userDataLoading,
      signOut,
      router
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
