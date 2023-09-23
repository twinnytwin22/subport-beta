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

const spotify = useSpotify();





export const getRequestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
export const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

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
  const Btoken = await spotifyClient();
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
  const getRequestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const baseURL = "https://api.spotify.com/v1/me/following/contains";
  const res = await fetch(`${baseURL}`, getRequestOptions);
  if (id) {
    console.log(res, id, type);
  }
}

export async function fetchSpotifyWebApi(
  endpoint: string,
  method: string,
  body?: any
) {
  const token = await spotifyClient();

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}
