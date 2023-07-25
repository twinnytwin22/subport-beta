import Link from 'next/link'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'

function MinIEventCard({ Dates, event }: any) {
    return (
        <div className="bg-white dark:bg-black shadow rounded-md p-4 max-w-sm mx-auto border border-zinc-100 dark:border-zinc-800 relative mb-6">
            <div className="flex justify-between">
                <div>
                    <div className="mb-4 flex items-center space-x-2">
                        <h1 className="text-base font-bold">{event.title}</h1>
                        <p>|</p>
                        <p className="text-zinc-500  dark:text-zinc-300 text-base">
                            {Dates.mmdd}
                        </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <p className="text-zinc-500 text-sm dark:text-zinc-300">
                                {event.location}
                            </p>
                        </div>
                    </div>
                </div>
                <Link href={`/events/irl/${event?.slug}`}>
                    <div className=" ring ring-blue-600 h-fit hover:ring-blue-700 text-center text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-2.5 py-2.5 rounded-lg outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 w-32">
                        {event.ticket_status}
                    </div>
                </Link>

            </div>

            <div className="mt-4 flex">
                <p className="text-zinc-600 hidden dark:text-zinc-300">
                    {event.ticket_quantity}
                </p>
            </div>
            <FaBookmark className="w-12 absolute right-5 bottom-7" />

        </div>
    )
}

export default MinIEventCard