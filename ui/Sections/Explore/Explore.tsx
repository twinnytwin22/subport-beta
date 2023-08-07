'use client'
import { useLocationExtractor } from 'lib/hooks/useLocationExtractor';
import React, { useEffect } from 'react';
import EventCard from 'ui/Cards/Events/EventCard';
import { useExploreStore } from './ExploreStore';

const EventList: React.FC<{ events: any }> = ({ events }) => {
    const {
        activeFilters,
        setActiveFilters,
        handleFilterClick,
        setFilters,
        filters
    } = useExploreStore();
    const locationData = events.map((event: any) => useLocationExtractor(event.location))


    // Calculate cities and states from events
    const calculateFilters = (events: any[]) => {
        const cities: any = [...new Set(locationData.map((item: any) => item?.city))].filter(
            Boolean
        );
        const states: any = [...new Set(locationData.map((item: any) => item?.state))].filter(
            Boolean
        );
        setFilters({ cities, states });
    };


    // Set the filters when events change
    useEffect(() => {
        calculateFilters(events);
    }, [events, activeFilters]);

    // Filter the events based on active filters
    const filteredEvents = events.filter((event: any) => {
        const [city] = filters.cities.map((city) => city)
        const [state] = filters.states.map((state) => state)



        return (
            activeFilters.length === 0 ||
            activeFilters.includes(city) ||
            activeFilters.includes(state)
        );
    });

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