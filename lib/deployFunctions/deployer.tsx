'use client'
import 'viem/window'
import { createWalletClient, http, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { polygonMumbai } from 'viem/chains'
import subportMeta from '../../utils/subport.json';
import { uploadHashToIpfs } from './uploadFileIpfs'
import { supabase } from 'lib/constants'
import { supabaseAdmin } from 'lib/providers/supabase/supabase-lib-admin'
import { useStatusStore } from './statusTrack';
import { fetchSingleCollectible } from 'utils/use-server'


const bytecode = subportMeta.bytecode as any;
const abi = subportMeta.abi;
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID || process.env.ALCHEMY_ID
const publicTransport = http(`https://polygon-mumbai.g.alchemy.com/v2/4NyYhTtu_4zARxhQQvw6aXni7lkwtBZE`)

export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: publicTransport,
})

// Statuses
const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  FINAL: 'final'
};


export async function deployContractViem({ deployData }: any) {
  if (deployData) {
    try {
      // Set loading status
      useStatusStore.setState({ status: Status.LOADING })

      const hash = await walletClient.deployContract({
        abi: abi,
        args: deployData,
        bytecode: bytecode,
      });

      if (hash) {
        const receipt: any = await publicClient.waitForTransactionReceipt({ hash });

        // Set success status
        console.log(receipt.contractAddress, 'contract address');
        return receipt?.contractAddress;
      }
    } catch (error) {
      // Set error status
      useStatusStore.setState({ status: Status.ERROR })
      console.error(error);
      return { success: false, error: "Error creating collectible" };
    }
  }
}

const account = privateKeyToAccount(`0x${process.env.PK!!}`)

export const walletClient = createWalletClient({
  account,
  chain: polygonMumbai,
  transport: http('https://polygon-mumbai.g.alchemy.com/v2/4NyYhTtu_4zARxhQQvw6aXni7lkwtBZE')
})

export const deployCollectible = async (collectibleData: any) => {
  useStatusStore.setState({ status: Status.PENDING })
  // let metaDataHash = null; // Declare the ipfsHash variable outside the try-catch block
  // let tokenDataHash = null; // Declare the ipfsHash variable outside the try-catch block

  try {
    // Get the form data from the request body

    const metaData = {
      'name': collectibleData.name,
      'description': collectibleData.description,
      'image': collectibleData.image,
      'animation_url': collectibleData.audio,
      'external_link': collectibleData?.website || null,
      "seller_fee_basis_points": 1000,
      "fee_recipient": collectibleData?.address,
      "artist_name": collectibleData?.artist_name
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

    // Upload Collection Data to IPFS
    try {
      // Set loading status

      const metaDataHash: string | undefined = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await uploadHashToIpfs({ data: metaData });
            resolve(result);
          } catch (error) {
            useStatusStore.setState({ status: Status.ERROR })
            reject(error);
          }
        }, 500); // 1-second timeout
      });


      const tokenDataHash: string | undefined = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await uploadHashToIpfs({ data: tokenURIData });
            resolve(result);
          } catch (error) {
            useStatusStore.setState({ status: Status.ERROR })
            reject(error);
          }

        }, 500); // 1-second timeout
      });

      if (metaDataHash && tokenDataHash) {
        console.log("Upload successful! IPFS hash:");

        const getSlug = collectibleData?.artist_name + '-' + collectibleData?.name;
        let slug: string | undefined = (getSlug.toLowerCase()).replace(/[^a-zA-Z0-9-]+/g, "-");

        // Check if slug already exists in Supabase
        const { data: existingDrops, error: existingDropsError } = await supabase
          .from("drops")
          .select()
          .eq("slug", slug);

        if (existingDropsError) {
          useStatusStore.setState({ status: Status.ERROR })
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
            useStatusStore.setState({ status: Status.ERROR })
            return { success: false, error: error };
          }

          let existingDrops = data;
          return existingDrops;
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
        useStatusStore.setState({ status: Status.LOADING })

        const contractAddress = await deployContractViem({ deployData });

        if (contractAddress && collectibleData) {
          const dropData = {
            title: collectibleData.name,
            user_id: collectibleData.user_id,
            contract_address: contractAddress,
            slug: slug,
            keywords: collectibleData.keywords,
            genre: collectibleData.genre,
            spotify_uri: collectibleData.spotify_uri,
          };

          if (dropData) {
            // Add Collection to Supabase
            const { data: drop, error } = await supabaseAdmin
              .from("drops")
              .insert([dropData])
              .select();

            //   if (drop) {
            //   console.log(drop)
            //  }

            if (error) {
              console.error(error);
              useStatusStore.setState({ status: Status.ERROR })
              return { success: false, error: error };
            }
            const res = await finalized(dropData.contract_address, dropData.slug)
            // Set success status

            // Return the contract address and collectible data
            return { success: true, contractAddress, drop, collectible: res };
          }
        }
      }
    } catch (error) {
      // Set error status
      useStatusStore.setState({ status: Status.ERROR })
      console.error("Error deploying:", error);
      return { success: false, error: "Error deploying" };
    }
  } catch (error) {
    // Set error status
    useStatusStore.setState({ status: Status.ERROR })
    console.error(error);
    return { success: false, error: "Error creating collectible" };
  }
}



const finalized = async (contractAddress: any, slug: any) => {
  if (contractAddress) {
    useStatusStore.setState({ status: Status.SUCCESS })

    try {
      const data = await fetchSingleCollectible({ contractAddress, slug })

      useStatusStore.setState({ status: Status.FINAL })
      // Wait for 10 seconds using a timeout
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return data
    } catch (error) {
      console.log(error)
    }
  }

};