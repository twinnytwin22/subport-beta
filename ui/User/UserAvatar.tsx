'use client'
import React, { useState, useEffect, useRef } from 'react';
import UserMenu from './UserMenu';
import { useAuthProvider } from 'app/context';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, profile } = useAuthProvider();
  const email = user?.email;
  const [userAvatar, setUserAvatar] = useState('');
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const supabase = createClientComponentClient()







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

  const handleImageLoad = async () => {
    console.log('trying image upload')
    if (profile) {
      const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(`/${profile?.avatar_url}`)

      if (data) {
        console.log(data, 'image load')
        setUserAvatar(data?.publicUrl)
        setIsAvatarLoaded(true)
      }

    }

  };
  return profile && (
    <div className="relative rounded-full bg-blue-900">
      {isAvatarLoaded ? (
        <>
          <div onClick={toggleMenu} className="block w-10 bg-blue-900 rounded-full cursor-pointer">
            <Image className="block w-full bg-blue-800 rounded-full" src={userAvatar} alt="avi" onLoad={handleImageLoad} width={50} height={50} priority />
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
