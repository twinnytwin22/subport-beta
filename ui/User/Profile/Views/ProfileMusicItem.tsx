"use client";
import CollectCardMenu from "ui/Cards/Collect/CollectCardMenu";
import { useRouter } from "next/navigation";
import PlayButton from "ui/Cards/Collect/PlayButton";
import Image from "next/image";

const MusicItem = ({ drop, metaData, profile }: any) => {
    const imageHash =
        metaData?.image?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/") ||
        metaData?.data.image?.replace(
            "ipfs://",
            "https://gateway.ipfscdn.io/ipfs/"
        );
    const router = useRouter();

    const props = {
        metaData,
    };

    return (
        <tr
            key={drop.title}
            className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs md:text-sm min-w-full"
        >
            <th
                scope="row"
                className="flex items-center px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
            >
                <div className="block min-w-[40px] min-h-[40px] relative rounded-md bg-blue-300 w-fit mr-2">
                    <Image
                        src={imageHash}
                        className="object-cover w-10 h-10 rounded-md"
                        width={40}
                        height={40}
                        alt="Song"
                        placeholder="blur"
                        blurDataURL="/images/stock/blur.png"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50">
                        <PlayButton props={props} />
                    </div>
                </div>
            </th>
            <td
                onClick={() => router.push(`/drop/${drop?.slug}`)}
                className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
            >
                {drop?.title}
            </td>
            <td
                onClick={() => router.push(`/${profile?.username}`)}
                className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
            >
                Twinny Twin
            </td>
            <td className="px-4 py-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                    House
                </span>
            </td>
            <td className="pl-8 py-2 hidden md:block">
                <CollectCardMenu drop={drop} />
            </td>
        </tr>
    );
};

export default MusicItem;
