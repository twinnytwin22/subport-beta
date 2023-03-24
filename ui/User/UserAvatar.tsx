'use client'
import React, { useState, useEffect } from 'react'
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react';
function UserAvatar() {
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen, 'open:')
    const {data:session, status} = useSession()
  return (
    <>
    <div onMouseEnter={() => setIsOpen(true)}
         onClick={() => setIsOpen(false)}>
        <img
    className="flex w-10 rounded-full"
    src={session?.user?.image as string}
    alt="Rounded avatar"
  /></div>
  {isOpen && 
  <div className='absolute z-50 top-16 right-5 max-w-8xl'>
  <UserMenu/></div>
  }
  </>
  )
}

export default UserAvatar