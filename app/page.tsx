import React from 'react'
import HomePage from 'ui/Sections/HomePage'
import { headers, cookies } from 'next/headers'
import { fetchAllCollectibles } from 'utils/use-server'

export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'
async function Main() {
  const [drops] = await Promise.all([
    fetchAllCollectibles(), 
    
  ])

  const dropsWithMetaData = drops?.dropsWithMetaData

 // console.log(JSON.stringify(myCookies), "MY COOKIES")
  return (
    <div className='bg-gray-100 dark:bg-black p-4  w-full mx-auto justify-center'>
      <HomePage drops={dropsWithMetaData} />
    </div>
  )


}

export default Main