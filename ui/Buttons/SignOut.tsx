'use client'
import { useAuthProvider } from "app/context/auth-old";

export function SignOutButton() {
  const { signOut } = useAuthProvider()

  const handleSignOut = async () => {
  await signOut();
  }



  return (
    <div onClick={handleSignOut} className='w-full flex items-center'>
      <div
        className="flex text-zinc-900 items-center dark:text-white hover:bg-zinc-50 bg-zinc-100 focus:ring-4 dark:bg-zinc-900 border-zinc-700 border focus:ring-zinc-300 hover:scale-105 text-xs rounded-md lg:text-sm px-3 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-zinc-700 focus:outline-none dark:focus:ring-zinc-800  shadow-zinc-200 hover:shadow-sm"
      >
        <h4>  Sign Out</h4>
        <div className="w-6 p-1">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}