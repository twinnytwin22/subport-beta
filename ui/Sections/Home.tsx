'use client'
import React from 'react'
import SpotifyPresave from 'ui/Buttons/SpotifyPresave'
import { useSession } from 'next-auth/react'
import { NextPage } from 'next/types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { upload } from 'lib/mockUpload'
import Link from 'next/link'



const Home: NextPage = () => {
    const {status, data: session } = useSession()
    console.log(status, session)

  return (
    <div>
        <div className="bg-gray-100 dark:bg-gray-900 h-[90vh] flex">
    <div className="grid max-w-screen mx-auto grid-cols-1 md:grid-cols-2 gap-10 p-10 items-center content-center">
    
        <div className="lg:mt-0 lg:flex md:p-4 lg:p-16 mx-auto">
            <img className='rounded-2xl shadow-lg w-96 md:w-full' src={upload[0].songCover} alt="Exhausted-Cover"/>
        </div>                
        <div className="mr-auto place-self-center ">
            <div className='grid grid-cols-1 my-8'>
              <div className='flex'>
                <h1 className='text-5xl font-extrabold'>{upload[0].title}</h1></div>
              <div className='flex'>
                <h1 className='text-3xl font-semibold'>{upload[0].artist},{upload[0].featuredArtist}</h1></div>
                <div className='flex'>
                <h1 className='text-md mt-4'>Available {upload[0].releaseDate}</h1></div>
            </div>
            {status == 'authenticated'&& <div className='flex'>
            <h1 className="max-w-2xl mb-4 text-xl font-extrabold tracking-tight leading-none  dark:text-white">What up {session?.user?.name}</h1>
            <Link href="/api/auth/signout"> <p className='text-xs'>(Sign Out?)</p></Link></div>}
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Pre-save for a Free NFT</h1>
            

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Get rewarded for supporting. Get a free digital collectible when you pre-save the song on Apple Music or Spotify. Just a few easy steps and it's yours! </p>
        <div className='flex'>
            {status == 'authenticated' ? (
            <div>
          
            <ConnectButton label='Claim Your NFT'/>
            </div> ): (
            <SpotifyPresave/>)}
           </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Home