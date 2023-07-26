import React, { Suspense } from 'react'
import { LoadingContainer } from 'ui/LoadingContainer'
import CreateHeader from 'ui/Sections/Create/CreateHeader'
import UserCreations from 'ui/User/UserCreations'

function page() {
  return (
    <div>
      <CreateHeader />
      <div className=' dark:border-t-zinc-800 border-t-zinc-300 border-t place-items-center h-full  mx-auto justify-center mt-2.5'>
        <Suspense fallback={<LoadingContainer />}>
          <UserCreations />
        </Suspense>
      </div>
      <div className='mb-24' />
    </div>
  )
}

export default page