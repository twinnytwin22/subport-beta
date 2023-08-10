'use client'
import React, { useEffect, useState } from 'react';
import EventCard from 'ui/Cards/Events/EventCard';
import { useExploreStore } from './ExploreStore';
import { useLocationExtractor } from 'lib/hooks/useLocationExtractor'; // Update the import path

const EventFeed: React.FC<{ events: any }> = ({ events }) => {
    const [filtersSet, setFiltersSet] = useState(false); // Track if filters have been set
    const {
        setActiveFilters,
        activeFilters,
        setFilters,
        filters
    } = useExploreStore();

    const filteredEvents = events.filter((event: any) => {
        const location = event?.location;
        const activeFilter = activeFilters.map(a => a.toLowerCase())
        // Check if any city or state is present in the location
        const locationLower = location.toLowerCase();
        const includesFilters = activeFilter.some(stateName => locationLower.includes(stateName));
        //   console.log(activeFilters)
        return includesFilters || activeFilters.length === 0
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
                        //console.log(cities, states);
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
            <div className='flex flex-wrap gap-4 w-full mx-auto justify-center'>
                {filteredEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventFeed;
