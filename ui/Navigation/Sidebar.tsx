'use client'
import SignInModal from "ui/Buttons/SignIn";
import Link from "next/link";
import { useAuthProvider } from "app/context/auth";
import { SupbortLogo } from "lib/content/siteSettings";
import { AdminRoutes, PublicRoutes, UserRoutes } from "./Routes";
import SocialRow from "ui/Misc/SocialRow";
import PlaylistCreator from "ui/Playlist/PlaylistCreator";
import Image from "next/image";
function Sidebar() {
  const { user } = useAuthProvider()

  return (

    <aside className="hidden  sm:block bg-gray-100 h-full z-50 max-h-screen w-[128px] lg:w-[256px] lg:pl-6 px-4 py-4 dark:bg-black border border-r-1 text-white border-b border-zinc-200 dark:border-zinc-800 top-0 fixed float-left left-0">
      <div className="mb-16 mx-auto m-3">
        <Link href="/" className="flex items-center">
          <Image src={SupbortLogo} className="lg:mx-3  w-9 items-center justify-center mx-auto " alt="Subport Logo" width={36} height={18} style={{ width: 'auto', height: 'auto' }}
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white hidden lg:block">
            subport
          </span>
        </Link>
      </div>
      <nav className="flex-grow p-2">
        <ul className="font-bold text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex-col space-y-8">
          <SidebarRoutes user={user} />
        </ul>
        <hr className="hidden sm:flex sm:-16 lg:w-40 border-zinc-600 mt-24 mb-8" />
        {user?.email ? (
          <div className="hidden lg:block">
            <PlaylistCreator />
          </div>

        ) : (
          <div className="hidden lg:block">
            <SignInModal />
          </div>
        )}
      </nav>
      <nav className="flex-grow fixed  bottom-12 left-6 p-2">
        <AdminSidebarRoutes user={user} />
      </nav>
      <div className="absolute bottom-5">
        <SocialRow />
      </div>
    </aside>

  );
}

export default Sidebar;

export function MobileSidebar() {
  const { user } = useAuthProvider()

  return (

    <aside className="sm:hidden block bg-gray-100 h-full z-50  w-1/2  px-4 py-4 dark:bg-black border border-r-1 text-white border-b border-zinc-200 dark:border-blue-800 top-0 fixed float-left left-0">
      <div className="mb-16 mx-auto m-3">
        <Link href="/" className="flex items-center">
          <Image src={SupbortLogo} className="lg:mx-3  w-9 items-center justify-center mx-auto " alt="Subport Logo" width={36} height={18} style={{ width: 'auto', height: 'auto' }}
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white ">
            subport
          </span>
        </Link>
      </div>
      <nav className="flex-grow p-2">
        <ul className="font-bold text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex-col space-y-8">
          <SidebarRoutes user={user} />
        </ul>
        <hr className="hidden sm:flex sm:-16 lg:w-40 border-zinc-600 mt-24 mb-8" />
        {user?.email ? (
          <div className="hidden lg:block">
            <PlaylistCreator />
          </div>

        ) : (
          <div className="hidden lg:block">
            <SignInModal />
          </div>
        )}
      </nav>
      <nav className="flex-grow fixed  bottom-12 left-6 p-2">
        <AdminSidebarRoutes user={user} />
      </nav>
      <div className="absolute bottom-5">
        <SocialRow />
      </div>
    </aside>

  );
}


const SidebarRoutes = ({ user }: any) => {
  return (
    <div>
      {PublicRoutes.map((link) => (
        <Link href={link.route} key={link.name}>
          <li className="">
            <p className="hidden lg:block"> {link.name}</p>
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
        </Link>))}

      {user && UserRoutes.map((link) => (
        <Link key={link.name} href={link.route}>
          <li className="">
            <p className="hidden lg:block">{link.name}</p>
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
        </Link>)
      )}
      <>

      </>
    </div>
  )
}


const AdminSidebarRoutes = ({ user }: any) => {
  return (
    <>
      {user?.email === 'randal.herndon@gmail.com' && AdminRoutes.map((link) => (
        <div key={link.name} className="font-bold text-lg dark:text-zinc-200 text-zinc-900">
          <Link href={link.route}>
            <p>
              {link.name}</p>
          </Link>

        </div>))
      }
    </>)

}