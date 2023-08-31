'use client'

import { useAuthProvider } from "app/context/auth";
import Link from "next/link";
import React from "react";
import { FaSpotify, FaMusic } from "react-icons/fa";

function DropLinksTo({ dropId }: any) {
  const { user, profile, isLoading } = useAuthProvider()

  const handleCollect = () => {
    console.log('collect')
  }
  const handleSpotifySave = () => {
    console.log('spotify save')
  }

  const handleApplyMusicSave = () => {
    console.log('apple save')
  }
  return (
    <div className="text-lg w-sm">
      <div onClick={handleCollect}
        className="text-white text-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save to collect
      </div>
      <div onClick={handleSpotifySave}

        className="text-white text-center w-full bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
      >
        <div className="flex mx-auto space-x-2 items-center justify-center">
          <FaSpotify />
          <p>Save on Spotify</p> </div>

      </div>
      <div onClick={handleApplyMusicSave}

        className="text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 bg-rose-600 dark:hover:bg-rose-500 focus:outline-none "
      >
        <div className="flex mx-auto space-x-2 items-center justify-center">
          <FaMusic />
          <p>Save on Apple Music</p> </div>
      </div>
    </div>
  );
}

export default DropLinksTo;
