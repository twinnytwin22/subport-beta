import Link from 'next/link'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'

async function MinIEventCard({ Dates, event }: any) {
    return (
        <div className=''>
            <div
                key={event.title}
                className="bg-white dark:bg-black shadow-lg rounded-md p-4 mx-auto border border-zinc-100 dark:border-zinc-800 relative mb-6 shadow-zinc-200 dark:shadow-zinc-950 "
                style={{ minWidth: '375px', maxWidth: '375px', minHeight: '125px', maxHeight: '125px' }}
            >                <div className="flex justify-between">
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
                                <p className="text-zinc-500 text-xs dark:text-zinc-300">
                                    {event.location}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link className='w-fit' href={`/events/irl/${event?.slug}`}>
                        <div className=" hover:ring  h-fit hover:ring-blue-700 text-center  text-black dark:text-white font-bold hover:shadow-md  shadow text-xs px-2.5 py-2.5 rounded-lg  sm:mr-2 mb-1 ease-linear transition-all duration-150 w-24">
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
        </div>
    )
}

export default MinIEventCard