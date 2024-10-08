'use client';
import { useAuthProvider } from 'app/context/auth';
import { SupbortLogo } from 'lib/content/siteSettings';
import Image from 'next/image';
import Link from 'next/link';
import SignInModal from 'ui/Buttons/SignIn';
import UserAvatar from 'ui/User/UserAvatar';
import NotificationIcon from '../NotificationIcon';

function Navbar() {
  const { user } = useAuthProvider();
  // console.log(useAuthProvider())

  return (
    <div className="fixed md:hidden top-0 left-0 right-0 z-[250] border-zinc-200 dark:border-zinc-800 pl-6 py-2.5 border-b w-full bg-zinc-100 dark:bg-black">
      <div className="z-[300] w-full  mx-auto relative  items-center flex justify-start">
        <Link href="/" className="flex items-center">
          <Image
            src={SupbortLogo}
            className="lg:mx-3  w-6 items-center justify-center mx-auto "
            alt="Subport Logo"
            width={36}
            height={18}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className="self-center text-xl font-seminormal whitespace-nowrap text-black dark:text-white ">
            subport
          </span>
        </Link>
        {user ? (
          <div className="flex w-full items-center justify-end max-w-screen-xl mx-auto space-x-2">
            <NotificationIcon />

            <UserAvatar />
          </div>
        ) : (
          <div className="flex items-center justify-end max-w-screen-xl mx-auto h-6 lg:hidden">
            <SignInModal />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

const SearchButton = () => {
  return (
    <button
      type="submit"
      className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
  );
};
