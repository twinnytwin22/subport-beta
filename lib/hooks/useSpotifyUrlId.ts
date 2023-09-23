/**
 * Represents a utility for extracting Spotify IDs from Spotify URLs.
 */
interface SpotifyUrlIdExtractor {
  /**
   * Extracts the Spotify type and ID from a given Spotify URL.
   * @param {string} url - The Spotify URL.
   * @returns {null | { type: string, id: string }} - An object containing the Spotify type and ID, or null for an invalid URL.
   */
  getTypeAndId(url: string): null | { type: string, id: string };
  artist: {
    /**
     * Extracts the artist ID from a given Spotify artist URL.
     * @param {string} url - The Spotify artist URL.
     * @returns {string | null} - The artist ID, or null for an invalid URL.
     */
    getId(url: string): string | null;
  };
  track: {
    /**
     * Extracts the track ID from a given Spotify track URL.
     * @param {string} url - The Spotify track URL.
     * @returns {string | null} - The track ID, or null for an invalid URL.
     */
    getId(url: string): string | null;
  };
  playlist: {
    /**
     * Extracts the playlist ID from a given Spotify playlist URL.
     * @param {string} url - The Spotify playlist URL.
     * @returns {string | null} - The playlist ID, or null for an invalid URL.
     */
    getId(url: string): string | null;
  };
}

/**
 * Returns a utility for extracting Spotify IDs from Spotify URLs.
 * @returns {SpotifyUrlIdExtractor} - A Spotify URL ID extractor utility.
 */
function useSpotifyUrlId(): SpotifyUrlIdExtractor {
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
      getId: (url: string) => extractId(url, 'track'),
    },
    playlist: {
      getId: (url: string) => extractId(url, 'playlist'),
    },
  };
}

export default useSpotifyUrlId;
