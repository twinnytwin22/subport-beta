import React from 'react'
import Image from 'next/image'
import { useImagePath, useIpfsImage } from 'lib/constants'
import { FaBookmark } from 'react-icons/fa'
import { fetchProfilesForDrops } from 'utils/use-server'
import Link from 'next/link'

async function EventCard({ event }: any) {

    const imagePath = event.image || event.data.image
    const user = await fetchProfilesForDrops(event?.user_id);
    const profileImagePath = useImagePath(user?.avatar_url);

    return (

        <div key={event.id} className="flex flex-col static mx-auto w-full content-center justify-center overflow-hidden">
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
                        {''}
                    </div>
                </div>
                <div className="w-full relative">
                    <Image
                        priority={false}
                        placeholder="blur"
                        blurDataURL={'/images/stock/blur.png'}
                        src={useIpfsImage(imagePath)}
                        alt={event.title}
                        className="object-center aspect-square object-cover w-full"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="p-4 text-zinc-800 dark:text-zinc-200">
                    <div className='flex justify-between items-center'>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{event.title}</h3>
                            <p className="">
                                {event.date}
                            </p>
                        </div>
                        <FaBookmark className="w-12" />
                    </div>

                    <p className="text-xs">
                        {event.location}
                    </p>
                </div>

            </div>
        </div>)
}

export default EventCard