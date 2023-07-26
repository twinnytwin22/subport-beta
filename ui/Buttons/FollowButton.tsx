'use client'
import { useState, useEffect } from "react";
import { useAuthProvider } from "app/context/auth";
import { FollowProfile, UnFollowProfile, isFollowing } from "lib/social-actions/followUser";

const FollowButton = ({ currentProfile }: any) => {
    const { user, profile } = useAuthProvider();
    const profileId = currentProfile?.id;

    const isAuthedUser: boolean = profile?.id === profileId

    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (profile && !isAuthedUser) {
            const checkIsFollowing = async () => {
                try {
                    const response = await isFollowing(profile?.id as string, profileId as string);
                    setIsAlreadyFollowing(response);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error checking isFollowing:", error);
                    setError(error);
                    setIsLoading(false);
                }
            };

            checkIsFollowing();
        } else {
            setIsLoading(false)
        }
    }, [profile?.id, profileId, isAlreadyFollowing]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleFollowButton = async () => {
        if (isAlreadyFollowing) {
            UnFollowProfile(profile?.id, profileId)
            setIsAlreadyFollowing(false)
        } else {
            FollowProfile(profile?.id, profileId)
            setIsAlreadyFollowing(true)
        }
    }

    return !isAuthedUser && user && (
        <div className=" sm:mt-0">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold hover:shadow-md hover:scale-105 shadow text-xs px-4 py-2 rounded-md outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleFollowButton}
            >
                {isAlreadyFollowing ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export { FollowButton };
