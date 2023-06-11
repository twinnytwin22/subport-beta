
export const getRequestOptions = {
    method: 'GET', 
    headers: {
      accept: 
        'application/json', 
        
        }};
        

export async function CheckFollow(type: any, id: any){
    const getRequestOptions = {
        method: 'GET', 
        headers: {
          accept: 
            'application/json', 
            }};
const baseURL = 'https://api.spotify.com/v1/me/following/contains'
const res = await fetch(`${baseURL}`, getRequestOptions)
}

export const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET