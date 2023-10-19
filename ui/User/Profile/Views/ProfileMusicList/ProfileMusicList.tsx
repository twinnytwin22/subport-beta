'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import MusicItem from '../ProfileMusicItem/ProfileMusicItem';

interface Drop {
  id: number;
  name: string;
  slug: string;
}

interface MetaData {
  artist: string;
  genre: string;
}

interface Profile {
  currentProfile: string[];
}
interface ProfileMusicListProps {
  drops: { drop: Drop; metaData: MetaData }[];
  currentProfile: { currentProfile: Profile }[];
}

const Pagination = dynamic(() => import('lib/hooks/pagination'), {
  ssr: false
});

const ProfileMusicList = ({ drops, currentProfile }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexEnd = currentPage * itemsPerPage;
  const indexStart = indexEnd - itemsPerPage;
  const currentDrops = drops.slice(indexStart, indexEnd);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className=" -z-0">
      <section className="py-4 mb-20 w-full mx-auto rounded-md justify-center">
        <div className=" z-20 overflow-hidden bg-white shadow-lg dark:bg-zinc-950 sm:rounded-md w-full border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4 text-sm md:text-base">
              <h5>
                <span className="text-zinc-500">All Sounds:</span>
                <span className="dark:text-white">
                  {drops.length.toString()}
                </span>
              </h5>
              <h5>
                <span className="text-zinc-500">Total Playlists:</span>
                <span className="dark:text-white">1</span>
              </h5>
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md focus:outline-none hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          <div className="overflow-x-clip">
            <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-4 py-3 -mr-20">
                    Track Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Artist
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Genre
                  </th>
                  <th scope="col" className="px-4 py-3  hidden md:block">
                    <span className="sr-only">Menu Dots</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentDrops?.map(({ drop, metaData }: any) => (
                  <MusicItem
                    key={drop?.id}
                    drop={drop}
                    metaData={metaData}
                    profile={currentProfile}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={drops.length}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              currentPage={currentPage}
            />{' '}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default ProfileMusicList;
