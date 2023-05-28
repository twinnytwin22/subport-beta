
import { createServerClient } from 'lib/supabase-server'
import { useSession } from "next-auth/react";
import { createClient } from '@supabase/supabase-js'

import { Database } from 'types/supabase';
import { toast } from 'react-toastify';


export default async function addUpdateWallet(context: any, address: any) {
  const supabaseUrl = 'https://hlrcgzujgosmqgepcemj.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const { data: session } = useSession();
  const supabase = createClient<Database>(supabaseUrl, supabaseKey)

  // Check if the user is authenticated and has a wallet address
  if (!session?.id || session.user.wallet_address) {
    console.log({ message: "User is already connected to a wallet", session });
    return;
  }
  // Update the user's wallet address in Supabase
  const { data: user, error } = await supabase
    .from("users")
    .update({ wallet_address: address })
    .eq("id", session.id)
    .single();

  if (error) {
    console.log({ message: "Failed to update user's wallet address", error, address })
    toast.error(`This wallet address already exist on another account`);
    return;
  }

  const { data: wallet_address } = await supabase
    .from("users")
    .select(' wallet_address')
    .eq("id", session.id)
    .single();
  if (wallet_address) {
    console.log({ message: "Wallet address has been added to user's account" })
  };
  return wallet_address;
}









export const revalidate = 0
export async function fetchCollectibles() {
  const supabaseUrl = 'https://hlrcgzujgosmqgepcemj.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  let { data: collectibles, error } = await supabase
    .from('collectibles')
    .select('*')
  return collectibles
}

