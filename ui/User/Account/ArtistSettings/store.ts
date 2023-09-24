import { create } from 'zustand';

// Define the interface for the artist settings
interface ArtistSettings {
  user_id: string | null;
  artist_name: string | null;
  avatar_url: string | null;
  spotify_url: string | null;
  apple_url: string | null;
  soundcloud_url: string | null;
  tidal_url: string | null;
  amazon_url: string | null;
  deezer_url: string | null;
}

// Initial artist settings data
const initialData: ArtistSettings = {
  user_id: null,
  artist_name: null,
  avatar_url: null,
  spotify_url: null,
  apple_url: null,
  soundcloud_url: null,
  tidal_url: null,
  amazon_url: null,
  deezer_url: null,
};

// Create the Zustand store
const useArtistSettings = create<ArtistSettings>((set) => ({
  // Merge the initial data with the state
  ...initialData,

  // Define actions to update the state
  setArtistName: (artist_name: string | null) => set({ artist_name }),
  setAvatarUrl: (avatar_url: string | null) => set({ avatar_url }),
  setSpotifyUrl: (spotify_url: string | null) => set({ spotify_url }),
  setAppleUrl: (apple_url: string | null) => set({ apple_url }),
  setSoundcloudUrl: (soundcloud_url: string | null) => set({ soundcloud_url }),
  setTidalUrl: (tidal_url: string | null) => set({ tidal_url }),
  setAmazonUrl: (amazon_url: string | null) => set({ amazon_url }),
  setDeezerUrl: (deezer_url: string | null) => set({ deezer_url }),
}));

export default useArtistSettings;
