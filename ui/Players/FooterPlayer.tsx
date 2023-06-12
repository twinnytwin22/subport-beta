'use client'
import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'

const FooterPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<any>(null);

    useEffect(() => {
        const musicPlayer = document.getElementById('music-player') as HTMLAudioElement;

        // Save the current playback time in localStorage
        const savePlaybackTime = () => {
            localStorage.setItem('playbackTime', musicPlayer.currentTime.toString());
        };

        // Load the saved playback time from localStorage
        const loadPlaybackTime = () => {
            const playbackTime = localStorage.getItem('playbackTime');
            if (playbackTime) {
                musicPlayer.currentTime = parseFloat(playbackTime);
            }
        };

        // Add event listeners to save and load playback time on page change
        window.addEventListener('beforeunload', savePlaybackTime);
        window.addEventListener('load', loadPlaybackTime);

        return () => {
            window.removeEventListener('beforeunload', savePlaybackTime);
            window.removeEventListener('load', loadPlaybackTime);
        };
    }, []);

    // Event handler for play button
    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true)
    };

    // Event handler for pause button
    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false)

    };

    // Event handler for stop button
    const handleStop = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false)
    };

    return (
        <footer className="">
            <div className="fixed bottom-0 left-0 right-0 z-[250] border-zinc-200 dark:border-zinc-800 px-6 py-2.5 border-t w-full bg-zinc-100 dark:bg-black">
                <div className="z-[300]  px-6 py-2.5  mx-auto relative sm:pl-32 lg:pl-64">
                    <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full">
                        <audio ref={audioRef} id="music-player" controls={false} className="">
                            <source src="/audio/song.mp3" type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <div className='mx-auto w-full space-x-4 relative'>
                            {!isPlaying &&
                                <button onClick={handlePlay} className='hover:scale-110 duration-200 ease-in-out'>
                                    <FaPlay />
                                </button>}
                            {isPlaying &&
                                <button onClick={handlePause} className='hover:scale-110 duration-200 ease-in-out'>
                                    <FaPause />
                                </button>}
                            <button onClick={handleStop} className='hover:scale-110 duration-200 ease-in-out'>
                                <FaStop />
                            </button>
                        </div>
                    </div>
                </div></div>
        </footer>
    );
};

export default FooterPlayer;

