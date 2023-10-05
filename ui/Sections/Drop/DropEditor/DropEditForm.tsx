'use client'
import React, { useState } from 'react'
import useDropSettings from './store'
import { useAuthProvider } from 'app/context/auth'
import { supabase } from 'lib/constants'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { FaApple, FaAmazon, FaDeezer, FaSoundcloud } from 'react-icons/fa'
import { SiTidal } from 'react-icons/si'
import { fetchSingleCollectible, refreshCache } from 'utils/use-server'
import { useQuery } from '@tanstack/react-query'

function DropEditForm({drop}: any) {
     console.log(drop)
    const { user, profile, isLoading } = useAuthProvider();
    const [updates, setUpdates] = useState({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()    
    const {
        apple_url,
        amazon_url,
        deezer_url,
        soundcloud_url,
       // spotify_url,
        tidal_url,
        setAmazonUrl,
        setAppleUrl,
        setSoundcloudUrl,
      //  setSpotifyUrl,
        setDeezerUrl,
        setTidalUrl,
      } = useDropSettings()

   

     // console.log(data, "DATA")
      async function updateDrop({
        apple_url,
        amazon_url,
        deezer_url,
        soundcloud_url,
        //spotify_url,
        tidal_url,
      }: any) {
        if (drop && user) {
          try {
            setLoading(true);
            const updates: any = {};
            if (typeof apple_url !== 'undefined' && apple_url !== drop?.apple_url) {
              updates.apple_url = apple_url;
            }
            if (typeof amazon_url !== 'undefined' && amazon_url !== drop?.amazon_url) {
              updates.amazon_url = amazon_url;
            }
            if (typeof deezer_url !== 'undefined' && deezer_url !== drop?.deezer_url) {
              updates.deezer_url = deezer_url;
            }
            if (typeof soundcloud_url !== 'undefined' && soundcloud_url !== drop?.soundcloud_url) {
              updates.soundcloud_url = soundcloud_url;
            }
            // if (typeof spotify_url !== 'undefined' && spotify_url !== drop?.spotify_url) {
            //   updates.spotify_url = spotify_url;
            // }
            if (typeof tidal_url !== 'undefined' && tidal_url !== drop?.tidal_url) {
              updates.tidal_url = tidal_url;
            }
            updates.updated_at = new Date().toISOString();
            let { data, error } = await supabase
              .from("drops")
              .update(updates)
              .eq("id", drop?.id)
              .select()
              .single()
    
            if (data?.slug) {
              await fetchSingleCollectible({slug: data?.slug, refreshCache: true})
              setLoading(false);
              toast.success("drop updated!");
              router.refresh();
            }
            if (error) throw error;
          } catch (error) {
            toast.error(JSON.stringify(error));
          }
        }
      }
    

      const handleChange = (e: any) => {
        
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
              <div className="place-content-end mx-auto space-y-2 hidden">
                <label
                  className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
                  htmlFor="avatar_url"
                >
                  Avatar URL
                </label>
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
                    value={amazon_url || drop.amazon_url || ''}
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
              {/* <div className="place-content-end mx-auto space-y-2">
                <label
                  className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
                  htmlFor="spotify_url"
                >
                  Spotify URL
                </label>
          
              </div> */}
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
                  updateDrop({
                    apple_url,
                    amazon_url,
                    deezer_url,
                    soundcloud_url,
                    tidal_url,
                  })
                }
                className="bg-blue-700 text-white p-2 text-sm w-32 rounded-md hover:bg-blue-800 hover:scale-105 mt-4"
              >
                Update Settings
              </button>
            </div>}
          
          </div>
        </>
    
      )
      );
    }
    
export default DropEditForm