'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuthProvider } from 'app/context/auth'
import useSpotifyUrlId from 'lib/hooks/useSpotifyUrlId'
import { handleSpotifyAction } from 'lib/providers/spotify/spotifyLogic'
import Link from 'next/link'
import React from 'react'
import { FaSpotify, FaMusic, FaAmazon } from 'react-icons/fa'
import { SiTidal } from 'react-icons/si'

function DropLinksTo ({ drop }: any) {
  const { user, profile, isLoading } = useAuthProvider()
  const spotifyUrl = drop?.spotify_uri
  const spotify = useSpotifyUrlId()
  //console.log(spotifyUrl)

  async function checkSavedTracks (spotifyUrl: string) {

    try {
      const spotifyId = spotify.track.getId(spotifyUrl)
      const isSaved = await handleSpotifyAction(spotifyId!, 'checkSavedTracks')
      return isSaved
    } catch (error) {
      return error
    }
  
  }
  const {
    data: saveCheck,
    isLoading: isSavedLoading,
    isError
  } = useQuery<any>({
    queryKey: ['isSaved', spotifyUrl!], 
    queryFn: () => checkSavedTracks(spotifyUrl), 
    enabled: !!spotifyUrl && spotifyUrl.startsWith('https://open.spotify.com/'),
    refetchOnWindowFocus: false, // default: true

  })

  const handleCollect = () => {
    console.log('collect')
  }
  const handleSpotifySave = async (spotify: any, spotifyUrl: any) => {
    if(spotifyUrl.startsWith('https://open.spotify.com/')){
    try {
      const spotifyId = spotify.track.getId(spotifyUrl)
      const isSaved = await handleSpotifyAction(spotifyId!, 'saveTrack')
      return isSaved
    } catch (error) {
      return error
    }
  }
  }
  const handleApplyMusicSave = () => {
    console.log('apple save')
  }

  if(isSavedLoading){
    return null
  }

  const isSaved = saveCheck && saveCheck[0]

  return (
    <div className='text-lg w-sm'>
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
          Save to collect
        </div>
      )}
      {isSaved ? (
        <div className='text-white text-center w-full bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800'>
          <div className='flex mx-auto space-x-2 items-center justify-center'>
            <FaSpotify />
            <p>Saved on Spotify</p>{' '}
          </div>
        </div>
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
      {drop.apple_url &&
      <div
        onClick={handleApplyMusicSave}
        className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-rose-600 dark:hover:bg-rose-500 focus:outline-none '
      >
        <div className='flex mx-auto space-x-2 items-center justify-center'>
          <FaMusic />
          <p>Save on Apple Music</p>{' '}
        </div>
      </div>}
      {drop.amazon_url &&
      <div
        onClick={handleApplyMusicSave}
        className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-sky-600 dark:hover:bg-sky-500 focus:outline-none '
      >
        <div className='flex mx-auto space-x-2 items-center justify-center'>
          <FaAmazon/>
          <p>Listen on Amazon Music</p>{' '}
        </div>
      </div>}
      {drop.tidal_url &&
      <div
        onClick={handleApplyMusicSave}
        className='text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-black dark:hover:bg-zinc-950 focus:outline-none '
      >
        <div className='flex mx-auto space-x-2 items-center justify-center'>
          < SiTidal/>
          <p>Listen on Tidal</p>{' '}
        </div>
      </div>}
    </div>
  )
}

export default DropLinksTo
