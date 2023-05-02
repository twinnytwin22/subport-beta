"use client";
import { useState, useEffect } from "react";
import { supabase } from "lib/supabaseClient";
import { useSession } from "next-auth/react";
import { SignOutButton } from "ui/Buttons/SignOut";
import Avatar from "./UploadWidget";
import { ConnectSpotifyButton } from "./ConnectSpotifyButton";
export default function Account() {
  const { data: session } = useSession();
  const user = session?.id;
  console.log(session);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [image, setImage] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    let {
      data: accounts,
      error,
      status,
    } = await supabase.from("users").select(`*`);
    console.log(accounts);
    if (session)
      try {
        setLoading(true);
        let { data, error, status } = await supabase
          .from("users")
          .select(` wallet_address, image, email, handle`)
          .eq("id", user)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setWallet(data.wallet_address);
          setAvatarUrl(data.image);
          setEmail(data.email);
          if (data.handle) {
            setUsername(data?.handle);
          }
          if (data.image) {
            setImage(data?.image);
          }
        }
      } catch (error) {
        alert("Error loading user data!");
        console.log(error);
      } finally {
        setLoading(false);
      }
  }

  async function updateProfile({ username, wallet, avatar_url }: any) {
    try {
      setLoading(true);
      const updates = {
        wallet_address: wallet,
        handle: username,
        image: avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from("users")
        .update({
          wallet_address: wallet,
          handle: username,
          image: avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user);

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string; // type assertion
        setImage(result);
      };
    }
  };
  

  return (
    <div className="bg-slate-200 dark:bg-zinc-900 border border-zinc-700 rounded-lg p-8 mx-4 max-w-2xl w-full space-y-4 md:flex place-items-center mt-8">
      <div className="mx-auto content-center items-center">
      <Avatar
      uid={session?.user.id}
      url={avatar_url ?? image}
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
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="email"
          type="text"
          value={email}
          onChange={(e: any) => setEmail(e?.target.value)}
        />
      </div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="username"
          type="text"
          value={username}
          onChange={(e: any) => setUsername(e?.target.value)}
        />
      </div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="wallet"
        >
          Wallet
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="wallet"
          type="text"
          value={wallet}
          onChange={(e: any) => setWallet(e?.target.value)}
        />
      </div>
      <div className="mt-4">
       <ConnectSpotifyButton/></div>
      <div className="flex space-x-2 mt-4">
        <button
          className="bg-blue-700 text-white p-2 text-sm w-32 rounded-lg hover:bg-blue-800 hover:scale-105"
          onClick={() => updateProfile({ username, wallet, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>

        <SignOutButton />
      </div></div>
    </div>
  );
}
