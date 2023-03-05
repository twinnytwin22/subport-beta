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
    <div className="fixed top-0 right-0 left-0 max-w-screen w-full">
      <div className="bg-white border-zinc-200 px-4 lg:px-6 py-2.5 dark:bg-black w-full">
        <div className="flex justify-between items-center mx-auto max-w-screen lg:max-w-7xl w-full">
          <Link href="/" className="flex items-center">
            <img src="/subport.png" className="mr-3 w-9" alt="Subport Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Subport
            </span>
          </Link>
          <div className="flex group space-x-6 items-center lg:order-2">
            {status == "authenticated" && (
              <Link href="/upload">
                <div className="hidden md:flex w-10 rounded-full shadow-zinc-200 hover:shadow-sm hover:scale-110">
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
              </Link>
            )}
            <Link href="/trending">
              <div className="hidden md:flex group w-12 rounded-full bg-zinc-900 hover:bg-zinc-800 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105">
                <svg
                  fill="none"
                  stroke="white"
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
            </Link>
            {status == "unauthenticated" && (
              <>
                <SignInModal />
              </>
            )}

            {status == "authenticated" && (
              <>
                <div className="hidden md:flex group w-8 rounded-full hover:scale-105">
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
                <div className="hidden md:block">
                  <UserAvatar />
                </div>
              </>
            )}
            <div className="block md:hidden w-8">
              <svg
                stroke="white"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
