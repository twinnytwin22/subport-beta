'use client'
import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import { useAuthProvider } from 'app/context/auth';
import { downloadImage } from 'lib/hooks/downloadImage';
import { defaultUserImage, useImagePath } from 'lib/constants';
import Image from 'next/image';
function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useAuthProvider();
  const avatar = useImagePath(profile?.avatar_url)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target as Element;
      if (!targetElement.closest('.user-menu')) {
        setIsOpen(false);
        return
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return profile && (
    <div className="relative rounded-full w-fit select-none">
      {profile && (
        <div onClick={toggleMenu} className="w-fit">
          <Image
            alt="avi" width={40} height={40}
            className=" shadow-lg dark:shadow-zinc-950 shadow-zinc-300 mx-4 lg:mx-auto w-10 h-10 rounded-full"
            src={avatar}
            style={{ objectFit: 'cover' }}
            priority={true}
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
  );
}

export default UserAvatar;
