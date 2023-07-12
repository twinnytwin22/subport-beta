'use client'
import { useAuthProvider } from 'app/context/auth'
import { useSubportPlayer } from 'app/context/subport-player'
import React from 'react'
import { FaPlayCircle, FaStopCircle } from 'react-icons/fa'

function PlayButton() {
    const { play, isPlaying, stop } = useSubportPlayer()
    const { user } = useAuthProvider()
    return user && (
        <>
            {isPlaying ? <div onClick={stop} className="absolute bottom-3 right-3 hover:scale-110 duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2">
                <FaStopCircle size={48} className="text-white opacity-80 cursor-pointer" />
            </div> :
                <div onClick={play} className="absolute bottom-3 right-3 hover:scale-110 duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2">
                    <FaPlayCircle size={48} className="text-white opacity-80 cursor-pointer" />
                </div>}
        </>)
}

export default PlayButton