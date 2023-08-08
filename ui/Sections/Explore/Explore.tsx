'use client'
import { useLocationExtractor } from 'lib/hooks/useLocationExtractor';
import React, { useEffect, useState } from 'react';
import EventCard from 'ui/Cards/Events/EventCard';
import { useExploreStore } from './ExploreStore';

const EventList: React.FC<{ events: any }> = ({ events }) => {
    const locationData2 = events.map((event: any) => useLocationExtractor(event.location))
    const [locationData, setLocationData] = useState<any[]>([]);

    const {
        activeFilters,
        setFilters,
        filters
    } = useExploreStore();


    // Calculate cities and states from events
    const calculateFilters = (events: any[]) => {
        const cities: any = [...new Set(locationData2.map((item: any) => item?.city))].filter(
            Boolean
        );
        const states: any = [...new Set(locationData2.map((item: any) => item?.state))].filter(
            Boolean
        );
        setFilters({ cities, states });
    };

    const filteredEvents = events.filter((event: any) => {
        const [city] = filters.cities.map((city) => city)
        const [state] = filters.states.map((state) => state)
        return (
            activeFilters.length === 0 ||
            activeFilters.includes(city) ||
            activeFilters.includes(state)
        );
    });

    const locationPromises = events.map((event: any) => useLocationExtractor(event.location));

    // Set the filters when events change
    useEffect(() => {
        // Create an array of promises for location data extraction
        // Wait for all promises to be resolved
        Promise.all(locationPromises)
            .then((extractedData) => {
                setLocationData(extractedData);
                // Calculate cities and states from events
                const cities = [...new Set(extractedData.map((item: any) => item?.city))].filter(Boolean);
                const states = [...new Set(extractedData.map((item: any) => item?.state))].filter(Boolean);
                setFilters({ cities, states });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [events, setFilters]);

    // Filter the events based on active filters
    console.log(filters)


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

export default EventList;