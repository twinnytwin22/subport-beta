"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "lib/supabaseClient";

interface AuthContextProps {
  user: any;
  signOut: any;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: undefined,
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const onAuthStateChange = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        setUser(user?.user);
        console.log(user);
      }
    } catch (error) {
      console.error(error);
    } finally { }
  };

  const value = useMemo(() => {
    return {
      user,
      signOut: () => supabase.auth.signOut(),
    };
  }, [user]);

  useEffect(() => {
    onAuthStateChange();
  }, []);

  return <AuthContext.Provider
    value={value}>
    {children}
  </AuthContext.Provider>;
};

export const useAuthProvider = () => {
  const { user, signOut } = useContext(AuthContext);
  return { user, signOut };
};
