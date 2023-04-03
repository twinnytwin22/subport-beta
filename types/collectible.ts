type Collectible = {
    image: any;
    audio: any;
    name: string;
    artist_name: string;
    release_date: string;
    genre: 'rock' | 'pop' | 'hip_hop' | 'electronic' | 'country' | 'house' | 'rnb';
    total_collectibles: number;
    website?: string;
    song_uri: string;
    lyrics?: string;
    description?: string;
    keywords?: string[];
    address: string
  };
  

export default Collectible
