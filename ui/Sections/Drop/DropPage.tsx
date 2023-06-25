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
      <div className="flex flex-col lg:flex-row mx-auto">

        <div className="lg:flex p-4 lg:p-16 mx-auto md:col-span-2 w-full aspect-square">
          <img className='rounded-2xl shadow-lg dark:shadow-zinc-950 shadow-zinc-300 max-w-lg w-full aspect-square  object-cover' src={imageUrl} alt="Song-cover" />
        </div>
        <div className="md:col-span-1 md:mt-8 lg:border-l-zinc-600 lg:border-l-2 lg:pl-16 p-4">
          <div className='flex flex-col min'>
            <div className='block'>
              <h1 className='text-2xl font-extrabold'>{drop.name}</h1></div>
            <div className=''>
              <h1 className='text-xl font-semibold'>{upload.artist}</h1></div>
            <div className=''>
              <h1 className='text-md mt-4'>Available {upload.releaseDate}</h1></div>
          </div>
          <p className="mb-6 text-md font-light text-gray-500 lg:mb-8 md:text-md dark:text-gray-400">{metaData?.description}</p>
          <div className='flex flex-col w-full'>
            <p className="text-xs mb-4">Collected by names, names, 67 more</p>
            <div>
              <DropLinksTo />

            </div>

            <DropNav dropId={drop?.id} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  )
}

