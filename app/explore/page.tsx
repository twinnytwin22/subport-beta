import { combineAndSortData } from 'lib/hooks/combineAndSortData';
import { supabaseAdmin } from 'lib/providers/supabase/supabase-lib-admin';
import { headers } from 'next/headers';
import React from 'react';
import CollectCard from 'ui/Cards/Collect/CollectCard';
import EventCard from 'ui/Cards/Events/EventCard';

async function page() {
    const session = await supabaseAdmin.auth.getSession()
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
    const event = await res2.json();
    const dropsWithMetaData = drops?.dropsWithMetaData
    const userId = session?.data.session?.user.id

    const sortedData = combineAndSortData(dropsWithMetaData, event);

    console.log(sortedData)
    if (sortedData) {
        return (
            <div className="relative overflow-x-auto mt-12 mb-28 rounded-md  w-full max-w-5xl  mx-auto">
                <div className='mx-auto justify-center w-fit space-y-4'>
                    {sortedData.map((item: any) => (
                        <div key={item.created_at}>
                            <div className=' max-w-lg lg:max-w-md xl:max-w-lg'>
                                {item.type === 'event' && <EventCard event={item} />}
                                {item.type === 'collectible' && <CollectCard metaData={item.data.metaData} drop={item.data.drop} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <p className='text-center h-full items-center mx-auto mt-24 text-zinc-500'>
            Loaaing...
        </p>
    )
}

export default page;
