'use client'
import { useAuthProvider } from "app/context/auth";
import { useSubportPlayer } from "app/context/subport-player";
import Link from "next/link";
import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import UserAvatar from "ui/User/UserAvatar";
import { MobileSidebar } from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { SupbortLogo } from "lib/content/siteSettings";
import Image from "next/image";
import { PublicRoutes, UserRoutes } from "./Routes";
import { useHandleOutsideClick } from "lib/hooks/handleOutsideClick";
import { NotificationIcon } from "./NotificationContainer";

function MobileMenu() {
  const [isOpen, setOpen] = useState(false)
  const { user, profile } = useAuthProvider()
  useHandleOutsideClick(isOpen, setOpen, 'mobile-sidebar')

  const handleOpenMenu = () => {
    if (!isOpen) {
      setOpen(true)
      return
    } else {
      setOpen(false)
      return
    }
  }

  return user && (
    <>
      <div className="block sm:hidden h-16 px-5 bg-white dark:bg-black pb-2 w-[100vw] fixed bottom-0 inset-x-0 z-10">
        <div className={`grid ${profile?.is_artist ? 'grid-cols-5' : 'grid-cols-4'} text-zinc-800 dark:text-zinc-400 justify-items-center pt-3`}>
          <div className="flex group">
            <Link
              href="/"
              className="flex items-end justify-center text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white"
            >
              <div className="px-1 flex flex-col items-center mobile-sidebar" onClick={handleOpenMenu}>
                <AiOutlineMenu className="w-10 h-10 pb-2" />
              </div>
            </Link>
          </div>
          <div className="flex group">
            <Link
              href="/explore"
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
          {profile.is_artist && 
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
          </div>}
          <div className="flex flex-row group items-center ">
            <div
              className="flex items-end justify-center text-center mx-auto px-4 w-full text-zinc-400 group-hover:text-white border-b-2 border-transparent group-hover:border-white"
            >
              <div className="px-1 flex flex-col items-center">
                <NotificationIcon />
              </div>
            </div>
          </div>
          <div className="flex w-8 items-center pb-2">
            <UserAvatar />
          </div>
        </div>
      </div>
      <MobileSidebarArea isOpen={isOpen} />
    </>
  );
}

export default MobileMenu;


const MobileSidebarArea = ({ isOpen }: any) => {
  const { user } = useAuthProvider()


  return isOpen && (
    <div className="mobile-sidebar fixed h-screen top-0 -z-0 left-0 w-1/2  bg-white dark:bg-black visible sm:hidden">
      <div className="mb-16 mx-auto m-3 w-fit">
        <div className="flex items-center justify-around">
          <Image src={SupbortLogo} className="lg:mx-3  w-9 items-center justify-center mx-auto " alt="Subport Logo" width={36} height={18} style={{ width: 'auto', height: 'auto' }}
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white ">
            subport
          </span>
        </div>
      </div>
      <div className="mx-auto w-full px-4 justify-center relative">
        <ul className="pl-8 w-full justify-center font-bold text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex-col space-y-8">

          {PublicRoutes.map((link) => (
            <Link href={link.route} key={link.name}>
              <li className="">
                <p className="block"> {link.name}</p>

              </li>
            </Link>))}
        </ul>
        <ul className="font-bold pl-8 text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex-col space-y-8">

          {user && UserRoutes.map((link) => (
            <Link key={link.name} href={link.route}>
              <li className="">
                <p className="block">{link.name}</p>

              </li>
            </Link>)
          )}
        </ul>
        <>

        </>
      </div>
    </div>
  )
}