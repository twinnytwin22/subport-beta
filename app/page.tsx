import React from 'react'

import HomePage from 'ui/Sections/HomePage'

export const revalidate = 60// revalidate this page every 60 seconds

async function Main() {
  const res = await fetch('http://localhost:3000/api/getCollectibles', {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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