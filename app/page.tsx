import React from 'react'
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch'
import Home from 'ui/Sections/NFTPage'
import { getServerSession } from "next-auth/next"
import HomePage from 'ui/Sections/HomePage'
import { fetchCollectibles } from 'lib/hooks/functions'
async function Main() {
  return (
    <div className='bg-gray-100 dark:bg-black p-8 max-w-screen w-full backdrop:content-center'>
      <HomePage />
    </div>
  )
}

export default Main