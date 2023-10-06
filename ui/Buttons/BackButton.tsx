'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { UrlObject } from 'url'

function BackButton({ url }:{ url: string }) {
    const path = usePathname()
    const href = path === url
   // console.log(notPath)
   // console.log(path, url)
    return (
        <>
            {href &&
                <Link href={url}>
                    <button className='font-normal mt-4 flex items-center w-16 justify-between bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-md text-xs '>
                        <FaArrowLeft />
                        Back
                    </button>
                </Link>
            }
        </>
    )
}

export default BackButton