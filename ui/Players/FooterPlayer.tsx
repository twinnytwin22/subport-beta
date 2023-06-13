"use client";
import { useAuthProvider } from "app/context/auth";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStop, FaSpeakerDeck } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import {
    handleLoadedData,
    handleSeekChange,
    handleTimeUpdate,
    handleVolumeChange,
    useInterval,
    usePlaybackTime,
} from "app/context/subport-player/PlayerLogic";
import {
    handlePlay,
    handlePause,
    handleStop,
    formatTime,
} from "app/context/subport-player/PlayerLogic";
import { useSubportPlayer } from "app/context/subport-player";

const FooterPlayer = () => {
    const { user } = useAuthProvider();
    const {
        audioUrl,
        audioRef,
        isPlaying,
        setIsPlaying,
        volumeChange,
        volume,
        isMuted,
        setMute,
    } =
        useSubportPlayer();

    const [currentTime, setCurrentTime] = useState(0);
    /// Time Logic
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    usePlaybackTime(audioRef);
    useInterval(audioRef, setCurrentTime, isPlaying);
    // Event handler for play button
    const handlePlayButton = () => {
        handlePlay(audioRef, setIsPlaying);
    };

    // Event handler for pause button
    const handlePauseButton = () => {
        handlePause(audioRef, setIsPlaying);
    };

    // Event handler for stop button
    const handleStopButton = () => {
        handleStop(audioRef, setIsPlaying);
    };

    const timeUpdate = () => {
        handleTimeUpdate(audioRef, setPosition);
    };
    const dataLoad = () => {
        handleLoadedData(audioRef, setDuration);
    };

    const seekChange = () => {
        handleSeekChange(event, audioRef);
    };

    return (
        user && (
            <footer className="">
                <div className="fixed bottom-0 left-0 right-0 z-[250] border-zinc-200 dark:border-zinc-800 px-6 py-2.5 border-t w-full bg-zinc-100 dark:bg-black">
                    <div className="z-[300]  px-6 py-2.5  mx-auto relative sm:pl-32 lg:pl-64 items-center place-items-center">
                        <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full">
                            <audio
                                ref={audioRef}
                                id="music-player"
                                controls={false}
                                className=""
                            >
                                <source src={audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <div className="mx-auto w-full space-x-4 relative flex items-center ">
                                <div className="block max-w-[30px] h-[30px] rounded-md bg-blue-300 w-full"></div>
                                {!isPlaying && (
                                    <button
                                        onClick={handlePlayButton}
                                        className="hover:scale-110 duration-200 ease-in-out"
                                    >
                                        <FaPlay />
                                    </button>
                                )}
                                {isPlaying && (
                                    <button
                                        onClick={handlePauseButton}
                                        className="hover:scale-110 duration-200 ease-in-out"
                                    >
                                        <FaPause />
                                    </button>
                                )}
                                <button
                                    onClick={handleStopButton}
                                    className="hover:scale-110 duration-200 ease-in-out"
                                >
                                    <FaStop />
                                </button>
                                <div className="">{formatTime(currentTime)}</div>
                                <div className="w-full ">
                                    <input
                                        readOnly
                                        type="range"
                                        className=" accent-blue-600 h-2.5 rounded-full w-full bg-zinc-300 dark:bg-zinc-500 appearance-none cursor-pointer"
                                        min="0"
                                        max={
                                            !audioRef?.current?.duration
                                                ? "0:00"
                                                : audioRef?.current?.duration
                                        }
                                        value={audioRef?.current?.currentTime ?? ""}
                                        onTimeUpdate={timeUpdate}
                                        onLoadedData={dataLoad}
                                        onChange={seekChange}
                                    />
                                </div>
                                <div>
                                    {!audioRef?.current?.duration
                                        ? "0:00"
                                        : formatTime(audioRef?.current?.duration)}
                                </div>
                                {isMuted ? <HiSpeakerXMark className="text-black dark:text-white text-2xl" onClick={setMute} />
                                    : <HiSpeakerWave className="text-black dark:text-white text-2xl" onClick={setMute} />
                                }
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={volumeChange}
                                    className="w-48 bg-gray-200 accent-blue-600 rounded-lg cursor-pointer dark:bg-gray-700 "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    );
};

export default FooterPlayer;
