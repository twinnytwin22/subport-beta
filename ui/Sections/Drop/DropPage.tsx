import React from 'react'
import DropLinksTo from 'ui/Sections/Drop/DropLInks'
import { upload } from 'lib/content/mockUpload'
import DropNav from 'ui/Sections/Drop/DropNav'
import { getDropComments } from 'utils/database'



export async function DropPage({ props, comments }: any) {
  // console.log(props)
  const drop = props?.drop
  const metaData = props?.metaData.metadata
  const imageUrl = metaData.image.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/');



  return (
    <div className="bg-gray-100 dark:bg-black h-full flex max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row mx-auto items-center">

        <div className=" p-8 mx-auto w-full aspect-square">
          <img className='rounded-2xl shadow-lg dark:shadow-zinc-950 shadow-zinc-300  lg:max-w-2xl w-full aspect-square  object-cover' src={imageUrl} alt="Song-cover" />
        </div>
        <div className="w-full max-w-lg lg:max-w-sm md:mt-8 lg:border-l-zinc-600 lg:border-l-2 lg:pl-16 p-4 h-full">
          <div className='flex flex-col'>
            <div className='block'>
              <h1 className='text-2xl font-extrabold'>{drop.name}</h1></div>
            <div className=''>
              <h1 className='text-xl font-semibold'>{upload.artist}</h1></div>
            <div className=''>
              <h1 className='text-md mt-4'>Available {upload.releaseDate}</h1></div>
          </div>
          <p className="mb-6 text-sm md:text-md font-light text-gray-500 lg:mb-8 md:text-md dark:text-gray-400">{metaData?.description}</p>
          <div className='flex flex-col w-full mx-auto justify-center place-content-center place-items-center'>
            <p className="text-xs mb-4">Collected by names, names, 67 more</p>
            <div className='w-full'>
              <DropLinksTo />

            </div>

            <DropNav dropId={drop?.id} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  )
}

