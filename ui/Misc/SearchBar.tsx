'use client'
import { useState, useEffect, useRef } from 'react';
import { supabase, useImagePath, useIpfsImage } from 'lib/constants';
import Image from 'next/image';
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const SearchBar = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>({
        profiles: [],
        irl_events: [],
        drops: [],
    });
    const [isOpen, setIsOpen] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false); // New state variable to track input focus
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // This function will be called whenever searchTerm or isInputFocused changes
        if ((searchTerm?.length >= 2) && searchInputRef?.current) {
            //  console.log('Search Active', searchResults, searchTerm);
            // Call the search function here
            search();
        } else {
            setSearchResults({ profiles: [], irl_events: [], drops: [] });
            setIsOpen(true);
        }
    }, [searchTerm, isInputFocused]);

    const search = async () => {
        // Make a request to Supabase to search for profiles, irl_events, and drops separately
        let { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .ilike('username', `%${searchTerm}%`)
            .limit(10);

        let { data: eventsData, error: eventsError, } = await supabase
            .from('irl_events')
            .select('*')
            .ilike('title', `%${searchTerm}%`)
            .limit(10);

        //  const res = await fetch('/api/v1/getCollectibles')
        //  let drops = await res.json()

        //  if (drops) {

        //      console.log(drops.dropsWithMetaData, 'DROPS')
        //  }

        if (profileError || eventsError) {
            console.error('Error searching:', profileError || eventsError);
            return;
        }
        setSearchResults({ profiles: profileData || [], irl_events: eventsData || [], drops: [] });
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleInputBlur = () => {
        setIsOpen(false);
    };
    useHandleOutsideClick(isOpen, setIsOpen, 'search-results')

    const handleLink = (href: string) => {
        router.push(href)
        setSearchTerm('')
        setIsOpen(false)
    }

    return (
        <form className="flex items-center flex-grow mr-4 relative" >
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-zinc-500 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    autoComplete='off'
                    type="text"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                    onFocus={handleInputFocus} // Add onFocus and onBlur event handlers
                    //   onBlur={handleInputBlur}
                    ref={searchInputRef}
                />
            </div>
            <SearchButton />
            {isOpen &&
                <div className="absolute top-10 left-0 right-0 mt-6  bg-white max-h-[300px] overflow-y-scroll dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-md z-[99990] shadow-zinc-300 dark:shadow-black search-results mx-auto">

                    {searchResults?.profiles?.length > 0 && (
                        <div className='relative'>
                            <div className='p-1 pl-4 bg-white dark:bg-black w-full'>
                                <h1 className='text-sm font-bold'>Profiles</h1>
                            </div>
                            {searchResults.profiles.map((profile: any) => (
                                <div onClick={(() => handleLink(`/${profile.username}`))} key={profile.id} className="flex items-center p-2.5 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative z-[99999]">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={useImagePath(profile?.avatar_url)}
                                        alt={profile?.username || ''}
                                        className="w-8 h-8 rounded-full mr-2 aspect-square object-cover"
                                    />
                                    <div>
                                        <div className="text-black dark:text-white font-medium">
                                            {profile.username}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                                            {profile.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchResults?.irl_events?.length > 0 && (
                        <div className='mt-4'>
                            <div className='p-1 pl-4 bg-white dark:bg-black'>
                                <h1 className='text-sm font-bold'>Events</h1>
                            </div>
                            {searchResults.irl_events.map((event: any) => (
                                <div onClick={(() => handleLink(`/events/${event.slug}`))} key={event.id} className="flex items-center p-2 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={useIpfsImage(event?.image)}
                                        alt={event.title}
                                        className="w-8 h-8 rounded-full mr-2 aspect-square object-cover"
                                    />
                                    <div>
                                        <div className="text-black dark:text-white font-medium">
                                            {event.title}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchResults?.drops?.length > 0 && (
                        <div>
                            {searchResults.drops.map((drop: any) => (

                                <div key={drop.slug} className="flex items-center p-2 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={useIpfsImage(drop?.image)}
                                        alt={drop.name}
                                        className="w-8 h-8 rounded-full mr-2 aspect-square object-cover"
                                    />
                                    <div>
                                        <div className="text-black dark:text-white font-medium">
                                            {drop.name}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                                            {drop.genres.toString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>}
        </form>
    );
};


const SearchButton = () => {
    return (
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
        </button>
    );
};

export default SearchBar;
