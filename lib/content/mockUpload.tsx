export const upload =
{
    title: 'Gravitron',
    artist: 'Twinny Twin',
    featuredArtist: '',
    releaseDate: 'July 13th, 2020',
    songCover: '/images/stock/gravitron.png'
}


/// Replace YOUR_ACCESS_TOKEN with the user's access token
const access_token = "YOUR_ACCESS_TOKEN"
/// Replace ALBUM_ID with the album ID of the release
const album_id = "ALBUM_ID"
/// Set the API endpoint for adding an album to a user's saved albums
const endpoint = "https://api.spotify.com/v1/me/albums"
///Set the request headers with the user's access token
const headers = { "Authorization": "Bearer " + access_token }
