'use client'
import React, { useState } from "react";
import Account from "ui/User/Account";
import { useSession } from "next-auth/react";
import { deployContractViem } from "lib/deployer";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { supabase } from "lib/supabaseClient";
import { useSupaUser } from "lib/supaUser";

const name = 'Twinny Testing Vars';
const tokenName = 'TTV';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;
const contractAddress = ""

const deployData = [
  name,
  tokenName,
  startDate,
  endDate,
  contractUri,
  totalSupply
]
function page(props: any) {
  const { data: session } = useSession()
  console.log(session)
  const [contractAddress, setContractAddress] = useState('');

  console.log(props, 'session');


  const handleClick = () => {
    deployContractViem({ deployData }).then(async (address: any) => {
      setContractAddress(address);
      console.log('Contract address:', address);
      if (address && session) {
        const { data: drop, error } = await supabase
          .from("drops")
          .insert([
            {
              userId: session.id,
              contractAddress: address
            }
          ])
          .eq("userId", session.id);

        if (error) {
          console.error(error);
          return
        }
      }
    }
    );
  }

  async function handleTestSupaUpload() {
    if (session) {
      const { data: drop, error } = await supabase
        .from('drops')
        .insert([
          {
            userId: session.id,
            contractAddress: 'gjgjygjygkg22'
          }
        ])
        .eq("userId", session?.id);

      if (error) {
        console.error(error);
        return { success: false, error: "Error inserting collectible" };
      }
    }
  }

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-6 bg-zinc-200 rounded-md border-zinc-300 p-8 space-x-4">
        <h1 className="text-center font-bold text-2xl text-black">Deployer Tester</h1>

        <ConnectButton />
        <button onClick={handleClick}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">DEPLOY</button>

        <button onClick={handleTestSupaUpload}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST UPLOAD</button>
      </div>   </div>
  )
}
export default page;
