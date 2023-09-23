import { supabaseAuth } from "lib/constants";
import { toast } from "react-toastify";

export const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
export const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
interface SpotifyAction {
  action: string;
  endpoint: string;
  method: string;
  toast: {
    success: string;
    error: string;
  };
  buttonText?: string; // Add buttonText property here
}


const getAccessToken = async () => {
  const { data: session } = await supabaseAuth.auth.getSession();
  return session?.session?.provider_token;
};

const createSpotifyHeaders = (accessToken: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken}`,
  Accept: 'application/json',
});

const spotifyActions = ({ spotifyId }: { spotifyId?: string }): SpotifyAction[] => [
  {
    action: 'getArtist',
    endpoint: `/artists/${spotifyId}`,
    method: 'GET',
    toast: {
      success: "Artist information retrieved successfully",
      error: "Error retrieving artist information",
    },
    buttonText: 'Get Artist', // Button text for "Get Artist" action
  },
  {
    action: 'followArtist',
    endpoint: '/me/following?type=artist&ids=',
    method: 'PUT',
    toast: {
      success: "You've successfully followed this artist on Spotify",
      error: "Error following the artist on Spotify",
    },
    buttonText: 'Follow Artist', // Button text for "Follow Artist" action
  },
  {
    action: 'unfollowArtist',
    endpoint: '/me/following?type=artist&ids=',
    method: 'DELETE',
    toast: {
      success: "You've successfully unfollowed this artist on Spotify",
      error: "Error unfollowing the artist on Spotify",
    },
    buttonText: 'Unfollow Artist', // Button text for "Unfollow Artist" action
  },
  {
    action: 'checkArtistFollow',
    endpoint: '/me/following/contains?type=artist&ids=',
    method: 'GET',
    toast: {
      success: "Successfully checked if you follow this artist on Spotify",
      error: "Error checking if you follow this artist on Spotify",
    },
    buttonText: 'Check Artist Follow', // Button text for "Check Artist Follow" action
  },
  {
    action: 'checkSavedTracks',
    endpoint: '/me/tracks/contains?ids=',
    method: 'GET',
    toast: {
      success: "Successfully checked if a track is saved in your library",
      error: "Error checking if the track is saved in your library",
    },
    buttonText: 'Check Saved Tracks', // Button text for "Check Saved Tracks" action
  },
  {
    action: 'saveTrack',
    endpoint: '/me/tracks?ids=',
    method: 'PUT',
    toast: {
      success: "Track saved to your library",
      error: "Error saving the track to your library",
    },
    buttonText: 'Save Track', // Button text for "Save Track" action
  },
  {
    action: 'getTrack',
    endpoint: '/tracks/',
    method: 'GET',
    toast: {
      success: "Track information retrieved successfully",
      error: "Error retrieving track information",
    },
    buttonText: 'Get Track', // Button text for "Get Track" action
  },
  {
    action: 'getTracks',
    endpoint: '/tracks?ids=',
    method: 'GET',
    toast: {
      success: "Tracks information retrieved successfully",
      error: "Error retrieving tracks information",
    },
    buttonText: 'Get Tracks', // Button text for "Get Tracks" action
  },
  {
    action: 'getPlaylists',
    endpoint: '/playlists/',
    method: 'GET',
    toast: {
      success: "Playlist information retrieved successfully",
      error: "Error retrieving playlist information",
    },
    buttonText: 'Get Playlists', // Button text for "Get Playlists" action
  },
  {
    action: 'createPlaylist',
    endpoint: `/users/${spotifyId}/playlists`,
    method: 'POST',
    toast: {
      success: "Playlist created successfully",
      error: "Error creating the playlist",
    },
    buttonText: 'Create Playlist', // Button text for "Create Playlist" action
  },
  {
    action: 'addToPlaylist',
    endpoint: `/playlists/${spotifyId}/tracks`,
    method: 'POST',
    toast: {
      success: "Track added to the playlist",
      error: "Error adding the track to the playlist",
    },
    buttonText: 'Add to Playlist', // Button text for "Add to Playlist" action
  },
  {
    action: 'updatePlaylist',
    endpoint: `/playlists/${spotifyId}/tracks`,
    method: 'PUT',
    toast: {
      success: "Playlist updated successfully",
      error: "Error updating the playlist",
    },
    buttonText: 'Update Playlist', // Button text for "Update Playlist" action
  },
];

/**
 * Generates and returns a Spotify API configuration object containing endpoints and HTTP methods
 * for various Spotify actions.
 * 
 * @returns {Record<string, { endpoint: string, method: string }>} - A mapping of Spotify action names to their respective API configuration objects.
 * @example
 * 
 * // Usage:
 * const spotifyConfig = useSpotify();
 * 
 * // Accessing an endpoint and method:
 * const endpoint = spotifyConfig['getPlaylists'].endpoint;
 * const method = spotifyConfig['getPlaylists'].method;
 */
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
/**
 * Handles a Spotify action based on the provided Spotify ID and action type.
 * 
 * @param {string | undefined} spotifyId - The Spotify ID (optional).
 * @param {string} action - The type of action to perform.
 * @returns {Promise<void>} - A Promise that resolves when the action is completed.
 * @throws {Error} If an error occurs during the action.
 * @example
 * 
 * // Example 1: Handle a Spotify action with a valid Spotify ID.
 * await handleSpotifyAction('your_spotify_id', 'playTrack');
 * 
 * // Example 2: Handle a Spotify action without a Spotify ID (e.g., for general actions).
 * await handleSpotifyAction(undefined, 'getPlaylists');
 */
export const handleSpotifyAction = async (
  spotifyId: string | undefined,
  action: string
): Promise<void> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Access token not available.');
    } else {
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
        const toastMessage = spotifyActions({}).find(a => a.action === action)?.toast.success;
        if (toastMessage) {
          toast.success(toastMessage);
        }
      } else {
        const errorData = await response.json();
        const errorMessage = spotifyActions({}).find(a => a.action === action)?.toast.error;
        console.error(errorMessage, JSON.stringify(errorData));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
