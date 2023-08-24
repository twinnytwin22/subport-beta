import { supabase } from "lib/constants";
import { supabaseAdmin } from "lib/providers/supabase/supabase-lib-admin";
import { toast } from "react-toastify";
import { create } from 'zustand'

export const refresh = () => {
    window.location.reload();
  };
export interface AuthState {
    user: any;
    profile: any;
    isLoading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithSpotify: () => Promise<void>;
    signOut: () => Promise<void>;
    unsubscribeAuthListener: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    profile: null,
    isLoading: false,
    signInWithGoogle: async () => {
        toast.info('Signing In')
        try {
            await supabaseAdmin.auth.signInWithOAuth({ provider: "google" });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    },
    signInWithSpotify: async () => {
        toast.info('Signing In')
        try {
            const scopes = [
                'user-read-email',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-modify-private',
                'user-read-currently-playing',
                'user-modify-playback-state',
                'user-library-modify',
                'user-library-read',
                'user-follow-read',
                'user-follow-modify',
            ].join(',');

            const { error } = await supabaseAdmin.auth.signInWithOAuth({
                provider: 'spotify',
                options: { scopes: scopes },
            });
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error signing in with Spotify:', error);
        }
    },
    signOut: async () => {
        toast.info('Signing Out')
        try {
            await supabase.auth.signOut();

        } catch (error) {
            console.error("Error signing out:", error);
        }
    },
    unsubscribeAuthListener: () => { },
}));