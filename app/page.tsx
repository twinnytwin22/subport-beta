import React from 'react'
import HomePage from 'ui/Sections/HomePage'
import { headers, cookies } from 'next/headers'

export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'
async function Main() {
  const cookieStore = cookies()
  const myCookies = cookieStore.getAll()
  //cookies().set('name', 'subport')

  const host = headers().get('host')
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
  const res = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
    method: "GET",
    /// headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });
  const drops = await res.json()
  const dropsWithMetaData = drops?.dropsWithMetaData

 // console.log(JSON.stringify(myCookies), "MY COOKIES")
  return (
    <div className='bg-gray-100 dark:bg-black p-4  w-full mx-auto justify-center'>
      <HomePage drops={dropsWithMetaData} />
    </div>
  )


}

export default Main