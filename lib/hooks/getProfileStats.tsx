import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from "react";

const supabase = createClientComponentClient()
const getProfileCounts = cache(async (userId: any) => {
    const { data: Followers, error: FollowersCountError, count: FollowerCount } = await supabase
        .from('followers')
        .select('following_id', { count: 'estimated' })
        .eq('following_id', userId)

    if (FollowersCountError) {
        console.error('Error fetching profile counts:', FollowersCountError.message);
        return null;
    }

    const { data: Following, error: FollowingCountError, count: FollowingCount } = await supabase
        .from('followers')
        .select('follower_id', { count: 'estimated' })
        .eq('follower_id', userId)

    if (FollowingCountError) {
        console.error('Error fetching profile counts:', FollowingCountError?.message);
        return null;
    }

    const { data, count: DropsCounts, error: DropCountsError } = await supabase
        .from('drops')
        .select('user_id', { count: 'estimated' })
        .eq('user_id', userId)

    if (DropCountsError) {
        console.error('Error fetching profile counts:', DropCountsError?.message);
        return null;
    }

    return { FollowerCount, FollowingCount, DropsCounts }

})

export { getProfileCounts }