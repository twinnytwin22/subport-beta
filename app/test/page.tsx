'use client'
import React from "react";
import Account from "ui/User/Account";
import { deployContractS } from "lib/deployer";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
function page(props: any) {
  const { isConnected } = useAccount()
  console.log(props, 'session')
  const handleClick = () => {
    deployContractS({ isConnected })
  }

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-6 bg-zinc-200 rounded-md border-zinc-300 p-8">
        <h1 className="text-center font-bold text-2xl">Deployer Tester</h1>
        {!isConnected && <ConnectButton />}

        <button onClick={handleClick}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">DEPLOY</button>
      </div></div>
  )
}
export default page;
