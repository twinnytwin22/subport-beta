"use client";
import { SignOutButton } from "ui/Buttons/SignOut";
import Avatar from "../UploadWidget";
import { toast } from "react-toastify";
import { useAuthProvider } from "app/context/auth";
import { useRouter } from "next/navigation";
import { supabase } from "lib/constants";
import useProfileStore from "./store";

export default function Account() {
  const { user, profile, isLoading } = useAuthProvider();
  const {
    loading,
    setLoading,
    username,
    setUsername,
    bio,
    setBio,
    avatar_url,
    setAvatarUrl,
    city,
    setCity,
    country,
    setCountry,
    email,
    setEmail,
    state,
    setState
  } = useProfileStore();

  const router = useRouter();

  async function updateProfile({
    username,
    avatar_url,
    city,
    country,
    state,
    bio,
  }: any) {
    if (profile && user) {
      try {
        setLoading(true);
        const updates: any = {};
        if (bio !== profile?.bio) {
          updates.bio = bio;
        }
        // Check each input field and add it to the updates object if it has changed
        if (username !== profile?.username) {
          updates.username = username;
        }
        if (avatar_url !== profile?.avatar_url) {
          updates.avatar_url = avatar_url;
        }
        if (city !== profile?.city) {
          updates.city = city;
        }
        if (country !== profile?.country) {
          updates.country = country;
        }
        if (state !== profile?.state) {
          updates.state = state;
        }
        updates.updated_at = new Date().toISOString();
        let { error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", user?.id);

        if (error) throw error;
        alert("Profile updated!");
      } catch (error) {
        toast.error(error as any);
        console.log(error);
      } finally {
        setLoading(false);
        router.refresh();
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
        <div className="mx-auto content-start items-center h-full flex-col justify-between mt-8">
          <Avatar
            uid={user?.id || ""}
            url={profile?.avatar_url || avatar_url}
            size={200}
            onUpload={(url: any) => {
              setAvatarUrl(url);
              updateProfile({ avatar_url: url });
            }}
          />
          <div className="mt-3">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              className="bg-zinc-50 border  border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="bio"
              value={bio ? bio : profile.bio}
              onChange={(e: any) => setBio(e?.target.value)}
            />
          </div>
        </div>
        <div className="place-content-end mx-auto space-y-2">
          <div>
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="email"
              type="text"
              value={user?.email}
              onChange={(e: any) => setEmail(e?.target.value)}
              readOnly
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="username"
              type="text"
              value={username ? username : profile.username}
              onChange={(e: any) => setUsername(e?.target.value)}
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="city"
              type="text"
              value={city ? city : profile.city}
              onChange={(e: any) => setCity(e?.target.value)}
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="state"
            >
              State/Territory
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="state"
              type="text"
              value={state ? state : profile.state}
              onChange={(e: any) => setState(e?.target.value)}
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="country"
              type="text"
              value={country ? country : profile.country}
              onChange={(e: any) => setCountry(e?.target.value)}
            />
          </div>

          <div className="hidden">
            <label
              className="block mb-1 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="wallet"
            >
              Wallet
            </label>
            <input
              className="bg-zinc-50 border  border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="wallet"
              type="text"
              value={profile?.wallet_address || ""}
              readOnly
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              className="bg-blue-700 text-white p-2 text-sm w-32 rounded-md hover:bg-blue-800 hover:scale-105"
              onClick={() =>
                updateProfile({
                  username,
                  avatar_url,
                  city,
                  country,
                  state,
                  bio,
                })
              }
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
            <SignOutButton />
          </div>
        </div>
      </>
    )
  );
}