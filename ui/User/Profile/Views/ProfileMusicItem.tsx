'use client'
import CollectCardMenu from "ui/Cards/Collect/CollectCardMenu"
import { useRouter } from 'next/navigation'



const MusicItem = ({ drop, metaData, profile }: any) => {
    const imageHash = metaData?.image?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/') || metaData?.data.image?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
    console.log("ITEM", drop, metaData)
    const router = useRouter()
    return (
        <tr key={drop.name}
            className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs md:text-sm min-w-full ">

            <th scope="row"
                className="flex items-center px-4 py-2  font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                <div className="block min-w-[40px] min-h-[40px] rounded-md bg-blue-300 w-fit mr-2">
                    <img src={imageHash} className='object-cover  w-10 h-10 rounded-md' />
                </div>

            </th>
            <td onClick={() => router.push(`/drop/${drop?.slug}`)} className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">{drop?.name}</td>

            <td onClick={() => router.push(`/${profile?.username}`)} className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">Twinny Twin</td>
            <td className="px-4 py-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">House</span>
            </td>
            <td className="pl-8 py-2 hidden md:block">
                <CollectCardMenu />
            </td>

        </tr>
    )
}

export default MusicItem