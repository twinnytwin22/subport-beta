'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import React from 'react'

const ViewButtons = ({ path, item }: { path: string; item?: any }) => {
    const segment = useSelectedLayoutSegments();
    const href = item?.slug ? path + '/' + item?.slug : path;
    const isActive =
        // Example home pages e.g. `/layouts`
        (!item?.slug && segment === null) ||
        segment === item?.segment ||
        // Nested pages e.g. `/layouts/electronics`
        segment === item?.slug;

    console.log(segment)
    return (
        <div>
            <Link href={href}>
                <button type="button" className="px-4 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-l-lg hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >List View</button>
            </Link>
            <Link href={href}>

                <button type="button" className="px-4 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-r-md hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >Card View</button></Link>

        </div>
    )
}

export default ViewButtons