import React from 'react'
import Image from 'next/image'
import { useIpfsImage } from 'lib/constants'
import { FaBookmark } from 'react-icons/fa'

function EventCard({ event }: any) {
    return (
        <div key={event.id} className="event-card bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-lg rounded-lg overflow-hidden max-w-sm w-full">
            {/* Replace useIpfsImage with the actual URL of the image */}

            <div className="w-full relative">
                <Image
                    src={useIpfsImage(event.image)}
                    alt={event.title}
                    className="object-center aspect-square object-cover"
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
        </div>)
}

export default EventCard