'use client'
import { useAuthProvider } from "app/context/auth"
import { useCollectCheck } from "lib/hooks/useCollectCheck"
import Image from "next/image"
import { CollectIcon, CommentIcon, HeartIcon } from "ui/Cards/Collect/EngagementUI"
function CardEngagementRow({ dropId, reactionCount }: any) {
    const { profile, isLoading } = useAuthProvider()
    const collected = useCollectCheck(dropId, profile?.id)


    return !isLoading && dropId && (
        <div className="grid grid-cols-3 max-h-6 max-w-sm space-x-2 text-xs place-items-center select-none">
            <div className="flex h-6  space-x-1 items-center">
                <p>{reactionCount}</p>
                {profile ? <HeartIcon className='w-5 h-5' dropId={dropId} userId={profile?.id as string} /> :
                    <Image
                        width={20}
                        height={20}
                        className='w-5 h-5 grayscale' src="/emojis/like.png"
                        alt="fire"
                    />
                }

            </div>
            <div className="flex h-6  space-x-1 items-center isolate">
                <p>0</p>
                {profile && <CommentIcon className={`w-5 h-5 ${!collected && 'grayscale'}`} dropId={dropId} userId={profile?.id} />}
            </div>
            <div className="flex h-6 hover:scale-105 space-x-1 items-center">
                <p>0</p>
                {profile && <CollectIcon dropId={dropId} userId={profile?.id} />}
            </div>
        </div>
    )
}

export default CardEngagementRow