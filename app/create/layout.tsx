'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
function layout({ children }: { children: React.ReactNode }) {
    const path = usePathname()
    console.log(path)
    return (
        <div className='relative'>
            {path !== '/create' &&
                <Link href='/create'>
                    <button className='font-normal mt-4 flex items-center w-16 justify-between bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-xl text-xs '>
                        <FaArrowLeft />
                        Back
                    </button>
                </Link>
            }

            {children}</div>
    )
}

export default layout