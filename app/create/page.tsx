'use client'
import React, { useEffect } from 'react'
import { CreateForm } from 'ui/Sections/Create/CreateForm'
import { useAccount } from 'wagmi'
import ConnectComponent from 'ui/Auth/ConnectComponent'
import { useSession } from 'next-auth/react'
import addUpdateWallet from 'lib/hooks/functions'
import LoginCard from 'ui/Auth/AuthComponent'
function Create({ updatedUser }: any) {
  const { isConnected, address } = useAccount()
  const { data: session, status } = useSession()



  if (address != null) {
    addUpdateWallet({ session }, address)
  }

  console.log(address, 'address from create page.tsx')

  return (
    <div className='bg-gray-100 dark:bg-black w-full max-w-screen mx-auto place-items-center items-center min-h-screen'>
      {!session && <div className='max-w-md mx-auto'> <LoginCard /></div>}
      {session && !session.user.wallet_address && !address && <ConnectComponent />}
      {session ? session.user.wallet_address && <CreateForm address={session.user.wallet_address ?? address} /> : address && <CreateForm />}
    </div>
  )
}



export default Create