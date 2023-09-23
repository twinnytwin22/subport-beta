import { supabaseAuth } from "lib/constants";
import { toast } from "react-toastify";

export const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
export const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
  const { data: session } = await supabaseAuth.auth.getSession();
  return session?.session?.provider_token;
};

const createSpotifyHeaders = (accessToken: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken}`,
  Accept: 'application/json',
});

const spotifyActions = ({spotifyId}: {spotifyId?: string}) => [
  {
    action: 'getArtist',
    endpoint: `/artists/${spotifyId}`,
    method: 'GET',
    toast: {
      success: "Artist information retrieved successfully",
      error: "Error retrieving artist information",
    },
  },
  {
    action: 'followArtist',
    endpoint: '/me/following?type=artist&ids=',
    method: 'PUT',
    toast: {
      success: "You've successfully followed this artist on Spotify",
      error: "Error following the artist on Spotify",
    },
  },
  {
    action: 'unfollowArtist',
    endpoint: '/me/following?type=artist&ids=',
    method: 'DELETE',
    toast: {
      success: "You've successfully unfollowed this artist on Spotify",
      error: "Error unfollowing the artist on Spotify",
    },
  },
  {
    action: 'checkArtistFollow',
    endpoint: '/me/following/contains?type=artist&ids=',
    method: 'GET',
    toast: {
      success: "Successfully checked if you follow this artist on Spotify",
      error: "Error checking if you follow this artist on Spotify",
    },
  },
  {
    action: 'checkSavedTracks',
    endpoint: '/me/tracks/contains?ids=',
    method: 'GET',
    toast: {
      success: "Successfully checked if a track is saved in your library",
      error: "Error checking if the track is saved in your library",
    },
  },
  {
    action: 'saveTrack',
    endpoint: '/me/tracks?ids=',
    method: 'PUT',
    toast: {
      success: "Track saved to your library",
      error: "Error saving the track to your library",
    },
  },
  {
    action: 'getTrack',
    endpoint: '/tracks/',
    method: 'GET',
    toast: {
      success: "Track information retrieved successfully",
      error: "Error retrieving track information",
    },
  },
  {
    action: 'getTracks',
    endpoint: '/tracks?ids=',
    method: 'GET',
    toast: {
      success: "Tracks information retrieved successfully",
      error: "Error retrieving tracks information",
    },
  },
  {
    action: 'getPlaylists',
    endpoint: '/playlists/',
    method: 'GET',
    toast: {
      success: "Playlist information retrieved successfully",
      error: "Error retrieving playlist information",
    },
  },
  {
    action: 'createPlaylist',
    endpoint: `/users/${spotifyId}/playlists`,
    method: 'POST',
    toast: {
      success: "Playlist created successfully",
      error: "Error creating the playlist",
    },
  },
  {
    action: 'addToPlaylist',
    endpoint: `/playlists/${spotifyId}/tracks`,
    method: 'POST',
    toast: {
      success: "Track added to the playlist",
      error: "Error adding the track to the playlist",
    },
  },
  {
    action: 'updatePlaylist',
    endpoint: `/playlists/${spotifyId}/tracks`,
    method: 'PUT',
    toast: {
      success: "Playlist updated successfully",
      error: "Error updating the playlist",
    },
  },
];


export const useSpotify = () => {
  const actions = spotifyActions({}); // Call the function to get the array of actions
  const spotifyObject: Record<string, any> = {};

  for (const action of actions) {
    spotifyObject[action.action] = {
      endpoint: 'https://api.spotify.com/v1' + action.endpoint,
      method: action.method,
    };
  }

  return spotifyObject;
};


export const handleSpotifyAction = async (
  spotifyId: string | undefined,
  action: string
) => {
  try {
    const accessToken = await getAccessToken();

    if (accessToken && (spotifyId || action === 'getPlaylists' || action === 'createPlaylist')) {
      const authOptions = {
        method: spotifyActions({ spotifyId }).find(a => a.action === action)?.method,
        headers: createSpotifyHeaders(accessToken),
      };

      let endpoint = `https://api.spotify.com/v1${spotifyActions({ spotifyId }).find(a => a.action === action)?.endpoint}`;

      if (spotifyId) {
        endpoint += spotifyId;
      }

      const response = await fetch(endpoint, authOptions);

      if (response.ok) {
        toast.success(`User ${action === 'followArtist' ? 'followed' : 'unfollowed'} on Spotify`);
      } else {
        const errorData = await response.json();
        console.error(`Error ${action === 'followArtist' ? 'following' : 'unfollowing'} user`, JSON.stringify(errorData));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
