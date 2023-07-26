'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

function CreateBackButton() {
    const path = usePathname()
    return (
        <>
            {path !== '/create' &&
                <Link href='/create'>
                    <button className='font-normal mt-4 flex items-center w-16 justify-between bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-md text-xs '>
                        <FaArrowLeft />
                        Back
                    </button>
                </Link>
            }
        </>
    )
}

export default CreateBackButton