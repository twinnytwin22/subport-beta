import Link from 'next/link'
import React from 'react'

function MusicList({ drops }: any) {
    return (
        <div><section className=" md:p-8 mb-20 max-w-7xl w-full mx-auto rounded-md justify-center ">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-zinc-950 sm:rounded-md w-full border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                    <div className="flex items-center flex-1 space-x-4 text-sm md:text-base">
                        <h5>
                            <span className="text-zinc-500">All Sounds:</span>
                            <span className="dark:text-white">1</span>
                        </h5>
                        <h5>
                            <span className="text-zinc-500">Total Playlists:</span>
                            <span className="dark:text-white">1</span>
                        </h5>
                    </div>
                    <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">

                        <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md focus:outline-none hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700">
                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Refresh
                        </button>

                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
                        <thead className="text-xs text-zinc-700 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all" type="checkbox" className="w-4 h-4 bg-zinc-100 border-zinc-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600" />
                                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-4 py-3">Track</th>
                                <th scope="col" className="px-4 py-3">Artist</th>

                                <th scope="col" className="px-4 py-3">Genre</th>

                                <th scope="col" className="px-4 py-3">Rating</th>

                            </tr>
                        </thead>
                        <tbody>
                            {drops?.map(({ drop, metaData }: any) => (

                                <MusicItem key={drop?.id} drop={drop} metaData={metaData} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                    <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                        Showing
                        <span className="font-semibold text-zinc-900 dark:text-white">1-10</span>
                        of
                        <span className="font-semibold text-zinc-900 dark:text-white">1000</span>
                    </span>
                    <ul className="inline-flex items-stretch -space-x-px">
                        <li>
                            <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">1</a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">...</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">100</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section></div>
    )
}

export default MusicList

const MusicItem = ({ drop, metaData }: any) => {
    return (
        <tr key={drop.title} className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs md:text-sm min-w-full flex">
            <Link href={`/drop/${drop?.slug}`} className='relative'>
                <td className="w-4 px-4 py-3">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 bg-zinc-100 border-zinc-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600" />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center px-4 py-2  font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                    <div className="block min-w-[30px] min-h-[30px] rounded-md bg-blue-300 w-fit mr-2"></div>
                    {drop?.title}
                </th>
                <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white">Twinny Twin</td>

                <td className="px-4 py-2">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">House</span>
                </td>
                <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">

                    </div>
                </td>
            </Link>
        </tr>
    )
}