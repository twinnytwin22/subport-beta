import { create } from 'zustand';

export interface DropSettings {
  user_id: string | null;

  spotify_url: string | null;
  apple_url: string | null;
  soundcloud_url: string | null;
  tidal_url: string | null;
  amazon_url: string | null;
  deezer_url: string | null;
  youtube_url: string | null;
}

interface DropStates extends DropSettings {
  setSpotifyUrl: (spotify_url: string | null) => void;
  setAppleUrl: (apple_url: string | null) => void;
  setSoundcloudUrl: (soundcloud_url: string | null) => void;
  setTidalUrl: (tidal_url: string | null) => void;
  setAmazonUrl: (amazon_url: string | null) => void;
  setDeezerUrl: (deezer_url: string | null) => void;
  setYouTubeUrl: (youtube_url: string | null) => void;
}

// Create the Zustand store
const useDropSettings = create<DropStates>((set) => ({
  // Merge the initial data with the state
  user_id: null,
  spotify_url: null,
  apple_url: null,
  soundcloud_url: null,
  tidal_url: null,
  amazon_url: null,
  deezer_url: null,
  youtube_url: null,

  // Define actions to update the state

  setSpotifyUrl: (spotify_url: string | null) => set({ spotify_url }),
  setAppleUrl: (apple_url: string | null) => set({ apple_url }),
  setSoundcloudUrl: (soundcloud_url: string | null) => set({ soundcloud_url }),
  setTidalUrl: (tidal_url: string | null) => set({ tidal_url }),
  setAmazonUrl: (amazon_url: string | null) => set({ amazon_url }),
  setDeezerUrl: (deezer_url: string | null) => set({ deezer_url }),
  setYouTubeUrl: (youtube_url: string | null) => set({ youtube_url })
}));

export default useDropSettings;
