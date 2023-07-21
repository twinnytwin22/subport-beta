'use client'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addReaction, deleteReaction } from 'utils/database';
import { useReactionCheck } from 'lib/hooks/useReactionCheck';
import { useCollectCheck } from 'lib/hooks/useCollectCheck';
import Image from 'next/image';
import { CommentIcon } from './CommentIcon';
const HeartIcon = ({ className, dropId, userId }: any) => {
    const [reactionRowOpen, setReactionRowOpen] = useState(false);
    const reactionType = useReactionCheck(dropId, userId);

    const { mutate: addReactionMutation } = useMutation(addReaction);
    const { mutate: deleteReactionMutation } = useMutation(deleteReaction);

    const handleOpenReactionRow = () => {
        setReactionRowOpen(!reactionRowOpen);
    };

    const handleReactionClick = async (reaction: string) => {
        if (!userId) {
            // User is not authenticated, handle accordingly
            return;
        }

        if (reactionType === reaction) {
            // User clicked on the same reaction, so delete the reaction
            deleteReactionMutation({ dropId, userId });
            setReactionRowOpen(false);
        } else {
            // User clicked on a different reaction, so delete the current reaction (if any) and add the new one
            if (reactionType) {
                deleteReactionMutation({ dropId, userId });
                setReactionRowOpen(false);
            }
            addReactionMutation({ dropId, reactionType: reaction, userId });
            setReactionRowOpen(false);
        }
    };

    return (
        <div className="hover:scale-100">
            {reactionType?.length > 0 ? (
                <div onClick={handleOpenReactionRow}>
                    <Image
                        width={20}
                        height={20}
                        src={`/emojis/${reactionType}.png`}
                        className={`${className} hover:scale-125 duration-300 ease-in-out`}
                        alt="reaction"

                    />
                </div>
            ) : (
                <Image
                    width={20}
                    height={20}
                    src="/emojis/like.png"
                    className={`${className} grayscale`}
                    onClick={handleOpenReactionRow}
                    alt="reaction"
                />
            )}
            {reactionRowOpen && (
                <div className="flex p-2.5 absolute space-x-3 w-24 bottom-8 bg-blue-300 rounded-md duration-150 ease-in-out">
                    <div onClick={() => handleReactionClick('like')}>
                        {' '}
                        <Image
                            width={20}
                            height={20}
                            className="hover:scale-125 duration-150 ease-in-out"
                            src="/emojis/like.png"
                            alt="like"
                        />
                    </div>
                    <div onClick={() => handleReactionClick('heart')}>
                        {' '}
                        <Image
                            width={20}
                            height={20}
                            className="hover:scale-125 duration-150 ease-in-out"
                            src="/emojis/heart.png"
                            alt="heart"
                        />
                    </div>
                    <div onClick={() => handleReactionClick('fire')}>
                        {' '}
                        <Image
                            width={20}
                            height={20}
                            className="hover:scale-125 duration-150 ease-in-out"
                            src="/emojis/fire.png"
                            alt="fire"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};



const CollectIcon = ({ className, dropId, userId }: any) => {
    const collected = useCollectCheck(dropId, userId);
    return (
        <Image
            width={20}
            height={20}
            className={`w-5 h-5 ${!collected && 'grayscale'}`}
            src="/emojis/collected.png"
            alt="collected emoji"
        />
    );
};

const MenuDots = () => {
    return (
        <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
        </svg>
    );
};

export { MenuDots, CollectIcon, CommentIcon, HeartIcon };
