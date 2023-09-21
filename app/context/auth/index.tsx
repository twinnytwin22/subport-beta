'use client'
import React, { createContext, useContext, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData, handleAuthChangeEvent } from "./actions";
import { supabaseAdmin, supabaseAuth } from "lib/constants";
import { useRouter } from "next/navigation";
import LoginFormScreen from "ui/Auth/LoginFormScreen/LoginFormScreen";

export const refresh = () => {
  window.location.reload();
};

interface AuthState {
profile: any,
user: any,
isLoading: boolean,
signOut: () => void
}

export const AuthContext = createContext<AuthState>({
  profile: null,
  user: null,
  isLoading: false,
  signOut: () => {}
});
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // Flag to track whether authEventData has been successfully fetched
  const authEventDataFetched = useRef(false);

  // Inside your AuthContextProvider component
  const signOut = async () => {
    try {
      // Perform any necessary cleanup or log-out actions
      await supabaseAuth.auth.signOut();
      refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const { data: authEventData, isLoading: authEventLoading } = useQuery({
    queryKey: ["subscription", "subscriptionData", 'session', 'unsubscribe', router],
    queryFn: ({ queryKey }) => handleAuthChangeEvent(queryKey[3]),
    // Set enabled to false if authEventData has been successfully fetched
    enabled: !authEventDataFetched.current,
    // Use onSuccess to set the flag when data is successfully fetched
    onSuccess: () => {
      authEventDataFetched.current = true;
    },
  });

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
    enabled: !!authEventData?.session!,
    refetchOnMount: false,
  });

  const value = useMemo(
    () => ({
      user: userData?.user,
      profile: userData?.profile,
      isLoading: authEventLoading || userDataLoading,
      signOut,
    }),
    [userData, authEventLoading, userDataLoading, signOut]
  );
    //console.log(userData?.user)
  return <AuthContext.Provider value={value}>

    {!userData?.user &&  !authEventLoading && !userDataLoading && <div className="bg-white h-screen w-screen fixed z-[9999] isolate top-0 left-0 right-0">
      <LoginFormScreen/>
      </div>}
    {children}
    </AuthContext.Provider>;
};


export const useAuthProvider = () => {
  return useContext(AuthContext);
};
