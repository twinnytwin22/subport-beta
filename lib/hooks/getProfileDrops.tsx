import { supabase } from "lib/constants";

async function getProfileData(userId: any) {
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

    const { data: Drops, count: DropsCounts, error: DropsFetchError } = await supabase
        .from('drops')
        .select('*', { count: 'estimated' })
        .eq('user_id', userId)

    if (DropsFetchError) {
        console.error('Error fetching profile counts:', DropsFetchError?.message);
        return null;
    }
    const { data: Profile, error: ProfileFetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (ProfileFetchError) {
        console.error('Error fetching profile counts:', ProfileFetchError?.message);
        return null;
    }

    return { FollowerCount, FollowingCount, DropsCounts, Drops, Profile }

}

export { getProfileData }