'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch/DarkModeSwitch';
import { useAuthProvider } from 'app/context/auth';
import { MenuDots } from 'ui/Cards/Collect/EngagementUI';
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';


function UserCreationsTableMenu({ profile, type,  slug}: any) {
    const Type = type == 'event' ? 'Event' : 'Drop'
    const [isOpen, setOpen] = useState(false)
    const href = type === 'event' ? `/events/${slug}` : `/drop/${slug}/?editDrop=true`

    const { signOut } = useAuthProvider();
    useHandleOutsideClick(isOpen,setOpen, `creations-menu${slug}`)

    return (
        <div className={`-mr-3 z-[9999] creations-menu${slug}`}>
            <div className='absolute'

                onClick={() => setOpen(true)}>
                <div className='w-8 text-center justify-center mx-auto '>

                    <MenuDots />
                </div>
            </div>
            {isOpen &&
                <ul className={`creations-menu${slug} absolute top-4 right-0 z-10 w-48 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md dark:bg-zinc-950 dark:border-zinc-700 dark:text-white opacity-[95%]`}>
                    <li className="w-full px-4 py-2 border-b border-zinc-200 rounded-t-lg dark:border-zinc-700">Go to</li>

                    <Link href={href}>
                        <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 hover:dark:bg-zinc-700">Edit{` ${Type}`}</li>
                    </Link>
                    <Link href='/settings'>
                        <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 hover:dark:bg-zinc-700">Copy Url</li>
                    </Link>
                    <li  className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-zinc-700 relative">Share</li>
                </ul>}
        </div>
    )
}

export default UserCreationsTableMenu