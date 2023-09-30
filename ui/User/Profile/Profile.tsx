import { useImagePath } from "lib/constants";
import React from "react";
import { FollowButton } from "ui/Buttons/FollowButton";
import Image from "next/image";
import SubscribeButton from "ui/Buttons/SubscribeButton";
import { FaMapPin } from "react-icons/fa";
import ProfileBackgroundImage from "./ProfileBackgroundImage";
import useSubscribeButtonStore from "ui/Buttons/SubscribeButton/store";
async function Profile({ profile, username, data }: any) {
  const imagePath = useImagePath(profile.avatar_url)

  const modalOpen = useSubscribeButtonStore.getState().isModalOpen
  

  return (
    <div className="w-full mx-auto  content-center overscroll-x-none overflow-x-hidden overflow-y-visible">
      <ProfileBackgroundImage uid={profile?.id} url={data?.Profile?.bg_url} publicData={data} />
      <div className=" pt-16 mx-auto md:px-4">
        <div className=" flex flex-col min-w-0 break-words bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 w-full mb-6 shadow-lg rounded-md -mt-36 pb-8 relative z-[99999]">
          
          <div className="grid grid-cols-12 px-6 relative">
            <div className="flex flex-col items-start w-full col-span-9 md:col-span-2 justify-start order-1  -mt-20">
              <Image
                alt="avatar"
                width={150}
                height={150}
                className="shadow-lg rounded-full h-auto align-middle border-none   max-w-[150px] aspect-square object-cover"
                src={imagePath}
                style={{ objectFit: 'cover', width: 'auto', height: 'auto' }}
                blurDataURL={"/images/stock/blur.png"}
              />
              <div className="block text-center md:text-left ">
                <h3 className="text-lg md:text-xl font-bold leading-normal text-zinc-900 dark:text-zinc-200">
                  {profile?.display_name || ''}
                </h3>
                <h4 className="text-sm md:text-base leading-normal text-zinc-500">
                  @{username}
                </h4>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row   w-full col-span-12 md:col-span-8 items-center order-3 md:order-2 mx-auto">
              <UserStats followers={data?.FollowerCount} following={data?.FollowingCount} drops={data?.DropsCounts} />
              <UserBio profile={profile} /></div>
            <div className="flex absolute top-5 right-5 space-x-2  items-center order-2 md:order-3  md:mt-0 z-50">
              <FollowButton currentProfile={profile} />
              <SubscribeButton currentProfile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UserStats = ({ followers, following, drops }: any) => {
  return (
    <div className="flex justify-center py-4 font-semibold ">
      <div className="mr-3 p-3 text-center">
        <span className="text-lg font-bold block uppercase tracking-wide text-zinc-400 ">
          {followers}
        </span>
        <span className="text-xs 0 text-zinc-900 dark:text-zinc-200 ">Followers</span>
      </div>
      <div className="lg:mr-3 p-3 text-center">
        <span className="text-lg font-bold block uppercase tracking-wide text-zinc-400">
          {following}
        </span>
        <span className="text-xs text-zinc-900 dark:text-zinc-200 ">Following</span>
      </div>
      <div className="mr-3 p-3 text-center">
        <span className="text-lg font-bold block uppercase tracking-wide text-zinc-400">
          {drops}
        </span>
        <span className="text-xs text-zinc-900 dark:text-zinc-200 ">Releases</span>
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
//  console.log(profile)
  return (
    <div className="flex w-full text-xs md:text-sm leading-normal mt-0 mb-2 text-zinc-400 font-bold uppercase justify-center mx-auto">
      <FaMapPin />
      {profile.city},<br className="hidden xl:visible" />{profile.state ? profile.state : profile.country}
    </div>
  );
};
export default Profile;
