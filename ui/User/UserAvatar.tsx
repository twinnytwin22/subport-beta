'use client'
import React, { useState, useEffect, useRef } from 'react';
import UserMenu from './UserMenu';
import { useAuthProvider } from 'app/context';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { downloadImage } from 'lib/hooks/downloadImage';

function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, profile } = useAuthProvider();
  const [userAvatar, setUserAvatar] = useState('');
  console.log(profile?.avatar_url)

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
  useEffect(() => {
    if (!userAvatar) {
      handleImageLoad()
    }
  }, [])

  const handleImageLoad = async () => {
    const path = await downloadImage({ path: profile?.avatar_url })
    if (path) {
      setUserAvatar(path)
    }

  };
  return profile && (
    <div className="relative rounded-full bg-blue-900">
      {userAvatar ? (
        <>
          <div onClick={toggleMenu} className="block w-10 bg-blue-900 rounded-full cursor-pointer">
            <img className="block w-full bg-blue-800 rounded-full" src={userAvatar} alt="avi" width={50} height={50} />
          </div>

        </>
      ) : <div onClick={toggleMenu} className="block w-10 bg-blue-900 rounded-full cursor-pointer">
        <img className="block w-full bg-blue-800 rounded-full" src={userAvatar} alt="avi" width={50} height={50} />
      </div>}
      <>
        {isOpen && (
          <div ref={menuRef} className="absolute z-50 top-12 right-0">
            <UserMenu user={user} profile={profile} />
          </div>
        )}
      </>
    </div>
  );
}

export default UserAvatar;
