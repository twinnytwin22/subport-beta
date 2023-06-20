import { notFound } from 'next/navigation';
import React from 'react';
import Profile from 'ui/User/Profile/Profile';
import { checkUser } from 'utils/database';
export const dynamic = 'force-dynamic';

// export const revalidate = 180 // revalidate this segment every 60 seconds
export default async function Page({ params }: { params: { slug: string, user: string } }) {
  const { user } = params;
  try {
    const res = await checkUser(user);

    if (!res.exists) {
      return notFound();
    }

    return (
      <div className='mx-auto'>
        <Profile profile={res.profile} username={user} />
      </div>
    );
  } catch (error) {
    console.error('An error occurred:', error);
    notFound()
  }
}
