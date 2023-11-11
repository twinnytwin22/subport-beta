'use client';
import { useQuery } from '@tanstack/react-query';
import { supabaseAuth } from 'lib/constants';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useMemo,
  useRef
} from 'react';
import { getUserData, handleAuthChangeEvent } from './actions';

// export const refresh = () => {
//   window.location.reload();
// };

interface AuthState {
  profile: any;
  user: any;
  isLoading: boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthState>({
  profile: null,
  user: null,
  isLoading: false,
  signOut: () => { }
});

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  // Flag to track whether authEventData has been successfully fetched
  const authEventDataFetched = useRef(false);

  // Inside your AuthContextProvider component
  const signOut = async () => {
    try {
      // Perform any necessary cleanup or log-out actions
      await supabaseAuth.auth.signOut();
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const { data: authEventData, isLoading: authEventLoading } = useQuery({
    queryKey: [
      'subscription',
      'subscriptionData',
      'session',
      'unsubscribe',
      router
    ],
    queryFn: ({ queryKey }) => handleAuthChangeEvent(queryKey[4]),
    // Set enabled to false if authEventData has been successfully fetched
    enabled: !authEventDataFetched.current,
    // Use onSuccess to set the flag when data is successfully fetched
    onSuccess: () => {
      authEventDataFetched.current = true;
    }
  });
  //console.log(authEventData?.session)

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserData,
    enabled: !!authEventData?.session!,
    refetchOnMount: false
  });

  const value = useMemo(
    () => ({
      user: userData?.user,
      profile: userData?.profile,
      isLoading: authEventLoading || userDataLoading,
      signOut: () => signOut()
    }),
    [userData, authEventLoading, userDataLoading, signOut()]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
