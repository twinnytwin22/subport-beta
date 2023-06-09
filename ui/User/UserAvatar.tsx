'use client'
import React, { useState, useEffect, useRef } from 'react';
import UserMenu from './UserMenu';
import { useAuthProvider } from 'app/context';
import Image from 'next/image';

function UserAvatar({ avi }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, profile } = useAuthProvider();
  const email = user?.email;
  const [userAvatar, setUserAvatar] = useState(profile?.avatar_url);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(!!profile);





  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleImageLoad = () => {
    if (profile) {
      setUserAvatar(profile?.avatar_url)
      setIsAvatarLoaded(true)
    }

  };
  return userAvatar && (
    <div className="relative rounded-full bg-blue-900">
      {isAvatarLoaded ? (
        <>
          <div onClick={toggleMenu} className="block w-10 bg-blue-900 rounded-full cursor-pointer">
            <Image className="block w-full bg-blue-800 rounded-full" src={`/${userAvatar || user?.user_metadata.avatar_url}`} alt="avi" onLoad={handleImageLoad} width={50} height={50} priority />
          </div>
          {isOpen && (
            <div ref={menuRef} className="absolute z-50 top-12 right-0">
              <UserMenu email={email} />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default UserAvatar;
