"use client"
import { useLocationExtractor } from 'lib/hooks/useLocationExtractor';
import { useState, useEffect } from 'react';
import EventCard from 'ui/Cards/Events/EventCard';
const EventList = ({ events }: any) => {
    const citiesStates = events.map((event: any) => {
        const locationData = useLocationExtractor(event?.location);
        const city = locationData?.city;
        const state = locationData?.state;
        console.log(city, state, 'LOCATION DATA');

        return { city, state };
    });

    const states = [...new Set(citiesStates.map((item: any) => item.state))].filter(Boolean);
    const cities = [...new Set(citiesStates.map((item: any) => item.city))].filter(Boolean);

    const [activeFilters, setActiveFilters] = useState<any[]>([]);

    // Filter the events based on active filters
    const filteredEvents = events.filter((event: any) => {
        const locationData = useLocationExtractor(event.location);
        const city = locationData?.city;
        const state = locationData?.state;

        return (
            (activeFilters.length === 0 || activeFilters.includes(city) || activeFilters.includes(state))
        );
    });

    const handleFilterClick = (filter: string) => {
        setActiveFilters(prevFilters => {
            if (prevFilters.includes(filter)) {
                return prevFilters.filter(f => f !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    const handleClear = () => {
        setActiveFilters([])
    }
    return (
        <div className='space-y-4 w-full relative mx-auto justify-center'>
            <div>
                <button onClick={handleClear}>Clear</button>
                <ul className='flex space-x-4 items-center'>
                    <h2>States:</h2>

                    {states.map((state: any) => (
                        <li
                            key={state}
                            onClick={() => handleFilterClick(state)}
                            className={` bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-blue-300 border border-blue-400 ${activeFilters.includes(state) ? 'active ' : ''}`}
                        >
                            {state}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className='flex space-x-4 items-center'>
                    <h2>Cities:</h2>

                    {cities.map((city: any) => (
                        <li
                            key={city}
                            onClick={() => handleFilterClick(city)}
                            className={` bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-blue-300 border border-blue-400 ${activeFilters.includes(city) ? 'active' : ''}`}
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            </div>
            <ul className='flex space-x-4 items-center'>
                <h2>Active:</h2>

                {activeFilters.map((item: any) => (
                    <li
                        key={item}
                        className={` bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-green-400 border border-green-400 `}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div className='flex flex-wrap gap-4 w-full mx-auto  justify-center'>
                {filteredEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>


        </div>
    );
};

export default EventList;
