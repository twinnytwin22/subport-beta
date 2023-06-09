type Collectible = {
  image: any;
  audio?: any;
  animation_url?: any;
  name: string;
  artist_name: string;
  release_date: string;
  genre: string;
  total_collectibles: number;
  website?: string;
  song_uri: string;
  lyrics?: string;
  description?: string;
  keywords?: string;
  address: string;
  userId?: string;
  ipfsHash: any;
  immediate?: boolean;
  start_time?: any;
  start_date?: any;
  infinite?: boolean;
  end_time?: any;
  end_date?: any;
  dropType: "save" | "standard";
  royaltyFee?: any;
};

export default Collectible;
