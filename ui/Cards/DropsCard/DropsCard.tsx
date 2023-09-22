import { useIpfsImage } from 'lib/constants';
import React from 'react';
import Image from 'next/image';

function DropsCard({ drop }: { drop: any }) {
    const image = useIpfsImage(drop.metaData.image)
  return (
    <div className=" max-w-sm min-w-max w-full overflow-hidden  m-4 bg-white border border-zinc-200 rounded-md dark:bg-black dark:border-zinc-700 shadow-md shadow-zinc-200 dark:shadow-zinc-900 ">
           <div className='relative  object-cover aspect-square w-72 '>

<Image
  width={400}
  height={400}
  src={image}
  alt={drop.drop.title}
  className="aspect-square object-cover w-72 h-72 relative" />
</div>  
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{drop.drop.title}</div>
        <p className=" text-zinc-700 dark:text-zinc-300 text-xs">Genre: {drop.drop.genre}</p>
        <p className="text-zinc-700 hidden">Keywords: {drop.drop.keywords.join(', ')}</p>
        <p className="text-zinc-700 hidden">Spotify URI: <a href={drop.drop.spotify_uri} target="_blank" rel="noopener noreferrer">{drop.drop.spotify_uri}</a></p>
      </div>
    
    </div>
  );
}

export default DropsCard;

export const DropsList = ({ drops }: { drops: any }) => {
  return (
    <div className="flex space-x-4 w-full overflow-x-scroll  mx-auto h-fit items-center scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent ">
      {drops.map((drop: any) => (
        <DropsCard key={drop.drop.id} drop={drop} />
      ))}
    </div>
  );
};