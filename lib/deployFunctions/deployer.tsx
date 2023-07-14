import 'viem/window'
import { createWalletClient, http, custom, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { polygonMumbai } from 'viem/chains'
import subportMeta from '../../utils/subport.json';
import { supabase } from '../providers/supabase/supabaseClient'
import { uploadHashToIpfs } from './uploadFileIpfs'

const bytecode = subportMeta.bytecode as any;
const abi = subportMeta.abi;
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID
const publicTransport = http(`https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`)


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
    console.log(deployData, 'dd')
    const hash = await walletClient.deployContract({
      abi: abi,
      args: deployData,
      bytecode: bytecode,
    })
    console.log(hash, 'hash')
    try {
      const receipt: any = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await publicClient.waitForTransactionReceipt({ hash });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // 1-second timeout      
        console.log(receipt.contractAddress, 'contract address')
        return receipt?.contractAddress
      });
    } catch (error) {
      console.error(error);
      return { success: false, error: "Error creating collectible" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error creating collectible" };
  }
}

const account = privateKeyToAccount(`0x${process.env.PK}`)

export const walletClient = createWalletClient({
  account,
  chain: polygonMumbai,
  transport: http()
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
      const metaDataHash: string | undefined = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await uploadHashToIpfs({ data: metaData });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // 1-second timeout
      });

      const tokenDataHash: string | undefined = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await uploadHashToIpfs({ data: tokenURIData });
            resolve(result);
          } catch (error) {
            reject(error);
          }

        }, 1000); // 1-second timeout


      });
      console.log("Upload successful! IPFS hash:");

      const getSlug = collectibleData?.artist_name + '-' + collectibleData?.name;
      let slug: string | undefined = (getSlug.toLowerCase()).replace(/[^a-zA-Z0-9-]+/g, "-");

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

      const contractAddress = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await deployContractViem({ deployData });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 1000); // 1-second timeout
      });
      if (contractAddress!) {

        const dropData = {
          name: collectibleData?.name,
          user_id: collectibleData?.id,
          contract_address: contractAddress,
          slug: slug,
          keywords: collectibleData?.keywords,
          genre: collectibleData?.genre,
          spotify_uri: collectibleData.song_uri
        }
        if (dropData) {
          console.log(dropData, collectibleData)
        }
        // Add Collection to Supabase
        const { data: drop, error } = await supabase
          .from("drops")
          .insert([

            {
              name: collectibleData?.name,
              user_id: collectibleData?.id,
              contract_address: contractAddress,
              slug: slug,
              keywords: collectibleData?.keywords,
              genre: collectibleData?.genre,
              spotify_uri: collectibleData.song_uri
            }

          ])
          .eq("user_id", collectibleData?.id);

        if (error) {
          console.error(error);
          return { success: false, error: error };
        }

        // Return the contract address and collectible data
        return { success: true, contractAddress, drop };
      }
    } catch (error) {
      console.error("Error deploying:", error);
      return { success: false, error: "Error deploying" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error creating collectible" };
  }
}


