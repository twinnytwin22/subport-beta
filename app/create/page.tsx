'use client'
import React from 'react'
import { CreateForm } from 'ui/Sections/Create/CreateForm'
import { useAccount } from 'wagmi'
import ConnectComponent from 'ui/Auth/ConnectComponent'
import { useSession } from 'next-auth/react'
import addUpdateWallet from 'lib/hooks/functions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
function Create({updatedUser}: any) {
  const { isConnected, address } = useAccount()
  const { data:session } = useSession()
  const userWalletStatus = addUpdateWallet({session},address)
  const router = useRouter()
  


  return (
    <div className='bg-gray-100 dark:bg-black w-full max-w-screen mx-auto'>
      {!isConnected && !session  || !isConnected ? <ConnectComponent/> :
        <CreateForm  address={address}/> }
        </div>
  )
}



export default Create