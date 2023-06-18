import Link from "next/link";
import React from "react";
import UserAvatar from "ui/User/UserAvatar";

function MobileMenu() {
  return (
    <>
      <div className="block sm:hidden h-16 px-5 bg-white dark:bg-black pb-2 w-[100vw] fixed bottom-0 inset-x-0">
        <div className="grid grid-cols-5 text-zinc-800 dark:text-zinc-400 justify-items-center pt-3">
          <div className="flex group">
            <Link
              href="/"
              className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white"
            >
              <span className="px-1 flex flex-col items-center">
                <div className="w-8 pb-2">
                  <svg
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
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    ></path>
                  </svg>
                </div>
              </span>
            </Link>
          </div>
          <div className="flex group">
            <Link
              href="/trending"
              className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white"
            >
              <span className="px-1 flex flex-col items-center">
                <div className="w-8 pb-2">
                  <svg
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
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </div>
              </span>
            </Link>
          </div>
          <div className="flex group ">
            <Link
              href="/create"
              className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white"
            >
              <span className="px-1 flex flex-col items-center">
                <div className="w-10">
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
            <Link
              href="/explore"
              className="flex items-end justify-center text-center mx-auto px-4 w-full text-zinc-400 group-hover:text-white border-b-2 border-transparent group-hover:border-white"
            >
              <div className="px-1 flex flex-col items-center">
                <div className="w-8 pb-1">
                  <svg
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
              </div>
            </Link>
          </div>
          <div className="flex w-8 items-center pb-2">
            <UserAvatar />
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
