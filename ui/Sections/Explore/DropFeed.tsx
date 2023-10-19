'use client';
import { useLocationExtractor } from 'lib/hooks/useLocationExtractor';
import React, { useEffect, useState } from 'react';
import CollectCard from 'ui/Cards/Collect/CollectCard';
import { useExploreStore } from './ExploreStore';
const DropFeed: React.FC<{ data?: any; events?: any; drops?: any }> = ({
  data,
  events,
  drops
}) => {
  const [filtersSet, setFiltersSet] = useState(false); // Track if filters have been set
  const { setActiveFilters, activeFilters, setFilters, filters } =
    useExploreStore();

  const filteredEvents = events?.filter(() => {
    const city: any = [...filters.cities.map((city) => city)];
    const state: any = [...filters.states.map((state) => state)];
    return (
      activeFilters.length === 0 ||
      activeFilters?.includes(city) ||
      activeFilters?.includes(state)
    );
  });
  useEffect(() => {
    if (events) {
      // Call the useLocationExtractor function asynchronously
      async function fetchData() {
        try {
          const locationDataArray = await useLocationExtractor(
            events.map((event: any) => event.location)
          );
          const cities = [
            ...new Set(locationDataArray.map((item: any) => item?.city))
          ].filter(Boolean);
          const states = [
            ...new Set(locationDataArray.map((item: any) => item?.state))
          ].filter(Boolean);

          if (events.length === cities.length + states.length) {
            if (!filtersSet) {
              setFilters({ cities, states });
              setFiltersSet(true);
              console.log(cities, states);
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchData();
    }
  }, [events, setFilters, setActiveFilters, filtersSet]);

  return (
    <div className="space-y-4 w-full relative mx-auto justify-center">
      <div className="flex flex-wrap gap-4 w-full mx-auto justify-center">
        {drops?.map((drop: any) => (
          <div key={drop.drop.id}>
            <div className=" max-w-lg lg:max-w-md xl:max-w-lg">
              {<CollectCard metaData={drop.metaData} drop={drop.drop} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropFeed;
