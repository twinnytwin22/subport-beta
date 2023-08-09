'use client'
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { LoadingContainer } from 'ui/LoadingContainer';
import FilterOptions from 'ui/Sections/Explore/FilterOptions';
import UserSuggestions from 'ui/Sections/Explore/UserSuggestions';
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    useHandleOutsideClick(isOpen, setIsOpen, 'right-sidebar')
    const handleRightSideBar = () => {
        if (!isOpen) {
            setIsOpen(true)
            return
        } else setIsOpen(false)
        return
    }
    return (
        <div className="w-full flex max-w-6xl mx-auto">
            <div className='w-full lg:w-3/4'>
                <div className='md:mt-2 relative w-full max-w-6xl'>
                    <div className="fixed left-0 sm:left-32 lg:left-64 z-50 right-0 w-full text-sm font-medium text-center text-zinc-500 border-b border-zinc-200 dark:text-zinc-400 dark:border-zinc-800 bg-zinc-100 dark:bg-black">
                        <ul className="flex flex-wrap w-full ml-8 items-center">
                            <li className="mr-2">
                                <Link href="/explore/" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300">Feed</Link>
                            </li>
                            <li className="mr-2">
                                <Link href="/explore/drops" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300">Drops</Link>
                            </li>
                            <li className="mr-2">
                                <Link href="/explore/artists" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300">Artists</Link>
                            </li>
                            <li>
                                <Link href="/explore/events" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300">Events</Link>
                            </li>
                            <li className='right-sidebar block lg:hidden' onClick={handleRightSideBar}>
                                <div className="inline-block mt-1.5 px-6  p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300"><BsFillFilterSquareFill /></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mt-24 relative z-0 mx-auto'>
                    {children}
                </div>
            </div>
            <aside className='hidden lg:block lg:w-full max-w-xs relative float-right right-0 h-screen top-16'>
                <div className='fixed right-0 h-full w-full max-w-xs border-l border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black'>
                    <Suspense fallback={<LoadingContainer />}>
                        <FilterOptions />
                        <div className='hidden lg:block'>
                            <UserSuggestions />
                        </div>
                    </Suspense>
                </div>
            </aside>
            {isOpen ? (
                <aside className='right-sidebar lg:hidden block lg:w-full max-w-xs relative float-right right-0 h-screen top-16'>
                    <div className='fixed right-0 h-full w-full max-w-xs border-l border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black'>
                        <Suspense fallback={<LoadingContainer />}>
                            <FilterOptions />
                            <div className='hidden lg:block'>
                                <UserSuggestions />
                            </div>
                        </Suspense>
                    </div>
                </aside>)
                : ('')}
        </div>
    );
}

export default Layout;
