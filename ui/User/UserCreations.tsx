import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const combineAndSortData = (request1Data: any, request2Data: any) => {
    // Check if request1Data is an array, if not, convert it into an array
    const arrayData1 = Array.isArray(request1Data) ? request1Data : [request1Data];

    // Check if request2Data is an array, if not, convert it into an array
    const arrayData2 = Array.isArray(request2Data) ? request2Data : [request2Data];

    // Combine the data from both requests
    const combinedData: any = [...arrayData1, ...arrayData2];

    // Map and extract the required fields
    const mappedData: any = combinedData.map((item: any) => {
        if (item?.title) {
            // This is an event item
            return {
                title: item.title,
                created_at: new Date(item.created_at).getTime(),
                slug: item.slug,
                type: 'event', // We'll add a type field to distinguish between events and collectibles
            };
        } else if (item?.drop.name) {
            // This is a collectible item
            return {
                title: item.drop.name,
                created_at: new Date(item.drop.created_at).getTime(),
                slug: item.drop.slug,
                type: 'collectible', // We'll add a type field to distinguish between events and collectibles
            };
        }
        return null; // If the item doesn't have a title or name, we'll skip it
    });

    // Remove null entries from mappedData array
    const filteredData = mappedData.filter((item: any) => item !== null);

    // Sort the data by the 'created_at' field in descending order (most recent first)
    filteredData.sort((a: any, b: any) => b.created_at - a.created_at);

    return filteredData;
};



async function UserCreations() {
    const host = headers().get('host');
    const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
    const res1 = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
        method: 'GET',
        cache: 'no-store',
    });
    const res2 = await fetch(`${protocol}://${host}/api/v1/getIRLEvents`, {
        method: 'GET',
        cache: 'no-store',
    });
    const drops = await res1.json();
    const event = await res2.json();
    const dropsWithMetaData = drops?.dropsWithMetaData

    const sortedData = combineAndSortData(dropsWithMetaData, event);
    if (sortedData) {
        return (
            <div className="relative overflow-x-auto mt-12">
                <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 mx-auto max-w-5xl border border-zinc-200 dark:border-zinc-800 rounded-md">
                    <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Slug
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item: any) => (
                            <tr
                                key={item.slug}
                                className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-700"
                            >
                                <td className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4">
                                    {item.type === 'event' ?
                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-purple-400 border border-purple-400">Event</span>
                                        :
                                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-green-400 border border-green-400">Collectible</span>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`${item.type === 'event' ? `/events/${item.slug}` : `/drop/${item.slug}`}`}>{item.slug}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <p className='text-center h-full items-center mx-auto mt-24 text-zinc-500'>
            Your creations will appear here.
        </p>
    )
}

export default UserCreations;
