import React, { Suspense } from 'react'
import { fetchAllCollectibles, fetchAllEvents, fetchCreators } from 'utils/use-server'
import Image from 'next/image'
import { ArtistList } from 'ui/Cards/ArtistCard/ArtistCard'
import { DropsList } from 'ui/Cards/DropsCard/DropsCard'
import { EventsList } from 'ui/Cards/EventsCard/EventsCard'
import Link from 'next/link'
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
      <div className='hidden relative rounded-md overflow-hidden border border-zinc-300 dark:border-zinc-800 max-w-screen mx-10 '>
           <Image
          className='relative h-60 md:h-80 lg:h-96 bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden'
          width={2000}
          height={300}
          src={'/images/stock/coverBanner.jpg'}
          alt='bg-image'
          style={{ objectFit: 'cover' /* filter: 'blur(1.5rem)' */ }}
        />
      </div>
      <Suspense>
      <div className=' max-w-screen mx-10 my-8 '>
      <div className='flex justify-between items-end'>
        <h1 className='text-lg font-bold'>Artists Near You</h1>
        <Link href={'/explore/artists'}>
        <p className=' underline text-sm'>View All</p>
        </Link>
        </div>
        <ArtistList artists={artists}/>
      </div>
      <div className=' max-w-screen mx-10 my-8 '>
      <div className='flex justify-between items-end'>

        <h1 className='text-lg font-bold'>Events Near You</h1>
        <Link href={'/explore/events'}>
        <p className=' underline text-sm'>View All</p>
        </Link>
        </div>
        <EventsList events={events}/>
      </div>
      <div className=' max-w-screen mx-10 my-8 '>
      <div className='flex justify-between items-end'>

        <h1 className='text-lg font-bold'>Drops Near You</h1>
        <Link href={'/explore/drops'}>
        <p className=' underline text-sm'>View All</p>
        </Link>
        </div>
        <DropsList drops={dropsWithMetaData}/>
      </div>
      </Suspense>
      {/*<HomePage drops={dropsWithMetaData} />*/}
    </div>
  )


}

export default Main