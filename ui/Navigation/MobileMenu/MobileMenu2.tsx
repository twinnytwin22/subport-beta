'use client';
import { useAuthProvider } from 'app/context/auth';
import { SupbortLogo } from 'lib/content/siteSettings';
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsViewList } from "react-icons/bs";
import { FaLayerGroup, FaMessage } from 'react-icons/fa6';
import { PiBroadcastFill } from "react-icons/pi";
import { PublicRoutes, getUserRoutes } from '../Routes';

function MobileMenu() {
  const [isOpen, setOpen] = useState(false);
  const { user, profile } = useAuthProvider();
  useHandleOutsideClick(isOpen, setOpen, 'mobile-sidebar');

  const handleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (user) {
    return (
      <>
        <div className="block md:hidden h-16 px-5 bg-white dark:bg-black pb-2 w-[100vw] fixed bottom-0 inset-x-0 z-10">
          <div>
            <div className="flex items-center text-3xl justify-between text-center mx-auto px-4 w-full group-hover:text-white border-b-2 border-transparent group-hover:border-white">
              {/* <div
                  className="px-1 flex flex-col items-center mobile-sidebar"
                  onClick={handleOpenMenu}
                >
                  <AiOutlineMenu className="w-10 h-10 pb-2" />
                </div> */}
              <FaLayerGroup className="" />
              <BsViewList />

              <Image className='w-fit invert dark:invert-0' alt='subport logo' width={35} height={35} src="/subport-s-white.png"/>
              <PiBroadcastFill />

              <FaMessage/>

            </div>
          </div>
        </div>
      </>
    );
  }
}
export default MobileMenu;

const MobileSidebarArea = ({ isOpen }: any) => {
  const { user, profile } = useAuthProvider();
  const UserRoutes = getUserRoutes(profile?.username);

  if (isOpen) {
    return (
      <div className="mobile-sidebar fixed h-screen top-0 -z-0 left-0 w-1/2  bg-white dark:bg-black visible sm:hidden">
        <div className="mb-16 mx-auto m-3 w-fit">
          <div className="flex items-center justify-around">
            <Image
              src={SupbortLogo}
              className="lg:mx-3  w-9 items-center justify-center mx-auto "
              alt="Subport Logo"
              width={36}
              height={18}
              style={{ width: 'auto', height: 'auto' }}
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
              </Link>
            ))}
          </ul>
          <ul className="font-bold pl-8 text-lg dark:text-zinc-200 text-zinc-900 items-center mx-auto flex-col space-y-8">
            {user &&
              UserRoutes.map((link) => (
                <Link key={link.name} href={link.route}>
                  <li className="">
                    <p className="block">{link.name}</p>
                  </li>
                </Link>
              ))}
          </ul>
          <></>
        </div>
      </div>
    );
  }
};
