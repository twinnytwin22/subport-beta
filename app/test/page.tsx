'use client'
import React, { useState } from "react";
import { deployContractViem } from "lib/deployer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { supabase } from "lib/supabaseClient";
import { toast } from "react-toastify";
import { useAuthProvider } from "app/context";

let getName = 'Always' + Math.random();
let name = getName.toString()
const artistName = 'Twinny Twin';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;
const slug = (artistName.toLowerCase() + '-' + name.toLowerCase()).replace(/\s+/g, '-');

type TestMessage = {
  title: string
}

const testMessages = ({ title }: TestMessage) => {
  return {
    success: `Test "${title}" succeeded!`,
    fail: `Test "${title}" failed!`,
  };
};


const deployData = [
  name,
  artistName,
  startDate,
  endDate,
  contractUri,
  totalSupply
]

const metaData = {
  name: name,

}
function Page(props: any) {
  const [loading, isLoading] = useState(false)
  const { user } = useAuthProvider()
  console.log(user)
  const [contractAddress, setContractAddress] = useState('');

  console.log(props, 'session');


  const handleClick = () => {
    const messages = testMessages({ title: "Deploy" });

    isLoading(true)
    deployContractViem({ deployData }).then(async (address: any) => {
      setContractAddress(address);
      console.log('Contract address:', address);
      if (address && user?.email) {
        const { data: drop, error } = await supabase
          .from("drops")
          .insert([
            {
              userId: user?.id,
              contractAddress: address
            }
          ])
          .eq("userId", user?.id);

        if (error) {
          toast(messages.fail);
          isLoading(false)
          return
        }
        toast(messages.success);

      }
      isLoading(false)
    }
    );
  }

  async function handleTestFileCreation() {// Replace with the desired name
    const messages = testMessages({ title: "File Creation" });
    isLoading(true)
    const jsonData = deployData;
    const jsonContent = JSON.stringify(jsonData);
    console.log(jsonData, 'jd', jsonContent, 'jc');
    try {
      const response = await fetch('/api/createContractMeta', {
        method: 'POST',
        body: JSON.stringify({ name, jsonContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(`metadata was successfully saved to ${name}-metadata.json file`);
        toast(messages.success);
      } else {
        console.error('Failed to create the file.');
        isLoading(false)
      }
    } catch (error) {
      toast(messages.fail);
      isLoading(false)
    }
    isLoading(false)

  }


  async function handleTestSupaUpload() {
    const messages = testMessages({ title: "Supabase Upload" });
    isLoading(true)
    if (user) {
      const { data: drop, error } = await supabase
        .from('drops')
        .insert([
          {
            name: name,
            userId: user?.id,
            contractAddress: name,
            slug: slug
          }
        ])
        .eq("userId", user?.id);
      console.log('successful test upload')

      if (error) {
        toast(messages.fail);
        console.error(error);
        return { success: false, error: "Error inserting collectible" };
      } else (
        toast(messages.success)

      )
      isLoading(false)
    }
  }

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-6 bg-zinc-200 rounded-md border-zinc-300 p-8 space-x-4">
        <h1 className="text-center font-bold text-2xl text-black">Deployer Tester</h1>
        {loading &&
          <h2 className="text-center font-bold text-xl text-black">Testing...</h2>}

        <ConnectButton />
        <button onClick={handleClick}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">DEPLOY</button>

        <button onClick={handleTestSupaUpload}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST UPLOAD</button>
        <button onClick={handleTestFileCreation}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST FILE</button>
        <br />
        <button onClick={handleTestSupaUpload}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST IPFS</button>


      </div>   </div>
  )
}
export default Page;
