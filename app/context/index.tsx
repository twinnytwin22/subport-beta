'use client'
import { Suspense, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
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


export const AuthContextProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const accessToken = session?.access_token

  const fetchProfile = async (id: string) => {
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
        const { data: { session: activeSession }, error } = await supabase.auth.getSession()
        if (activeSession) {
          const { data: authUser, error } = await supabase.auth.getUser()
          if (authUser?.user) {
            setUser(authUser?.user)
            if (error) {
              throw error;
            };

            if (!isProfileFetched) {
              await fetchProfile(authUser.user.id);
            };
          };
        } else {
          setUser(null);
          setProfile(null);
          setIsProfileFetched(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };



  const value = useMemo(
    () => ({
      user,
      profile,
      signInWithGoogle: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error("Error signing in with Google:", error);
        }
      },
      signInWithSpotify: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({ provider: "spotify" });
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
    [user, profile, router,]
  );

  const { data: { subscription: AuthListener } } = supabaseAdmin.auth.onAuthStateChange(async (event, currentSession) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
      await onAuthStateChanged()
      router.refresh()
    }
    if (event === 'SIGNED_OUT') {
      setUser(null);
      router.refresh();
      return () => {
        AuthListener?.unsubscribe();
      };
    }
  })

  useEffect(() => {
    onAuthStateChanged();

    return () => {
      AuthListener?.unsubscribe();
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
  } = useContext(AuthContext);
  return { user, signOut, profile, signInWithGoogle, signInWithSpotify };
};