import { useImagePath } from "lib/constants";
import React, { Suspense } from "react";
import { FollowButton } from "ui/Buttons/FollowButton";
import { getProfileData } from "lib/hooks/getProfileDrops";
import ProfileContent from "./ProfileContent";

async function Profile({ profile, username }: any) {
  const imagePath = useImagePath(profile.avatar_url)

  const res = await getProfileData(profile?.id)

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
      <div className=" py-16 mx-auto px-4 ">
        <div className=" flex flex-col min-w-0 break-words bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 w-full mb-6 shadow-xl rounded-lg -mt-36 pb-8">
          <div className="grid grid-cols-12 px-6">
            <div className="flex w-full col-span-9 md:col-span-2 justify-start order-1">
              <div className="">
                <Suspense>
                  <img
                    alt="avatar"
                    src={imagePath}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -mt-20 max-w-[150px]"
                  />
                </Suspense>
              </div>
              <div className="block">
                <h3 className=" text-xl md:text-2xl font-bold leading-normal text-center text-zinc-900 dark:text-zinc-200 pt-24">
                  {profile?.full_name}
                </h3>
                <h4 className=" text-lg md:text-xl leading-normal text-center text-zinc-500">
                  @{username}
                </h4>
              </div>
            </div>
            <div className="flex flex-col md:flex-row  w-full col-span-12 md:col-span-8 items-center order-3 md:order-2 mx-auto">
              <UserStats followers={res?.FollowerCount} following={res?.FollowingCount} drops={res?.DropsCounts} />


              <UserBio profile={profile} /></div>
            <div className="flex justify-center items-center col-span-3 md:col-span-2 order-2 md:order-3">
              <Suspense>
                <FollowButton currentProfile={profile} />
              </Suspense>
            </div>
          </div>

        </div>

        <div>
          <ProfileContent drops={res?.Drops} />
        </div>

      </div>

    </div>
  );
}

const UserStats = ({ followers, following, drops }: any) => {
  return (
    <div className="flex justify-center py-4 ">
      <div className="mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-zinc-400 ">
          {followers}
        </span>
        <span className="text-sm 0 text-zinc-900 dark:text-zinc-200 ">Followers</span>
      </div>
      <div className="lg:mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-zinc-400">
          {following}
        </span>
        <span className="text-sm text-zinc-900 dark:text-zinc-200 ">Following</span>
      </div>
      <div className="mr-4 p-3 text-center">
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
    <div className="flex w-full md:block xl:px-24  mt-0 md:mt-6">
      <UserLocation profile={profile} />
      <p className="flex mb-4 max-w-full text-xs md:text-sm text-zinc-900 dark:text-zinc-200 break-words ">
        {profile.bio}
      </p>
    </div>
  );
};
const UserLocation = ({ profile }: any) => {
  console.log(profile)
  return (
    <div className="flex w-full text-xs md:text-sm leading-normal mt-0 mb-2 text-zinc-400 font-bold uppercase">
      <svg className="h-5 pr-2 text-zinc-900 dark:text-zinc-200  " fill="none" stroke="white" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      {profile.city},{profile.state ? profile.state : profile.country}
    </div>
  );
};
export default Profile;