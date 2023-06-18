'use client'
import React from 'react'
import { MenuDots } from './EngagementUI'
import { useState } from 'react'
import { FaTwitter, FaCopy, } from 'react-icons/fa'

function CollectCardMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const handleMenuClick = () => {
        if (!isOpen) {
            setIsOpen(true)
            return
        } else {
            setIsOpen(false)
            return
        }
    }
    return (
        <div className=''>
            <div className={`flex h-8 pr-3 ${!isOpen && "hover:scale-110"}`} onClick={handleMenuClick}>
                <MenuDots />
            </div>
            {isOpen &&
                <div className='absolute isolate right-0 pl-8'>

                    <ul className="w-48 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white opacity-90">
                        <li className="w-full px-4 py-2 flex justify-between border-b border-zinc-200 rounded-t-lg dark:border-zinc-600 hover:dark:bg-zinc-700">Share on Twitter<FaTwitter /></li>
                        <li className="w-full px-4 py-2 flex justify-between border-b border-zinc-200 dark:border-zinc-600 hover:dark:bg-zinc-700">Copy Link <FaCopy /></li>
                        <li className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-zinc-700">Report</li>
                    </ul>

                </div>}
        </div>
    )
}

export default CollectCardMenu
