import { NextApiRequest, NextApiResponse } from 'next';
import { deployTest } from 'lib/deployer';
import { getSession, useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';
import { Database } from 'types/supabase';
const supabaseUrl = 'https://hlrcgzujgosmqgepcemj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseKey)
export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Get the form data from the request body
      const collectibleData = req.body;
      // Add Collection to Supabase
      const {data: collectible, error } = await supabase
      .from('collectibles')
      .insert(collectibleData)
       if (error) {
      console.error(error)
     throw error
     }
      // Get the user ID from the authentication provider (NextAuth.js)
      const { data:session } =  useSession();
      const wallet = session?.user?.wallet_address
      console.log(wallet)
      // Deploy the contract using the form data
      const contractAddress = await deployTest(collectibleData);

      // Return a JSON response with the contract address
      res.json({ success: true, contractAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error creating collectible' });
    }
  } else {
    res.status(404).json({ success: false, error: 'Endpoint not found' });
  }
}
