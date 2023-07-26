import React from 'react'
import CreateHeader from 'ui/Sections/Create/CreateHeader'
import UserCreations from 'ui/User/UserCreations'

function page() {
  return (
    <div>
      <CreateHeader />
      <div className=' border-t-zinc-800 border-t place-items-center h-full  mx-auto justify-center mt-2.5'>
        <UserCreations />
      </div>
    </div>
  )
}

export default page