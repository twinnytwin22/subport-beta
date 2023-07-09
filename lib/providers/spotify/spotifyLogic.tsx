export const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
export const token = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

const authOptions = {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(`${spotifyClientId}:${spotifySecret}`).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'grant_type=client_credentials',
};

export const getRequestOptions = {
  method: 'GET',
  headers: {
    accept:
      'application/json',

  }
};
async function spotifyClient() {
  const baseUrl = 'https://accounts.spotify.com/api/token'
  await fetch(baseUrl, {
    method: authOptions.method,
    headers: authOptions.headers,
    body: authOptions.body,
  })
    .then((res) => res.json())
    .then((body) => {
      if (body && body.access_token) {
        const token = body.access_token;
        return token
      }
    })
    .catch((error) => {
      console.log(error)
      return null
    });
}


export async function CheckFollow(type: any, id: any) {
  const baseURL = 'https://api.spotify.com/v1/me/following/contains'
  const res = await fetch(`${baseURL}`, getRequestOptions)
}




async function fetchSpotifyUserApi(endpoint: string, method: string, body?: any) {
  let token = null
  if (!body.token) {
    token = await spotifyClient()
  } else {
    token = body?.token
  }
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}


export async function fetchSpotifyWebApi(endpoint: string, method: string, body?: any) {

}