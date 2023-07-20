'use client'
import 'viem/window'
import React, { useEffect, useState } from "react";
import { deployCollectible, deployContractViem } from "lib/deployFunctions/deployer";
import { toast } from "react-toastify";
import { useAuthProvider } from "app/context/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { uploadToIpfs } from "lib/deployFunctions/uploadFileIpfs";
import Image from 'next/image';
import SpotifyAuth from 'utils/testSpotifyLogic';
import { supabase } from 'lib/constants';
import { useStorageUpload } from '@thirdweb-dev/react';
import { readSingleContractURI } from 'lib/hooks/readSingleContractURI';
import { readContractURIs } from 'lib/hooks/readContractURIs';

let getName = 'Always' + Math.random();
let name = getName.toString()
const artistName = 'Twinny Twin';
const startDate = Math.round(Date.now() / 1000);
const endDate = 0;
const contractUri = 'ipfs://testcontracturi';
const totalSupply = 500;
const slug = (artistName.toLowerCase() + '-' + name.toLowerCase()).replace(/\s+/g, '-');
const storage = new ThirdwebStorage();
const userId = ''
const genre = 'house'
const tokenName = 'TEST'



type TestMessage = {
  title: string
}

const testMessages = ({ title }: TestMessage) => {
  return {
    success: `Test "${title}" succeeded!`,
    fail: `Test "${title}" failed!`,
  };
};


const collectibleData = {
  name,
  tokenName,
  start_date: startDate,
  address: '0xb58952',
  artist_name: artistName,
  end_date: endDate,
  contractUri: '0xb58952',
  tokenHash: '0xb58952',
  total_collectibles: totalSupply,
  genre,
  description: 'this is the test description',
  audio: '/audio/song.mp3',
  image: 'test.png'
};


const deployDataDefined = {
  name,
  tokenName,
  startDate,
  endDate,
  contractUri: '0xb58952',
  tokenHash: '0xb58952',
  totalSupply,
};

const deployData = Object.values(deployDataDefined);
function Page(props: any) {
  const [responseJSON, setResponseJSON] = useState('');
  const [loading, isLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [testSlug, setTestSlug] = useState('')
  const { user } = useAuthProvider()
  const { mutateAsync: upload } = useStorageUpload({
    onProgress: (progress) => {
      console.log(progress);
    },
  });


  const [savedUser, setSavedUser] = useState<any>('')

  if (!savedUser && user) {
    setSavedUser(user)
  }

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


  const handleOtherClick = async () => {
    const collectibleData = {
      name,
      keywords: ['testing', 'this', 'thang'],
      tokenName,
      start_date: startDate,
      address: '0xb58952',
      artist_name: artistName,
      end_date: endDate,
      contractUri: '0xb58952',
      tokenHash: '0xb58952',
      total_collectibles: totalSupply,
      genre,
      description: 'this is the test description',
      audio: '/audio/song.mp3',
      image: 'test.png',
      user_id: savedUser?.id,
      spotify_uri: 'http://test.uri'
    };
    const messages = testMessages({ title: "Deploy" });
    isLoading(true);
    try {
      const address = await deployCollectible(collectibleData)
      console.log('RES:', address, user);

      if (address) {
        setResponseJSON(JSON.stringify(address))
      }
    } catch (error) {
      setResponseJSON(JSON.stringify(error)); // JSON response you want to stringify
      toast(messages.fail);
    }

    isLoading(false);
  };

  const handleClick = async () => {
    const messages = testMessages({ title: "Deploy" });
    isLoading(true);

    try {
      const address = await deployContractViem({ deployData });
      console.log('RES:', address);
      const { data: drop, error } = await supabase
        .from("drops")
        .insert([
          {
            slug: slug,
            genre: genre,
            user_id: user?.id,
            contract_address: address
          }
        ])
        .eq("user_id", user?.id);
      if (error) {
        setResponseJSON(JSON.stringify(error)); // JSON response you want to stringify
        toast(messages.fail);
      } else {
        setResponseJSON(JSON.stringify({ address })); // JSON response you want to stringify
        toast(messages.success);
      }
      return address
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

  async function fetchData() {
    isLoading(true)

    try {
      const slug = 'twinny-twin-always'
      const contractArray = ["0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85"];
      const contractAddress = "0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85";
      const res = await fetch('/api/v1/refreshCache')

      // const res = await fetch('/api/v1/getCollectibles')
      //  const res = await fetch(`/api/v1/getSingleCollectibleBySlug?slug=${slug}`)
      //const res = await readSingleContractURI(contractAddress)
      // const res = await readContractURIs(contractArray)
      const data = await res.json()
      if (data) {
        setResponseJSON(JSON.stringify(data, null, 2)); // Assuming `drop` is the JSON response you want to stringify
      }
    } catch (error) {
      console.log(error)
    }
    isLoading(false)

  }


  async function fetchDrop() {
    isLoading(true)

    try {
      const slug = testSlug
      const contractArray = ["0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85"];
      const contractAddress = "0x5a30a9c62e87ee0ed3c6c1229fe6fe256e70564b"
        ;
      // const res = await fetch('/api/v1/refreshCache')

      // const res = await fetch('/api/v1/getCollectibles')
      const res = await fetch(`/api/v1/getSingleCollectibleBySlug?slug=${slug}`)
      //const res = await readSingleContractURI(contractAddress)
      // const res = await readContractURIs(contractArray)
      const data = await res.json()
      if (data) {
        setResponseJSON(JSON.stringify(data, null, 2)); // Assuming `drop` is the JSON response you want to stringify
      }
    } catch (error) {
      console.log(error)
    }
    isLoading(false)

  }
  const handleProgress = async () => {

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
      <input value={testSlug} onChange={((e) => setTestSlug(e.target.value))} placeholder='TEST SLUG HERE' />
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
        <button onClick={handleProgress}>PROGRESS</button>
        <button onClick={handleOtherClick}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">DEPLOY WITH CLIENT / METAMASK</button>
        <br />
        <button onClick={fetchDrop}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">FETCH</button>

        <button onClick={fetchData}
          className="p-4 bg-blue-600 justify-center text-white rounded-lg mx-auto font-bold hover:scale-105 duration-200 ease-in-out">REFRESH CACHE</button>

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
