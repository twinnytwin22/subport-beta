import { notFound } from 'next/navigation';
import React from 'react';
import Profile from 'ui/User/Profile';
import { checkUser } from 'utils/database';
export const dynamic = 'force-dynamic';
export default async function Page({ params }: { params: { slug: string, user: string } }) {
  const { user } = params;
  console.log(params.user, 'page slug');

  try {
    const res = await checkUser(user);
    console.log(res, 'user exists');

    if (!res) {
      return notFound();
    }

    return (
      <div className='mx-auto'>
        <Profile />
      </div>
    );
  } catch (error) {
    console.error('An error occurred:', error);
    notFound()
  }
}
