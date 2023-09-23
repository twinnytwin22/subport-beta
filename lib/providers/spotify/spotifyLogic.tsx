import { supabaseAuth } from "lib/constants";
import useSpotifyUrlId from "lib/hooks/useSpotifyUrlId";
import { toast } from "react-toastify";
export const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
export const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

const spotifyActions = ({ id }: { id?: string }) => [
  {
      action: 'followArtist',
      endpoint: '/me/following?type=artist&ids=',
      method: 'PUT' // type: string, ids: string[] 
  },
  {
      action: 'unfollowArtist',
      endpoint: '/me/following?type=artist&ids=',
      method: 'DELETE'  // type: string, ids: string[] 
  },
  {
      action: 'checkArtistFollow',
      endpoint: '/me/following/contains?type=artist&ids=',
      method: 'GET'  // type: string, ids: string[] 
  },
  {
      action: 'checkSavedTracks',
      endpoint: '/me/tracks/contains?ids=',
      method: 'GET' //ids[]
  },
  {
      action: 'saveTrack',
      endpoint: '/me/tracks?ids=',
      method: 'PUT' //ids[]
  },
  {
      action: 'getTrack',
      endpoint: `/tracks?ids=`,
      method: 'PUT' //ids[]
  },

]

export const useSpotify = () => {
  const actions = spotifyActions({});
  const spotifyObject: Record<string, any> = {};
  for (const action of actions) {
    spotifyObject[action.action] = {
      endpoint: 'https://api.spotify.com/v1' + action.endpoint,
      method: action.method,
    };
  }
  return spotifyObject;

  
};

export const handleFollowArtist = async (spotifyId:string, spotify: any) => {

  try {
    const { data: session } = await supabaseAuth.auth.getSession();
    const accessToken = session?.session?.provider_token;
    const refreshToken = session?.session?.provider_refresh_token;

    if (accessToken && refreshToken && spotifyId) {
      const authOptions = {
        method: spotify.followArtist.method as string,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      };

      const response = await fetch(
        spotify.followArtist.endpoint + spotifyId,
        authOptions
      );

      if (response.ok) {
        // data = await response.json();
        toast.success('User followed on Spotify');
      } else {
        const errorData = await response.json();
        console.error('Error following user', JSON.stringify(errorData));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getRequestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};


const authOptions = {
  method: "POST",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(`${spotifyClientId}:${spotifySecret}`).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: "grant_type=client_credentials",
};

export async function spotifyClient() {
  const baseUrl = "https://accounts.spotify.com/api/token";
  const res = await fetch(baseUrl, {
    method: authOptions.method,
    headers: authOptions.headers,
    body: authOptions.body,
  });
  const data = res.json();
  if (res) {
    return data;
  } else {
    return false;
  }
}
export async function fetchSpotifyTestApi({
  endpoint,
  method,
  body,
  token,
}: {
  endpoint: string;
  method: string;
  body?: any;
  token?: string;
}) {

  const res = await fetch(`https://api.spotify.com/v1/me`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Add Content-Type header if needed

      body: JSON.stringify(body),
    },
  });

  if (res) {
    return res.json();
  }
}

export async function CheckFollow(type: any, id: any) {
console.log(type)
}

export async function fetchSpotifyWebApi(
  endpoint: string,
  method: string,
  body?: any
) {
 console.log(endpoint)
}
