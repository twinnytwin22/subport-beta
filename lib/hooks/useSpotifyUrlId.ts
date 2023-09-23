function useSpotifyUrlId() {
    // Regular expressions for different types of Spotify URLs
    const spotifyUrlRegex: { [key: string]: RegExp } = {
      artist: /https:\/\/open.spotify.com\/artist\/([a-zA-Z0-9]+)/,
      track: /https:\/\/open.spotify.com\/track\/([a-zA-Z0-9]+)/,
      playlist: /https:\/\/open.spotify.com\/playlist\/([a-zA-Z0-9]+)/,
    };
  
    const getTypeAndId = (url: string) => {
      for (const [type, regex] of Object.entries(spotifyUrlRegex)) {
        const match = url.match(regex);
        if (match && match[1]) {
          return { type, id: match[1] };
        }
      }
      return null; // Invalid URL or unsupported type
    };
  
    const extractId = (url: string, type: string) => {
      const match = url.match(spotifyUrlRegex[type]);
      return match && match[1] ? match[1] : null;
    };
  
    return {
      getTypeAndId: (url: string) => getTypeAndId(url),
      artist: {
        getId: (url: string) => extractId(url, 'artist'),
      },
      track: {
        getId: (url:string) => extractId(url, 'track'),
      },
      playlist: {
        getId: (url: string) => extractId(url, 'playlist'),
      },
    };
  }
  
  export default useSpotifyUrlId;
  