import { headers } from 'next/headers';
import React from 'react'
import DropFeed from 'ui/Sections/Explore/DropFeed';

async function page() {
    const host = headers().get('host')
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
    const res = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
        method: "GET",
        /// headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });
    const dropRes = await res.json()
    const drops = dropRes?.dropsWithMetaData
    return (
        <div className="mx-auto p-8 mb-24">
            <DropFeed drops={drops} />
        </div>
    )
}

export default page