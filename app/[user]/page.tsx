import React from 'react'
import Account from 'ui/User/Account'
import Profile from 'ui/User/Profile'
import UserCreated from 'ui/User/UserCreated'
import { useSession } from 'next-auth/react'
function page() {

  return (
    <div className='mx-auto'>
        <Profile/>
        <UserCreated/>

    </div>
  )
}

export default page