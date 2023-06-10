'use client'
import { Session, createClient } from "@supabase/supabase-js";
import { Suspense, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "app/supabase-admin";

interface AuthContextProps {
  user: any;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithSpotify: () => Promise<void>;
  profile: any;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: () => { },
  profile: null,
  signInWithGoogle: () => Promise.resolve(),
  signInWithSpotify: () => Promise.resolve(),
});

const supabase = createClientComponentClient()
const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

const signInWithSpotify = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "spotify" });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error signing in with Spotify:", error);
  }
};

export const AuthContextProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchProfile = async ({ id }: { id: string }) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsLoading(false);
    }
  };

  const onAuthStateChanged = async () => {
    if (!user) {
      try {
        const { data: authUser, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (authUser?.user) {
          setUser(authUser?.user);
          if (!isProfileFetched) {
            await fetchProfile({ id: authUser?.user.id });
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setProfile(null);
          setIsProfileFetched(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      setProfile(null);
      setIsProfileFetched(false);
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
    }),
    [user, profile]
  );


  const AuthListener =
    supabaseAdmin.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        setUser(null)
        router.refresh()

      } else if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
        router.refresh()
      } else if (!session && event === 'INITIAL_SESSION') {
        router.push('/trending')
        return
      }

    })

  useEffect(() => {
    onAuthStateChanged();
  }, [AuthListener]);

  return (
    <AuthContext.Provider value={value}>
      <Suspense>
        {
          children
        }
      </Suspense>
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const {
    user,
    signOut,
    profile,
    signInWithGoogle,
    signInWithSpotify,
  } = useContext(AuthContext);
  return { user, signOut, profile, signInWithGoogle, signInWithSpotify };
};