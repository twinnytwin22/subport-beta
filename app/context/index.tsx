"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "lib/supabaseClient";
import AddUpdateWallet from "lib/hooks/generateWallet";

interface AuthContextProps {
  user: any;
  walletAddress: string;
  signOut: any;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  walletAddress: '',
  signOut: undefined,
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<any>('')



  const onAuthStateChange = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        setUser(user?.user);
      }
    } catch (error) {
      console.error(error);
    } finally {

    }
  };

  const value = useMemo(() => {
    return {
      user,
      walletAddress,
      signOut: () => supabase.auth.signOut(),
    };
  }, [user]);

  useEffect(() => {
    onAuthStateChange();
  }, []);

  return (
    <AuthContext.Provider
      value={value}>
      {children}
    </AuthContext.Provider>);
};

export const useAuthProvider = () => {
  const { user, signOut, walletAddress } = useContext(AuthContext);
  return { user, signOut, walletAddress };
};
