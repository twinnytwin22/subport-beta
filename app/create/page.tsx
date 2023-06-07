'use client'
import React from 'react'
import { CreateForm } from 'ui/Sections/Create/CreateForm'
import { useAccount } from 'wagmi'
import ConnectComponent from 'ui/Auth/ConnectComponent'
import { useSession } from 'next-auth/react'
import AddUpdateWallet from 'lib/hooks/functions'
import LoginCard from 'ui/Auth/AuthComponent'

function Create() {

  const { data: session, status } = useSession()

  return (
    <div className='bg-gray-100 dark:bg-black w-full max-w-screen mx-auto place-items-center items-center min-h-screen'>
      {!session && <div className='max-w-md mx-auto'> <LoginCard /></div>}
      {session && <CreateForm />}
    </div>
  )
}



export default Create