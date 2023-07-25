import React from 'react'
import Image from 'next/image'
import { FaMapPin } from 'react-icons/fa'

function EventHeader({ image, event, Dates }: any) {
    return (
        <div>
            <div className="relative rounded-md overflow-hidden border border-zinc-300 dark:border-zinc-800 max-w-screen mx-auto">
                <Image
                    className="relative h-60 md:h-80 lg:h-96 bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden"
                    width={2000}
                    height={300}
                    src={image}
                    alt='bg-image'
                    style={{ objectFit: 'cover', filter: 'blur(1.5rem)' }}
                />
                <div
                    style={{
                        // Apply the blur effect here
                    }}
                    className="absolute top-0 left-0 right-0 bottom-0 bg-black w-full bg-opacity-75 overflow-hidden"
                ></div>
                <div className="absolute z-30 left-0 right-0 bottom-0">
                    <div className="flex justify-between mx-auto p-6 md:p-10 items-end">

                        <div className="space-y-2">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">{event.title}</h1>
                            <p className="text-zinc-200 text-sm lg:text-base">{Dates.fullDate}</p>

                            <div className="text-white flex space-x-1 text-xs lg:text-sm  pr-6 lg:pr-0"><FaMapPin />{event.location}</div>
                        </div>
                        <Image
                            width={200}
                            height={200}
                            src={image}
                            alt={event.title}
                            className="w-24 h-24 aspect-square md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-md border border-zinc-600 dark:border-zinc-700"
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EventHeader