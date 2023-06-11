'use client'
import React from 'react'
import SpotifyPresave from 'ui/Buttons/SpotifyPresave'
import { NextPage } from 'next/types'
import { upload } from 'lib/content/mockUpload'
import CollectionNav from 'ui/Navigation/NFTNav'
import { useAuthProvider } from 'app/context'



const NFTPage: NextPage = () => {
  const { user } = useAuthProvider()
  console.log(upload)
  return (
    <div className='max-w-7xl mx-auto'>
      <div className="bg-gray-100 dark:bg-black h-full flex max-w-7xl mx-auto">
        <div className="grid mx-auto grid-cols-1 md:grid-cols-3 gap-10 p-10 ">

          <div className="lg:flex md:p-4 lg:p-16 mx-auto md:col-span-2">
            <img className='rounded-2xl shadow-lg w-96 md:w-full' src={upload.songCover} alt="Song-cover" />
          </div>
          <div className="md:col-span-1 md:mt-8 border-l-zinc-600 border-l-2 pl-16">
            <div className='flex flex-col'>
              <div className='block'>
                <h1 className='text-2xl font-extrabold'>{upload.title}</h1></div>
              <div className=''>
                <h1 className='text-xl font-semibold'>{upload.artist},{upload.featuredArtist}</h1></div>
              <div className=''>
                <h1 className='text-md mt-4'>Available {upload.releaseDate}</h1></div>
            </div>



            <p className="mb-6 text-md font-light text-gray-500 lg:mb-8 md:text-md dark:text-gray-400">Get rewarded for supporting. Get a free digital collectible when you pre-save the song on Apple Music or Spotify. Just a few easy steps and it's yours! </p>
            <div className='flex flex-col'>
              <p className="text-xs mb-4">Collected by names, names, 67 more</p>

              {user?.id ? (
                <div>
                  <SpotifyPresave />

                </div>) : (''
              )}
              <CollectionNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTPage