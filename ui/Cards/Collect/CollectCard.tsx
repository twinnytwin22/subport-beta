import Link from "next/link";
import React, { Suspense } from "react";
import CardEngagementRow from "ui/Cards/Collect/EngagementWrapper";
import { fetchProfilesForDrops, getTotalReactions } from "utils/database";
import { useImagePath } from "lib/constants";
import CollectCardMenu from "./CollectCardMenu";
import Image from "next/image";
import PlayButton from "./PlayButton";
import CollectButton from "./CollectButton";


async function CollectCard(props: any) {
  const drop = props?.drop;
  const metaData = props?.metaData;
  const [user]: any = await fetchProfilesForDrops(drop?.user_id);
  const reactionCount = await getTotalReactions(drop?.id);
  const audioUrl = metaData?.animation_url?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
  const imageHash = metaData?.image?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/") || metaData.metadata.image.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/');
  const profileImagePath = useImagePath(user?.avatar_url);

  return (
    <div className="flex flex-col static mx-auto w-full content-center justify-center overflow-hidden">
      <div className="max-w-lg mx-auto bg-white border border-zinc-200 rounded-md dark:bg-zinc-950 dark:border-zinc-700 pt-3 shadow-xl shadow-zinc-200 dark:shadow-zinc-900 w-full relative">
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
                blurDataURL={'/images/stock/blur.png'}
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
            <CollectCardMenu drop={drop} />
          </div>
        </div>
        <div className="w-full relative min-w-md h-full">
          <div className="relative aspect-square object-cover">
            <Image
              priority={false}
              width={500}
              height={500}
              className="w-full aspect-square"
              src={imageHash}
              style={{ objectFit: "cover" }}
              alt="Song-cover"
              placeholder="blur"
              blurDataURL={'/images/stock/blur.png'}
            />
            <div className="absolute bottom-5 right-5">
              <PlayButton props={props} />

            </div>
          </div>
        </div>
        <div className="p-5 text-zinc-900 dark:text-white">
          <Suspense fallback="">
            <div className="w-fit scale-110">
              <CardEngagementRow dropId={drop?.id} reactionCount={reactionCount} />
            </div>
          </Suspense>

          <div className="flex justify-between items-center mb-2">
            <Link href={`/drop/${drop.slug}`}>
              <h5 className="mt-2 text-lg font-bold tracking-tight ">{drop?.name}</h5>
            </Link>
            <CollectButton drop={drop} props={props} />
          </div>
          <p className="text-xs border-hidden">Collected by You & 67 more</p>
        </div>
      </div>
    </div>
  );
}

export default CollectCard;
