'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase, useImagePath, useIpfsImage } from 'lib/constants';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { fetchProfilesForDrops } from 'utils/use-server';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'; // Importing from react-query
import { toast } from 'react-toastify';
import { useAuthProvider } from 'app/context/auth';



function EventCard({ event }: any) {
    const imagePath = event.image || event.data.image;

    const { data: user } = useQuery(['user', event?.user_id], () => fetchProfilesForDrops(event?.user_id));
    const profileImagePath = useImagePath(user?.avatar_url);

    return user && (
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
                        className="object-center aspect-square object-cover min-w-full"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="p-4 text-zinc-800 dark:text-zinc-200">
                    <div className='flex justify-between items-center'>
                        <div>
                            <Link href={`/events/${event.slug}`}>
                                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{event.title}</h3></Link>
                            <p className="">
                                {event.date || event?.data?.date}
                            </p>
                        </div>
                        <EventSave event={event} />
                    </div>
                    <p className="text-xs">
                        {event?.location || event?.data?.location}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EventCard;


const EventSave = ({ event }: { event: any }) => {
    const { profile } = useAuthProvider()
    const [saved, setSaved] = useState(false)
    const id = event?.id || event?.data.id
    const title = event?.title || event?.data.title
    useEffect(() => {
        if (profile) {
            const checkSave = async () => {
                const { data, error } = await supabase
                    .from('user_saved_events')
                    .select()
                    .eq('saved_by', profile.id)
                    .eq('event_id', id);

                if (data && data.length > 0) {
                    setSaved(true);
                }
            };

            checkSave();
        }
    }, [id, profile.id]);

    const handleSaveEvent = async () => {

        if (!saved) {
            const { data } = await supabase
                .from('user_saved_events')
                .insert({ saved_by: profile.id, event_id: event.id || event.data.id })
                .select()
                .single()

            setSaved(true)
            toast(`You have bookmarked - ${title}`)
            return
        } else {
            const { data, error } = await supabase
                .from('user_saved_events')
                .delete()
                .eq('saved_by', profile.id)
            if (!error) {
                setSaved(false)
                toast(`Removed ${title} from event bookmarks`)
            }
        }
    }

    return profile && (
        <div onClick={handleSaveEvent}>
            {saved ?
                <FaBookmark className="w-fit text-xl" /> :
                <FaRegBookmark className="w-fit text-xl" />}
        </div>
    )
}