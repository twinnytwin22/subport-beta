import 'viem/window'
import { createWalletClient, http, custom, createPublicClient } from 'viem'
import { polygonMumbai } from 'viem/chains'
import subportMeta from '../../utils/subport.json';
import { supabase } from '../providers/supabase/supabaseClient'
import { uploadHashToIpfs } from './uploadFileIpfs'
import { supabaseAdmin } from 'app/supabase-admin';
import dynamic from 'next/dynamic';

const bytecode = subportMeta.bytecode as any;
const abi = subportMeta.abi;
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID
const publicTransport = http(`https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`)
const transport = http(`https://wiser-bitter-dream.matic-testnet.discover.quiknode.pro/e6a272e852edbd3124ab56baa5c2a581d4b0ab17/`)


export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: publicTransport,
  batch: {
    multicall: {
      batchSize: 100,
    }
  }
})


export async function deployContractViem({ deployData }: any) {
  try {
    const [account] = await walletClient.requestAddresses()
    console.log(deployData, 'dd')
    const hash = await walletClient.deployContract({
      abi: abi,
      account,
      args: deployData,
      bytecode: bytecode,
    })
    console.log(hash, 'hash')
    try {
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      console.log(receipt.contractAddress, 'contract address')
      return receipt?.contractAddress
    } catch (error) {
      console.error(error);
      return { success: false, error: "Error creating collectible" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error creating collectible" };
  }
}


export const walletClient = createWalletClient({
  chain: polygonMumbai,
  transport
})


export async function deployCollectible(collectibleData: any) {
  let metaDataHash = null; // Declare the ipfsHash variable outside the try-catch block
  let tokenDataHash = null; // Declare the ipfsHash variable outside the try-catch block

  try {
    // Get the form data from the request body

    const metaData = {
      'name': collectibleData.name,
      'description': collectibleData.description,
      'image': collectibleData.image,
      'external_link': collectibleData?.website || null,
      "seller_fee_basis_points": 1000,
      "fee_recipient": collectibleData?.address

    };

    const tokenURIData = {
      'name': collectibleData.name,
      'description': collectibleData.description,
      'image': collectibleData.image,
      'animation_url': collectibleData.audio,
      'external_url': collectibleData?.website || null,
      'attributes': [
        {
          "trait_type": 'Genre',
          "value": collectibleData.genre
        },
        {
          "trait_type": "Artist",
          "value": collectibleData.artist_name
        },
      ]
    };

    /// Upload Collection Data to IPFS
    try {
      metaDataHash = await uploadHashToIpfs({ data: metaData });
      tokenDataHash = await uploadHashToIpfs({ data: tokenURIData });

      console.log("Upload successful! IPFS hash:");

      const getSlug = collectibleData?.artist_name + '-' + collectibleData?.name;
      let slug = (getSlug.toLowerCase()).replace(/[^a-zA-Z0-9-]+/g, "-");

      // Check if slug already exists in Supabase
      const { data: existingDrops, error: existingDropsError } = await supabase
        .from("drops")
        .select()
        .eq("slug", slug);

      if (existingDropsError) {
        return { success: false, error: existingDropsError };
      }

      // If there is a matching slug, increment it
      let increment = 1;
      while (existingDrops && existingDrops.length > 0) {
        slug = `${getSlug.toLowerCase()}-${increment}`;
        increment++;

        // Check again if the incremented slug exists
        const { data, error } = await supabase
          .from("drops")
          .select()
          .eq("slug", slug);

        if (error) {
          console.error(error);
          return { success: false, error: error };
        }

        let existingDrops = data;
        return existingDrops
      }

      // Deploy the contract using the form data
      const deployDataDefined = {
        name: collectibleData?.name,
        tokenName: collectibleData?.name.toUpperCase(),
        startDate: collectibleData?.start_date,
        endDate: collectibleData.end_date,
        contractUri: metaDataHash,
        tokenHash: tokenDataHash?.replace(/^ipfs:\/\//, ''),
        totalSupply: collectibleData?.total_collectibles,
      };

      const deployData = Object.values(deployDataDefined);

      const contractAddress = await deployContractViem({ deployData });

      // Add Collection to Supabase
      const { data: drop, error } = await supabaseAdmin
        .from("drops")
        .insert([
          {
            name: collectibleData?.name,
            userId: collectibleData?.id,
            contractAddress: contractAddress,
            slug: slug,
            keywords: collectibleData?.keywords,
            genre: collectibleData?.genre,
            spotify_uri: collectibleData.song_uri
          }
        ])
        .eq("userId", collectibleData?.id);

      if (error) {
        console.error(error);
        return { success: false, error: error };
      }

      // Return the contract address and collectible data
      return { success: true, contractAddress, drop };
    } catch (error) {
      console.error("Error deploying:", error);
      return { success: false, error: "Error deploying" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error creating collectible" };
  }
}


