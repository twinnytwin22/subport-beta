import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
const supabase = createClientComponentClient()
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export default async function AddUpdateWallet(user: any) {
  if (user) {
    // Check if the user is authenticated and has a wallet address
    const { data: wallet } = await supabase
      .from("profiles")
      .select('wallet_address')
      .eq("id", user?.id)
      .single();

    if (!wallet?.wallet_address) {
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
            .eq("id", user?.id)

          if (error) {
            console.log({ message: "Failed to update user's wallet address-1", error });
            toast.error(`This wallet address already exists on another account`);
            return null;
          }
        } catch (error) {
          console.error({ message: "Failed to update user's wallet address-2", error });
          return null;
        }
      }

      return wallet?.wallet_address;
    }
  }
}