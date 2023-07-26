import { getProfileData } from 'lib/hooks/getProfileDrops';
import Link from 'next/link';
import React, { Suspense } from 'react'
import Profile from 'ui/User/Profile/Profile';
import ProfileEventsRow from 'ui/User/Profile/ProfileEventsRow';
import { checkUser } from 'utils/database';

async function ProfileLayout(props: { params: { slug: string, user: string }, children: React.ReactNode }) {
    const { user } = props.params;
    try {
        const res = await checkUser({ user });

        if (!res?.exists) {
            throw new Error('User does not exist')
        }

        const data = await getProfileData(res.profile?.id)
        return (
            <section className='mx-auto w-full relative z-0'>
                <Suspense>
                    <Profile profile={res.profile} username={user} data={data} />
                </Suspense>
                <Suspense fallback={<div className='p-16 rounded-md animate-pulse duration-200 ease-in-out bg-zinc-800' />
                }>


                    <ProfileEventsRow profile={res.profile} />
                </Suspense>
                {props.children}
            </section>
        );
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export default ProfileLayout