import Link from 'next/link';
import React, { Suspense } from 'react';
import { LoadingContainer } from 'ui/LoadingContainer';
import FilterOptions from 'ui/Sections/Explore/FilterOptions';
import UserSuggestions from 'ui/Sections/Explore/UserSuggestions';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {/* Navigation Menu */}

            <div className="w-full flex max-w-6xl mx-auto">
                <div className='w-full lg:w-3/4'>
                    <div className='mt-12 relative'>
                        <div className="text-sm font-medium text-center text-zinc-500 border-b border-zinc-200 dark:text-zinc-400 dark:border-zinc-700">
                            <ul className="flex flex-wrap">
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
                            </ul>
                        </div>
                    </div>

                    {children}
                </div>
                <aside className='hidden lg:block lg:w-full max-w-xs relative float-right right-0 h-screen top-36'>
                    <div className='fixed right-0 h-full border-l border-zinc-200 dark:border-zinc-800'>
                        <Suspense fallback={<LoadingContainer />}>
                            <FilterOptions />
                            <UserSuggestions />
                        </Suspense>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Layout;
