"use client";
import React, { useState } from "react";
import Collectible from "types/collectible";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Media } from "ui/Misc/Media";
import addUpdateWallet from "lib/hooks/functions";
import { create } from "ipfs-http-client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadHashToIpfs } from "lib/uploadFileIpfs";
import { RenderMintStatus } from "ui/Cards/MintStatusCard";
export const uploadToIpfs = async (imageFile: any, audioFile: any) => {
  const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs = create({
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

  return { image: imageUrl, audio: audioUrl,  };
};

export const CreateForm = ({address}:any) => {
  const {data: session} = useSession()
  const [audioUrl, setAudioUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const [songPreview, setSongPreview] = useState<string>();
  const [ keywordArray, setKeywordArray ] = useState<string>()
  const [ipfsMedia, setIpfsMedia] = useState(false)
  const [step, setStep] = useState(1);
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Collectible>({
    mode: 'onChange',
    defaultValues: {
      name: "",
      song_uri: "",
      image: imageUrl || null,
      audio: audioUrl || null,
      artist_name: "",
      release_date: "",
      genre: "house",
      total_collectibles: 0,
      description: "",
      keywords: '',
      address: address,
      userId: ''
    },
  });

  const handleImageUpload = (event: any) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
  };

  const handleSongUpload = (event: any) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    setSongPreview(reader.result as string);
  };
  }
  const onSubmit = async (formData: Collectible) => {
    toast.info("Submitting", { autoClose: 7500 });
    setStep(4)
    
    try {
      // Upload the image and audio files to IPFS
     const image = imageUrl!
     const audio = audioUrl!
     const keywordsArray = formData.keywords?.split(',')
     

      // Update the form data with the generated URLs
      const updatedFormData = {
        ...formData,
        image: image,
        audio: audio,
        keywords: keywordsArray
      };  

      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:3000" // replace with your own base URL

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
        reset()  
  };
  const onSubmitStep1 = (formData: any) => {
    setStep(2);
  };

  const onSubmitStep2 = async (data: any) => {
    toast.info("Uploading Media to IPFS Storage", {
      progress: undefined,
      autoClose: 8000,
    });
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
      setIpfsMedia(true)
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
      <div className="w-full mx-auto max-w-screen">
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
                className="bg-gray-50 border border-zinc-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
          {!imagePreview && 

            <label
              htmlFor="file"
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
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (MAX.50MB)
                </p>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
               {...register("image") }
              />
            </label>}
            {imagePreview ? <img className="w-96" src={imagePreview} alt='preview'/> : null}

          </div>
          <div className="flex items-center justify-center w-full mb-2">
            {!songPreview && <>
            <label htmlFor="audio">Audio:</label>
            <input type="file" 
            id="audio"   
             {...register("audio") } /></>}
            {songPreview ? <audio className="w-96" src={songPreview} controls={true}/> : null}

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
          <div className="flex flex-col mx-auto content-center lg:grid lg:grid-cols-2 p-8 mb-8 ">
            <div className="mx-auto content-center h-fit shadow-xl shadow-zinc-300 dark:shadow-gray-800 mb-10">
              {ipfsMedia &&
              <Media audio={audioUrl} image={imageUrl} />}
            </div>
            <div className="">
              <table className="w-full text-md text-left bg-zinc-200 dark:bg-gray-900 p-4 rounded-md shadow-xl shadow-zinc-300 dark:shadow-zinc-800">
                <tbody className="p-8">
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Release Name:
                    </td>
                    <td className="px-6 py-2">{watch("name")}</td>
                  </tr>
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Artist:
                    </td>
                    <td className="px-6 py-2">{watch("artist_name")}</td>
                  </tr>
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Release Date:
                    </td>
                    <td className="px-6 py-2">{watch("release_date")}</td>
                  </tr>
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Total Collectibles:
                    </td>
                    <td className="px-6 py-2">{watch("total_collectibles")}</td>
                  </tr>
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Description:
                    </td>
                    <td className="px-6 py-2">{watch("description")}</td>
                  </tr>
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Song URI:
                    </td>
                    <td className="px-6 py-2"> {watch("song_uri")}</td>
                  </tr>
                  <tr className="border-b border-zinc-300 dark:border-gray-600">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Genre:{" "}
                    </td>

                    <td className="px-6 py-2">
                      {watch("genre") === "house" && "House/Dance"}
                      {watch("genre") === "rnb" && "R&B"}
                      {watch("genre") === "hip_hop" && "Hip-Hop/Rap"}
                      {watch("genre") === "country" && "Country"}
                      {watch("genre") === "rock" && "Rock"}
                      {watch("genre") === "electronic" && "Electronic"}
                      {watch("genre") === "pop" && "Pop"}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="px-6 py-2 border-r border-zinc-300 dark:border-gray-800">
                      Keywords:
                    </td>
                    <td className="px-6 py-2"> {watch("keywords")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
const renderMintStatusCard = () => {
return (
<div className="w-full h-[60vh] flex items-center justify-center">
  <RenderMintStatus/>
  </div>
)
  }

  return (
    <div className="max-w-7xl mx-auto w-full sm:ml-4 lg:ml-0 p-8">
     {step !== 4 &&  <>
      <h1 className="text-center text-4xl">Create your collectible</h1>
      <div className="text-center text-xs">Your blockchain address:<br/>{address}</div></>}
      {step === 4 &&  <>
      <h1 className="text-center text-4xl">Creating your collectible</h1>
      </>}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderMintStatusCard()}
    </div>
  );
};
