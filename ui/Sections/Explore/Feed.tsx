'use client'
import React, { useEffect, useState } from 'react';
import CollectCard from 'ui/Cards/Collect/CollectCard'
import EventCard from 'ui/Cards/Events/EventCard'
import { useExploreStore } from './ExploreStore';
import { useLocationExtractor } from 'lib/hooks/useLocationExtractor';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Feed: React.FC<{ data: any, events: any }> = ({ data, events }) => {

    const searchParams = useSearchParams().get('view')
    //console.log(searchParams)
    const [filtersSet, setFiltersSet] = useState(false); // Track if filters have been set
    const {
        setActiveFilters,
        activeFilters,
        setFilters,
        filters
    } = useExploreStore();

    const filteredEvents = events.filter(() => {
        const city: any = [...filters.cities.map((city) => city)]
        const state: any = [...filters.states.map((state) => state)]
        return (
            activeFilters.length === 0 ||
            activeFilters?.includes(city) ||
            activeFilters?.includes(state)
        );
    });
    useEffect(() => {
        // Call the useLocationExtractor function asynchronously
        async function fetchData() {
            try {
                const locationDataArray = await useLocationExtractor(events.map((event: any) => event.location));
                const cities = [...new Set(locationDataArray.map((item: any) => item?.city))].filter(Boolean);
                const states = [...new Set(locationDataArray.map((item: any) => item?.state))].filter(Boolean);

                if (events.length === (cities.length + states.length)) {
                    if (!filtersSet) {
                        setFilters({ cities, states });
                        setFiltersSet(true);
                      //  console.log(cities, states);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [events, setFilters, setActiveFilters, filtersSet]);


    return (
        <div className='space-y-4 w-full relative mx-auto justify-center'>
     
           {searchParams == null && <StandardFeed data={data}/>}
           {searchParams == 'tile' && <TileFeed data={data}/>}
           {searchParams == 'list' && <ListFeed data={data}/>}


        </div>
    )
}
export default Feed

export const ListFeed  = ({ data} : {data: any}) => {
    return (
        <div className='flex flex-wrap gap-4 w-full mx-auto justify-center max-w-7xl'>
              <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 mx-auto border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-400 rounded-t-md">
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
                        Link
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 rounded-b-md">
                {data.map((item: any) => (
                    <tr
                        key={item.created_at}
                        className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-700"
                    >
                        <td className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                            {item.title}
                        </td>
                        <td className="px-6 py-4 justify-center mx-auto">
                            {item.type === 'event' ? (
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-purple-400 border border-purple-400">
                                    Event
                                </span>
                            ) : (
                                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-green-400 border border-green-400">
                                    Collectible
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                            <Link
                                href={`${item.type === 'event'
                                    ? `/events/${item.slug}`
                                    : `/drop/${item.slug}`
                                    }`}
                            >
                                <FaExternalLinkAlt />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>

    )}

export const StandardFeed = ({data} : {data: any}) => {
    return (
        <div className='flex flex-wrap gap-4 w-full mx-auto justify-center'>
        {data.map((item: any) => (
            <div key={item.created_at}>
                <div className=' max-w-lg lg:max-w-md xl:max-w-lg'>
                    {item.type === 'event' && <EventCard event={item} />}
                    {item.type === 'collectible' && <CollectCard metaData={item.data.metaData} drop={item.data.drop} />}
                </div>
            </div>
        ))}
    </div>
    )
}
export const TileFeed  = ({data} : {data: any}) => { 
    return (
        <div className='flex flex-wrap gap-4 w-full mx-auto justify-center'>
        {data.map((item: any) => (
            <div key={item.created_at}>
                <div className=' max-w-lg lg:max-w-md xl:max-w-lg'>
                    {item.type === 'event' && <EventCard event={item} />}
                    {item.type === 'collectible' && <CollectCard metaData={item.data.metaData} drop={item.data.drop} />}
                </div>
            </div>
        ))}
    </div>
    )
}

