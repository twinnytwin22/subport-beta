'use client'
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";


interface AuthContextProps {
  user: any;
  signOut: any;
  signInWithGoogle: any,
  signInWithSpotify: any
  profile: any;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: undefined,
  profile: null,
  signInWithGoogle: undefined,
  signInWithSpotify: undefined
});
const supabase = createClientComponentClient();

const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        hd: window.location.href
      },
    },
  }
  );

  if (error) {
    console.error('Error signing in with Google:', error);
    return;
  }

}

const signInWithSpotify = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
  })

}

const handleSignOut = async () => {
  await supabase.auth.signOut()
}

export const AuthContextProvider = ({ children, session }: { children: React.ReactNode, session: Session | null }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isProfileImageFetched, setIsProfileImageFetched] = useState(false);
  const router = useRouter()



  const fetchProfile = async ({ id }: any) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, website, avatar_url, wallet_address")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }
      setProfile(data);
      setIsProfileFetched(true);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  const onAuthStateChange = async () => {
    if (!user) {
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user) {
          setUser(authUser?.user);
          if (!isProfileFetched) {
            await fetchProfile({ id: authUser?.user?.id });
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setProfile(null);
          setIsProfileFetched(false);
          setIsProfileImageFetched(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const value = useMemo(() => {
    return {
      user,
      profile,
      signInWithGoogle: async () => { await signInWithGoogle() },
      signInWithSpotify: async () => { await signInWithSpotify() },
      signOut: async () => {
        await handleSignOut(),
          router.push('/')
      },
    };
  }, [user, profile, session,]);

  useEffect(() => {
    if (!isAuthenticated) {
      onAuthStateChange();
    }
  }, []);



  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const { user, signOut, profile, signInWithGoogle, signInWithSpotify } = useContext(AuthContext);
  return { user, signOut, profile, signInWithGoogle, signInWithSpotify };
};


