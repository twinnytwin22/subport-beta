"use client";
import React, { useState } from "react";
import Collectible from "types/collectible";
import { toast } from 'react-toastify';

export const GenerateButton = () => {
  const [showCollectible, setShowCollectible] = useState(false);

  const handleButtonClick = () => {
    setShowCollectible(true);
  };

  const handleResetClick = () => {
    setShowCollectible(false);
  };

  return (
    <div className="mx-auto w-full">
      {!showCollectible && (
        <button
          type="button"
          className="text-white mx-auto bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleButtonClick}
        >
          Generate Roll Out
        </button>
      )}
      {showCollectible && <CreateForm handleResetClick={handleResetClick} />}
    </div>
  );
};

const CreateForm = ({ handleResetClick }: any) => {
const [arrayData, setArrayData] = useState<string[]>([]);

  const [formData, setFormData] = useState<Collectible>({
    release_name: "",
    artist_name: "",
    release_date: "",
    genre: "rock",
    rollout_duration: 0,
    website: "",
    lyrics: "",
    song_description: "",
    keywords: [""]
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const json = await response.json();
  
      toast.success(json.message);
  
      setFormData({
        release_name: '',
        artist_name: '',
        release_date: '',
        genre: 'rock',
        rollout_duration: 0,
        website: '',
        lyrics: '',
        song_description: '',
        keywords: [''],
      });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };
  const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = event.target.value.split(',').map(keyword => keyword.trim());
    setFormData({ ...formData, keywords });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="release_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Release Name
            </label>
            <input
              value={formData.release_name}
              onChange={(event) =>
                setFormData({ ...formData, release_name: event.target.value })
              }
              type="text"
              id="release_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
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
              placeholder="Doe"
              value={formData.artist_name}
              onChange={(event) =>
                setFormData({ ...formData, artist_name: event.target.value })
              }
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
              value={formData.release_date}
              onChange={(event) =>
                setFormData({ ...formData, release_date: event.target.value })
              }
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
             value={formData.genre}
             onChange={(event) =>
               setFormData({ ...formData, genre: event.target.value as 'rock' | 'pop' | 'hip_hop' | 'electronic' | 'country' })
             }
              id="genre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="hip_hop">Hip Hop</option>
              <option value="electronic">Electronic</option>
              <option value="country">Country</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="rollout_duration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rollout Duration
            </label>
            <input
              type="number"
              id="rollout_duration"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              value={formData.rollout_duration}
              onChange={(event) =>
                setFormData({ ...formData, rollout_duration: parseInt(event.target.value) })
              }
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Website URL
            </label>
            <input
              type="url"
              id="website"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="flowbite.com"
              value={formData?.website}
              onChange={(event) =>
                setFormData({ ...formData, website: event.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="lyrics"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Lyrics
          </label>
          <textarea
            id="lyrics"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="I don't want to write you a love song, 'cause you asked for it, 'cause you need one. (You see)..."
            value={formData?.lyrics}
            onChange={(event) =>
              setFormData({ ...formData, lyrics: event.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lyrics"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Song Description
          </label>
          <textarea
            id="lyrics"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="I don't want to write you a love song, 'cause you asked for it, 'cause you need one. (You see)..."
            value={formData?.song_description}
            onChange={(event) =>
              setFormData({ ...formData, song_description: event.target.value })
            }
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
  value={formData.keywords!.join(', ')} // Join the array of keywords into a comma-separated string
  onChange={handleKeywordsChange}
/>

        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
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
