import { useImagePath } from "lib/constants";
import React, { Suspense } from "react";
import { FollowButton } from "ui/Buttons/FollowButton";
import { getProfileData } from "lib/hooks/getProfileDrops";
import ProfileContent from "./ProfileContent";
import Image from "next/image";
import { checkSubscription } from "utils/database";
import SubscribeButton from "ui/Buttons/SubscribeButton";
import { FaMapPin } from "react-icons/fa";

async function Profile({ profile, username }: any) {
  const imagePath = useImagePath(profile.avatar_url)

  const res = await getProfileData(profile?.id)
  const sub = await checkSubscription(profile?.id)
  console.log(sub)
  return (
    <div className="">
      <div className=" block h-[300px] bg-black">
        <div
          className=" w-full h-full bg-center bg-cover bg-fixed rounded-lg"
          style={{
            backgroundImage: `url(/images/stock/coverBanner.jpg)`,
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className=" py-16 mx-auto md:px-4">
        <div className=" flex flex-col min-w-0 break-words bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 w-full mb-6 shadow-xl rounded-lg -mt-36 pb-8">
          <div className="grid grid-cols-12 px-6">
            <div className="flex w-full col-span-9 md:col-span-2 justify-start order-1">
              <div className="">
                <Suspense>
                  <Image
                    alt="avatar" width={150} height={150}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -mt-20 max-w-[150px]"
                    src={imagePath}
                    style={{ objectFit: 'cover' }}
                    priority={true}
                  />

                </Suspense>
              </div>
              <div className="block">
                <h3 className=" text-lg md:text-xl font-bold leading-normal text-center text-zinc-900 dark:text-zinc-200 pt-24">
                  {profile?.full_name}
                </h3>
                <h4 className=" text-lg md:text-xl leading-normal text-center text-zinc-500">
                  @{username}
                </h4>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row   w-full col-span-12 md:col-span-8 items-center order-3 md:order-2 mx-auto">
              <UserStats followers={res?.FollowerCount} following={res?.FollowingCount} drops={res?.DropsCounts} />


              <UserBio profile={profile} /></div>
            <div className="flex flex-col -mr-10 md:-mr-6 lg:-mr-4 md:justify-center items-end col-span-2 order-2 md:order-3 mt-20 md:mt-0">
              <Suspense>
                <FollowButton currentProfile={profile} />
                {sub &&
                  <SubscribeButton currentProfile={profile} sub={sub} />}
              </Suspense>
            </div>
          </div>

        </div>

        <div>
          <Suspense>
            <ProfileContent drops={res?.Drops} currentProfile={profile} />
          </Suspense>
        </div>

      </div>

    </div>
  );
}

const UserStats = ({ followers, following, drops }: any) => {
  return (
    <div className="flex justify-center py-4 font-semibold ">
      <div className="mr-3 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-zinc-400 ">
          {followers}
        </span>
        <span className="text-sm 0 text-zinc-900 dark:text-zinc-200 ">Followers</span>
      </div>
      <div className="lg:mr-3 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-zinc-400">
          {following}
        </span>
        <span className="text-sm text-zinc-900 dark:text-zinc-200 ">Following</span>
      </div>
      <div className="mr-3 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-zinc-400">
          {drops}
        </span>
        <span className="text-sm text-zinc-900 dark:text-zinc-200 ">Releases</span>
      </div>

    </div>
  );
};





const UserBio = ({ profile }: any) => {
  console.log(profile, 'bio')
  return (
    <div className="flex w-full md:block xl:px-24  mt-0 md:mt-6 mx-auto justify-center content-center place-items-center items-center">
      <UserLocation profile={profile} />
      <p className="flex mb-4 max-w-full text-xs md:text-sm text-zinc-900 dark:text-zinc-200 break-words mx-auto justify-center ">
        {profile.bio}
      </p>
    </div>
  );
};
const UserLocation = ({ profile }: any) => {
  console.log(profile)
  return (
    <div className="flex w-full text-xs md:text-sm leading-normal mt-0 mb-2 text-zinc-400 font-bold uppercase justify-center mx-auto">
      <FaMapPin />
      {profile.city},<br className="hidden xl:visible" />{profile.state ? profile.state : profile.country}
    </div>
  );
};
export default Profile;
