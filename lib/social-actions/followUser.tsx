import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

async function FollowProfile(currentUserId: string, profileId: string) {
    try {
        const { data, error } = await supabase
            .from('followers')
            .insert({ follower_id: currentUserId, following_id: profileId });

        if (error) {
            throw error;
        }

        const { data: incrementData, error: incrementError } = await supabase.rpc('increment', { follower_count: 1 }).eq('following_id', profileId);;

        if (incrementError) {
            throw incrementError;
        }

        return true;
    } catch (error) {
        console.error("FollowProfile Error:", error);
        return false;
    }
}

async function UnFollowProfile(currentUserId: string, profileId: string) {
    try {
        const { data, error } = await supabase
            .from('followers')
            .delete()
            .eq('follower_id', currentUserId)
            .eq('following_id', profileId);

        if (error) {
            throw error;
        }

        const { data: decrementData, error: decrementError } = await supabase.rpc('decrement', { follower_count: 1 }).eq('following_id', profileId);;

        if (decrementError) {
            throw decrementError;
        }

        return true;
    } catch (error) {
        console.error("UnFollowProfile Error:", error);
        return false;
    }
}

async function isFollowing(followerId: string, followingId: string) {
    try {
        const { data, error } = await supabase
            .from('followers')
            .select('*')
            .eq('follower_id', followerId)
            .eq('following_id', followingId);

        if (error) {
            throw error;
        }

        return data.length > 0; // Return true if a row exists, indicating that the follower is already attached to the following
    } catch (error) {
        console.error("isFollowing Error:", error);
        return false;
    }
}



// Usage example


export { FollowProfile, UnFollowProfile, isFollowing };
