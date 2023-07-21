'use client'
import { useAuthProvider } from 'app/context/auth'
import { useSubportPlayer } from 'app/context/subport-player'
import React from 'react'
import { FaPlayCircle, FaStopCircle } from 'react-icons/fa'

function PlayButton({ props }: any) {
    const { play, isPlaying, stop, setAudio, updateAudioUrl, setSongImage, updateImageUrl, audioUrl, useAudio, audioRef, pause, setAudioRef } = useSubportPlayer()
    const { user } = useAuthProvider()
    const newAudioUrl = props?.metaData?.animation_url?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
    const newImageUrl = props?.metaData?.image?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);


    const handlePlay = async () => {
        if (audioUrl !== newAudioUrl) {
            if (isPlaying) {
                stop()

            }
            updateImageUrl(newImageUrl)
            updateAudioUrl(newAudioUrl)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            play()
        } else {
            play()
        }

    }


    return mounted && user && newAudioUrl && (
        <>
            {isPlaying && audioUrl === newAudioUrl ? (
                <div onClick={stop} className="absolute bottom-3 right-3 hover:scale-110 duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2">
                    <FaStopCircle size={48} className="text-white opacity-80 cursor-pointer" />
                </div>
            ) : (
                <div onClick={handlePlay} className="absolute bottom-3 right-3 hover:scale-110 duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2">
                    <FaPlayCircle size={48} className="text-white opacity-80 cursor-pointer" />
                </div>
            )}
        </>
    );
}

export default PlayButton;
