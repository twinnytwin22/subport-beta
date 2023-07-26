import React from 'react'
import Image from 'next/image'
import { FollowButton } from 'ui/Buttons/FollowButton'
import { useImagePath } from 'lib/constants';

function EventOrganizer({ user }: any) {
    const artistImage = useImagePath(user?.profile?.avatar_url);
    return (
        <div className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 border shadow mt-8 rounded-md p-8 max-w-screen mx-auto relative z-20">
            <div className="mb-4 ml-2">
                <h1 className="text-xl lg:text-2xl font-bold text-black dark:text-white">
                    The artist
                </h1>
                <div className="flex justify-between mt-2.5">
                    <Image
                        className="aspect-square object-cover rounded-md"
                        placeholder="blur"
                        style={{
                            objectFit: "cover",
                            width: "auto",
                            height: "auto",
                        }}
                        blurDataURL={"/images/stock/blur.png"}
                        width={100}
                        height={100}
                        alt={user.profile?.username}
                        src={artistImage!}
                    />
                    <p>{user.profile.bio}</p>
                    <div className="place-items-end">
                        <FollowButton currentProfile={user.profile} />
                    </div>
                    <p className="text-zinc-600 hidden dark:text-zinc-300">
                        {JSON.stringify(user)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EventOrganizer