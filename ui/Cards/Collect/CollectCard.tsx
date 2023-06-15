import Link from "next/link";
import React, { PureComponent } from "react";
import { MenuDots, HeartIcon, CommentIcon, CollectIcon } from "./EngagementUI";
import { fetchProfilesForDrops } from "utils/database";

async function CollectCard(props: any) {
  const drop = props?.drop
  const metaData = props?.metaData
  const imageHash = metaData?.image.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
  const [user]: any = await fetchProfilesForDrops(drop?.userId)
  console.log(user?.[0], 'user')


  return (
    <div className="flex flex-col static mx-auto w-full content-center justify-center">
      <div className="max-w-lg mx-auto bg-white border border-zinc-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 pt-3 shadow-xl shadow-zinc-200 dark:shadow-zinc-900 w-full">
        <div className="flex h-8 mb-2 justify-between items-center">
          <div className="block">
            <p className="text-[10px] pl-3">Created by</p>
            <Link href={`/users/${user?.username}`}>
              <p className="font-bold text-sm pl-3">@{user?.username}</p>
            </Link>
          </div>
          <div className="flex h-8 pr-3 hover:scale-110">
            <MenuDots />
          </div>
        </div>
        <a>
          <img
            className='w-full select-none' src={imageHash || '/images/stock/gravitron.png'} alt="" />
        </a>
        <div className="p-5 text-zinc-900 dark:text-white">
          <a href="#">
            <h5 className="mb-2 text-lg font-bold tracking-tight ">
              {drop?.name}
            </h5>
          </a>
          <div className="flex justify-between items-center mb-2">
            <div className="grid grid-cols-3 max-h-6 max-w-sm space-x-2">
              <div className="flex h-6 hover:scale-105 space-x-3">
                45
                <HeartIcon />
              </div>
              <div className="flex h-6 hover:scale-105 space-x-3">
                8<CommentIcon />
              </div>
              <div className="flex h-6 hover:scale-105 space-x-3">
                111
                <CollectIcon />
              </div>
            </div>
            <Link
              href="/nft/song"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Collect
            </Link>
          </div>
          <p className="text-xs">Collected by You & 67 more</p>
        </div>
      </div>
    </div>
  );
}

export default CollectCard;