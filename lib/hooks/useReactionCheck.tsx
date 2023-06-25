'use client'
import { useEffect, useState } from 'react';
import { checkUserReactions } from 'utils/database';

export const useReactionCheck = (dropId: string, userId: string) => {
    const [reactionType, setReactionType] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            // Check if the user has already reacted to the drop
            const existingReaction = await checkUserReactions(dropId, userId);

            if (existingReaction.length > 0) {
                setReactionType(existingReaction[0].reaction_type);
            } else {
                setReactionType('');
            }
        };

        fetchData();
    }, [dropId, userId]);

    return { reactionType, setReactionType };
};
