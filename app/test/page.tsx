'use client'
import 'viem/window'
import React, { useEffect, useState } from "react";
import { deployContractViem } from "lib/deployFunctions/deployer";
import { toast } from "react-toastify";
import { useAuthProvider } from "app/context/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { uploadToIpfs } from "lib/deployFunctions/uploadFileIpfs";
import Image from 'next/image';
import SpotifyAuth from 'utils/testSpotifyLogic';
import { supabase } from 'lib/constants';

let getName = 'Always' + Math.random();
let name = getName.toString()
const artistName = 'Twinny Twin';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;
const slug = (artistName.toLowerCase() + '-' + name.toLowerCase()).replace(/\s+/g, '-');
const storage = new ThirdwebStorage();


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

function Page(props: any) {
  const [responseJSON, setResponseJSON] = useState('');
  const [loading, isLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const { user } = useAuthProvider()



  useEffect(() => {
    console.log('getting profile')
    async () => {
      const supabase = createClientComponentClient()
      const { data: profile, error } = await supabase.from('profiles').select('avatar_url').eq('id', user?.id).single()
      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url)
      }
    }
  }, [avatarUrl, user?.id])


  const handleClick = async () => {
    const messages = testMessages({ title: "Deploy" });
    isLoading(true);
    try {
      const address = await deployContractViem({ deployData });
      if (address && user?.email) {
        console.log('RES:', address);
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
          setResponseJSON(JSON.stringify(error)); // JSON response you want to stringify
          toast(messages.fail);
        } else {
          setResponseJSON(JSON.stringify({ address })); // JSON response you want to stringify
          toast(messages.success);
        }
        return address
      }
    } catch (error) {
      setResponseJSON(JSON.stringify(error)); // JSON response you want to stringify
      toast(messages.fail);
    }

    isLoading(false);
  };


  async function handleReset() {
    setAvatarUrl('')
    setResponseJSON('')
    isLoading(false)
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
        setResponseJSON(JSON.stringify(response.ok)); // Assuming `response` is the JSON response you want to stringify
        console.log(response.formData);
        toast(messages.success);
      } else {
        setResponseJSON(JSON.stringify(response.ok)); // Assuming `response` is the JSON response you want to stringify
        console.error('Failed to create the file.');
        isLoading(false)
      }
    } catch (error) {
      toast(messages.fail);
      isLoading(false)
    }
    isLoading(false)

  }

  async function handleThirdWebIPFS() {
    const res = await uploadToIpfs(deployData)
    if (res) {
      console.log(res)
    }
  }
  async function handleTestSupaUpload() {
    const messages = testMessages({ title: "Supabase Upload" });
    isLoading(true)
    if (user) {
      const { data: drop, error, status } = await supabase
        .from('drops')
        .insert([
          {
            name: name,
            userId: user?.id,
            contractAddress: name,
            slug: slug,
            genre: 'House'
          }
        ])
        .eq("userId", user?.id)
        .returns();
      console.log('successful test upload', drop)
      setResponseJSON(JSON.stringify({ status })); // Assuming `drop` is the JSON response you want to stringify

      if (error) {
        toast(messages.fail);
        setResponseJSON(JSON.stringify(error)); // Assuming `drop` is the JSON response you want to stringify
        return { success: false, error: "Error inserting collectible" };
      } else (
        toast(messages.success)

      )
      isLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <label htmlFor="response">Response</label>
      <textarea
        className="w-full max-w-md mx-auto p-4 mb-4 text-black bg-white rounded-lg border border-gray-300"
        value={responseJSON}
        readOnly
        id="response"
      />
      <div className="max-w-sm mx-auto border-black">
        <pre className=" whitespace-pre-wrap">{JSON.stringify(user?.email)}
        </pre>
        <pre className=" whitespace-pre-wrap">{JSON.stringify(user?.wallet)}
        </pre>
      </div>

      <div className="space-y-6 bg-zinc-200 rounded-md border-zinc-300 p-8 space-x-4">
        <h1 className="text-center font-bold text-2xl text-black">Deployer Tester</h1>
        {loading &&
          <h2 className="text-center font-bold text-xl text-black">Testing...</h2>}
        {avatarUrl && <Image src={avatarUrl} alt="avatar test" width={50} height={50} />}

        <button onClick={handleClick}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">DEPLOY WITH CLIENT / METAMASK</button>
        <br />
        <button onClick={handleTestSupaUpload}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST UPLOAD</button>
        <button onClick={handleTestFileCreation}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST FILE</button>
        <button onClick={handleThirdWebIPFS}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">TEST IPFS</button>
        <br />
        <button onClick={handleReset}
          className="p-4 bg-red-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">RESET/REFRESH</button>


      </div>
      <SpotifyAuth />

    </div>
  )
}
export default Page;
