"use client";
import { useAuthProvider } from "app/context/auth-old";
import { useSubportPlayer } from "app/context/subport-player";
import { useIpfsImage, useIpfsUrl } from "lib/constants";
import React from "react";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";

function PlayButton({ props }: any) {
    const { play, isPlaying, stop, updateAudioUrl, updateImageUrl, audioUrl, updateMetaData } =
        useSubportPlayer();
    const { user } = useAuthProvider();
    const newMetaData = props.metaData
    const newAudioUrl = useIpfsUrl(props?.metaData?.animation_url)
    const newImageUrl = useIpfsImage(props?.metaData?.image);
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const handlePlay = async () => {
        if (audioUrl !== newAudioUrl) {
            if (isPlaying) {
                stop();
            }
            updateImageUrl(newImageUrl);
            updateAudioUrl(newAudioUrl);
            updateMetaData(newMetaData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            play();
        } else {
            play();
        }
    };

    return (
        mounted &&
        user &&
        newAudioUrl && (
            <>
                {isPlaying && audioUrl === newAudioUrl ? (
                    <div
                        onClick={stop}
                        className="hover:scale-110 duration-300 ease-in-out "
                    >
                        <FaStopCircle
                            size={48}
                            className="text-white opacity-80 cursor-pointer"
                        />
                    </div>
                ) : (
                    <div
                        onClick={handlePlay}
                        className="hover:scale-110 duration-300 ease-in-out transform "
                    >
                        <FaPlayCircle
                            size={48}
                            className="text-white opacity-80 cursor-pointer"
                        />
                    </div>
                )}
            </>
        )
    );
}

export default PlayButton;
