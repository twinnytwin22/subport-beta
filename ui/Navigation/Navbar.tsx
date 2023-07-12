"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuthProvider } from "app/context/auth";
import AddUpdateWallet from "lib/hooks/generateWallet";
import React, { useEffect } from "react";
import SearchBar from "ui/Misc/SearchBar";
import UserAvatar from "ui/User/UserAvatar";
function Navbar() {
  const supabase = createClientComponentClient();
  const { user, profile } = useAuthProvider()



  useEffect(() => {
    const getData = async () => {
      try {
        const { data: wallet, error } = await supabase
          .from('profiles')
          .select('wallet_address, avatar_url')
          .eq("id", user?.id)
          .single();

        if (wallet?.wallet_address === '' || wallet?.wallet_address === null) {
          await AddUpdateWallet(user);
        }


      } catch (error) {
        console.log('Error loading user data:', error);
      }
    };

    if (user) {
      getData();
    }
  }, [user, supabase]);



  return (
    <div className="fixed top-0 left-0 right-0 z-[250] border-zinc-200 dark:border-zinc-800 px-6 py-2.5 border-b w-full bg-zinc-100 dark:bg-black">
      <div className="z-[300]  px-6 py-2.5  mx-auto relative sm:pl-32 lg:pl-64">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <SearchBar />
          <div className="flex items-center space-x-2">
            <NotificationIcon />
            <div className="hidden sm:block">  <UserAvatar /></div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

const SearchButton = () => {
  return (
    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <span className="sr-only">Search</span>
    </button>
  )
}

const NotificationIcon = () => {
  return (
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
  )
}
