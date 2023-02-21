import React from 'react'
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch'
import Home from 'ui/Sections/Home'
import { getServerSession } from "next-auth/next"

async function HomePage() {
  return (
    <div className='bg-gray-100 dark:bg-gray-900'>
      <div className=' relative left-100'>
      </div>
      <Home/>
    </div>
  )
}

export default HomePage