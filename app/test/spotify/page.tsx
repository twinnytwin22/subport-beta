'use client'
import React, { useState } from 'react';
import { useSpotify } from 'lib/providers/spotify/spotifyLogic';
import { supabaseAuth } from 'lib/constants';
import { toast } from 'react-toastify';
import useSpotifyUrlId from 'lib/hooks/useSpotifyUrlId';

function Page() {
  const [userId, setUserId] = useState<string>('');
  const spotify = useSpotify();
  const spotifyUrl = useSpotifyUrlId()
  const spotifyId = spotifyUrl.artist.getId(userId)


  const handleFollowArtist = async (userId:string) => {
    try {
      const { data: session } = await supabaseAuth.auth.getSession();
      const accessToken = session?.session?.provider_token;
      const refreshToken = session?.session?.provider_refresh_token;

      if (accessToken && refreshToken && userId) {
        const authOptions = {
          method: spotify.followArtist.method as string,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        };

        const response = await fetch(
          spotify.followArtist.endpoint + spotifyId,
          authOptions
        );

        if (response.ok) {
          // data = await response.json();
          toast.success('User followed on Spotify');
        } else {
          const errorData = await response.json();
          console.error('Error following user', JSON.stringify(errorData));
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
