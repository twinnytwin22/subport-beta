import React from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch';
import { useAuthProvider } from 'app/context/auth';


function UserMenu({ profile, user }: any) {
  const { signOut } = useAuthProvider()
  const handleLogout = async () => {
    toast("Signing Out");
    signOut();
  };

  return (
    <div className='-mr-3 relative z-[9999]'>
      <ul className="w-48 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-950 dark:border-zinc-700 dark:text-white opacity-[95%]">
        <li className="w-full px-4 py-2 border-b border-zinc-200 rounded-t-lg dark:border-zinc-700  text-center justify-center">@{profile?.username}</li>
        <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-700  text-[10px]">{user?.email}</li>

        <Link href={`/${profile?.username}`}>
          <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 hover:dark:bg-zinc-700">Profile</li>
        </Link>
        <Link href='/settings'>
          <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 hover:dark:bg-zinc-700">Settings</li>
        </Link>
        <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 hover:dark:bg-zinc-700"><DarkModeSwitch /></li>
        <li onClick={handleLogout} className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-zinc-700">Sign out</li>
      </ul>

    </div>
  )
}

export default UserMenu