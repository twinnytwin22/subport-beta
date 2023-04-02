"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
function Sidebar({ queries }: any) {
  const { data: session, status } = useSession();
  {
    session ? console.log(session) : console.log("no session found");
  }
  const handleLogout = async () => {
    toast("Signing Out");
    signOut();
  };
  return (
    <aside className="flex flex-col bg-gray-100 h-screen lg:w-64 px-4 py-4 dark:bg-black border border-r-1 text-white border-b border-gray-200 dark:border-gray-800 top-0 fixed mx-auto items-center content-center justify-center">
      <div className="mb-4 mx-auto">
        <Link href="/" className="flex items-center">
          <img src="/subport.png" className="mx-3  w-9" alt="Subport Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden lg:block">
            Subport
          </span>
        </Link>
      </div>
      <nav className="flex-grow p-2">
        <ul className="font-bold text-lg text-zinc-200 items-center mx-auto flex-col space-y-8">
          <Link href="/">
            <li className="hover:text-white">
              <p className="hidden lg:block"> Home</p>
              <div className="block lg:hidden group w-10 mx-auto rounded-full text-zinc-900 bg-zinc-200 hover:bg-zinc-100 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105 mb-3">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
            </li>
          </Link>
          <Link href="/trending">
            <li className="hover:text-white">
              <p className="hidden lg:block"> Trending</p>
              <div className="block lg:hidden group w-10 mx-auto rounded-full text-zinc-900 bg-zinc-200 hover:bg-zinc-100 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105 mb-3">
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
            </li>
          </Link>
          {status === "authenticated" && (
            <Link href="/create">
              <li className="hover:text-white">
                <p className="hidden lg:block">Create</p>
                <div className="block lg:hidden group w-10 mx-auto rounded-full text-zinc-900 bg-zinc-200 hover:bg-zinc-100 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105 mb-3">
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
              </li>
            </Link>
          )}
        </ul>
        {status === "authenticated" && (<>
        <hr className="hidden sm:flex md:w-40 border-zinc-600 mt-24 mb-8"/>
    
          <button
            onClick={handleLogout}
            className="flex px-4 py-2 rounded-2xl bg-zinc-900 dark:border-zinc-600 relative w-sm md:w-full"
          >
            
            <h3 className="text-base font-semibold text-zinc-900 lg:text-md dark:text-white">
              Sign out
            </h3><div className="w-6 p-1">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z" />
</svg>
            </div>
            
          </button>
          </> )}
      </nav>
    </aside>
  );
}

export default Sidebar;
export const getServerSideProps = async () => {
  // Create authenticated Supabase Client
  // Check if we have a session
  const { data: session } = await useSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
