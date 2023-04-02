import React from 'react'
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch'
import Home from 'ui/Sections/NFTPage'
import { getServerSession } from "next-auth/next"
import HomePage from 'ui/Sections/HomePage'
import { fetchCollectibles } from 'lib/hooks/functions'
async function Main() {
  const collectibles = await fetchCollectibles()
  console.log(collectibles)
  return (
    <div className='bg-gray-100 dark:bg-black p-8'>
  <HomePage/>
    </div>
  )
}

export default Main