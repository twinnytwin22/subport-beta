import { NextApiRequest, NextApiResponse } from 'next';
import { deployTest } from 'lib/deployer';
import fs from 'fs';
import { getSession, useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';
import { create } from "ipfs-http-client";
import { Database } from 'types/supabase';

const supabaseUrl = 'https://hlrcgzujgosmqgepcemj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default async function(req: NextApiRequest, res: NextApiResponse) {
  // Get the user ID from the authentication provider (NextAuth.js)
  const session = await getSession({ req });
  console.log(session, 'session for req')

  if (req.method === 'POST') {
    let ipfsHash = null; // Declare the ipfsHash variable outside the try-catch block

    try {
      // Get the form data from the request body
      const collectibleData = { 
        ...req.body,
        userId: session?.id
      };
      
      /// Upload Collection Data to IPFS
      try {
        ipfsHash = await uploadToIpfs(collectibleData);
        console.log('Upload successful! IPFS hash:', ipfsHash);

        // Add Collection to Supabase
        const { data: collectible, error } = await supabase
          .from('collectibles')
          .insert(collectibleData)
          .eq('userId', session?.id);

        if (error) {
          console.error(error);
          res.status(500).json({ success: false, error: 'Error inserting collectible' });
          return;
        }

        const wallet = session?.user?.wallet_address;
        console.log(wallet);

        // Deploy the contract using the form data
        const deployData = { 
          ...collectibleData,
          ipfsHash: ipfsHash.ipfsHash
        };
      
        const contractAddress = await deployTest(deployData);

        // Return a JSON response with the contract address
        res.json({ success: true, contractAddress });

      } catch (error) {
        console.error('Error uploading to IPFS:', error);
        res.status(500).json({ success: false, error: 'Error uploading to IPFS' });
        return;
      }      

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error creating collectible' });
    }
  } else {
    res.status(404).json({ success: false, error: 'Endpoint not found' });
  }
}


  const uploadToIpfs = async ({collectibleData}: any) => {
  const projectId = process.env.NEXT_PUBLIC_INFURA_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
  const subdomain = 'subport'
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs = create({
    timeout: "2m",
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  // Upload json file to IPFS
  const jsonData = { collectibleData };
  const jsonContent = JSON.stringify(jsonData);
  fs.writeFile('metadata.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('metadata was successfully saved to metadata.json file');
  });
  // Upload audio file to IPFS
  const hashResult = await ipfs.add(jsonContent);
  console.log(hashResult, 'hrs')
  const hashUrl = `ipfs://${hashResult.path}`;
  console.log(hashUrl, 'hashUrl')
  return { ipfsHash: hashUrl };
}