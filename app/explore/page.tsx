import { combineAndSortData } from 'lib/hooks/combineAndSortData';
import { headers } from 'next/headers';
import React from 'react';
import Feed from 'ui/Sections/Explore/Feed';

async function page() {
    // const session = await supabaseAdmin.auth.getSession()
    const host = headers().get('host');
    const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
    const res1 = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
        method: 'GET',
        cache: 'no-store',
    });
    const res2 = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
        method: 'GET',
        cache: 'no-store',
    });
    const drops = await res1.json();
    const events = await res2.json();
    const dropsWithMetaData = drops?.dropsWithMetaData
    // const userId = session?.data.session?.user.id
    const sortedData = combineAndSortData(dropsWithMetaData, events);

    if (sortedData) {
        return (

            <div className="mx-auto p-8 mb-24">
                <Feed data={sortedData} events={events} />
            </div>
        )
    };

    return (
        <p className='text-center h-full items-center mx-auto mt-24 text-zinc-500'>
            Loaaing...
        </p>
    )
};

export default page;
