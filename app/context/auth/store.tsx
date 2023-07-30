import { supabase } from "lib/constants";
import { create } from 'zustand'
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
        try {
            await supabase.auth.signInWithOAuth({ provider: "google" });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    },
    signInWithSpotify: async () => {
        try {
            const scopes = [
                'user-read-email',
                'playlist-read-private',
                'playlist-read-collaborative',
                'user-read-currently-playing',
                'user-modify-playback-state',
            ].join(',');

            const { error } = await supabase.auth.signInWithOAuth({
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
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    },
    unsubscribeAuthListener: () => { },
}));