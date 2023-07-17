import React from 'react'
import HomePage from 'ui/Sections/HomePage'
import { headers } from 'next/headers'

export const runtime = 'edge'
export const fetchCache = 'force-no-store'
async function Main() {
  const host = headers().get('host')
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
  const res = await fetch(`${protocol}://${host}/api/getCollectibles`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });
  const drops = await res.json()
  const dropsWithMetaData = drops?.dropsWithMetaData
  return (
    <div className='bg-gray-100 dark:bg-black p-4  w-full mx-auto justify center'>
      <HomePage drops={dropsWithMetaData} />
    </div>
  )


}

export default Main