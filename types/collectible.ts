type Collectible = {
    release_name: string;
    artist_name: string;
    release_date: string;
    genre: 'rock' | 'pop' | 'hip_hop' | 'electronic' | 'country';
    total_collectibles: number;
    website?: string;
    lyrics?: string;
    song_description?: string;
    keywords?: string[];
  };
  

export default Collectible