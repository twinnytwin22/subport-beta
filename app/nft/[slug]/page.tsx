import React from 'react'
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch'
import Home from 'ui/Sections/NFTPage'
import { getServerSession } from "next-auth/next"
import NFTPage from 'ui/Sections/NFTPage'

async function Collect() {
  return (
    <div className='bg-gray-100 dark:bg-black'>
      <NFTPage/>
    </div>
  )
}

export default Collect