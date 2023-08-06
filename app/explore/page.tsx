import { headers } from 'next/headers';
import React from 'react'

async function page() {
    const host = headers().get('host')
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
    const dropRes = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
        method: "GET",
        /// headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });

    const eventRes = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
        method: "GET",
        /// headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });

    const drops = await dropRes.json()
    const events = await eventRes.json()

    if (events && drops) {
        console.log(events, drops, "FEED")
        return (
            <div>
                <div>Drops:{JSON.stringify(drops)}</div>
                <div>Events:{JSON.stringify(events)}</div>

            </div>
        )
    }
}
export default page