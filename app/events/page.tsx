import React from 'react'
import { headers } from 'next/headers';
async function page() {
    const host = headers().get('host')
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
    const res = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
        method: "GET",
        /// headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });

    const data = await res.json()

    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default page