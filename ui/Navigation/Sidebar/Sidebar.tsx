'use client';
import { useAuthProvider } from 'app/context/auth';
import { SupbortLogo } from 'lib/content/siteSettings';
import Image from 'next/image';
import Link from 'next/link';
import SignInModal from 'ui/Buttons/SignIn';
import SocialRow from 'ui/Misc/SocialRow';
import PlaylistCreator from 'ui/Playlist/PlaylistCreator';
import { AdminRoutes, getUserRoutes, PublicRoutes } from '../Routes';

function Sidebar() {
  const { user, profile } = useAuthProvider();
 // console.log(user)

  return (
    <aside className="hidden  md:block bg-gray-100 h-full z-50 max-h-screen w-[128px] lg:w-[256px] lg:pl-6 px-4 py-4 dark:bg-black border border-r-1 text-white border-b border-zinc-200 dark:border-zinc-800 top-0 fixed float-left left-0">
      <div className="mb-16 mx-auto m-3">
        <Link href="/" className="flex items-center">
          <Image
            src={SupbortLogo}
            className="lg:mx-3  w-9 items-center justify-center mx-auto "
            alt="Subport Logo"
            width={36}
            height={18}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white hidden lg:block">
            subport
          </span>
        </Link>
      </div>
      <nav className="flex-grow p-2">
        <ul className="font-normal text-lg dark:text-zinc-100 text-zinc-900 items-center mx-auto flex-col space-y-8">
          <SidebarRoutes user={user} profile={profile} />
        </ul>
        <hr className="hidden sm:flex sm:-16 lg:w-40 border-zinc-600 mt-24 mb-8" />
        {/* {user?.email ? (
          <div className="hidden lg:block">
            <PlaylistCreator />
          </div>
        ) : (
          <div className="hidden lg:block">
            <SignInModal />
          </div>
        )} */}
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
  const { user } = useAuthProvider();

  return (
    <aside className="sm:hidden block bg-gray-100 h-full z-50  w-1/2  px-4 py-4 dark:bg-black border border-r-1 text-white border-b border-zinc-200 dark:border-blue-800 top-0 fixed float-left left-0">
      <div className="mb-16 mx-auto m-3">
        <Link href="/" className="flex items-center">
          <Image
            src={SupbortLogo}
            className="lg:mx-3  w-9 items-center justify-center mx-auto "
            alt="Subport Logo"
            width={36}
            height={18}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span className="self-center text-xl font-seminormal whitespace-nowrap text-black dark:text-white ">
            subport
          </span>
        </Link>
      </div>
      <nav className="flex-grow p-2">
        <ul className="font-normal text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex-col space-y-24">
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

const SidebarRoutes = ({ user, profile }: any) => {
  const UserRoutes = getUserRoutes(profile?.username);

  return (
    <>
      {PublicRoutes.map((link) =>  {

        return (
        
        <Link href={link.route} key={link.name}>
          <li className="py-1.5">
            <div className='flex items-center space-x-2'>
            <div className="lg:flex items-center justify-center hidden group w-8  rounded-full text-zinc-900 bg-zinc-200 hover:bg-zinc-100 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105">
            {link.icon && link.icon}
            </div>
            <p className="hidden lg:block"> {link.name}</p>
            </div>
            <div className="block lg:hidden group w-8 mx-auto rounded-full text-zinc-900 bg-zinc-200 hover:bg-zinc-100 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105 mb-3">
            {link.icon && link.icon}

            </div>
          </li>
        </Link>
      )})}

      {user &&
        UserRoutes.map((link) => (
          <Link key={link.name} href={link.route}>
            <li
              className={`py-1.5 ${link.name === 'Create' && !profile.is_artist && 'hidden'
                }`}
            >
                          <div className='flex items-center space-x-2'>
                          <div className="lg:flex items-center justify-center  hidden group w-8  rounded-full text-zinc-900 bg-zinc-200 hover:bg-zinc-100 p-2.5 shadow-zinc-200 hover:shadow-sm hover:scale-105">
                          {link.icon && link.icon}

            </div>
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
              </div>
            </li>
          </Link>
        ))}
      <></>
    </>
  );
};

const AdminSidebarRoutes = ({ user }: any) => {
  const emails = ['randal.herndon@gmail.com', 'djtwinnytwin@gmail.com'];
  const hasAccess = emails.includes(user?.email);
  return (
    <>
      {hasAccess &&
        AdminRoutes.map((link) => (
          <div
            key={link.name}
            className="font-normal text-lg dark:text-zinc-200 text-zinc-900"
          >
            <Link href={link.route} target="blank">
              <p>{link.name}</p>
            </Link>
          </div>
        ))}
    </>
  );
};
