import { combineAndSortData } from 'lib/hooks/combineAndSortData';
import React from 'react';
import Feed from 'ui/Sections/Explore/Feed';
import { fetchAllCollectibles, fetchAllEvents } from 'utils/use-server';

export const dynamic = 'force-dynamic'
export const revalidate = 5

async function page() {
    // const session = await supabaseAdmin.auth.getSession()
const [drops, events] = await Promise.all([
    fetchAllCollectibles(),
    fetchAllEvents()
])
    const dropsWithMetaData = drops?.dropsWithMetaData
    // const userId = session?.data.session?.user.id
    const sortedData = combineAndSortData(dropsWithMetaData!, events!);

    if (sortedData) {
        return (

            <div className="mx-auto py-8 md:p-8 mb-24">
                <Feed data={sortedData} events={events} />
            </div>
        )
    } else (
        <p className='text-center h-full items-center mx-auto mt-24 text-zinc-500'>
            Loaaing...
        </p>
    )
};

export default page;
