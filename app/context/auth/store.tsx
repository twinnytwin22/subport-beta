import { supabase, supabaseAdmin } from "@/lib/constants";
import { toast } from "react-toastify";
import { create } from "zustand";
export interface AuthState {
  user: any;
  profile: any;
  isLoading: boolean;
  userRole: string;
  setUserRole: (userRole: string) => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithSpotify: () => Promise<void>;
  signOut: () => Promise<void>;
  unsubscribeAuthListener: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userRole: '',
  user: null,
  profile: null,
  isLoading: false,
  setUserRole: (userRole: string) => set({userRole}),
  signInWithEmail: async (email, password) => {
    toast.info("Signing In");
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error) {
      console.error(
        "Error signing in please check your email or password and try again:",
        error,
      );
    }
  },
  signInWithGoogle: async () => {
    toast.info("Signing In");
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  },
  signInWithSpotify: async () => {
    toast.info("Signing In");
    try {
      const scopes = [
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-read-currently-playing",
        "user-modify-playback-state",
        "user-library-modify",
        "user-library-read",
        "user-follow-read",
        "user-follow-modify",
      ].join(",");

      const { error } = await supabaseAdmin.auth.signInWithOAuth({
        provider: "spotify",
        options: { scopes: scopes },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error signing in with Spotify:", error);
    }
  },
  signOut: async () => {
    toast.info("Signing Out");
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
  unsubscribeAuthListener: () => {},
}));
