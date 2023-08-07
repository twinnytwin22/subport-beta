'use client'
import React from 'react';
import { useExploreStore } from './ExploreStore';

function FilterOptions() {
    const {
        activeFilters,
        handleClear,
        filters,
        handleFilterClick,
        handleClearItem
    } = useExploreStore();

    return (
        <div className='max-w-xs w-full p-4 space-y-1 text-xs'>
            <div>
                <button onClick={handleClear}>Clear</button>
                <ul className='flex space-x-4 items-center flex-wrap'>
                    <h2>States:</h2>
                    {filters?.states.map((state: any) => (
                        <li
                            key={state}
                            onClick={() => handleFilterClick(state)}
                            className={` bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-blue-300 border border-blue-400 ${activeFilters.includes(state) ? 'active ' : ''}`}
                        >
                            {state}
                            {activeFilters.includes(state) && (
                                <span
                                    className='cursor-pointer ml-1 text-gray-500'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearItem(state);
                                    }}
                                >
                                    X
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className='flex space-x-4 items-center flex-wrap space-y-2'>
                    <h2>Cities:</h2>
                    {filters?.cities.map((city: any) => (
                        <li
                            key={city}
                            onClick={() => handleFilterClick(city)}
                            className={` bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-blue-300 border border-blue-400 ${activeFilters.includes(city) ? 'active' : ''}`}
                        >
                            {city}
                            {activeFilters.includes(city) && (
                                <span
                                    className='cursor-pointer ml-1 text-gray-500'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearItem(city);
                                    }}
                                >
                                    X
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <ul className='flex space-x-4 items-center space-y-2 flex-wrap'>
                {activeFilters.map((item: any) => (
                    <li
                        key={item}
                        className={` bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-700 dark:text-green-400 border border-green-400 `}
                    >
                        {item}
                        <span
                            className='cursor-pointer ml-1 text-gray-500'
                            onClick={() => handleClearItem(item)}
                        >
                            X
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FilterOptions;
