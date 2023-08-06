'use client'
import React from 'react';
import DropLinksTo from 'ui/Sections/Drop/DropLInks';
import { upload } from 'lib/content/mockUpload';
import CardEngagementRow from 'ui/Cards/Collect/EngagementWrapper';
import Image from 'next/image';
import PlayButton from 'ui/Cards/Collect/PlayButton';
import { CommentComponent } from './DropCommentUI';

export function DropPage({ props }: any) {
  console.log(props, "PROPS")
  const drop = props?.drop;
  const metaData = props?.metaData;
  const imageUrl = props?.imageUrl
  const reactionCount = props?.reactionCount || 5
  const comments = props?.comments || 5

  return props && (
    <div className="bg-zinc-100 dark:bg-black h-full flex max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto w-full mt-2.5 md:mt-12 pb-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto items-start w-full relative">
        <div className="w-full relative px-4 justify-end content-end">
          <div className="flex flex-col mb-2 max-w-lg mx-auto w-full relative">
            <div className="flex lg:items-end space-x-2">
              <h1 className="text-xl font-bold">{drop.title}</h1>
              <h1 className="text-2xl font-semibold">|</h1>

              <h1 className="text-xl font-bold">{upload.artist}</h1>
            </div>
            <div className="hidden">
              <h1 className="text-md mt-2">Available {upload.releaseDate}</h1>
            </div>
          </div>

          <div
            className="mx-auto max-w-lg w-full h-fit aspect-square relative justify-center content-center object-contain"
            style={{ position: 'relative' }}
          >
            <Image
              className="rounded-md select-none shadow-lg dark:shadow-zinc-950 shadow-zinc-300 object-cover aspect-square items-start w-full"
              src={imageUrl}
              style={{ objectFit: 'cover' }}
              alt="Song-cover"
              width={450}
              height={450}
              blurDataURL={"/images/stock/blur.png"}
            />
            <div className="absolute bottom-5 right-5">
              <PlayButton props={props} />

            </div>
          </div>
          <div className='flex w-full relative max-w-lg mx-auto'>
            <div className='w-[65%]'>
              <p className=" text-left mt-4 text-sm md:text-md  font-light text-zinc-500 lg:mb-8 md:text-md dark:text-zinc-300">
                {metaData?.description}
              </p>
            </div>
            <div className=" w-fit mt-4 ml-auto">
              <CardEngagementRow dropId={drop?.id} reactionCount={reactionCount} />
            </div>
          </div>

        </div>

        <div className="w-full max-w-lg lg:max-w-sm mt-12 lg:mt-4 lg:border-l-zinc-300 lg:dark:border-l-zinc-600 lg:border-l-2 lg:pl-16 p-4 h-full mx-auto overflow-y-auto">

          <div className="flex flex-col w-full mx-auto justify-center place-content-center place-items-center">

            <p className="text-xs mb-4 hidden">Collected by names, names, 67 more</p>
            <div className="w-full mx-auto">
              <DropLinksTo />
              <CommentComponent key={drop.id} dropId={drop.id} comments={comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
