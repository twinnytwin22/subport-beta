'use client'
import { Suspense, createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";
import { create } from "zustand";

const refresh = () => {
  window.location.reload();
};

interface AuthState {
  user: any;
  profile: any;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithSpotify: () => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: false,
  signInWithGoogle: async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  },
  signInWithSpotify: async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "spotify" });
    } catch (error) {
      console.error("Error signing in with Spotify:", error);
    }
  },
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      refresh()
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));

export const AuthContext = createContext<AuthState>(useAuthStore.getState());


const supabase = createClientComponentClient();

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const fetchProfile = async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, bio, website, avatar_url, wallet_address, city, state, country")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const { data: user, isLoading: isUserLoading } = useQuery(["user"], async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { data: authUser } = await supabase.auth.getUser();

      if (authUser?.user) {
        const profile = await fetchProfile(authUser.user.id);
        return { user: authUser.user, profile };
      }
    }
    return null;
  });

  const signInWithGoogle = useAuthStore((state) => async () => {
    try {
      await state.signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  });

  const signInWithSpotify = useAuthStore((state) => async () => {
    try {
      await state.signInWithSpotify();
    } catch (error) {
      console.error("Error signing in with Spotify:", error);
    }
  });

  const signOut = useAuthStore((state) => async () => {
    try {
      await state.signOut();
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  });

  const value = useMemo(
    () => ({
      user: user?.user || null,
      profile: user?.profile || null,
      isLoading: isUserLoading,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
    }),
    [user,
      isUserLoading,
      signInWithGoogle,
      signInWithSpotify,
      signOut]
  );


  const { data } = useQuery(["authListener"], async () => {
    try {
      const { data: { subscription: AuthListener } } = supabaseAdmin.auth.onAuthStateChange(
        async (event: string, currentSession: any) => {
          if (event === "SIGNED_IN") {
            await user
          } else if (event === "SIGNED_OUT") {
            refresh();
          }
        }
      );

      return { subscription: AuthListener };
    } catch (error) {
      console.error("Error subscribing to auth state change:", error);
      return null;
    }
  });
  return (
    <Suspense fallback='loading...'>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </Suspense>
  );
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
