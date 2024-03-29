'use client';
import { useQuery } from '@tanstack/react-query';
import { useStorageUpload } from '@thirdweb-dev/react';
import { useAuthProvider } from 'app/context/auth';
import { allGenres } from 'lib/content/allGenres';
import { deployCollectible } from 'lib/deployFunctions/deployer';
import useSpotifyUrlId from 'lib/hooks/useSpotifyUrlId';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Collectible from 'types/collectible';
import { RenderMintStatus } from 'ui/Cards/MintStatusCard';
import { Media } from 'ui/Misc/Media';
import { renderProgressBar } from 'ui/Misc/ProgressBar';
import { Tooltip } from 'ui/Misc/Tooltip';
import { createFormMessage } from '../createFormMessages';
import { useCreateFormStore } from './CreateFormStore';
import { generateSongData } from './actions';
export const CreateForm = () => {
  const { user, profile } = useAuthProvider();
  const [savedUser, setSavedUser] = useState<any>(null);
  const spotify = useSpotifyUrlId();
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);

  const { data }: any = useQuery({
    queryKey: ['data', spotify, spotifyUrl],
    queryFn: () => generateSongData(spotify, spotifyUrl),
    enabled: !!spotifyUrl,
 
  });

  useEffect(() => {
    setValue('name', data?.album.name);
    setValue(
      'artist_name',
      data.artists.map((artist: any) => artist?.name).join(', ') || ''
    );
  }, [data])
  console.log(data);
  const handleAutoFillSongData = async (url: string) => {
    setSpotifyUrl(url);
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSpotifyUrl(value);

    // Call the function to fetch and autofill song data when a valid URL is detected
    if (isValidSpotifyUrl(value)) {
      await handleAutoFillSongData(value);
      setStep(1);
    }
  };

  const isValidSpotifyUrl = (url: string) => {
    // Implement a validation logic to check if the URL is a valid Spotify URL
    // You can use regular expressions or other methods to validate the URL
    // For simplicity, you can check if it starts with "https://open.spotify.com/"
    return url.startsWith('https://open.spotify.com/');
  };

  const { mutateAsync: upload } = useStorageUpload({
    uploadWithoutDirectory: true,
    onProgress: (progress) => {
      setProgress(progress?.progress); // Update the progress state
      setTotal(progress?.total); // Update the progress state
    }
  });

  const {
    audioUrl,
    setAudioUrl,
    imageUrl,
    setImageUrl,
    step,
    setStep,
    neverChecked,
    setNeverChecked,
    songPreview,
    setSongPreview,
    ipfsMedia,
    setProgress,
    setTotal,
    setIpfsMedia,
    setImagePreview,
    imagePreview,
    nowChecked,
    setNowChecked,
    isUploading,
    setUploading,
    logAudio,
    logImage,
    setInProgress,
    inProgress
  } = useCreateFormStore();

  const handleNowChange = (event: any) => {
    setNowChecked(event.target.checked);
  };

  const handleNeverChange = (event: any) => {
    setNeverChecked(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<Collectible>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      spotify_uri: '',
      image: imageUrl || null,
      audio: audioUrl || null,
      artist_name: '',
      release_date: '',
      genre: 'house',
      total_collectibles: 0,
      description: '',
      keywords: '',
      address: profile?.wallet_address,
      user_id: '' || savedUser || user?.id || profile?.id || null,
      start_date: '',
      end_date: '',
      website: ''
    }
  });
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file and create a preview URL
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);

      // Update the "audio" field value in the form data
      setValue('image', file);
    } else {
      // Clear the preview and the "audio" field value if the file was removed
      setImagePreview(null);
      setValue('image', null);
    }
  };

  const handleSongChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Read the selected file and create a preview URL
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setSongPreview(event.target.result);
      };
      reader.readAsDataURL(file);

      // Update the "audio" field value in the form data
      setValue('audio', file);
    } else {
      // Clear the preview and the "audio" field value if the file was removed
      setSongPreview(null);
      setValue('audio', null);
    }
  };

  const onSubmit = async (formData: Collectible) => {
    setStep(4);

    try {
      // Upload the image and audio files to IPFS
      const user = savedUser!;
      const keywordsArray = formData.keywords?.split(',');

      // Update the form data with the generated URLs
      const collectibleData = {
        ...formData,
        image: imageUrl!,
        audio: audioUrl,
        user_id: user?.id,
        keywords: keywordsArray
      };

      // Call the deployCollectible function
      const deployPromise = deployCollectible(collectibleData);

      toast.promise(deployPromise, {
        pending: 'Creating Collectible...',
        success: 'Collectible created successfully!',
        error: 'Deployment failed! Please try again.'
      });

      const deployResult = await deployPromise;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetch('/api/v1/getCollectibles?refreshCache');
      if (deployResult) {
        setStep(5);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetClick = () => {
    reset();
  };
  const onSubmitStep1 = (formData: any) => {
    setStep(2);
  };

  const onSubmitStep2 = async (data: any) => {
    if (!savedUser && user) {
      setSavedUser(user);
    }
    try {
      const uploadPromise = startUpload(data.image, data.audio);

      toast.promise(uploadPromise, {
        pending: 'Uploading...',
        success: 'Upload successful! Prepping Preview...',
        error: 'Upload failed! Please try again.'
      });

      await uploadPromise;

      const previewPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Preview Ready');
        }, 2000);
      });

      toast.promise(previewPromise, {
        pending: 'Prepping Preview...',
        success: 'Preview Ready!',
        error: 'Preview Failed! Please try again.'
      });

      await previewPromise;
      setUploading(false);
      setStep(3);
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('An error occurred! Please try again.');
    }
  };

  const onBack = () => {
    // Move back to previous step
    setStep(step - 1);
  };

  const startUpload = async (image: any, audio: any) => {
    setUploading(true);
    try {
      if (image) {
        setInProgress('image');
        const imageUri = await upload({ data: [image] });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setImageUrl(imageUri[0]);
        logImage();
        setInProgress('');
        setProgress(0);
        setTotal(0);
      }

      if (audio) {
        setInProgress('audio');
        const audioUri = await upload({ data: [audio] });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAudioUrl(audioUri[0]);
        logAudio();
        setInProgress('');
        setProgress(100);
        setTotal(100);
      }
    } catch (error) {
      // Handle the error here if needed
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIpfsMedia(true);
    }
  };

  const renderStep1 = () => {
    return (
      <div className="w-full mx-auto max-w-5xl">
        <form onSubmit={handleSubmit(onSubmitStep1)}>
          <h2 className="text-center w-full py-4 text-lg">
            Step {step} - Let's get started.
          </h2>

          <div className="grid gap-6 mb-6 md:grid-cols-2 mx-auto">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Release Name
              </label>

              <input
                type="text"
                id="name"
                className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Always"
                {...register('name', { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="artist_name"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Artist(s) name
              </label>
              <input
                type="text"
                id="artist_name"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Twinny Twin"
                {...register('artist_name', { required: true })}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 place-items-center ">
              <label
                htmlFor="start_date"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white col-span-1 w-full"
              >
                Start Date
                <input
                  type="date"
                  disabled={nowChecked}
                  {...register('start_date')}
                  className={`bg-zinc-50 border mt-2 border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${nowChecked && 'text-zinc-800 dark:text-zinc-500'
                    }`}
                />
              </label>
              <label className="relative inline-flex items-center cursor-pointer col-span-1 w-full">
                <input
                  type="checkbox"
                  value=""
                  checked={nowChecked}
                  onChange={handleNowChange}
                  className="sr-only peer just"
                />
                <div className="w-11 h-6  bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-bold text-zinc-900 dark:text-zinc-300">
                  Now
                </span>
                <Tooltip message={createFormMessage.startNow} />
              </label>
              <label
                htmlFor="end_date"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white col-span-1 w-full"
              >
                End Date
                <input
                  type="date"
                  disabled={neverChecked}
                  {...register('end_date')}
                  className={`bg-zinc-50 border mt-2 border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${neverChecked && 'text-zinc-800 dark:text-zinc-500'
                    }`}
                />
              </label>
              <label className="relative inline-flex items-center cursor-pointer col-span-1 w-full">
                <input
                  type="checkbox"
                  value=""
                  checked={neverChecked}
                  onChange={handleNeverChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 peer-focus:text-zinc-400 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                  Infinite
                </span>
                <Tooltip message={createFormMessage.infinite} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label
                  htmlFor="countries"
                  className="flex mb-2 text-sm font-medium text-zinc-900 dark:text-white items-center"
                >
                  Drop Type? <Tooltip message="Drop Type" />
                </label>
                <select
                  id="countries"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Save">Pre-save / Save</option>
                  <option disabled value="Standard">
                    Standard Drop
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="release_date"
                  className="flex items-center mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Release Date
                  <Tooltip message={createFormMessage.releaseDate} />
                </label>
                <input
                  type="date"
                  id="release_date"
                  className="bg-zinc-50 border  border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Flowbite"
                  {...register('release_date', { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="total_collectibles"
                  className="flex mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Total Collectibles
                  <Tooltip message={createFormMessage.total} />
                </label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  id="total_collectibles"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('total_collectibles', {
                    required: true,
                    min: 1,
                    max: 1000
                  })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Genre
              </label>
              <select
                placeholder="Choose your genre"
                {...register('genre', { required: true })}
                id="genre"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {allGenres.map((genre: any) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="website"
                className="flex mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Spotify Url
                <Tooltip message={createFormMessage.songUri} />
              </label>
              <input
                type="url"
                id="spotify_uri"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://open.spotify.com/track/7gaNyds0r0bJTRiOpCsKZT"
                {...register('spotify_uri', { required: true })}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="lyrics"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Song Description
            </label>
            <textarea
              id="description"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I don't want to write you a love song, 'cause you asked for it, 'cause you need one. (You see)..."
              {...register('description', { required: true })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Other Keywords"
              className="flex items mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Other Keywords
              <Tooltip message={createFormMessage.keywords} />
            </label>
            <input
              id="keywords"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Futuristic, Emotional, Synthwave"
              {...register('keywords')}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Next
            </button>
            <button
              onClick={handleResetClick}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  };
  const renderStep2 = () => {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmitStep2)}>
          <h2 className="text-center w-full py-4 text-lg">
            Step {step} - Upload your media.
          </h2>
          <div className="flex items-center justify-center w-full mb-2 max-w-lg mx-auto">
            {!imagePreview && (
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-72 h-72 md:w-96 md:h-96 border-2 border-zinc-300 border-dashed rounded-md cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">
                      Click to upload artwork
                    </span>
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    PNG, JPG or GIF (MAX.50MB)
                  </p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  {...register('image')}
                  onChange={handleImageUpload}
                />
              </label>
            )}
            {imagePreview ? (
              <img
                className="w-96 rounded-md"
                src={imagePreview}
                alt="preview"
              />
            ) : null}
          </div>
          <div className="flex items-center justify-center w-full mb-2">
            {!songPreview && (
              <div className="flex items-center justify-center w-full mb-2 max-w-96 mx-auto">
                <label
                  className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                  htmlFor="audio"
                >
                  Upload Audio:
                  <input
                    className="block w-full text-sm p-2.5 text-zinc-900 border border-zinc-300 rounded-md cursor-pointer bg-zinc-50 dark:text-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400"
                    aria-describedby="file_input_help"
                    type="file"
                    id="audio"
                    {...register('audio')}
                    onChange={handleSongChange}
                  />
                </label>
              </div>
            )}
            {songPreview ? (
              <audio className="w-96" src={songPreview} controls={true} />
            ) : null}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onBack}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Back
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Next
            </button>

            <button
              onClick={handleResetClick}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      imageUrl &&
      audioUrl && (
        <>
          <h2 className="text-center w-full py-4 text-lg">
            Step {step} - Confirm.
          </h2>
          <div className="w-full mx-auto items-center">
            <div className="flex flex-col mx-auto content-center lg:grid lg:grid-cols-2 p-8 mb-8 overflow-x-auto">
              <div className="mx-auto content-center h-fit shadow-xl shadow-zinc-300 dark:shadow-zinc-800 mb-10 max-w-md col-span-1">
                {ipfsMedia && (
                  <Media audio={songPreview} image={imagePreview} />
                )}
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-md dark:bg-zinc-900 border dark:border-zinc-800 bg-zinc-200 border-zinc-300">
                <table className="text-sm text-left text-zinc-700 dark:text-zinc-300">
                  <tbody className="p-8">
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Release Name:
                      </th>
                      <td className="px-6 py-2 w-full">{watch('name')}</td>
                    </tr>
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Artist:
                      </th>
                      <td className="px-6 py-2">{watch('artist_name')}</td>
                    </tr>
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Release Date:
                      </th>
                      <td className="px-6 py-2">{watch('release_date')}</td>
                    </tr>
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Total Collectibles:
                      </th>
                      <td className="px-6 py-2">
                        {watch('total_collectibles')}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Description:
                      </th>
                      <td className="px-6 py-2">{watch('description')}</td>
                    </tr>
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Song URI:
                      </th>
                      <td className="px-6 py-2"> {watch('spotify_uri')}</td>
                    </tr>
                    <tr className="border-b border-zinc-300 dark:border-zinc-600">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Genre:{' '}
                      </th>
                      <td className="px-6 py-2">
                        {allGenres.map((genre: any) => (
                          <div key={genre}>
                            {watch(genre) === genre && genre}
                          </div>
                        ))}{' '}
                      </td>
                    </tr>
                    <tr className="">
                      <th
                        scope="row"
                        className="px-6 py-2 border-r border-zinc-300 dark:border-zinc-800 whitespace-nowrap"
                      >
                        Keywords:
                      </th>
                      <td className="px-6 py-2">{watch('keywords')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-x-4">
                <button
                  onClick={onBack}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>

                <button
                  type="reset"
                  onClick={handleResetClick}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </>
      )
    );
  };
  const renderMintStatusCard = () => {
    return (
      <div className="w-full mx-auto justify-center place-items-center mt-12">
        <RenderMintStatus />
      </div>
    );
  };
  const progress = useCreateFormStore((state) => state.progress);
  const total = useCreateFormStore((state) => state.total);
  return (
    <div className=" justify-center items-center mx-auto w-full sm:ml-4 lg:ml-0 p-4 mb-24 md:mb-0 relative">
      {isUploading && inProgress === 'image' ? (
        <p className="text-center">Uploading your image.</p>
      ) : (
        ''
      )}
      {isUploading && inProgress === 'audio' ? (
        <p className="text-center">Uploading your audio.</p>
      ) : (
        ''
      )}

      {isUploading && renderProgressBar(progress, total)}
      {step === 0 && (
        <h1 className="text-2xl font-bold text-center  text-black dark:text-white">
          Get Started: Paste your Spotify Url
        </h1>
      )}
      {step === 5 && (
        <h1 className="text-2xl font-bold text-center  text-black dark:text-white">
          Success!
        </h1>
      )}
      {step >= 1 && step <= 3 && (
        <h1 className="text-2xl font-bold text-center  text-black dark:text-white">
          Create your collectible.
        </h1>
      )}
      {step === 4 && (
        <h1 className="text-2xl font-bold text-center text-black dark:text-white ">
          Creating your collectible
        </h1>
      )}
      {step === 0 && (
        <div className="w-full h-full place-items-center min-h-[20vh] flex">
          <input
            className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Paste Spotify URL"
            value={spotifyUrl || ''}
            onChange={handleInputChange}
          />
        </div>
      )}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && imageUrl && renderStep3()}
      {step === 4 && renderMintStatusCard()}
      {step === 5 && profile && (
        <div className="w-full mx-auto place-items-center dark:text-white text-black text-center space-y-3">
          <h1 className="text-lg">
            {' '}
            Your collectible will be available soon!{' '}
          </h1>
          {imagePreview ? (
            <Image
              className="rounded-md mx-auto justify-center"
              blurDataURL={'/images/stock/blur.png'}
              alt="image"
              src={imagePreview ? imagePreview : ''}
              width={300}
              height={300}
            />
          ) : (
            ''
          )}
          <br />
          <Link className="" prefetch={true} href={`/${profile?.username}`}>
            <button
              role="button"
              className="p-2.5 ring-blue-600 ring rounded-md"
            >
              Go to Profile
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
