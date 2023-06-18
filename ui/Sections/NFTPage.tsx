import React from 'react'
import SpotifyPresave from 'ui/Buttons/SpotifyPresave'
import { upload } from 'lib/content/mockUpload'
import CollectionNav from 'ui/Navigation/NFTNav'



export async function NFTPage({ props }: any) {
  // console.log(props)
  const drop = props?.drop
  const metaData = props?.metaData.metadata

  const imageUrl = metaData.image.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/');


  return (
    <div className='max-w-7xl mx-auto w-full'>
      <div className="bg-gray-100 dark:bg-black h-full flex max-w-7xl mx-auto w-full">
        <div className="grid mx-auto grid-cols-1 md:grid-cols-3 gap-10 p-10 w-full ">

          <div className="lg:flex md:p-4 lg:p-16 mx-auto md:col-span-2 w-full">
            <img className='rounded-2xl shadow-lg max-w-full w-full  object-cover' src={imageUrl} alt="Song-cover" />
          </div>
          <div className="md:col-span-1 md:mt-8 border-l-zinc-600 border-l-2 pl-16">
            <div className='flex flex-col'>
              <div className='block'>
                <h1 className='text-2xl font-extrabold'>{drop.name}</h1></div>
              <div className=''>
                <h1 className='text-xl font-semibold'>{upload.artist}</h1></div>
              <div className=''>
                <h1 className='text-md mt-4'>Available {upload.releaseDate}</h1></div>
            </div>
            <p className="mb-6 text-md font-light text-gray-500 lg:mb-8 md:text-md dark:text-gray-400">{metaData?.description}</p>
            <div className='flex flex-col'>
              <p className="text-xs mb-4">Collected by names, names, 67 more</p>
              <div>
                <SpotifyPresave />

              </div>

              <CollectionNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

