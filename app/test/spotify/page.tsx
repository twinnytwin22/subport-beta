'use client'
import React, { useState } from 'react';
import { handleFollowArtist } from 'lib/providers/spotify/spotifyLogic';


function Page() {
  const [userId, setUserId] = useState<string>('');



  return (
    <div className="max-h-screen min-h-[80vh] h-full max-w-screen w-full flex place-items-center mx-auto justify-center">
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
            onClick={(() => handleFollowArtist(userId))}
          >
            Follow User
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
