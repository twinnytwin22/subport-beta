//import { readContractURIs } from 'lib/hooks/readContractURIs';
import dummyData from 'lib/providers/swiper/dummyData.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { FaSpotify } from 'react-icons/fa';
import ProfileList from 'ui/User/New-Profile-Files/ProfileAboutMeSections';
import { checkUser } from 'utils/database';

export const dynamic = 'force-dynamic';

export default async function Page({
  params
}: {
  params: { slug: string; user: string };
}) {
  const { user } = params;
  try {
    const res = await checkUser({ user });

    if (!res?.exists) {
      return notFound();
    }

    // const drops = await getProfileData(res.profile?.id);
    // const contractAddresses = drops?.Drops?.map(
    //   (drop: any) => drop.contract_address
    // );
    // const metaData: any = await readContractURIs(contractAddresses).catch(
    //   console.error
    // );

    // const dropsWithMetaData: any = drops?.Drops?.map(
    //   (drop: any, index: any) => ({
    //     drop,
    //     metaData: metaData[index]?.metadata
    //   })
    // );

    const profile = res?.profile;
    const data: any = dummyData;
    const dummyImage = data[0].images[0];

    return (
      <div className="relative top-16 mb-40 h-full">
        <Suspense
          fallback={
            <div className="p-16 rounded-md animate-pulse duration-200 ease-in-out bg-zinc-100 dark:bg-zinc-800 h-screen " />
          }
        >
          {/* Image Row */}
          <div className="flex space-x-3 items overflow-x-scroll re">
            {data &&
              data[0].images.map((image: any, index: any) => {
                return (
                  <div key={index}>
                    <Image
                      // onClick={() => router.push(location + '/' + profile?.username)}
                      priority={false}
                      width={250}
                      height={250}
                      className="max-w-80 w-full min-w-80 aspect-square rounded-xl"
                      src={image as string}
                      //  style={{ objectFit: "cover" }}
                      alt="Song-cover"
                      placeholder="blur"
                      blurDataURL={'/images/stock/blur.png'}
                    />
                  </div>
                );
              })}
          </div>
          {/* Profile Intro */}
          <div>
            <h1 className="text-2xl py-3 font-semibold">
              {profile?.display_name || ''}
            </h1>
            <p>{profile?.bio || ''}</p>
            <br />
            <p>
              35 | {profile?.city}, {profile?.country}
            </p>
            <div className="flex gap-1 py-2 items-center max-h-5">
              <FaSpotify className="text-green-500" />
              <p className="text-xs">Spotify Verified</p>
            </div>
          </div>
          {/* <Views drops={[]} currentProfile={res.profile} /> */}
          <br />
          <hr className="dark:border-zinc-700" />
          <br />
          {/* Quick Facts */}
          <ProfileList
            occupation="Musician"
            education="Bachelor of Arts"
            gender="Male"
          />
          <br />
          <hr className="dark:border-zinc-700" />
          <br />
          {/* Interests */}
          <div>
            <h2 className="text-xl font-semibold">Interests</h2>
          </div>
          <br />
          <hr className="dark:border-zinc-700" />
          <br />
          {/* Influences */}
          <div>
            <h2 className="text-xl font-semibold">Influences</h2>
          </div>
          <br />
          <hr className="dark:border-zinc-700" />
          <br />
          {/* About the Artist */}
          <div>
            <h2 className="text-xl font-semibold">
              About {profile?.display_name}
            </h2>
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('An error occurred:', error);
    notFound();
  }
}
