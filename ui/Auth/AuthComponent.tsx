"use client";
import { useAuthProvider } from "app/context/auth-old";
import { supabaseAuth } from "lib/constants";
import { useRouter } from "next/navigation";

export default function LoginCard({ close }: any) {
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
const redirectUrl = `${location.origin}/api/auth/callback/` 
console.log(redirectUrl, "REDIRECT URL")

  const handleSignInWithSpotify = async () => {
    await supabaseAuth.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
          scopes: scopes,
         redirectTo: redirectUrl
      },
  });
  router.refresh()
  };

  const handleSignInWithGoogle = async () => {
    await supabaseAuth.auth.signInWithOAuth({
      provider: "google",
      options: {
         redirectTo: redirectUrl
      },
  });  
    router.refresh();
   
    };



  return (
    <div className="relative z-[9999999px]">


      <div className="flex flex-col px-6 py-4 border-b rounded-t dark:border-zinc-600 relative min-w-full w-sm lg:w-full">
        <div className='cursor-pointer p-2 border dark:border-zinc-700 border-zinc-300 rounded text-sm w-24 text-center text-black dark:text-white bg-white dark:bg-black absolute right-5 top-3' onClick={() => close(false)}>Close</div>

        <h3 className="text-base font-semibold text-zinc-900 lg:text-xl dark:text-white">
          Sign in
        </h3>
      </div>
      <div className="p-6 w-full">
        <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
          Connect with Spotify to login.
        </p>
        <ul className="my-4 space-y-3">

          <li onClick={handleSignInWithSpotify}>
            <a
              href="#"
              className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white"
            >
              <img className="w-5" src='/images/icons/spotify.png' />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Spotify
              </span>
            </a>
          </li>
          <li onClick={handleSignInWithGoogle}>
            <div

              className="flex items-center p-3 text-base font-bold text-zinc-900 rounded-md bg-zinc-50 hover:bg-zinc-100 group hover:shadow dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:text-white"
            >

              <img className="w-5" src="/images/icons/icons8-google-96.png" />
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


