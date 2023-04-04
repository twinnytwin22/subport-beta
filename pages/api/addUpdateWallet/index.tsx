import { getSession } from "next-auth/react";
import { supabase } from "lib/supabaseClient";
export default async function addUpdateWallet({req, res}:any) {
  const session = await getSession({ req });

  // Check if the user is authenticated and has a wallet address
  if (session && session.user && session.user.wallet_address) {
    res.status(200).json({ message: "User is already connected to a wallet" });
    return;
  }

  // Get the user's wallet address from the request body
  const { walletAddress } = req.body;

  if (!walletAddress) {
    res.status(400).json({ message: "Wallet address is required" });
    return;
  }

  // Update the user's wallet address in Supabase
  const { data, error } = await supabase
    .from("users")
    .update({ wallet_address: walletAddress })
    .eq("id", session?.user.id)
    .single();

  if (error) {
    res.status(500).json({ message: "Failed to update user's wallet address" });
    return;
  }

  res.status(200).json({ message: "Wallet address has been added to user's account" , data});
}
