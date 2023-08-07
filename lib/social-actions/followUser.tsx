import { supabase } from "lib/constants";
import { toast } from "react-toastify";


async function FollowProfile(currentUserId: string, profileId: string) {
    try {
        const { data, error } = await supabase
            .from('followers')
            .insert({ follower_id: currentUserId, following_id: profileId });

        if (error) {
            throw error;
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

        toast('Unfollowing.', { hideProgressBar: true, autoClose: 1000 })

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
