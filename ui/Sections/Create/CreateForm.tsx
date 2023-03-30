"use client";
import React, { useState } from "react";
import Collectible from "types/collectible";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { create, CID } from "ipfs-http-client";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Media } from "ui/Misc/Media";

const uploadToIpfs = async (imageFile: any, audioFile: any) => {
  const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs =  create({
    timeout: "2m",
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  // Upload image file to IPFS
  const imageResult = await ipfs.add(imageFile);
  const imageUrl = `ipfs://${imageResult.path}`;

  // Upload audio file to IPFS
  const audioResult = await ipfs.add(audioFile);
  const audioUrl = `ipfs://${audioResult.path}`;

  return { image: imageUrl, audio: audioUrl };
};

export const CreateForm = () => {
  const [audioUrl, setAudioUrl] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Collectible>({
    defaultValues: {
      name: "",
      song_uri: "",
      image: imageUrl,
      audio: audioUrl,
      artist_name: "",
      release_date: "",
      genre: "house",
      total_collectibles: 0,
      description: "",
      keywords: [""],
    },
  });

  const onSubmit = async (formData: Collectible) => {
    toast.info("Submitting",{autoClose:6500});
    try {
      // Upload the image and audio files to IPFS
      const { image, audio } = await uploadToIpfs(
        formData.image[0],
        formData.audio[0]
      );

      // Update the form data with the generated URLs
      const updatedFormData = {
        ...formData,
        image: image,
        audio: audio,
      };

      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const json = await response.json();

      toast.success(json.message);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleResetClick = () => {
    setStep(1);
    reset();
  };
  const onSubmitStep1 = (formData: Collectible) => {
    // Handle form submission for step 1 here
    setStep(2);
  };

  const onSubmitStep2 = async (data: any) => {
    toast.info('Uploading Media to IPFS Storage',{progress: undefined , autoClose: 7500})
    try {
      const { image, audio } = await uploadToIpfs(data.image[0], data.audio[0]);
      const formData = {
        ...data,
        image: image,
        audio: audio,
      };
      console.log(formData);
      setAudioUrl(formData.audio);
      setImageUrl(formData.image);
      // do something with the form data, e.g. submit it to a server
    } catch (error) {
      console.error(error);
    }

    // Handle form submission for step 2 here
    setStep(3);
  };

  const onBack = () => {
    // Move back to previous step
    setStep(step - 1);
  };

  const renderStep1 = () => {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmitStep1)}>
          <h2 className="text-center w-full py-4 text-xl">
            Step {step} - Let's get started.
          </h2>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Release Name
              </label>

              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Always"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="artist_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Artist(s) name
              </label>
              <input
                type="text"
                id="artist_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Twinny Twin"
                {...register("artist_name", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="release_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Release Date
              </label>
              <input
                type="date"
                id="release_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                {...register("release_date", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Genre
              </label>
              <select
                {...register("genre", { required: true })}
                id="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="rnb">R&B</option>
                <option value="hip_hop">Hip Hop</option>
                <option value="electronic">Electronic</option>
                <option value="house">House/Dance</option>
                <option value="country">Country</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="total_collectibles"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Collectibles
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                id="total_collectibles"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("total_collectibles", {
                  required: true,
                  min: 1,
                  max: 1000,
                })}
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Song URI
              </label>
              <input
                type="url"
                id="song_uri"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="URI: spotify:artist:EXAMPLE"
                {...register("song_uri", { required: true })}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="lyrics"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Song Description
            </label>
            <textarea
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I don't want to write you a love song, 'cause you asked for it, 'cause you need one. (You see)..."
              {...register("description", { required: true })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Other Keywords"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Other Keywords
            </label>
            <input
              id="keywords"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Futuristic, Emotional, Synthwave"
              {...register("keywords")}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Next
            </button>
            <button
              onClick={handleResetClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          <h2 className="text-center w-full py-4 text-xl">
            Step {step} - Upload your media.
          </h2>

          <div className="flex items-center justify-center w-full mb-2">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (MAX.50MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...register("image")}
              />
            </label>
          </div>
          <div className="flex items-center justify-center w-full mb-2">
            <label htmlFor="audio">Audio:</label>
            <input type="file" id="audio" {...register("audio")} />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onBack}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Back
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Next
            </button>

            <button
              onClick={handleResetClick}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderStep3 = () => {
    console.log(imageUrl, audioUrl);
    return (
      <>
        <h2 className="text-center w-full py-4 text-xl">
          Step {step} - Confirm.
        </h2>
        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 p-8 mb-8">
          <div>
              <Media audio={audioUrl} image={imageUrl} />
            </div>
          <div>
              <div>
                <p className="w-full text-xl">
                  Release Name: {watch("name")}
                </p>
                <p className=" w-full text-xl">
                  Artist: {watch("artist_name")}
                </p>
                <p className="w-full text-xl">
                  Release Date: {watch("release_date")}
                </p>
                <p className="w-full text-xl">
                  Total Collectibles:
                  {watch("total_collectibles")}
                </p>
              </div>
              <p className=" w-full text-xl">Description:
                {watch("description")}
              </p>
              <p className="w-full text-xl">Song URI: {watch("song_uri")}</p>
              <p className="w-full text-xl">Genre: 
                {watch("genre") === "house" && "House/Dance"}
                {watch("genre") === "rnb" && "R&B"}
                {watch("genre") === "hip_hop" && "Hip-Hop/Rap"}
                {watch("genre") === "country" && "Country"}
                {watch("genre") === "rock" && "Rock"}
                {watch("genre") === "electronic" && "Electronic"}
                {watch("genre") === "pop" && "Pop"}
              </p>
              <p className="w-full text-xl"> {watch("keywords")}</p>  </div>
             
        
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

<div className="flex space-x-4">
  <button
    onClick={onBack}
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Back
  </button>
  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Submit
  </button>

  <button
    onClick={handleResetClick}
    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
  >
    Reset
  </button>
</div>
</form>
        </div>
      </>
    );
  };
  return (
    <div className="mx-auto w-full">
      <h1 className="text-center text-4xl">Create your collectible</h1>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};
