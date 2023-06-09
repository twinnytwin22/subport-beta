'use client'
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation'


interface AuthContextProps {
  user: any;
  signOut: any;
  profile: any;
  session: any;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: undefined,
  profile: null,
  session: null
});
const supabase = createClientComponentClient();

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

  const fetchAvatarUrl = async ({ profile }: any) => {
    try {
      const { data } = await supabase.storage
        .from("avatars")
        .getPublicUrl(profile?.avatar_url);

      if (data) {
        profile.avatar_url = data.publicUrl;
        setIsProfileImageFetched(true);
      }
    } catch (error) {
      console.error("Error fetching avatar URL:", error);
    }
  };

  const onAuthStateChange = async () => {
    if (session?.access_token) {
      try {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser?.user);
          setIsAuthenticated(true);

          if (!isProfileFetched) {
            await fetchProfile({ id: authUser?.user?.id });
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
      router.refresh()
    }
  };

  const value = useMemo(() => {
    return {
      user,
      profile,
      signOut: async () => {
        await supabase.auth.signOut();
        router.refresh();
      },
      session
    };
  }, [user, profile, session]);

  useEffect(() => {
    if (!isAuthenticated) {
      onAuthStateChange();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isProfileFetched && profile) {
      fetchAvatarUrl({ profile });
    }
  }, [isProfileImageFetched]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const router = useRouter()
  const { user, signOut, profile, session } = useContext(AuthContext);
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
    router.refresh()

  }

  const signInWithSpotify = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
    })
    router.refresh()

  }

  return { user, signOut, profile, session, signInWithGoogle, signInWithSpotify };
};
