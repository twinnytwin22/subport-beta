'use client'
import React from 'react'
import AppStore from 'ui/Cards/AppStore'
import CollectCard from 'ui/Cards/CollectCard'

function HomePage() {
  return (
    <div className='max-w-5xl h-screen w-full mx-auto mt-20'>
        <div className='grid grid-cols-10  justify-center justify-items-center gap-16'>
   
    <div className='w-full hidden md:block col-span-4 bg-black'>
        <h1 className='text-2xl mb-4'>Home</h1>
        <AppStore/>
    </div>


    <div className='flex flex-col space-y-10 max-w-full col-span-10 md:col-span-6' style={{scrollbarWidth: 'none'}}>
        <CollectCard/>
        <CollectCard/>
        <CollectCard/>
    </div>


        </div>
    </div>
  )
}

export default HomePage