import { headers } from 'next/headers';
import React from 'react'
import DropFeed from 'ui/Sections/Explore/DropFeed';
import { fetchAllCollectibles } from 'utils/use-server';

export const dynamic = 'force-dynamic'
export const revalidate = 5

async function page() {
    const [dropRes] = await Promise.all([
        fetchAllCollectibles()
    ])
    const drops = dropRes?.dropsWithMetaData
    return (
        <div className="mx-auto py-8 md:p-8 mb-24">
        <DropFeed drops={drops} />
        </div>
    )
}

export default page