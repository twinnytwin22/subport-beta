import React from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { supabase } from 'lib/supabaseClient';
import DarkModeSwitch from 'ui/Buttons/DarkModeSwitch';

const handleLogout = async () => {
  toast("Signing Out");
  await supabase.auth.signOut();
};
function UserMenu({ email }: any) {
  return (
    <div className='hidden md:block'>

      <ul className="w-48 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white opacity-90">

        <li className="w-full px-4 py-2 border-b border-zinc-200 rounded-t-lg dark:border-zinc-600 text-[10px] text-center justify-center">{email}</li>
        <Link href="/user">
          <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-600 hover:dark:bg-zinc-700">Profile</li>
        </Link>
        <Link href='/settings'>
          <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-600 hover:dark:bg-zinc-700">Settings</li>
        </Link>
        <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-600 hover:dark:bg-zinc-700"><DarkModeSwitch /></li>
        <li onClick={handleLogout} className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-zinc-700">Sign out</li>
      </ul>

    </div>
  )
}

export default UserMenu