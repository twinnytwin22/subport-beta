import React from 'react'
import CreateHeader from 'ui/Sections/Create/CreateHeader'

function page() {
  return (
    <div>
      <CreateHeader />
      <div className=' border-t-zinc-800 border-t place-items-center h-full  mx-auto justify-center mt-2.5'>
        <p className='text-center h-full items-center mx-auto mt-24 text-zinc-500'>
          Your creations will appear here.
        </p>
      </div>
    </div>
  )
}

export default page