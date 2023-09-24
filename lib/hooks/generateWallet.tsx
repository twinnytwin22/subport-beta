import { ethers } from 'ethers';
import { supabase } from 'lib/constants';
export async function addUpdateWallet(userId: any) {
  if (userId) {
    // Check if the user is authenticated and has a wallet address

      const newWallet = ethers.Wallet.createRandom();
      const newAddress = newWallet?.address;
      const newSecret = newWallet?.privateKey;
      if (newSecret) {

        try {
          // Update the user's wallet address in Supabase
          const { data: profile, error } = await supabase
            .from("profiles")
            .update(
              {
                wallet_address: newAddress,
                secret: newSecret
              }

            )
            .eq("id", userId)
            .select()
            .single()

          if (error) {
            console.log({ message: "Failed to update user's wallet address-1", error });
            console.error(`This wallet address already exists on another account`);
            return null;
          }

          return profile.wallet_address

        } catch (error) {
          console.error({ message: "Failed to update user's wallet address-2", error });
          return null;
        }
      }

    }
  }




export async function getUserData(user: any) {
  try {
    const { data: wallet, error } = await supabase
      .from("profiles")
      .select("wallet_address, avatar_url")
      .eq("id", user?.id)
      .single();

    if (wallet?.wallet_address === "" || wallet?.wallet_address === null) {
      await addUpdateWallet(user);
    }
  } catch (error) {
    console.log("Error loading user data:", error);
  }
};


