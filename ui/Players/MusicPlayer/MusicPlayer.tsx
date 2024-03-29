'use client';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

///Music Player
const MusicPlayer = () => {
  /// Query Device Size / You can you Tailwind Hidden Properties, but this Locks it in.
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1100px)' });

  /// Incoming Data and Song Indexing
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  /// Current Song Cover
  const currentCover = '';

  /// Audio Logic + Sanity URL + Song URL Processing + Audio Ref for current song
  const audioUrl = '/audio/song.mp3';
  const audioRef = useRef(new Audio(audioUrl));

  /// Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  /// Time Logic
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  /// Format Time to Minutes and Seconds
  function formatTime(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  ///Update Time
  const handleTimeUpdate = () => {
    setPosition(audioRef?.current.currentTime);
  };
  ///Handle Loaded Song Duration
  const handleLoadedData = () => {
    audioRef.current.load();
    setDuration(audioRef?.current.duration);
  };
  /// Scrub Thru Song
  const handleSeekChange = (event: any) => {
    audioRef.current.currentTime = event?.target.value;
  };

  ///Time Tracker for Song Duration
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentSongIndex, isPlaying]);

  /// Handle the Change Track on Tracklist
  const handleChangeTrack = (id: any) => {
    setIsPlaying(!isPlaying);
    setCurrentSongIndex(id);
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current.play();
      };
    } else {
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current.play();
      };
    }
  };
  /// Play Button Logic
  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  /// Shuffle Button Logic
  const handleShuffleClick = () => {
    //  setCurrentSongIndex(Math.floor(Math.random() * song.length));
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current.play();
      };
      setIsPlaying(isPlaying);
    } else {
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  /// Next Button Logic
  const handleNextClick = () => {
    //  setCurrentSongIndex((currentSongIndex) => (currentSongIndex + 1) % song.length);
    //    setDuration(song[currentSongIndex].duration)
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current.play();
      };
      setIsPlaying(isPlaying);
    } else {
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  /// Back Button Logic
  const handleBackClick = (isPlaying: any) => {
    //  setCurrentSongIndex((currentSongIndex) => (currentSongIndex + song.length - 1) % song.length);
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current.play();
      };
      setIsPlaying(isPlaying);
    } else {
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  /// Volume Control Logic
  const handleVolumeChange = (event: any) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value / 100;
  };

  return (
    <div className="block max-w-sm m-6 p-6 bg-white border border-gray-200 rounded-md shadow  dark:bg-gray-800 dark:border-gray-700 relative">
      <div className="flex items-center justify-between"></div>/{' '}
      <audio
        ref={audioRef}
        onEnded={handleNextClick}
        className="hidden"
        controls={isPlaying}
      >
        <source src={audioUrl} type="audio/mpeg"></source>
      </audio>
      <div className="mt-4">
        /
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-white">
          <div>{formatTime(currentTime)}</div>
          <div>
            {!audioRef.current.duration
              ? '0:00'
              : formatTime(audioRef.current.duration)}
          </div>
        </div>
        <div className="w-full">
          <input
            type="range"
            className=" accent-red-300 h-2.5 rounded-full w-full"
            min="0"
            max={
              !audioRef.current.duration ? '0:00' : audioRef.current.duration
            }
            value={audioRef.current.currentTime}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            onChange={handleSeekChange}
          />
        </div>
        <div className="flex mt-4 w-64 mx-10">
          <svg
            onClick={handleBackClick}
            className="text-black dark:text-white bg-white dark:bg-gray-800 w-24 h-16 rounded-full p-2 m-2 "
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>

          <svg
            className="text-black dark:text-white p-2  m-2 bg-white  dark:bg-gray-800  w-24 h-16 rounded-full"
            onClick={handlePlayPauseClick}
            stroke="currentColor"
          >
            {isPlaying ? (
              <svg
                fill="none"
                className="rounded-full"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            )}
          </svg>
          <svg
            onClick={handleNextClick}
            fill="none"
            className="text-black p-2 dark:text-white bg-white  dark:bg-gray-800 w-24 h-16 rounded-full m-2"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>

          <svg
            fill="none"
            className="text-black dark:text-white p-2 bg-white  dark:bg-gray-800 w-24 h-16 rounded-full m-2"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={handleShuffleClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>
        </div>{' '}
        {!isMobile && (
          <>
            {!isTablet && (
              <div className="inline-flex w-full">
                <div className="px-8 py-2 mx-auto flex w-full">
                  <svg
                    className="w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                    ></path>
                  </svg>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full bg-gray-200 accent-red-300 rounded-md cursor-pointer dark:bg-gray-700"
                  />

                  <svg
                    className="w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
