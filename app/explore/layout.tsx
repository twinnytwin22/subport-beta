import Link from 'next/link'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className='mt-12'>
                <div className="text-sm font-medium text-center text-zinc-500 border-b border-zinc-200 dark:text-zinc-400 dark:border-zinc-700">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                            <Link href="/explore/" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300">Overview</Link>
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
    )
}

export default layout