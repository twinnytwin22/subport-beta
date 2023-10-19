'use client';
import { useExploreStore } from '../ExploreStore';

function FilterOptions() {
  const {
    activeFilters,
    handleClear,
    handleFilterClick,
    handleClearItem,
    fetchInitialData
  } = useExploreStore();

  const states = useExploreStore((state) => state.filters.states);
  const cities = useExploreStore((state) => state.filters.cities);

  return (
    <div className="w-full p-4 space-y-1 text-xs">
      <div>
        <button onClick={handleClear}>Clear</button>
        <ul className="flex space-x-4 items-center flex-wrap">
          <h2 className="mr-2">States:</h2>{' '}
          {/* Added margin to align with list items */}
          {states.length > 0 &&
            states?.map((state: any) => (
              <li
                key={state}
                onClick={() => handleFilterClick(state)}
                className={`bg-blue-100 space-y-2 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-blue-300 border border-blue-400 ${activeFilters.includes(state) ? 'active ' : ''
                  }`}
              >
                {state}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-4 items-center flex-wrap">
          <h2 className="mr-2">Cities:</h2>{' '}
          {/* Added margin to align with list items */}
          {cities.length > 0 &&
            cities?.map((city: any) => (
              <li
                key={city}
                onClick={() => handleFilterClick(city)}
                className={`bg-blue-100 mb-1 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-blue-300 border border-blue-400 ${activeFilters.includes(city) ? 'active' : ''
                  }`}
              >
                {city}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-4 items-center flex-wrap">
          {activeFilters.map((item: any) => (
            <li
              key={item}
              className={`bg-green-100 text-green-800 mb-1 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-green-400 border border-green-400 `}
            >
              {item}
              <span
                className="cursor-pointer ml-1 text-zinc-500"
                onClick={() => handleClearItem(item)}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterOptions;
