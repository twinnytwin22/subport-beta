'use client'
import { Suspense, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAudio, usePlaybackTime } from './PlayerLogic';

// Create the player context
export const SubportPlayerContext = createContext<any>(null);

// Create a custom provider component
export const SubportPlayer = ({ children }: { children: React.ReactNode }) => {
    const audioUrl: string = '/audio/song.mp3';
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<any>(null)
    const audioRef = useRef<any>(audio);

    useAudio(audioUrl, setAudio)

    usePlaybackTime(audioRef);

    // Define the value for the context provider
    const value = {
        audioUrl,
        audioRef,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        // Other context values...
    };

    return (
        <SubportPlayerContext.Provider value={value}>
            <Suspense>{children}</Suspense>
        </SubportPlayerContext.Provider>
    );
};

// Custom hook to access the player context
export const useSubportPlayer = () => useContext(SubportPlayerContext);
