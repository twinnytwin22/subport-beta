'use client'
import { useEffect } from 'react';
import { create } from 'zustand'
export const usePlayerStore = create((set: any) => ({
    currentTime: 0,
    position: 0,
    duration: 0,
    isPlaying: false,
    audio: null,
    volume: 100,
    isMuted: false,
    prevVolume: 100,
    audioUrl: "/audio/song.mp3",


    setCurrentTime: (currentTime: any) => set(() => ({ currentTime })),
    setPosition: (position: any) => set(() => ({ position })),
    setDuration: (duration: any) => set(() => ({ duration })),
    setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
    setAudio: (audio: any) => set(() => ({ audio })),
    setVolume: (volume: any) => set(() => ({ volume })),
    setIsMuted: (isMuted: boolean) => set(() => ({ isMuted })),
    setPrevVolume: (prevVolume: any) => set(() => ({ prevVolume })),
    setAudioUrl: (audioUrl: any) => set({ audioUrl }),

    // Other state setters...
}));
export const usePlaybackTime = (audioRef: any) => {
    useEffect(() => {
        const musicPlayer = audioRef.current;

        const savePlaybackTime = () => {
            localStorage?.setItem('playbackTime', musicPlayer?.currentTime?.toString());
        };

        const loadPlaybackTime = () => {
            const playbackTime = localStorage?.getItem('playbackTime');
            if (playbackTime && musicPlayer) {
                musicPlayer.currentTime = parseFloat(playbackTime);
            }
        };

        window.addEventListener('beforeunload', savePlaybackTime);
        window.addEventListener('load', loadPlaybackTime);

        return () => {
            window.removeEventListener('beforeunload', savePlaybackTime);
            window.removeEventListener('load', loadPlaybackTime);
        };
    }, [audioRef]);
};

export const useAudio = (audioUrl: any, setAudio: any) => {
    useEffect(() => {
        setAudio(new Audio(audioUrl));
    }, [audioUrl, setAudio]);
};

export const useSetupAudio = (audioRef: any, audioUrl: any, onLoadedData: any) => {
    useEffect(() => {
        if (audioUrl) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.addEventListener('loadeddata', onLoadedData);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadeddata', onLoadedData);
            }
        };
    }, [audioUrl, audioRef, onLoadedData]);
};

export const handlePlay = (audioRef: any, setIsPlaying: any) => {
    audioRef.current.play();
    setIsPlaying(true);
};

export const handlePause = (audioRef: any, setIsPlaying: any) => {
    audioRef.current.pause();
    setIsPlaying(false);
};

export const handleStop = (audioRef: any, setIsPlaying: any) => {
    if (audioRef) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    }
};

export function formatTime(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const useInterval = (audioRef: any, setCurrentTime: any, isPlaying: any) => {
    useEffect(() => {
        if (audioRef) {
            const intervalId = setInterval(() => {
                setCurrentTime(audioRef?.current?.currentTime);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [audioRef, setCurrentTime, isPlaying]);
};

export const handleVolumeChange = (event: any, audioRef: any, setVolume: any) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value / 100;
};

export const handleTimeUpdate = (audioRef: any, setPosition: any) => {
    setPosition(audioRef?.current?.currentTime);
};

export const handleLoadedData = (audioRef: any, setDuration: any) => {
    audioRef.current.load();
    setDuration(audioRef?.current?.duration);
};

export const handleSeekChange = (event: any, audioRef: any) => {
    audioRef.current.currentTime = event?.target?.value;
};

