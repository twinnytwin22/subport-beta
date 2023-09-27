"use client";
import { toast } from "react-toastify";
import { useAuthProvider } from "app/context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase, supabaseAdmin } from "lib/constants";
import { useQuery } from "@tanstack/react-query";
import EnableArtistMode from "ui/Buttons/EnableArtistMode";
import useArtistSettings from "./store";
import { getArtistSettings } from "./actions";
import { FaAmazon, FaApple, FaDeezer, FaSoundcloud, FaSpotify, FaUser } from "react-icons/fa";
import { SiTidal } from 'react-icons/si'
export default function ArtistSettings() {
  const { user, profile, isLoading } = useAuthProvider();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    artist_name,
    avatar_url,
    apple_url,
    amazon_url,
    deezer_url,
    soundcloud_url,
    spotify_url,
    tidal_url,
    setAmazonUrl,
    setAppleUrl,
    setArtistName,
    setSoundcloudUrl,
    setSpotifyUrl,
    setDeezerUrl,
    setTidalUrl,
    setAvatarUrl
  } = useArtistSettings()


  const { data: artistData } = useQuery({
    queryKey: ['data', profile.id],
    queryFn: () => getArtistSettings(profile.id),
    enabled: !!profile.id
  })
  useEffect(() => {
    if (artistData) {
      setAmazonUrl(artistData.amazon_url)
      setAppleUrl(artistData.apple_url)
      setArtistName(artistData.artist_name)
      setTidalUrl(artistData.tidal_url)
      setAvatarUrl(artistData.avatar_url)
      setDeezerUrl(artistData.deezer_url)
      setSoundcloudUrl(artistData.soundcloud_url)
      setSpotifyUrl(artistData.spotify_url)
    }

  }, [artistData]);

  //console.log(artistData)


  async function updateProfile({
    avatar_url,
    artist_name,
    apple_url,
    amazon_url,
    deezer_url,
    soundcloud_url,
    spotify_url,
    tidal_url,
  }: any) {
    if (artistData && user) {
      try {
        setLoading(true);
        const updates: any = {};
        if (typeof avatar_url !== 'undefined' && avatar_url !== artistData?.avatar_url) {
          updates.avatar_url = avatar_url;
        }
    
        if (typeof artist_name !== 'undefined' && artist_name !== artistData?.artist_name) {
          updates.artist_name = artist_name;
        }
        if (typeof apple_url !== 'undefined' && apple_url !== artistData?.apple_url) {
          updates.apple_url = apple_url;
        }
        if (typeof amazon_url !== 'undefined' && amazon_url !== artistData?.amazon_url) {
          updates.amazon_url = amazon_url;
        }
        if (typeof deezer_url !== 'undefined' && deezer_url !== artistData?.deezer_url) {
          updates.deezer_url = deezer_url;
        }
        if (typeof soundcloud_url !== 'undefined' && soundcloud_url !== artistData?.soundcloud_url) {
          updates.soundcloud_url = soundcloud_url;
        }
        if (typeof spotify_url !== 'undefined' && spotify_url !== artistData?.spotify_url) {
          updates.spotify_url = spotify_url;
        }
        if (typeof tidal_url !== 'undefined' && tidal_url !== artistData?.tidal_url) {
          updates.tidal_url = tidal_url;
        }
        updates.updated_at = new Date().toISOString();
        let { data, error } = await supabase
          .from("artist_settings")
          .update(updates)
          .eq("user_id", profile?.id)
          .select()
          .single()

        if (data) {
          setLoading(false);
          toast.success("artistData updated!");
          router.refresh();
        }
        if (error) throw error;
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    }
  }




  if (isLoading || !user || loading) {
    return;
  }

  return (
    !isLoading &&
    user && (
    <>
      <div className="mx-auto w-full max-w-sm content-start items-center h-full my-8 flex-col justify-between mt-8">
       {profile.is_artist && 
       <div className="overflow-y-scroll space-y-2">
          <div className="place-content-end mx-auto ">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="artist_name"
            >
              Artist Name
            </label>
            <div className="flex items-center space-x-2">
              <FaUser />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="artist_name"
                name="artist_name"
                value={artist_name || ''}
                onChange={(e: any) => setArtistName(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2 hidden">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="avatar_url"
            >
              Avatar URL
            </label>
            <div className="flex items-center space-x-2">
              <FaApple />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="avatar_url"
                name="avatar_url"
                value={avatar_url || ''}
                onChange={(e: any) => setAvatarUrl(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="amazon_url"
            >
              Amazon URL
            </label>
            <div className="flex items-center space-x-2">
              <FaAmazon />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="amazon_url"
                name="amazon_url"
                value={amazon_url || ''}
                onChange={(e: any) => setAmazonUrl(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="apple_url"
            >
              Apple Music URL
            </label>
            <div className="flex items-center space-x-2">
              <FaApple />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="apple_url"
                name="apple_url"
                value={apple_url || ''}
                onChange={(e: any) => setAppleUrl(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="deezer_url"
            >
              Deezer URL
            </label>
            <div className="flex items-center space-x-2">
              <FaDeezer />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="deezer_url"
                name="deezer_url"
                value={deezer_url || ''}
                onChange={(e: any) => setDeezerUrl(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="spotify_url"
            >
              Spotify URL
            </label>
            <div className="flex items-center space-x-2">
              <FaSpotify />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="spotify_url"
                name="spotify_url"
                value={spotify_url || ''}
                onChange={(e: any) => setSpotifyUrl(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="soundcloud_url"
            >
              SoundCloud URL
            </label>
            <div className="flex items-center space-x-2">
              <FaSoundcloud />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="soundcloud_url"
                name="soundcloud_url"
                value={soundcloud_url || ''}
                onChange={(e: any) => setSoundcloudUrl(e?.target.value)}
              />
            </div>
          </div>
          <div className="place-content-end mx-auto space-y-2">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="tidal_url"
            >
              Tidal URL
            </label>
            <div className="flex items-center space-x-2">
              <SiTidal />
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="tidal_url"
                name="tidal_url"
                value={tidal_url || ''}
                onChange={(e: any) => setTidalUrl(e?.target.value)}
              />
            </div>
          </div>
          <button
           // type='button'
            disabled={loading}
            onClick={() =>
              updateProfile({
                avatar_url,
                artist_name,
                apple_url,
                amazon_url,
                deezer_url,
                soundcloud_url,
                spotify_url,
                tidal_url,
              })
            }
            className="bg-blue-700 text-white p-2 text-sm w-32 rounded-md hover:bg-blue-800 hover:scale-105 mt-4"
          >
            Update Settings
          </button>
        </div>}
        <div className={`py-8 w-full mx-auto flex justify-center ${!profile.is_artist && 'h-full place-items-center'}`}>
          <EnableArtistMode profile={profile!} />
        </div>
      </div>
    </>

  )
  );
}
