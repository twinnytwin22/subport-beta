'use client'
import { useQuery } from '@tanstack/react-query';
import { checkUserReactions } from 'utils/database';

export const useReactionCheck = (dropId: string, userId: string) => {
    const fetchReactionType = async () => {
        const existingReaction = await checkUserReactions(dropId, userId);
        return existingReaction.length > 0 ? existingReaction[0].reaction_type : '';
    };
    const { data: reactionType, error } = useQuery(['reaction', dropId, userId], fetchReactionType, {
        enabled: !!userId,
    });
    if (error) {
        throw error
    }

    return reactionType;
};
