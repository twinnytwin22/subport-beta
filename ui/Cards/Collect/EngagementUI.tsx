'use client'
import { useState } from 'react';
import { addReaction, deleteReaction } from 'utils/database';
import { useReactionCheck } from 'lib/hooks/useReactionCheck';

const HeartIcon = ({ className, dropId, userId }: any) => {
    const [reactionRowOpen, setReactionRowOpen] = useState(false);
    const { reactionType, setReactionType } = useReactionCheck(dropId, userId);

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
            await deleteReaction(dropId, userId);
            setReactionRowOpen(false)
            setReactionType('')


        } else {
            // User clicked on a different reaction, so delete the current reaction (if any) and add the new one
            if (reactionType) {
                await deleteReaction(dropId, userId);
                setReactionRowOpen(false)
                setReactionType(reaction)


            }
            await addReaction(dropId, reaction, userId);
            setReactionRowOpen(false)
            setReactionType(reaction)

        }
    };

    return (
        <div className='relative hover:scale-100'>
            {reactionType.length > 0 ? (
                <img src={`/emojis/${reactionType}.png`} className={className} onClick={handleOpenReactionRow} />
            ) : (
                <img src="/emojis/like.png" className={`${className} grayscale`} onClick={handleOpenReactionRow} />
            )}
            {reactionRowOpen && (
                <div className='flex p-2.5 absolute space-x-3 w-24 bottom-8 bg-blue-300 rounded-md duration-150 ease-in-out'>
                    <div onClick={() => handleReactionClick('like')}>
                        {' '}
                        <img className='hover:scale-125 duration-150 ease-in-out' src="/emojis/like.png" />
                    </div>
                    <div onClick={() => handleReactionClick('heart')}>
                        {' '}
                        <img className='hover:scale-125 duration-150 ease-in-out' src="/emojis/heart.png" />
                    </div>
                    <div onClick={() => handleReactionClick('fire')}>
                        {' '}
                        <img className='hover:scale-125 duration-150 ease-in-out' src="/emojis/fire.png" />
                    </div>
                </div>
            )}
        </div>
    );
};


const CommentIcon = ({ className, dropId, userId }: any) => {
    return (
        <>
            <svg
                className={className}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                ></path>
            </svg>
        </>
    );
};

const CollectIcon = ({ className, dropId, userId }: any) => {
    return (
        <>
            <svg
                className={className}
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
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
            </svg>
        </>
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


export { MenuDots, CollectIcon, CommentIcon, HeartIcon }