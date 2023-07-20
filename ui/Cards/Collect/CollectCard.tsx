import Link from "next/link";
import React, { Suspense } from "react";
import CardEngagementRow from "ui/Cards/Collect/EngagementWrapper";
import { fetchProfilesForDrops, getTotalReactions } from "utils/database";
import { useImagePath } from "lib/constants";
import CollectCardMenu from "./CollectCardMenu";
import Image from "next/image";
import PlayButton from "./PlayButton";


async function CollectCard(props: any) {
  const drop = props?.drop;
  const metaData = props?.metaData;
  const [user]: any = await fetchProfilesForDrops(drop?.user_id);
  const reactionCount = await getTotalReactions(drop?.id);
  const audioUrl = metaData?.animation_url?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
  const imageHash = metaData?.image?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/") || metaData.metadata.image.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/');
  const profileImagePath = useImagePath(user?.avatar_url);

  return (
    <div className="flex flex-col static mx-auto w-full content-center justify-center">
      <div className="max-w-lg mx-auto bg-white border border-zinc-200 rounded-lg dark:bg-zinc-950 dark:border-zinc-700 pt-3 shadow-xl shadow-zinc-200 dark:shadow-zinc-900 w-full">
        <div className="flex h-8 mb-2 justify-between items-center">
          <div className="flex items-center p-2.5">
            <Link href={`/${user?.username}`}>
              <Image
                width={32}
                height={32}
                className="shadow-lg dark:shadow-zinc-950 shadow-zinc-300 mx-4 lg:mx-auto w-8 h-8 rounded-full"
                src={profileImagePath}
                style={{ objectFit: "cover" }}
                alt="Song-cover"
                priority={true}
              />
            </Link>
            <div className="block">
              <p className="text-[10px] pl-3">Created by</p>
              <Link href={`/${user?.username}`}>
                <p className="font-bold text-sm pl-3">@{user?.username}</p>
              </Link>
            </div>
          </div>
          <div className="flex h-8 pr-3 relative z-50 ">
            <CollectCardMenu />
          </div>
        </div>
        <div className="w-full relative min-w-md h-full">
          <div className="relative">
            <Image
              width={500}
              height={500}
              className="w-full"
              src={imageHash}
              style={{ objectFit: "cover" }}
              alt="Song-cover"
              priority={true}
            />
            <PlayButton props={props} />
          </div>
        </div>
        <div className="p-5 text-zinc-900 dark:text-white">
          <a href="#">
            <h5 className="mb-2 text-lg font-bold tracking-tight ">{drop?.name}</h5>
          </a>
          <div className="flex justify-between items-center mb-2">
            <Suspense fallback="">
              <CardEngagementRow dropId={drop?.id} reactionCount={reactionCount} />
            </Suspense>
            <Link
              href={`/drop/${drop?.slug}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Collect
            </Link>
          </div>
          <p className="text-xs border-hidden">Collected by You & 67 more</p>
        </div>
      </div>
    </div>
  );
}

export default CollectCard;
