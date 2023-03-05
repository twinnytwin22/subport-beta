'use client'
import Link from 'next/link';
import React from 'react';

function MobileMenu() {

const width = 8

  return (
      <>
          <div className="block md:hidden h-16 px-5 bg-white dark:bg-black pb-2 w-[100vw] fixed bottom-0 inset-x-0">
            <div className="grid grid-cols-5 text-zinc-800 dark:text-zinc-400 justify-items-center pt-3">
                <div className="flex group ">
                    <Link href="/" className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white">
                        <span className="px-1 flex flex-col items-center">
                            <div className="w-6">
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                            </svg>
                            </div>
                            
                            <span className="block text-xs pb-1">Home</span>
                        </span>
                    </Link>
                </div>
                <div className="flex group ">
                    <Link href="/" className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white">
                        <span className="px-1 flex flex-col items-center">
                            <div className="w-6">
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                            </svg>
                            </div>
                            
                            <span className="block text-xs pb-1">Home</span>
                        </span>
                    </Link>
                </div>
                <div className="flex group ">
                    <Link href="/upload" className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white">
                        <span className="px-1 flex flex-col items-center">
                            <div className="w-12">
                            <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                    />
                  </svg>
                            </div>
                            
                            <span className="block text-xs pb-1"></span>
                        </span>
                    </Link>
                </div>
                <div className="flex flex-row group items-center ">
                    <Link href="/explore" className="flex items-end justify-center text-center mx-auto px-4 w-full text-zinc-400 group-hover:text-white border-b-2 border-transparent group-hover:border-white">
                        <div className="px-1 flex flex-col items-center">
                        <div className="w-6 items-center">
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
                            </svg>
                            </div>
                            <span className="block text-xs pb-1">Explore </span>
                        </div>
                    </Link>
                </div>
                <div className="flex group">
                    <Link href="/holder" className="flex items-end justify-center text-center mx-auto px-4 w-full text-zinc-400 group-hover:text-white border-b-2 border-transparent group-hover:border-white">
                        <span className="px-1 flex flex-col items-center">
                        <div className="w-6">
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path>
                            </svg>
                            </div>
                            <span className="block text-xs pb-1">Holders</span>
                        </span>
                    </Link>
                </div>
            </div>
            </div>
    </>
                
  )
}

export default MobileMenu


