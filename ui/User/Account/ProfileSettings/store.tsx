// profileStore.ts

import { create } from 'zustand';

interface ProfileState {
    loading: boolean;
    username: string | null;
    email: string | null;
    bio: string | null;
    avatar_url: string | null;
    city: string | null;
    country: string | null;
    state: string | null;
    
}

interface ProfileStore extends ProfileState {
    setLoading: (loading: boolean) => void;
    setUsername: (username: string | null) => void;
    setEmail: (email: string | null) => void;
    setBio: (bio: string | null) => void;
    setAvatarUrl: (avatarUrl: string | null) => void;
    setCity: (city: string | null) => void;
    setCountry: (country: string | null) => void;
    setState: (state: string | null) => void;
}

const useProfileStore = create<ProfileStore>((set, profile) => ({
    loading: false,
    username: null,
    email: null,
    bio: null,
    avatar_url: null,
    city: null,
    country: null,
    state: null,
    setLoading: (loading) => set({ loading }),
    setUsername: (username) => set({ username }),
    setEmail: (email) => set({ email }),
    setBio: (bio) => set({ bio }),
    setAvatarUrl: (avatarUrl) => set({ avatar_url: avatarUrl }),
    setCity: (city) => set({ city }),
    setCountry: (country) => set({ country }),
    setState: (state) => set({ state }),
}));

export default useProfileStore;
