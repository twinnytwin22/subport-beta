import { getProfileData } from 'lib/hooks/getProfileDrops';
import Link from 'next/link';
import React from 'react'
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
                <Profile profile={res.profile} username={user} data={data} />
                <ProfileEventsRow profile={res.profile} />
                {props.children}
            </section>
        );
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export default ProfileLayout