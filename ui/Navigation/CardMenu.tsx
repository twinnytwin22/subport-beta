'use client'
import { supabase } from 'lib/providers/supabase/supabaseClient';
import React from 'react'
import { toast } from 'react-toastify';

const handleLogout = async () => {
  toast("Signing Out");
  await supabase.auth.signOut()
};
function CardMenu() {
  return (
    <div className='hidden md:block'>

      <ul className="w-48 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white opacity-90">
        <li className="w-full px-4 py-2 border-b border-zinc-200 rounded-t-lg dark:border-zinc-600 hover:dark:bg-zinc-700">Profile</li>
        <li className="w-full px-4 py-2 border-b border-zinc-200 dark:border-zinc-600 hover:dark:bg-zinc-700">Settings</li>
        <div onClick={handleLogout}>
          <li className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-zinc-700">Sign out</li></div>
      </ul>

    </div>
  )
}

export default CardMenu