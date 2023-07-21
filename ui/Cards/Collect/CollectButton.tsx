'use client'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import DropLinksTo from 'ui/Sections/Drop/DropLInks'

function CollectButton({ props, drop }: any) {
    const [isOpen, setIsOpen] = React.useState(false)
    const handleOpenCollectMenu = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <>
            <div onClick={handleOpenCollectMenu}
                //  href={`/drop/${drop?.slug}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Collect
            </div>
            {isOpen &&
                <div className='absolute bottom-24 right-4  bg-black w-fit mx-auto justify-center p-4 rounded-2xl items-center flex '>
                    <div>
                        <Link href={`/drop/${drop.slug}`}>
                            <div
                                className="text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-950 dark:hover:bg-zinc-500 focus:outline-none "

                            >
                                <div className='flex space-x-2 mx-auto text-center items-center justify-center w-full'>Go to drop
                                    <FaArrowRight /></div>
                            </div></Link>

                        <DropLinksTo />
                        <button
                            className="text-white text-center w-full  focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-950 dark:hover:bg-zinc-500 focus:outline-none "

                            onClick={handleClose}>Close</button>

                    </div>
                </div>}
        </>
    )
}

export default CollectButton