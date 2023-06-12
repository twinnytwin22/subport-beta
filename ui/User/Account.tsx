"use client";
import { useCallback, useEffect, useState } from "react";
import { SignOutButton } from "ui/Buttons/SignOut";
import Avatar from "./UploadWidget";
import { ConnectSpotifyButton } from "./ConnectSpotifyButton";
import { toast } from "react-toastify";
import { Session, User } from '@supabase/auth-helpers-nextjs'
import { useAuthProvider } from "app/context";
import { supabaseAdmin } from "app/supabase-admin";

interface ExtendedUser extends User {
  wallet?: string
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState('');
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const { user, profile } = useAuthProvider();



  async function updateProfile({ username, avatar_url }: any) {

    if (profile) {
      try {
        setLoading(true);
        const updates = {
          username: username,
          avatar_url: avatar_url,
          updated_at: new Date().toISOString(),
        };

        let { error } = await supabaseAdmin
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
      }
    }
  }




  return user && (
    <div className="bg-slate-200 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg p-8 mx-4 max-w-2xl w-full space-y-4 md:flex place-items-center mt-8">
      <div className="mx-auto content-center items-center justify-center">
        <Avatar
          uid={user?.id || ""}
          url={profile?.avatar_url || ""}
          size={200}
          onUpload={(url: any) => {
            setAvatarUrl(url)
            updateProfile({ avatar_url: url })
          }}
        />
      </div>
      <div className="place-content-end mx-auto">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="email"
            type="text"
            value={email || user?.email || ""}
            onChange={(e: any) => setEmail(e?.target.value)}
            readOnly
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="username"
            type="text"
            value={username || profile?.username || ""}
            onChange={(e: any) => setUsername(e?.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            htmlFor="wallet"
          >
            Wallet
          </label>

          <input
            className="bg-zinc-50 border  border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="wallet"
            type="text"
            value={profile?.wallet_address || ""}
            readOnly />
        </div>
        <div className="mt-4">
          <ConnectSpotifyButton /></div>
        <div className="flex space-x-2 mt-4">
          <button
            className="bg-blue-700 text-white p-2 text-sm w-32 rounded-lg hover:bg-blue-800 hover:scale-105"
            onClick={() => updateProfile({ username, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>

          <SignOutButton />
        </div></div>
    </div>
  );
}
