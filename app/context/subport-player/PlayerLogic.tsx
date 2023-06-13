'use effect'
import { useEffect } from 'react';

export const usePlaybackTime = (audioRef: any) => {
    useEffect(() => {
        const musicPlayer = audioRef.current;

        // Save the current playback time in localStorage
        const savePlaybackTime = () => {
            localStorage?.setItem('playbackTime', musicPlayer?.currentTime?.toString());
        };

        // Load the saved playback time from localStorage
        const loadPlaybackTime = () => {
            const playbackTime = localStorage?.getItem('playbackTime');
            if (playbackTime && musicPlayer) {
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
    }, [audioRef]);
};


export const handlePlay = (audioRef: any, setIsPlaying: any) => {
    audioRef.current.play();
    setIsPlaying(true)
};

// Event handler for pause button
export const handlePause = (audioRef: any, setIsPlaying: any) => {
    audioRef.current.pause();
    setIsPlaying(false)

};

// Event handler for stop button
export const handleStop = (audioRef: any, setIsPlaying: any) => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false)
};

export function formatTime(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function useInterval(audioRef: any, setCurrentTime: any, isPlaying: any) {
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(audioRef.current.currentTime);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isPlaying]);
}

export const handleVolumeChange = (event: any, audioRef: any, setVolume: any) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value / 100;
};

///Update Time 
export const handleTimeUpdate = (audioRef: any, setPosition: any) => {
    setPosition(audioRef?.current.currentTime);
};

///Handle Loaded Song Duration 
export const handleLoadedData = (audioRef: any, setDuration: any) => {
    audioRef.current.load();
    setDuration(audioRef?.current.duration);
};
/// Scrub Thru Song 
export const handleSeekChange = (event: any, audioRef: any) => {
    audioRef.current.currentTime = event?.target.value;
};

