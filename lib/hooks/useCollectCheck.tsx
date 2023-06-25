'use client'
import { useEffect, useState } from 'react';
import { checkUserSingleCollect } from 'utils/database';

export const useCollectCheck = (dropId: string, userId: string) => {
    const [collected, setCollected] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                // Check if the user has already collected the drop
                const existingCollect = await checkUserSingleCollect(dropId, userId);
                setCollected(!!existingCollect);
            }
        };

        fetchData();
    }, [dropId, userId]);

    return collected;
};
