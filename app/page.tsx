import React from 'react'

import HomePage from 'ui/Sections/HomePage'

export const revalidate = 60// revalidate this page every 60 seconds

async function Main() {
  return (
    <div className='bg-gray-100 dark:bg-black p-4  w-full mx-auto justify center'>
      <HomePage />
    </div>
  )
}

export default Main