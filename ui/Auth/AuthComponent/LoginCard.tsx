"use client";
import { redirectUrl, supabaseAuth } from "lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export default function LoginCard({ close, isHomePage }: {close?: any , isHomePage?: boolean}) {
  const [signinIn, setSigningIn] = useState(false)
  const router = useRouter();
  const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-library-modify',
    'user-library-read',
    'user-follow-read',
    'user-follow-modify',
].join(',');
//console.log(redirectUrl, "REDIRECT URL")

  const handleSignInWithSpotify = async () => {
    setSigningIn(true)
    toast('Signing In')
    await supabaseAuth.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
          scopes: scopes,
          redirectTo: redirectUrl(location),
          //skipBrowserRedirect: true,
      
      },
  });
  //setSigningIn(false)
  router.refresh()
  };

  const handleSignInWithGoogle = async () => {
    await supabaseAuth.auth.signInWithOAuth({
      provider: "google",
      options: {
          redirectTo: redirectUrl(location)
      },
  });  
    router.refresh();
   
    };



  return (
    <div className="relative z-[9999999px]">

      {!isHomePage ? 
      <div className="flex flex-col px-6 py-4 border-b rounded-t dark:border-zinc-600 relative min-w-full w-sm lg:w-full">
        <div className='cursor-pointer p-2 border dark:border-zinc-700 border-zinc-300 rounded text-sm w-24 text-center text-black dark:text-white bg-white dark:bg-black absolute right-5 top-3' onClick={() => close(false)}>Close</div>

        <h3 className="text-base font-semibold text-zinc-900 lg:text-xl dark:text-white">
          Sign in
        </h3>
      </div> : '' }
      <div className="p-6 w-full my-4">
       {!isHomePage ? <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
          Connect with Spotify to login.
        </p> : <h1 className="text-2xl pb-4 font-semibold text-zinc-600 dark:text-zinc-100">
          Connect with Spotify to login.
        </h1>}
        <ul className="my-4 space-y-3">

          <li className={`${signinIn ? 'cursor-wait' : 'cursor-pointer'}`}  onClick={handleSignInWithSpotify}>
            <div
              className={'flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 dark:text-white'}
 >
              <img className="w-5 h-5" src='/images/icons/spotify.png' />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Spotify
              </span>
            </div>
          </li>
          <li className={`${signinIn ? 'cursor-wait' : 'cursor-pointer'} hidden`}onClick={handleSignInWithGoogle}>
            <div
              className={'flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 dark:text-white'}
>              <img className="w-5" src="/images/icons/icons8-google-96.png" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Google
              </span>
            </div>
          </li>
         
        </ul>
        <div>
        </div>
      </div>


    </div>
  );
}

