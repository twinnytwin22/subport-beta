'use client'
import React from 'react';
import DropLinksTo from 'ui/Sections/Drop/DropLInks';
import { upload } from 'lib/content/mockUpload';
import DropNav from 'ui/Sections/Drop/DropNav';
import CardEngagementRow from 'ui/Cards/Collect/EngagementWrapper';
import Image from 'next/image';

export function DropPage({ props }: any) {
  console.log(props, "PROPS")
  const drop = props?.drop;
  const metaData = props?.metaData;
  const imageUrl = props?.imageUrl
  const reactionCount = props?.reactionCount || 5
  const comments = props?.comments || 5

  return props && (
    <div className="bg-gray-100 dark:bg-black h-full flex max-w-7xl mx-auto w-full mt-4 pb-12">
      <div className="flex flex-col lg:flex-row mx-auto items-center w-full">
        <div className="w-full relative px-4 mx-4 justify-center content-center">
          <div
            className="mx-auto max-w-2xl w-full h-full aspect-square relative justify-center content-center"
            style={{ position: 'relative' }}
          >
            <Image
              fill
              className="rounded-2xl shadow-lg dark:shadow-zinc-950 shadow-zinc-300  lg:mx-auto w-full"
              src={imageUrl}
              style={{ objectFit: 'cover' }}
              alt="Song-cover"
              priority={true}
            />
          </div>
          <div className="w-36 absolute pt-8 right-10">
            <CardEngagementRow dropId={drop?.id} reactionCount={reactionCount} />
          </div>
        </div>

        <div className="w-full max-w-lg lg:max-w-sm md:mt-8 lg:border-l-zinc-300 lg:dark:border-l-zinc-600 lg:border-l-2 lg:pl-16 p-4 h-full">
          <div className="flex flex-col">
            <div className="block">
              <h1 className="text-2xl font-extrabold">{drop.name}</h1>
            </div>
            <div className="">
              <h1 className="text-xl font-semibold">{upload.artist}</h1>
            </div>
            <div className="">
              <h1 className="text-md mt-4">Available {upload.releaseDate}</h1>
            </div>
          </div>
          <p className="mb-6 text-sm md:text-md font-light text-gray-500 lg:mb-8 md:text-md dark:text-gray-400">
            {metaData?.description}
          </p>
          <div className="flex flex-col w-full mx-auto justify-center place-content-center place-items-center">
            <p className="text-xs mb-4">Collected by names, names, 67 more</p>
            <div className="w-full">
              <DropLinksTo />
              <DropNav dropId={drop?.id} comments={comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
