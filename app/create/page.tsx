'use client'
import React from 'react'
import { CreateForm } from 'ui/Sections/Create/CreateForm'
import { getSession, useSession } from 'next-auth/react'
import { useConnect } from 'wagmi'
import ConnectComponent from 'ui/Auth/ConnectComponent'
function UploadPage() {
  const session = useSession()

  
  console.log(session)
  return (
    <div className='bg-gray-100 dark:bg-black w-full max-w-screen mx-auto'>
      {!session?.data?.user.wallet ? <ConnectComponent/> :
        <CreateForm/>}
        </div>
  )
}

export default UploadPage