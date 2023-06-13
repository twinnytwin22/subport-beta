'use client'
import { Suspense, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSetupAudio, useAudio, usePlaybackTime, handleVolumeChange } from './PlayerLogic';

// Create the player context
export const SubportPlayerContext = createContext<any>(null);

// Create a custom provider component
export const SubportPlayer = ({ children }: { children: React.ReactNode }) => {
    const audioUrl: string = '/audio/song.mp3';
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<any>(null);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(100); // Add previous volume state
    const audioRef = useRef<any>(audio);

    useAudio(audioUrl, setAudio);

    const onLoadedData = useCallback(() => {
        // Set the duration or perform any necessary audio setup
    }, []);

    useSetupAudio(audioRef, audioUrl, onLoadedData);

    usePlaybackTime(audioRef);

    const volumeChange = () => {
        handleVolumeChange(event, audioRef, setVolume);
    };

    const setMute = () => {
        if (isMuted) {
            setVolume(prevVolume); // Unmute: set volume to previous volume
        } else {
            setPrevVolume(volume); // Save the current volume before muting
            setVolume(0); // Mute: set volume to 0
        }
        setIsMuted(!isMuted); // Toggle the mute state
    };

    // Define the value for the context provider
    const value = {
        audioUrl,
        audioRef,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        volumeChange,
        volume,
        isMuted,
        setMute,
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
