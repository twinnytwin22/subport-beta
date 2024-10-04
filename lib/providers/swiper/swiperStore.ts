import { create } from 'zustand';

// Define the structure of a profile
interface Profile {
  avatar_url: string | null;
  bg_url: string;
  bio: string | null;
  city: string | null;
  country: string | null;
  display_name: string | null;
  email: string | null;
  id: string;
  is_artist: boolean | null;
  secret: string | null;
  state: string | null;
  updated_at: string | null;
  username: string | null;
  wallet_address: string | null;
  website: string | null;
  images: string | null
  genres: string[] | null
}

// Define the state and actions in the store
interface StoreState {
  profiles: Profile[];
  likedProfiles: Profile[];
  dislikedProfiles: Profile[];
  fetchProfiles: (data: Profile[]) => void;
  dislikeProfile: (profile: Profile) => void;
  likeProfile: (profile: Profile) => void;
}

export const useStore = create<StoreState>((set) => ({
  profiles: [],
  likedProfiles: [],
  dislikedProfiles: [],
  fetchProfiles: (data: Profile[]) => set({ profiles: data }),
  dislikeProfile: (profile: Profile) =>
    set((state) => ({
      dislikedProfiles: [...state.dislikedProfiles, profile],
      profiles: state.profiles.filter((p) => p.id !== profile.id),
    })),
  likeProfile: (profile: Profile) =>
    set((state) => ({
      likedProfiles: [...state.likedProfiles, profile],
      profiles: state.profiles.filter((p) => p.id !== profile.id),
    })),
}));
