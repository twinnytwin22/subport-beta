import { NextApiRequest, NextApiResponse } from 'next';
import { deployTest } from 'lib/deployer';
import { getSession, useSession } from 'next-auth/react';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Get the form data from the request body
      const { name, description } = req.body;
      
      // Get the user ID from the authentication provider (NextAuth.js)
      const { data:session } =  useSession();
      const wallet = session?.user?.wallet
      console.log(wallet)
      // Deploy the contract using the form data
      const contractAddress = await deployTest({name, description});

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
