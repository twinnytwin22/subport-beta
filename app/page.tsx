import React from 'react'
import { fetchAllCollectibles, fetchAllEvents, fetchCreators } from 'utils/use-server'
import Image from 'next/image'
import { ArtistList } from 'ui/Cards/ArtistCard/ArtistCard'
export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'
async function Main() {
  const [drops, events, artists] = await Promise.all([
    fetchAllCollectibles(),
    fetchAllEvents(), 
    fetchCreators(),

  ])

  const dropsWithMetaData = drops?.dropsWithMetaData

  // console.log(JSON.stringify(myCookies), "MY COOKIES")
  return (
    <div className='bg-zinc-100 dark:bg-black  w-full mx-auto justify-center h-full mb-24'>
      <div className='relative rounded-md overflow-hidden border border-zinc-300 dark:border-zinc-800 max-w-screen mx-10 '>
           <Image
          className='relative h-60 md:h-80 lg:h-96 bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden'
          width={2000}
          height={300}
          src={'/images/stock/coverBanner.jpg'}
          alt='bg-image'
          style={{ objectFit: 'cover' /* filter: 'blur(1.5rem)' */ }}
        />
      </div>
      <div className=' max-w-screen mx-10 '>
        <ArtistList artists={artists}/>
      </div>
      {/*<HomePage drops={dropsWithMetaData} />*/}
    </div>
  )


}

export default Main