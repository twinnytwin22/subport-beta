'use client'
import React, { useState } from 'react';
import { handleSpotifyAction  as handleSpotify } from 'lib/providers/spotify/spotifyLogic';
import useSpotifyUrlId from 'lib/hooks/useSpotifyUrlId';
import Link from 'next/link';


function Page() {
  const [userId, setUserId] = useState<string>('');
  const spotifyUrl = useSpotifyUrlId()
  const spotifyId = spotifyUrl.artist.getId(userId)


  return (
    <div className="max-h-screen min-h-[80vh] h-full max-w-screen w-full flex flex-col place-items-center mx-auto justify-center relative">
      <div className="mx-auto w-full max-w-sm p-8 rounded border border-zinc-200 dark:border-zinc-800">
        <div className="w-full mx-auto space-y-4 flex flex-col">
          <h1 className="text-center font-bold text-lg">Follow a Spotify User</h1>
          <div>
            <h1 className="text-center text-sm">ScarLip: 0XSAX3u9L4gKXmbhSwPnIJ</h1>
            <h1 className="text-center text-sm">K.Carbon: 5LxoXQBUoD5oftz6xQLv9y</h1>
          </div>
          <input
            placeholder="User Id"
            className="p-2"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mx-auto">
          <button
            className="bg-blue-600 text-white flex font-bold mx-auto p-2.5 rounded justify-center m-4 self-center text-center"
            onClick={(() => handleSpotify(spotifyId!, 'followArtist'))}
          >
            Follow User
          </button>
        </div> 
      
      </div>
       <div className='relative mt-24 font-semibold'>
        <Link href='https://developer.spotify.com/documentation/web-api' target='blank'>
        Spotify Documentation 
        </Link>
      </div>
    </div>
  );
}

export default Page;
