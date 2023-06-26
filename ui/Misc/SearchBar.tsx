import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any>([]);

    const handleSearch = async (e: any) => {
        const searchString = e.target.value;
        setSearchTerm(searchString);

        if (searchString.length > 4) {
            // Make a request to Supabase to search for profiles
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .match({ 'username': searchString });

            if (error) {
                console.error('Error searching profiles:', error.message);
                return;
            }

            if (data) {
                setSearchResults(data);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <form className="flex items-center flex-grow mr-4" onSubmit={handleSearch}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-zinc-500 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    required
                />
            </div>
            <SearchButton />
            {searchResults.length > 0 && (
                <div className="absolute mt-2 p-2 bg-white shadow-lg rounded-lg z-[99999]">
                    {searchResults.map((result: any) => (
                        <div key={result.id}>{result.username}</div>
                    ))}
                </div>
            )}
        </form>
    );
};

const SearchButton = () => {
    return (
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
        </button>
    );
};

export default SearchBar;
