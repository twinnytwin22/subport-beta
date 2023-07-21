import { useEffect } from 'react';
import { create } from 'zustand';

interface PlayerStore {
    currentTime: number;
    position: number;
    duration: number;
    isPlaying: boolean;
    audio: HTMLAudioElement | null;
    volume: number;
    isMuted: boolean;
    prevVolume: number;
    audioUrl: string | null;
    imageUrl: string | null;

    setSongImage: (imageUrl: string | null) => void;
    setCurrentTime: (currentTime: number) => void;
    setPosition: (position: number) => void;
    setDuration: (duration: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setAudio: (audio: HTMLAudioElement | null) => void;
    setVolume: (volume: number) => void;
    setIsMuted: (isMuted: boolean) => void;
    setPrevVolume: (prevVolume: number) => void;
    setAudioUrl: (audioUrl: string | null) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    currentTime: 0,
    position: 0,
    duration: 0,
    isPlaying: false,
    audio: null,
    volume: 100,
    isMuted: false,
    prevVolume: 100,
    audioUrl: null,
    imageUrl: null,

    setSongImage: (imageUrl) => set(() => ({ imageUrl })),
    setCurrentTime: (currentTime) => set(() => ({ currentTime })),
    setPosition: (position) => set(() => ({ position })),
    setDuration: (duration) => set(() => ({ duration })),
    setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
    setAudio: (audio) => set(() => ({ audio })),
    setVolume: (volume) => set(() => ({ volume })),
    setIsMuted: (isMuted) => set(() => ({ isMuted })),
    setPrevVolume: (prevVolume) => set(() => ({ prevVolume })),
    setAudioUrl: (audioUrl) => set({ audioUrl }),

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

export const useAudio = (audioUrl: string | null, setAudio: (audio: HTMLAudioElement) => void) => {
    useEffect(() => {
        if (audioUrl) {
            setAudio(new Audio(audioUrl));
        }
    }, [audioUrl, setAudio]);
};

export const useSetupAudio = (
    audioRef: any | null,
    audioUrl: string | null,
    onLoadedData: () => void
) => {
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

export const handlePlay = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setIsPlaying: (isPlaying: boolean) => void
) => {
    audioRef.current?.play();
    setIsPlaying(true);
};

export const handlePause = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setIsPlaying: (isPlaying: boolean) => void
) => {
    audioRef.current?.pause();
    setIsPlaying(false);
};

export const handleStop = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setIsPlaying: (isPlaying: boolean) => void
) => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    }
};

export function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const useInterval = (
    audioRef: any,
    setCurrentTime: (currentTime: number) => void,
    isPlaying: boolean
) => {
    useEffect(() => {
        if (audioRef.current) {
            const intervalId = setInterval(() => {
                setCurrentTime(audioRef.current?.currentTime || 0);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [audioRef, setCurrentTime, isPlaying]);
};

export const handleVolumeChange = (
    event: any,
    audioRef: React.RefObject<HTMLAudioElement>,
    setVolume: (volume: number) => void
) => {
    setVolume(Number(event.target.value));
    audioRef.current!.volume = Number(event.target.value) / 100;
};

export const handleTimeUpdate = (audioRef: React.RefObject<HTMLAudioElement>, setPosition: (position: number) => void) => {
    setPosition(audioRef.current?.currentTime || 0);
};

export const handleLoadedData = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setDuration: (duration: number) => void
) => {
    audioRef.current!.load();
    setDuration(audioRef.current?.duration || 0);
};

export const handleSeekChange = (event: any, audioRef: any) => {
    audioRef.current!.currentTime = Number(event?.target?.value);
};
