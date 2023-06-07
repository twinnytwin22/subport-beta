import 'viem/window'
import { createWalletClient, http, custom, createPublicClient } from 'viem'
import { polygonMumbai } from 'viem/chains'
import subportMeta from '../utils/subport.json';
import { supabase } from './supabaseClient'
import { uploadHashToIpfs } from './uploadFileIpfs'

const bytecode = subportMeta.bytecode as any;
const abi = subportMeta.abi;

const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
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
      return receipt.contractAddress
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
  transport: custom(window.ethereum! as any),
})

export async function deployCollectible({ collectibleData }: any) {
  let ipfsHash = null; // Declare the ipfsHash variable outside the try-catch block

  try {
    // Get the form data from the request body
    console.log(collectibleData, 'CData')

    /// Upload Collection Data to IPFS
    try {
      ipfsHash = await uploadHashToIpfs({ collectibleData });
      console.log("Upload successful! IPFS hash:", ipfsHash);

      const wallet = collectibleData.address;
      console.log(wallet);
      const slug = (collectibleData.artist_name.toLowerCase() + '-' + collectibleData.name.toLowerCase()).replace(/\s+/g, '-');

      // Deploy the contract using the form data
      const deployDataDefined = {
        name: collectibleData?.name,
        tokenName: collectibleData?.name.toUpperCase(),
        startDate: collectibleData?.start_date,
        endDate: collectibleData.end_date,
        contractUri: ipfsHash,
        totalSupply: collectibleData?.total_collectibles,
      };

      const deployData = Object.values(deployDataDefined)

      const contractAddress = await deployContractViem({ deployData });
      console.log(contractAddress, 'addy from deploy')

      // Add Collection to Supabase
      const { data: drop, error } = await supabase
        .from("drops")
        .insert([
          {
            name: collectibleData?.name,
            userId: collectibleData?.id,
            contractAddress: contractAddress,
            slug: slug,
            keywords: collectibleData?.keywords
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




