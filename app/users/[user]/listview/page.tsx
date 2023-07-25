import { getProfileData } from 'lib/hooks/getProfileDrops';
import { readContractURIs } from 'lib/hooks/readContractURIs';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import Profile from 'ui/User/Profile/Profile';
import ProfileContent from 'ui/User/Profile/ProfileContent';
import ProfileMusicList from 'ui/User/Profile/Views/ProfileMusicList';
import { checkUser } from 'utils/database';

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { slug: string, user: string } }) {
    const { user } = params;
    try {
        const res = await checkUser(user);

        if (!res.exists) {
            return notFound();
        }

        const drops = await getProfileData(res.profile?.id)
        const contractAddresses = drops?.Drops?.map((drop: any) => drop.contract_address);
        const metaData: any = await readContractURIs(contractAddresses).catch(console.error);

        const dropsWithMetaData: any = drops?.Drops?.map((drop: any, index: any) => ({
            drop,
            metaData: metaData[index]?.metadata
        }));

        return (

            <div>
                <Suspense>
                    <ProfileMusicList drops={dropsWithMetaData} currentProfile={res.profile} />
                </Suspense>
            </div>

        );
    } catch (error) {
        console.error('An error occurred:', error);
        notFound()
    }
}
