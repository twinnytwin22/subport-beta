"use client";
import Avatar from "ui/User/UploadWidget";
import { toast } from "react-toastify";
import { useAuthProvider } from "app/context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase, supabaseAdmin } from "lib/constants";
import { useQuery } from "@tanstack/react-query";
import EnableArtistMode from "ui/Buttons/EnableArtistMode";
import useArtistSettings from "./store";
import { getArtistSettings } from "./actions";

export default function ArtistSettings() {
  const { user, profile, isLoading } = useAuthProvider();
  const artistSettings = useArtistSettings()
  const [updatedSettings, setUpdatedSettings] = useState({
    artist_name: artistSettings.artist_name || "",
    avatar_url: artistSettings.avatar_url || "",
    amazon_url: artistSettings.amazon_url || "",
    apple_url: artistSettings.apple_url || "",
    deezer_url: artistSettings.deezer_url || "",
    spotify_url: artistSettings.spotify_url || "",
    soundcloud_url: artistSettings.soundcloud_url || "",
    tidal_url: artistSettings.tidal_url || "",
  });

  useEffect(() => {

  }, []);




  const { data: artistData } = useQuery({
    queryKey: ['data', profile.id],
    queryFn: () => getArtistSettings(profile.id),
    //enabled: !!profile.id
  })

  console.log(artistData)

  if (isLoading || !user) {
    return;
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedSettings({
      ...updatedSettings,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Update the artist settings in the database with updatedSettings
    try {
      await supabase
        .from("artist_settings")
        .upsert([
          {
            user_id: profile.id,
            ...updatedSettings,
          },
        ]);
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Error updating settings.");
    }
  };

  return (
    !isLoading &&
    user && (
      <>
      <div className="mx-auto w-full max-w-sm content-start items-center h-full  flex-col justify-between mt-8">
        <form onSubmit={handleSubmit} className="overflow-y-scroll">
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="artist_name"
            >
              Artist Name
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="artist_name"
              name="artist_name"
              value={updatedSettings.artist_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="avatar_url"
            >
              Avatar URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="avatar_url"
              name="avatar_url"
              value={updatedSettings.avatar_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="amazon_url"
            >
              Amazon URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="amazon_url"
              name="amazon_url"
              value={updatedSettings.amazon_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="apple_url"
            >
              Apple Music URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="apple_url"
              name="apple_url"
              value={updatedSettings.apple_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="deezer_url"
            >
              Deezer URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="deezer_url"
              name="deezer_url"
              value={updatedSettings.deezer_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="spotify_url"
            >
              Spotify URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="spotify_url"
              name="spotify_url"
              value={updatedSettings.spotify_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="soundcloud_url"
            >
              SoundCloud URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="soundcloud_url"
              name="soundcloud_url"
              value={updatedSettings.soundcloud_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="tidal_url"
            >
              Tidal URL
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="tidal_url"
              name="tidal_url"
              value={updatedSettings.tidal_url}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 text-sm w-32 rounded-md hover:bg-blue-800 hover:scale-105"
          >
            Update Settings
          </button>
        </form>
    
        <EnableArtistMode profile={profile!} />
      </div>
    </>
    
    )
  );
}
