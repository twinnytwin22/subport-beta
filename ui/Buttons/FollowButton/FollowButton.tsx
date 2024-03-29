'use client';
import { useAuthProvider } from 'app/context/auth';
import useSpotifyUrlId from 'lib/hooks/useSpotifyUrlId';
import { handleSpotifyAction as handleSpotify } from 'lib/providers/spotify/spotifyLogic';
import {
  FollowProfile,
  UnFollowProfile,
  isFollowing
} from 'lib/social-actions/followUser';
import { useEffect, useState } from 'react';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import { toast } from 'react-toastify';
import { fetchArtistData } from 'utils/use-server';

export default function FollowButton({ currentProfile }: any) {
  const { user, profile } = useAuthProvider();
  const profileId = currentProfile?.id;
  const spotify = useSpotifyUrlId();
  const isAuthedUser: boolean = profile?.id === profileId;

  const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  //  console.log(currentProfile)

  useEffect(() => {
    if (profile && !isAuthedUser) {
      const checkIsFollowing = async () => {
        try {
          const response = await isFollowing(
            profile?.id as string,
            profileId as string
          );
          setIsAlreadyFollowing(response);
          setIsLoading(false);
        } catch (error) {
          console.error('Error checking isFollowing:', error);
          setError(error);
          setIsLoading(false);
        }
      };

      checkIsFollowing();
    } else {
      setIsLoading(false);
    }
  }, [profile?.id, profileId, isAlreadyFollowing]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFollowButton = async () => {
    if (isAlreadyFollowing) {
      UnFollowProfile(profile?.id, profileId);
      setIsAlreadyFollowing(false);
    } else {
      if (currentProfile.is_artist) {
        const data = await fetchArtistData(profileId);
        console.log(data);
        const spotifyId = spotify.artist.getId(data?.data?.spotify_url);

        if (spotifyId) {
          await handleSpotify(spotifyId!, 'followArtist');
        }
      }

      FollowProfile(profile?.id, profileId);
      toast(`Now following @${currentProfile.username}.`, {
        hideProgressBar: true,
        autoClose: 1000
      });
      setIsAlreadyFollowing(true);
    }
  };

  return (
    !isAuthedUser &&
    user && (
      <div className=" sm:mt-0">
        {isAlreadyFollowing ? (
          <button
            className="bg-green-600 hover:bg-green-700 border border-zinc-400 text-white font-extrabold  hover:shadow-md hover:scale-105 shadow text-xs px-4 py-2 rounded-md outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleFollowButton}
          >
            <SlUserFollowing className="follow-button" strokeWidth={10} />
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 border border-zinc-400 text-white font-extrabold  hover:shadow-md hover:scale-105 shadow text-xs px-4 py-2 rounded-md outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleFollowButton}
          >
            <SlUserFollow className="follow-button" strokeWidth={10} />
          </button>
        )}
      </div>
    )
  );
}

export { FollowButton };
