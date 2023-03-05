'use client'
import React, { useState, useEffect } from 'react'
import UserMenu from './UserMenu';

function UserAvatar() {
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen, 'open:')
  return (
    <>
    <div onClick={() => setIsOpen(true)}><img
    className="flex w-10 rounded-full"
    src="/avatar.jpg"
    alt="Rounded avatar"
  /></div>
  {isOpen && 
  <div className='absolute top-16 right-5 max-w-8xl'>
  <UserMenu/></div>
  }
  </>
  )
}

export default UserAvatar