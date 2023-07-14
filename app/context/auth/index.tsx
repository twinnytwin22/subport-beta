'use client'
import { Suspense, cache, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { getUserData } from "lib/hooks/generateWallet";


interface AuthContextProps {
  user: any;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithSpotify: () => Promise<void>;
  profile: any;
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: () => { },
  profile: null,
  signInWithGoogle: () => Promise.resolve(),
  signInWithSpotify: () => Promise.resolve(),
  isLoading: false
});

const supabase = createClientComponentClient()


export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signingIn, setIsSigningIn] = useState(false)
  const [activeSession, setActiveSession] = useState<any>('')
  const router = useRouter();

  const fetchProfile = cache(async (id: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, bio, website, avatar_url, wallet_address, city, state, country")
        .eq("id", id)
        .single();
      if (error) {
        throw error;
      }

      setProfile(data);
      setIsProfileFetched(true);
      setIsLoading(false);
      setIsSigningIn(false)
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsLoading(false);
    }
  });

  const onAuthStateChanged = async () => {
    if (!user) {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session && !signingIn) {
          const { data: authUser, error: authError } = await supabase.auth.getUser();

          if (authError) {
            throw authError;
          }

          if (authUser?.user) {
            await getUserData(authUser?.user);
            setUser(authUser?.user);

            if (!isProfileFetched) {
              await fetchProfile(authUser.user.id);
            }

            return;
          }
        }

        setUser(null);
        setProfile(null);
        setIsProfileFetched(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };



  const value = useMemo(
    () => ({
      user,
      profile,
      isLoading,
      signInWithGoogle: async () => {
        setIsSigningIn(true)
        try {
          const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
          setIsSigningIn(false)

          if (error) {
            alert('nah')
            throw error;
          }
        } catch (error) {
          console.error("Error signing in with Google:", error);
        }
      },
      signInWithSpotify: async () => {
        setIsSigningIn(true)
        try {
          const { error } = await supabase.auth.signInWithOAuth({ provider: "spotify" });
          setIsSigningIn(false)
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error("Error signing in with Spotify:", error);
        }
      },
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          setIsProfileFetched(false);
          router.refresh()
        } catch (error) {
          console.error("Error signing out:", error);
        }
      },

    }),
    [user, profile, router, isLoading]
  );

  const { data: { subscription: AuthListener } } = supabaseAdmin.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
    if (event === 'SIGNED_IN') {

      router.refresh();
    }
    if (event === 'SIGNED_OUT') {
      setUser(null);
      router.refresh();
    }
  });

  // Optional: Unsubscribe from the AuthListener when it's no longer needed
  const unsubscribeAuthListener = () => {
    AuthListener?.unsubscribe();
  };

  // Call the unsubscribeAuthListener function when necessary
  // For example, when the component unmounts
  // unsubscribeAuthListener();


  useEffect(() => {
    onAuthStateChanged();

    return () => {
      unsubscribeAuthListener()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthListener, value]);


  return (
    <Suspense>
      <AuthContext.Provider value={value}>
        {
          children
        }
      </AuthContext.Provider>
    </Suspense>
  );
};

export const useAuthProvider = () => {
  const {
    user,
    signOut,
    profile,
    signInWithGoogle,
    signInWithSpotify,
    isLoading,
  } = useContext(AuthContext);
  return { user, signOut, profile, signInWithGoogle, signInWithSpotify, isLoading };
};