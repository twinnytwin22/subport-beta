import { handleSpotifyAction } from 'lib/providers/spotify/spotifyLogic';

export const generateSongData = async (spotify: any, spotifyUrl: any) => {
  if (spotifyUrl.startsWith('https://open.spotify.com/')) {
    try {
      const spotifyId = spotify.track.getId(spotifyUrl);
      const isSaved = await handleSpotifyAction(spotifyId!, 'getTrack');
      return isSaved;
    } catch (error) {
      return error;
    }
  }
};
