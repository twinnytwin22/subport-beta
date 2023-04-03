'use client'
import React from 'react'
import { CreateForm } from 'ui/Sections/Create/CreateForm'
import { getSession, useSession } from 'next-auth/react'
import { useAccount, useConnect } from 'wagmi'
import ConnectComponent from 'ui/Auth/ConnectComponent'
function UploadPage() {
  const session = useSession()
  const { isConnected, address } = useAccount()
  
  return (
    <div className='bg-gray-100 dark:bg-black w-full max-w-screen mx-auto'>
      {!isConnected ? <ConnectComponent/> :
        <CreateForm address={address}/>}
        </div>
  )
}

export default UploadPage