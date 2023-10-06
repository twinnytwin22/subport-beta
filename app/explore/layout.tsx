'use client'
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { LoadingContainer } from 'ui/LoadingContainer';
import FilterOptions from 'ui/Sections/Explore/FilterOptions';
import UserSuggestions from 'ui/Sections/Explore/UserSuggestions';
import { BsFillFilterSquareFill, BsViewStacked } from 'react-icons/bs'
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
import { TfiViewGrid, TfiViewList } from 'react-icons/tfi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
function Layout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams().get('view')
    const router = useRouter()
    const pathName = usePathname()
    const path = pathName + '?view='
    // console.log(path)

    const [isOpen, setIsOpen] = useState(false)
    useHandleOutsideClick(isOpen, setIsOpen, 'right-sidebar')
    const handleRightSideBar = () => {
        setIsOpen((prevState) => !prevState)

    }

    const handleOptionSelect = (path: any) => {
        if (path === 'Feed') {
            router.push(`/explore?view=${searchParams}`)
        } else if (path === 'Drops') {
            router.push(`/explore/drops?view=${searchParams}`)
        } else if (path === 'Artists') {
            router.push(`/explore/artists?view=${searchParams}`)
        } else if (path === 'Events') {
            router.push(`/explore/events?view=${searchParams}`)
        } else {
            return
        }

    }
    return (
        <div className="w-full flex max-w-6xl mx-auto">
            <div className='w-full lg:w-3/4'>
                <div className='md:mt-2 relative w-full max-w-6xl'>
                    <div className="fixed left-0 sm:left-32 lg:left-64 z-50 right-0 w-full text-sm font-medium text-center text-zinc-500 border-b border-zinc-200 dark:text-zinc-400 dark:border-zinc-800 bg-zinc-100 dark:bg-black">
                        <div className='flex items-center justify-start space-x-2 md:space-x-4'>
                            <div className="flex flex-wrap w-full md:ml-8 items-center">
                                <div className='md:flex items-center hidden'>
                                    <div className="md:mr-2">
                                        <Link href={`/explore?view=${searchParams}`} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300 ${pathName == '/explore' && 'text-blue-500'}`}>Feed</Link>
                                    </div>
                                    <div className="md:mr-2">
                                        <Link href={`/explore/drops?view=${searchParams}`} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300 ${pathName == '/explore/drops' && 'text-blue-500'}`}>Drops</Link>
                                    </div>
                                    <div className="md:mr-2">
                                        <Link href={`/explore/artists?view=${searchParams}`} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300 ${pathName == '/explore/artists' && 'text-blue-500'}`}>Artists</Link>
                                    </div>
                                    <div>
                                        <Link href={`/explore/events?view=${searchParams}`} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300 ${pathName == '/explore/events' && 'text-blue-500'}`}>Events</Link>
                                    </div>
                                    <div className='right-sidebar block lg:hidden' onClick={handleRightSideBar}>
                                        <div className="inline-block mt-1.5 pr-6 md:px-6  p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300"><BsFillFilterSquareFill /></div>
                                    </div>
                                </div>
                                <div className='flex items-center md:hidden px-4 pt-1'>
                                    <select onChange={((e) => handleOptionSelect(e.target.value))} id='feed-navigation' className='bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1.5 dark:bg-zinc-950 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                        <option value='Feed' className="md:mr-2">
                                            Feed
                                        </option>
                                        <option value='Drops' className="md:mr-2">
                                            Drop
                                        </option>
                                        <option value='Artists' className="md:mr-2">
                                            Artists
                                        </option>
                                        <option value='Events'>
                                            Events
                                        </option>

                                    </select>
                                    <div className='right-sidebar block lg:hidden' onClick={handleRightSideBar}>
                                        <div className="inline-block mt-1.5 pr-6 md:px-6  p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300"><BsFillFilterSquareFill /></div>
                                    </div>
                                </div>
                                <div className='flex md:ml-4 p-4  justify-start space-x-4 items-center font-bold text-lg text-zinc-800 dark:text-zinc-200 h-fit'>
                                    <p className='cursor-pointer' onClick={(() => router.push(path))}><BsViewStacked className={`${!searchParams && 'text-blue-500'}`} /></p>
                                    <p className='cursor-pointer' onClick={(() => router.push(path + 'tile'))}> <TfiViewGrid className={`${searchParams == 'tile' && 'text-blue-500'}`} /></p>
                                    <p className='cursor-pointer' onClick={(() => router.push(path + 'list'))}><TfiViewList className={`${searchParams == 'list' && 'text-blue-500'}`} /></p>

                                </div>
                            </div>

                        </div>
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
