"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { SignInModal } from "ui/Buttons/SignIn";

import Link from "next/link";
import UserAvatar from "ui/User/UserAvatar";

function Navbar() {
  const { data: session, status } = useSession();
  console.log(session, "session2");

  return (
    <div className="flex fixed top-0 z-[300] border-zinc-200 dark:border-zinc-800 px-6 py-2.5 border-b w-full bg-zinc-100 dark:bg-black mx-auto">
      <div className="flex sm:grid sm:grid-cols-8 w-full gap-x-4 sm:pr-28">
            <form className={`flex mx-auto items-center w-full ml-0 col-span-8 sm:col-span-6 ${status === 'unauthenticated' && "md:col-span-7 lg:col-span-6"}`}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
            <div className={`hidden sm:inline-flex items-center  w-full space-x-2 sm:grid-cols-2 ${status === 'unauthenticated' && "-mr-28"}`}>
          
              {status === 'authenticated' &&
              <>
                  <div className="hidden sm:block group w-8 rounded-full hover:scale-105">
                    <svg className="w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </div> 
                  <div className="hidden sm:block -ml-4 w-8">
                    <UserAvatar />
                  </div> </>}
               
             
            </div></div></div>
  );
}

export default Navbar;
