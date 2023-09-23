// types.d.ts
declare module 'useSpotifyUrlId' {
    interface SpotifyUrlIdExtractor {
      getTypeAndId(url: string): null | { type: string; id: string };
      artist: {
        getId(url: string): string | null;
      };
      track: {
        getId(url: string): string | null;
      };
      playlist: {
        getId(url: string): string | null;
      };
    }
  }
  