'use client'
import React from "react";
import Account from "ui/User/Account";
import { deployContractS } from "lib/deployer";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const name = 'Twinny Testing Vars';
const tokenName = 'TTV';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;

const deployData = [name, tokenName, startDate, endDate, contractUri, totalSupply]
function page(props: any) {
  console.log(props, 'session')
  const handleClick = () => {
    deployContractS({ deployData })
  }

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-6 bg-zinc-200 rounded-md border-zinc-300 p-8">
        <h1 className="text-center font-bold text-2xl text-black">Deployer Tester</h1>

        <ConnectButton />
        <button onClick={handleClick}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">DEPLOY</button>
      </div></div>
  )
}
export default page;
