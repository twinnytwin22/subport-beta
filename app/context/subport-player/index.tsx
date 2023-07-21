"use client";
import {
    Suspense,
    createContext,
    useCallback,
    useContext,
    useRef,
} from "react";
import {
    usePlaybackTime,
    useAudio,
    useSetupAudio,
    handleVolumeChange,
    handlePlay,
    handlePause,
    handleStop,
    formatTime,
    useInterval,
    handleTimeUpdate,
    handleLoadedData,
    handleSeekChange,
    usePlayerStore,

} from "./PlayerLogic";

// Create the player context
export const SubportPlayerContext = createContext<any>(null);

// Create a custom provider component
export const SubportPlayer = ({ children
}: {
    children: React.ReactNode
}) => {
    const {
        currentTime,
        isPlaying,
        audio,
        volume,
        isMuted,
        prevVolume,
        setCurrentTime,
        setPosition,
        setDuration,
        setIsPlaying,
        setAudio,
        setVolume,
        setIsMuted,
        setPrevVolume,
        audioUrl,
        setAudioUrl,
        imageUrl,
        setSongImage,
    } = usePlayerStore();
    const audioRef = useRef<any>(audio);


    useAudio(audioUrl, setAudio);

    const onLoadedData = useCallback(() => {
        // Set the duration or perform any necessary audio setup
    }, []);
    useSetupAudio(audioRef, audioUrl, onLoadedData);

    usePlaybackTime(audioRef);

    const play = () => {
        handlePlay(audioRef, setIsPlaying);
    };

    // Event handler for pause button
    const pause = () => {
        handlePause(audioRef, setIsPlaying);
    };

    // Event handler for stop button
    const stop = () => {
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

    usePlaybackTime(audioRef);
    useInterval(audioRef, setCurrentTime, isPlaying);


    const updateAudioUrl = useCallback(
        (newAudioUrl: string) => {
            setAudioUrl(newAudioUrl);
        },
        [setAudioUrl]
    );
    const updateImageUrl = useCallback(
        (newImageUrl: string) => {
            setSongImage(newImageUrl)
        },

        [setSongImage]
    );




    // Define the value for the context provider
    const values = {
        updateAudioUrl,
        updateImageUrl,
        audioUrl,
        imageUrl,
        setAudioUrl,
        audioRef,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        volumeChange,
        volume,
        isMuted,
        setMute,
        handlePlay,
        handlePause,
        handleStop,
        formatTime,
        handleTimeUpdate,
        handleLoadedData,
        handleSeekChange,
        useInterval,
        usePlaybackTime,
        setDuration,
        setPosition,
        timeUpdate,
        dataLoad,
        seekChange,
        play,
        pause,
        stop
        // Other context values...
    };

    return (

        <SubportPlayerContext.Provider value={values}>
            <Suspense>{children}</Suspense>
        </SubportPlayerContext.Provider>
    );
};

// Custom hook to access the player context
export const useSubportPlayer = () => useContext(SubportPlayerContext);
