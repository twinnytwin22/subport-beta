'use client'
import React, { useState, useEffect, useRef } from 'react';
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react';

function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const menuRef = useRef(null);
  const email = session?.user.email


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

    { isOpen == false ? setIsOpen(true) : setIsOpen(false) };
  };

  return (
    <div className="relative rounded-full bg-blue-900">
      <div onClick={toggleMenu} className="block w-10 bg-blue-900 rounded-full cursor-pointer">
        <img className="block w-full bg-blue-800 rounded-full" src={session?.user?.image as string} alt="avi" />
      </div>
      {isOpen && (
        <div ref={menuRef} className="absolute z-50 top-12 right-0">
          <UserMenu email={email} />
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
