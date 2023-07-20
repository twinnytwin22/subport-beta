'use client'
import { useAuthProvider } from 'app/context/auth'
import { useSubportPlayer } from 'app/context/subport-player'
import React from 'react'
import { FaPlayCircle, FaStopCircle } from 'react-icons/fa'

function PlayButton({ props }: any) {
    const { play, isPlaying, stop, setAudioUrl, audioUrl } = useSubportPlayer()
    const { user } = useAuthProvider()
    const newAudioUrl = props?.metaData?.animation_url?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')

    const handlePlay = () => {
        if (audioUrl !== newAudioUrl) {
            setAudioUrl(newAudioUrl)
        }
        if (audioUrl) {
            play()
        }
    }
    const handleStop = () => {
        stop()
        if (audioUrl) {
            setAudioUrl(null)
        }
    }

    return user && newAudioUrl && (
        <>
            {isPlaying ? (
                <div onClick={handleStop} className="absolute bottom-3 right-3 hover:scale-110 duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2">
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
