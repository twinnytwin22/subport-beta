"use client";
import { Suspense, createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";
import { LoadingContainer } from "ui/LoadingContainer";
import { useAuthStore, AuthState } from "./store";
import { useRouter } from "next/navigation";
import { supabase } from "lib/constants";
const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());

const fetchProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, username, bio, website, avatar_url, wallet_address, city, state, country"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useQuery(
    ["user"],
    async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: authUser } = await supabase.auth.getUser();

        if (authUser?.user) {
          const profile = await fetchProfile(authUser.user.id);
          useAuthStore.setState({ profile });
          useAuthStore.setState({ user: authUser.user });

          return { user: authUser.user, profile };
        }
      }
      return null;
    }
  );


  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const signInWithSpotify = useAuthStore((state) => state.signInWithSpotify);
  const signOut = useAuthStore((state) => state.signOut);

  const unsubscribeAuthListener = useAuthStore(
    (state) => state.unsubscribeAuthListener
  );

  const value = useMemo(
    () => ({
      user: user?.user || null,
      profile: user?.profile || null,
      isLoading: isUserLoading,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener,
    }),
    [
      user,
      isUserLoading,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener,
    ]
  );

  const { data } = useQuery(["authListener", "AuthListener"], async () => {
    try {
      const {
        data: { subscription: AuthListener },
      } = supabaseAdmin.auth.onAuthStateChange(
        async (event: string, currentSession: any) => {
          if (event === "SIGNED_IN") {
            useAuthStore.setState({ user: currentSession.user });

            const profile = await fetchProfile(currentSession.user.id);
            useAuthStore.setState({ profile });
          } else if (event === "SIGNED_OUT") {
            refresh();
          }
          if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt(
              "What would you like your new password to be?"
            );
            const { data, error } = await supabaseAdmin.auth.updateUser({
              password: newPassword!,
            });

            if (data) alert("Password updated successfully!");
            if (error) alert("There was an error updating your password.");
            console.log(error);
          }
        }
      );

      // Store the unsubscribeAuthListener method in the state
      useAuthStore.setState({
        unsubscribeAuthListener: AuthListener.unsubscribe,
      });

      return { subscription: AuthListener };
    } catch (error) {
      console.error("Error subscribing to auth state change:", error);
      return null;
    }
  });

  return (
    <Suspense fallback={<LoadingContainer />}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </Suspense>
  );
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
