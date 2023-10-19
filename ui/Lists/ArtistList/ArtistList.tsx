import { useImagePath } from 'lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import FollowButton from 'ui/Buttons/FollowButton';

const ArtistCard = ({ artist }: { artist: any }) => {
  const image = useImagePath(artist?.avatar_url);

  return (
    <div className=" max-w-sm min-w-max w-full overflow-hidden  m-4 bg-white border border-zinc-200 rounded-md dark:bg-black dark:border-zinc-700 shadow-md shadow-zinc-200 dark:shadow-zinc-900 ">
      <div className="relative">
        <Link href={`/${artist.username}`}>
          <Image
            width={400}
            height={400}
            src={image}
            alt={artist.username}
            className="aspect-square object-cover w-72 h-72 relative"
          />
        </Link>
        <div className="absolute top-4 right-4">
          <FollowButton currentProfile={artist} />
        </div>
      </div>
      <div className="flex justify-between relative">
        <div className="px-6 py-4">
          <div className="font-bold text-lg mb-2">{artist.username}</div>
          <p className="text-zinc-700 dark:text-zinc-300 text-xs">
            {artist.city}, {artist.state}, {artist.country}
          </p>
        </div>
        <div className="px-6 py-4 absolute right-0 top-3">
          <p className="inline-block bg-zinc-200 rounded-full px-3 py-1 text-xs font-bold text-zinc-700 mr-2">
            Drops:{artist.drops.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ArtistList = ({ artists }: { artists: any }) => {
  return (
    <div className="flex  w-full overflow-x-scroll mx-auto h-fit items-center scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent ">
      {artists.map((artist: any) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;
