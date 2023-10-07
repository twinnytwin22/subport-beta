'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuthProvider } from 'app/context/auth'
import useSpotifyUrlId from 'lib/hooks/useSpotifyUrlId'
import { handleSpotifyAction } from 'lib/providers/spotify/spotifyLogic'
import Link from 'next/link'
import React from 'react'
import { FaSpotify, FaMusic, FaAmazon } from 'react-icons/fa'
import { SiDeezer, SiTidal } from 'react-icons/si'
import { getDropLinks } from 'utils/database'
import useDropSettings from '../DropEditor/store'
import { useRouter } from 'next/navigation'

function DropLinksTo({ drop }: any) {
  const { user, profile, isLoading } = useAuthProvider()
  const router = useRouter()
  const spotifyUrl = drop?.spotify_uri
  const spotify = useSpotifyUrlId()
  //console.log(spotifyUrl)
  const {
    apple_url,
    amazon_url,
    deezer_url,
    soundcloud_url,
    // spotify_url,
    tidal_url,
    setAmazonUrl,
    setAppleUrl,
    setSoundcloudUrl,
    //  setSpotifyUrl,
    setDeezerUrl,
    setTidalUrl,
  } = useDropSettings()


  const { data: dropLinks, isLoading: dropLinksLoading } = useQuery({
    queryKey: ['dropLinks', drop.id],
    queryFn: (() => getDropLinks(drop.id)),
    enabled: !!drop.id,
    onSuccess: (dropLinks: any) => {
      setAmazonUrl(dropLinks?.amazon_url)
      setAppleUrl(dropLinks?.apple_url!)
      setDeezerUrl(dropLinks?.deezer_url)
      setSoundcloudUrl(dropLinks?.soundcloud_url)
      setTidalUrl(dropLinks?.tidal_url)
    }
  })


  async function checkSavedTracks(spotifyUrl: string) {
    try {
      if (spotifyUrl && user) {
        const spotifyId = spotify.track.getId(spotifyUrl)
        const res = await handleSpotifyAction(spotifyId!, 'checkSavedTracks')
        return res
      }
    } catch (error) {
      return error
    }
    return new Error('User must be logged in.')
  }

  const {
    data: saveCheck,
    isLoading: isSavedLoading,
    isError
  } = useQuery<any>({
    queryKey: ['isSaved', spotifyUrl!, user],
    queryFn: () => checkSavedTracks(spotifyUrl),
    enabled: !!spotifyUrl && spotifyUrl.startsWith('https://open.spotify.com/') && user !== null,
    refetchOnWindowFocus: false, // default: true

  })
  const isSaved = saveCheck && saveCheck[0]

  const handleCollect = () => {
    console.log('collect')
  }
  const handleSpotifySave = async (spotify: any, spotifyUrl: any) => {
    if (spotifyUrl.startsWith('https://open.spotify.com/')) {
      try {
        const spotifyId = spotify.track.getId(spotifyUrl)
        const res = await handleSpotifyAction(spotifyId!, 'saveTrack')
        return res
      } catch (error) {
        return error
      }
    } else {

    }
  }
  const handleApplyMusicSave = () => {
    console.log('apple save')
  }

  if (isSavedLoading) {
    return null
  }


  return (
    <React.Fragment>
      {dropLinks ?
        <div className='text-lg w-sm'>
          <Link href='/' className='text-center p-2.5 cursor-pointer'>Sign in for more access.</Link>
          {isSaved ? (
            <div
              onClick={handleCollect}
              className='text-white text-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Collect
            </div>
          ) : (
            <div
              onClick={() => handleSpotifySave(spotify, spotifyUrl)}
              className='text-white text-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              {user ? 'Save to collect' : 'Sign in to collect'}
            </div>
          )}
          {isSaved ? (
            <Link href={spotifyUrl}>
              <div className='text-white text-center w-full bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800'>
                <div className='flex mx-auto space-x-2 items-center justify-center'>
                  <FaSpotify />
                  <p>Saved on Spotify</p>{' '}
                </div>
              </div>
            </Link>
          ) : (
            <div
              onClick={() => handleSpotifySave(spotify, spotifyUrl)}
              className='text-white text-center w-full bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800'
            >
              <div className='flex mx-auto space-x-2 items-center justify-center'>
                <FaSpotify />
                <p>Save on Spotify</p>{' '}
              </div>
            </div>
          )}
          {dropLinks.apple_url &&

            <div

              className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-rose-600 dark:hover:bg-rose-500 focus:outline-none '
            >
              <div className='flex mx-auto space-x-2 items-center justify-center'>
                <FaMusic />
                <p> {user ? 'Save on Apple Music' : 'Listen on Apple Music'} </p>{' '}
              </div>
            </div>}
          {dropLinks.amazon_url &&
            <Link href={dropLinks.amazon_url}>

              <div

                className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-sky-600 dark:hover:bg-sky-500 focus:outline-none '
              >
                <div className='flex mx-auto space-x-2 items-center justify-center'>
                  <FaAmazon />
                  <p>Listen on Amazon Music</p>{' '}
                </div>
              </div>
            </Link>}
          {dropLinks.tidal_url &&
            <Link href={dropLinks.tidal_url}>

              <div

                className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-black dark:hover:bg-zinc-950 focus:outline-none  border border-zinc-800'
              >
                <div className='flex mx-auto space-x-2 items-center justify-center'>
                  < SiTidal />
                  <p>Listen on Tidal</p>{' '}
                </div>
              </div>
            </Link>}
          {dropLinks.deezer_url &&
            <Link href={dropLinks.deezer_url}>

              <div

                className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none '
              >
                <div className='flex mx-auto space-x-2 items-center justify-center'>
                  < SiDeezer />
                  <p>Listen on Deezer</p>{' '}
                </div>
              </div>
            </Link>}
        </div> : ''}
    </React.Fragment>
  )
}

export default DropLinksTo
