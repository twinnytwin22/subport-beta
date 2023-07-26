import { supabase } from 'lib/constants';
import { supabaseAdmin } from 'lib/providers/supabase/supabase-lib-admin';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import UserCreationsTable from './UserCreationsTable';

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
                type: 'event',
                user_id: item.user_id // We'll add a type field to distinguish between events and collectibles
            };
        } else if (item?.drop.name) {
            // This is a collectible item
            return {
                title: item.drop.name,
                created_at: new Date(item.drop.created_at).getTime(),
                slug: item.drop.slug,
                type: 'collectible', // We'll add a type field to distinguish between events and collectibles
                user_id: item.drop.user_id // We'll add a type field to distinguish between events and collectibles

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
    const session = await supabaseAdmin.auth.getSession()
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
    const userId = session?.data.session?.user.id

    const sortedData = combineAndSortData(dropsWithMetaData, event);

    if (sortedData) {
        return (
            <div className="relative overflow-x-auto mt-12 rounded-md border border-zinc-200 dark:border-zinc-700 w-full max-w-5xl  mx-auto">
                <UserCreationsTable sortedData={sortedData} />
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
