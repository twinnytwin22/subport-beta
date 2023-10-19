'use client';
import { useAuthProvider } from 'app/context/auth';
import { useState } from 'react';
import UserMenu from './UserMenu';
//import { downloadImage } from 'lib/hooks/downloadImage';
import { useImagePath } from 'lib/constants';
import { useHandleOutsideClick } from 'lib/hooks/handleOutsideClick';
import Image from 'next/image';
function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useAuthProvider();
  const avatar = useImagePath(profile?.avatar_url);
  useHandleOutsideClick(isOpen, setIsOpen, 'user-menu');

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    profile && (
      <div className="relative rounded-full w-fit select-none">
        {profile && (
          <div onClick={handleToggle} className="w-fit user-menu">
            <Image
              alt="avi"
              width={40}
              height={40}
              className=" shadow-lg dark:shadow-zinc-950 shadow-zinc-300 mx-4 lg:mx-auto w-10 h-10 rounded-full"
              src={avatar}
              style={{ objectFit: 'cover', width: 'auto', height: 'auto' }}
              placeholder="blur"
              blurDataURL={'/images/stock/blur.png'}
            />
          </div>
        )}

        {isOpen && (
          <>
            <div className="absolute z-[9999] top-12 right-0 hidden sm:block user-menu">
              <UserMenu user={user} profile={profile} />
            </div>
            <div className="absolute z-50 bottom-14 right-0 block sm:hidden user-menu">
              <UserMenu user={user} profile={profile} />
            </div>
          </>
        )}
      </div>
    )
  );
}

export default UserAvatar;
