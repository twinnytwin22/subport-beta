'use client'
import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import { useAuthProvider } from 'app/context/auth';
import { downloadImage } from 'lib/hooks/downloadImage';
import { defaultUserImage } from 'lib/constants';

function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useAuthProvider();
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target as Element;
      if (!targetElement.closest('.user-menu')) {
        setIsOpen(false);
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

  useEffect(() => {
    if (!userAvatar && profile?.avatar_url) {
      handleImageLoad();
    }
  }, [profile?.avatar_url]);

  const handleImageLoad = async () => {
    const path = await downloadImage(profile?.avatar_url);
    if (path) {
      setUserAvatar(path);
    }
  };

  return profile && (
    <div className="relative rounded-full bg-blue-900">
      {userAvatar && (
        <div onClick={toggleMenu} className="block w-10 bg-blue-900  rounded-full cursor-pointer">
          <img className="block w-full bg-blue-800 rounded-full" src={userAvatar ?? defaultUserImage} alt="avi" width={50} height={50} />
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
